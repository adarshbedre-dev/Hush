import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Coffee,
  Eye,
  Flame,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Send,
  X,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { THEME } from '../theme/theme';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { ProfileModal } from '../components/ProfileModal';
import { NotificationModal } from '../components/NotificationModal';

const { width } = Dimensions.get('window');

export const TeaAndSpottedScreen: React.FC = () => {
  const {
    user,
    teaPosts,
    createTeaPost,
    burnTeaPost,
    reportTeaPost,
    guessTeaAuthor,
    revealTeaAuthor,
    spottedPosts,
    claimSpotted,
    confirmMatch,
    activeTempChat,
    openChatRoom,
    closeChatRoom,
    sendChatMessage,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'tea' | 'spotted'>('tea');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // New Tea Modal State
  const [showTeaModal, setShowTeaModal] = useState(false);
  const [teaContent, setTeaContent] = useState('');
  const [teaCategory, setTeaCategory] = useState<'CampusCrush' | 'DepartmentGossip' | 'ProfQuotes' | 'HostelChronicles'>('CampusCrush');
  const [isGuessWho, setIsGuessWho] = useState(false);
  const [hint1, setHint1] = useState('');
  const [hint2, setHint2] = useState('');
  const [hint3, setHint3] = useState('');

  // Guess Input State per post
  const [guessInputPostId, setGuessInputPostId] = useState<string | null>(null);
  const [guessText, setGuessText] = useState('');

  // Temp Chat input
  const [chatInputText, setChatInputText] = useState('');

  // Handle Tea Submit
  const handleCreateTea = () => {
    if (!teaContent.trim()) {
      Alert.alert('Required', 'Please write some campus tea!');
      return;
    }
    const hints = isGuessWho ? [hint1, hint2, hint3].filter(Boolean) : undefined;
    createTeaPost(
      teaContent.trim(),
      teaCategory,
      isGuessWho,
      hints,
      user.name
    );
    setTeaContent('');
    setIsGuessWho(false);
    setHint1('');
    setHint2('');
    setHint3('');
    setShowTeaModal(false);
  };

  // Submit Guess
  const handleSendGuess = (postId: string) => {
    if (!guessText.trim()) return;
    guessTeaAuthor(postId, guessText.trim());
    setGuessText('');
    setGuessInputPostId(null);
  };

  // Temp Chat Send
  const handleSendMessage = () => {
    if (!chatInputText.trim()) return;
    sendChatMessage(chatInputText.trim());
    setChatInputText('');
  };

  return (
    <View style={styles.container}>
      <Header onPressProfile={() => setIsProfileOpen(true)} />

      {/* Dual Tab Switcher */}
      <View style={styles.tabBarRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'tea' && styles.activeTabBtn]}
          onPress={() => setActiveTab('tea')}
        >
          <Coffee size={15} color={activeTab === 'tea' ? '#a855f7' : THEME.colors.textMuted} />
          <Text style={[styles.tabBtnText, activeTab === 'tea' && styles.activeTabBtnText]}>
            Anonymous Tea
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'spotted' && styles.activeTabBtn]}
          onPress={() => setActiveTab('spotted')}
        >
          <Eye size={15} color={activeTab === 'spotted' ? '#ff5e3a' : THEME.colors.textMuted} />
          <Text style={[styles.tabBtnText, activeTab === 'spotted' && styles.activeTabBtnText]}>
            Spotted & 24h Chat
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= SECTION 1: PRIVATE TEA ================= */}
        {activeTab === 'tea' && (
          <View style={styles.teaWrapper}>
            {/* Daily Persona Banner (Privacy Explanation) */}
            <View style={styles.personaBanner}>
              <Image source={{ uri: user.dailyAliasAvatar }} style={styles.personaAvatar} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.personaAlias}>{user.dailyAlias}</Text>
                  <View style={styles.verifiedTag}>
                    <ShieldCheck size={10} color="#10b981" />
                    <Text style={styles.verifiedTagText}>Encrypted</Text>
                  </View>
                </View>
                <Text style={styles.personaSub}>
                  Logged via verified student email • Alias rerolls every 24h for untraceable anonymity
                </Text>
              </View>
              <TouchableOpacity
                style={styles.spillTeaBtn}
                onPress={() => setShowTeaModal(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.spillTeaBtnText}>+ Spill</Text>
              </TouchableOpacity>
            </View>

            {/* Tea Posts Feed */}
            {teaPosts
              .filter((p) => !p.isReportedByUser)
              .map((post) => {
                if (post.isBurnt) {
                  return (
                    <View key={post.id} style={styles.burntCard}>
                      <Flame size={18} color="#78350f" />
                      <Text style={styles.burntText}>
                        This tea post has been burnt away into ash by 5+ campus burns 🔥
                      </Text>
                    </View>
                  );
                }

                const isAuthor = post.authorId === user.id;

                return (
                  <View key={post.id} style={styles.teaCard}>
                    {/* Top Row */}
                    <View style={styles.teaCardHeader}>
                      <Image source={{ uri: post.authorAvatar }} style={styles.teaAvatar} />
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <Text style={styles.teaAuthorAlias}>{post.authorAlias}</Text>
                          {isAuthor && (
                            <View style={styles.youTag}>
                              <Text style={styles.youTagText}>YOU</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.teaTimestamp}>
                          {post.timestamp} • #{post.category}
                        </Text>
                      </View>

                      {/* Burn / Report Actions */}
                      <View style={styles.topRightActions}>
                        <TouchableOpacity
                          style={styles.burnActionBtn}
                          onPress={() => burnTeaPost(post.id)}
                          activeOpacity={0.7}
                        >
                          <Flame size={14} color="#f59e0b" style={{ marginRight: 3 }} />
                          <Text style={styles.burnCountText}>
                            Burn ({post.burnCount}/5)
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.reportActionBtn}
                          onPress={() => {
                            Alert.alert(
                              'Report Post',
                              'Does this post cause distress, discomfort, or bullying?',
                              [
                                { text: 'Cancel', style: 'cancel' },
                                {
                                  text: 'Report & Hide',
                                  style: 'destructive',
                                  onPress: () => reportTeaPost(post.id, 'Safety Report'),
                                },
                              ]
                            );
                          }}
                        >
                          <AlertTriangle size={13} color={THEME.colors.textMuted} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Content */}
                    <Text style={styles.teaBody}>{post.content}</Text>

                    {/* Guess Who I Am Section */}
                    {post.isGuessWho && (
                      <View style={styles.guessWhoContainer}>
                        <View style={styles.guessWhoHeader}>
                          <HelpCircle size={14} color="#a855f7" />
                          <Text style={styles.guessWhoHeading}>
                            "GUESS WHO I AM" CHALLENGE
                          </Text>
                        </View>

                        {/* Hints Box */}
                        {post.hints && (
                          <View style={styles.hintsList}>
                            {post.hints.map((h) => (
                              <View key={h.step} style={styles.hintRow}>
                                <View style={styles.hintStepBadge}>
                                  <Text style={styles.hintStepText}>HINT {h.step}</Text>
                                </View>
                                <Text style={styles.hintText}>{h.hint}</Text>
                              </View>
                            ))}
                          </View>
                        )}

                        {/* Reveal Card or Button */}
                        {post.isRevealed ? (
                          <View style={styles.revealedCard}>
                            <Sparkles size={16} color="#10b981" />
                            <Text style={styles.revealedText}>
                              AUTHOR REVEALED: {post.realIdentity}
                            </Text>
                          </View>
                        ) : isAuthor ? (
                          <TouchableOpacity
                            style={styles.revealBtn}
                            onPress={() => revealTeaAuthor(post.id)}
                            activeOpacity={0.8}
                          >
                            <Sparkles size={14} color="#ffffff" style={{ marginRight: 6 }} />
                            <Text style={styles.revealBtnText}>
                              Reveal My Identity to Campus!
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.guessInputTrigger}
                            onPress={() => setGuessInputPostId(post.id)}
                          >
                            <Text style={styles.guessInputTriggerText}>
                              Know who this is? Tap to guess...
                            </Text>
                          </TouchableOpacity>
                        )}

                        {/* Guess Input Bar */}
                        {guessInputPostId === post.id && !post.isRevealed && (
                          <View style={styles.guessInputBar}>
                            <TextInput
                              placeholder="Type your guess (e.g. Arjun CSE)..."
                              placeholderTextColor={THEME.colors.textMuted}
                              value={guessText}
                              onChangeText={setGuessText}
                              style={styles.guessTextInput}
                            />
                            <TouchableOpacity
                              style={styles.guessSendBtn}
                              onPress={() => handleSendGuess(post.id)}
                            >
                              <Send size={12} color="#ffffff" />
                            </TouchableOpacity>
                          </View>
                        )}

                        {/* Guesses Stream */}
                        {post.comments.length > 0 && (
                          <View style={styles.commentsBox}>
                            {post.comments.map((c) => (
                              <View key={c.id} style={styles.commentItem}>
                                <Text style={styles.commentAlias}>
                                  {c.authorAlias}:{' '}
                                  <Text style={styles.commentBody}>{c.text}</Text>
                                </Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                );
              })}
          </View>
        )}

        {/* ================= SECTION 2: SPOTTED BOARD ================= */}
        {activeTab === 'spotted' && (
          <View style={styles.spottedWrapper}>
            <View style={styles.spottedBanner}>
              <Eye size={18} color="#ff5e3a" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.spottedBannerTitle}>Campus Spotted Board</Text>
                <Text style={styles.spottedBannerSub}>
                  "Spotted at Library wearing navy hoodie..." If it's you, tap "Is that me?". When confirmed, a 24-Hour temporary self-destruct chat unlocks!
                </Text>
              </View>
            </View>

            {spottedPosts.map((post) => (
              <View key={post.id} style={styles.spottedCard}>
                <View style={styles.spottedTopRow}>
                  <Image source={{ uri: post.avatar }} style={styles.spottedAvatar} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.spottedSeeker}>{post.seekerName}</Text>
                    <Text style={styles.spottedLocation}>
                      📍 {post.location} • {post.timestamp}
                    </Text>
                  </View>

                  {post.isMatched && (
                    <View style={styles.matchedBadge}>
                      <Text style={styles.matchedBadgeText}>MATCHED</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.spottedDescription}>{post.description}</Text>

                {/* Claim / Chat Buttons */}
                <View style={styles.spottedActionRow}>
                  {post.isMatched ? (
                    <TouchableOpacity
                      style={styles.openChatBtn}
                      onPress={() => openChatRoom(post.chatRoomId || 'room_default')}
                      activeOpacity={0.8}
                    >
                      <MessageCircle size={15} color="#ffffff" style={{ marginRight: 6 }} />
                      <Text style={styles.openChatBtnText}>
                        Open 24h Temp Chat 💬
                      </Text>
                    </TouchableOpacity>
                  ) : post.hasUserClaimed ? (
                    <View style={styles.claimedWaitingBox}>
                      <CheckCircle2 size={14} color="#10b981" />
                      <Text style={styles.claimedWaitingText}>
                        Claim Sent! Awaiting Poster Confirmation...
                      </Text>
                      {/* For demo testing: Allow instant confirmation */}
                      <TouchableOpacity
                        style={styles.demoConfirmBtn}
                        onPress={() => confirmMatch(post.id)}
                      >
                        <Text style={styles.demoConfirmText}>Confirm Match</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.isThatMeBtn}
                      onPress={() => claimSpotted(post.id)}
                      activeOpacity={0.8}
                    >
                      <HelpCircle size={15} color="#ffffff" style={{ marginRight: 6 }} />
                      <Text style={styles.isThatMeBtnText}>Is that me? 🙋‍♂️</Text>
                    </TouchableOpacity>
                  )}

                  <Text style={styles.claimsCountText}>
                    {post.claimsCount} claims made
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ================= MODAL: CREATE TEA POST ================= */}
      <Modal
        visible={showTeaModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTeaModal(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />

          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Coffee size={18} color="#a855f7" />
                <Text style={styles.modalTitle}>Spill Anonymous Tea</Text>
              </View>
              <TouchableOpacity onPress={() => setShowTeaModal(false)}>
                <X size={18} color={THEME.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.aliasIdentityChip}>
                <Image
                  source={{ uri: user.dailyAliasAvatar }}
                  style={{ width: 22, height: 22, borderRadius: 11 }}
                />
                <Text style={styles.aliasChipText}>Posting as: {user.dailyAlias}</Text>
              </View>

              <TextInput
                placeholder="What's the tea? Spill the gossip, funny prof moments, or confession..."
                placeholderTextColor={THEME.colors.textMuted}
                value={teaContent}
                onChangeText={setTeaContent}
                multiline
                style={styles.teaInputArea}
              />

              {/* Category Selector */}
              <Text style={styles.formLabel}>CATEGORY:</Text>
              <View style={styles.catChipsRow}>
                {(['CampusCrush', 'DepartmentGossip', 'ProfQuotes', 'HostelChronicles'] as const).map(
                  (c) => (
                    <TouchableOpacity
                      key={c}
                      style={[
                        styles.catChip,
                        teaCategory === c && styles.activeCatChip,
                      ]}
                      onPress={() => setTeaCategory(c)}
                    >
                      <Text
                        style={[
                          styles.catChipText,
                          teaCategory === c && styles.activeCatChipText,
                        ]}
                      >
                        #{c}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              {/* Guess Who I Am Switch */}
              <TouchableOpacity
                style={styles.guessWhoToggleRow}
                onPress={() => setIsGuessWho(!isGuessWho)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.guessWhoToggleTitle}>
                    Include "Guess Who I Am" Game?
                  </Text>
                  <Text style={styles.guessWhoToggleSub}>
                    Provide 3 cryptic hints. You can reveal your real identity anytime!
                  </Text>
                </View>
                <View
                  style={[
                    styles.checkboxBox,
                    isGuessWho && styles.checkboxBoxActive,
                  ]}
                >
                  {isGuessWho && <CheckCircle2 size={14} color="#ffffff" />}
                </View>
              </TouchableOpacity>

              {isGuessWho && (
                <View style={styles.hintInputsContainer}>
                  <TextInput
                    placeholder="Hint 1: Where are you often seen? (e.g. CAD lab 3rd desk)"
                    placeholderTextColor={THEME.colors.textMuted}
                    value={hint1}
                    onChangeText={setHint1}
                    style={styles.hintInput}
                  />
                  <TextInput
                    placeholder="Hint 2: Distinct item / vehicle? (e.g. Mint Vespa, red bottle)"
                    placeholderTextColor={THEME.colors.textMuted}
                    value={hint2}
                    onChangeText={setHint2}
                    style={styles.hintInput}
                  />
                  <TextInput
                    placeholder="Hint 3: Habit or hobby? (e.g. Always sipping matcha latte)"
                    placeholderTextColor={THEME.colors.textMuted}
                    value={hint3}
                    onChangeText={setHint3}
                    style={styles.hintInput}
                  />
                </View>
              )}

              <TouchableOpacity
                style={styles.submitTeaBtn}
                onPress={handleCreateTea}
              >
                <Send size={15} color="#ffffff" style={{ marginRight: 6 }} />
                <Text style={styles.submitTeaBtnText}>Post Anonymously</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: 24-HOUR TEMPORARY CHAT ================= */}
      <Modal
        visible={Boolean(activeTempChat)}
        transparent
        animationType="slide"
        onRequestClose={closeChatRoom}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={55} tint="dark" style={StyleSheet.absoluteFill} />

          <View style={styles.chatModalContainer}>
            {/* Chat Header */}
            <View style={styles.chatHeader}>
              <Image
                source={{ uri: activeTempChat?.otherPartyAvatar }}
                style={styles.chatPartnerAvatar}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.chatPartnerName}>
                  {activeTempChat?.otherPartyName}
                </Text>
                <View style={styles.chatCountdownRow}>
                  <Clock size={11} color="#ff5e3a" />
                  <Text style={styles.chatCountdownText}>
                    Self-destructs in 23h 48m
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={closeChatRoom} style={styles.chatCloseBtn}>
                <X size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Chat Body */}
            <ScrollView
              style={styles.chatMessagesList}
              contentContainerStyle={{ paddingVertical: 14 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.chatNoticeCard}>
                <Flame size={14} color="#ff5e3a" />
                <Text style={styles.chatNoticeText}>
                  Private 24-Hour Temporary Match Chat. This entire conversation and media will permanently self-destruct once the countdown ends.
                </Text>
              </View>

              {activeTempChat?.messages.map((m) => (
                <View
                  key={m.id}
                  style={[
                    styles.msgBubbleWrapper,
                    m.isSelf ? styles.selfMsgWrapper : styles.otherMsgWrapper,
                  ]}
                >
                  <View
                    style={[
                      styles.msgBubble,
                      m.isSelf ? styles.selfBubble : styles.otherBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.msgText,
                        m.isSelf ? styles.selfMsgText : styles.otherMsgText,
                      ]}
                    >
                      {m.text}
                    </Text>
                    <Text style={styles.msgTime}>{m.timestamp}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Chat Input Bar */}
            <View style={styles.chatInputBar}>
              <TextInput
                placeholder="Type temporary message..."
                placeholderTextColor={THEME.colors.textMuted}
                value={chatInputText}
                onChangeText={setChatInputText}
                style={styles.chatTextInput}
              />
              <TouchableOpacity
                style={styles.chatSendBtn}
                onPress={handleSendMessage}
              >
                <Send size={15} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Profile & Notifications */}
      <NotificationModal />
      <ProfileModal
        visible={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.bgVoid,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 18,
  },
  tabBarRow: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeTabBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  activeTabBtnText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  teaWrapper: {
    gap: 14,
  },
  personaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(168, 85, 247, 0.08)',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.25)',
  },
  personaAvatar: {
    width: 36,
    height: 36,
    borderRadius: 14,
  },
  personaAlias: {
    fontSize: 13,
    fontWeight: '800',
    color: '#e9d5ff',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  verifiedTagText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#10b981',
  },
  personaSub: {
    fontSize: 9,
    color: THEME.colors.textMuted,
    marginTop: 2,
    lineHeight: 12,
  },
  spillTeaBtn: {
    backgroundColor: '#a855f7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  spillTeaBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  teaCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  burntCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(69, 26, 3, 0.3)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  burntText: {
    fontSize: 11,
    color: '#d97706',
    fontWeight: '600',
    flex: 1,
  },
  teaCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  teaAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  teaAuthorAlias: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  youTag: {
    backgroundColor: 'rgba(255, 94, 58, 0.2)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
  },
  youTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.accentFlame,
  },
  teaTimestamp: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  burnActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  burnCountText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#f59e0b',
  },
  reportActionBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  teaBody: {
    fontSize: 13,
    color: '#ffffff',
    lineHeight: 19,
    marginBottom: 12,
  },
  guessWhoContainer: {
    backgroundColor: 'rgba(168, 85, 247, 0.06)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)',
    marginTop: 6,
  },
  guessWhoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  guessWhoHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: '#a855f7',
    letterSpacing: 0.5,
  },
  hintsList: {
    gap: 6,
    marginBottom: 10,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  hintStepBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.18)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  hintStepText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#c084fc',
  },
  hintText: {
    flex: 1,
    fontSize: 11,
    color: THEME.colors.textSecondary,
    lineHeight: 15,
  },
  revealedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  revealedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10b981',
  },
  revealBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a855f7',
    paddingVertical: 8,
    borderRadius: 10,
  },
  revealBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  guessInputTrigger: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  guessInputTriggerText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  guessInputBar: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  guessTextInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: '#ffffff',
    fontSize: 11,
  },
  guessSendBtn: {
    backgroundColor: '#a855f7',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  commentsBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 4,
  },
  commentItem: {
    flexDirection: 'row',
  },
  commentAlias: {
    fontSize: 11,
    fontWeight: '700',
    color: '#c084fc',
  },
  commentBody: {
    fontWeight: '400',
    color: THEME.colors.textSecondary,
  },
  spottedWrapper: {
    gap: 14,
  },
  spottedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 94, 58, 0.08)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 94, 58, 0.25)',
  },
  spottedBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  spottedBannerSub: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  spottedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  spottedTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  spottedAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  spottedSeeker: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  spottedLocation: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  matchedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  matchedBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#10b981',
  },
  spottedDescription: {
    fontSize: 13,
    color: '#ffffff',
    lineHeight: 19,
    marginBottom: 14,
  },
  spottedActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  isThatMeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.accentFlame,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  isThatMeBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  openChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  openChatBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  claimedWaitingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  claimedWaitingText: {
    fontSize: 10,
    color: '#10b981',
    fontWeight: '600',
  },
  demoConfirmBtn: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 6,
  },
  demoConfirmText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ffffff',
  },
  claimsCountText: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#13131c',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    maxHeight: '85%',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  aliasIdentityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  aliasChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#d8b4fe',
  },
  teaInputArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    padding: 14,
    color: '#ffffff',
    fontSize: 13,
    minHeight: 90,
    textAlignVertical: 'top',
    marginBottom: 14,
  },
  formLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.textMuted,
    marginBottom: 8,
  },
  catChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  catChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeCatChip: {
    backgroundColor: 'rgba(168, 85, 247, 0.25)',
    borderWidth: 1,
    borderColor: '#a855f7',
  },
  catChipText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  activeCatChipText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  guessWhoToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },
  guessWhoToggleTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  guessWhoToggleSub: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: THEME.colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  checkboxBoxActive: {
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
  },
  hintInputsContainer: {
    gap: 8,
    marginBottom: 14,
  },
  hintInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 12,
  },
  submitTeaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a855f7',
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  submitTeaBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  chatModalContainer: {
    backgroundColor: '#0f0f17',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 16,
    height: '90%',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  chatPartnerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ff5e3a',
  },
  chatPartnerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  chatCountdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  chatCountdownText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ff5e3a',
  },
  chatCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatMessagesList: {
    flex: 1,
  },
  chatNoticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 94, 58, 0.1)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 94, 58, 0.25)',
  },
  chatNoticeText: {
    flex: 1,
    fontSize: 10,
    color: '#ff8a00',
    lineHeight: 14,
  },
  msgBubbleWrapper: {
    marginBottom: 10,
  },
  selfMsgWrapper: {
    alignItems: 'flex-end',
  },
  otherMsgWrapper: {
    alignItems: 'flex-start',
  },
  msgBubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  selfBubble: {
    backgroundColor: THEME.colors.accentFlame,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontSize: 13,
    lineHeight: 18,
  },
  selfMsgText: {
    color: '#ffffff',
  },
  otherMsgText: {
    color: '#f3f4f6',
  },
  msgTime: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.5)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  chatInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  chatTextInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 12,
  },
  chatSendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: THEME.colors.accentFlame,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
