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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Users,
  Calendar,
  Send,
  Plus,
  Radio,
  FileText,
  CheckCircle,
  Sparkles,
  TrendingUp,
  MessageCircle,
  Heart,
  Shuffle,
  ShieldCheck,
} from 'lucide-react-native';
import { THEME } from '../theme/theme';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { StoryCircle } from '../components/StoryCircle';
import { InspoHeroCard } from '../components/InspoHeroCard';
import { NotificationModal } from '../components/NotificationModal';
import { ProfileModal } from '../components/ProfileModal';

const { width } = Dimensions.get('window');

const BATCHES = ['All', '2024', '2025', '2026', '2027'];
const BRANCHES = ['All', 'CSE', 'ECE', 'Mech', 'Civil', 'Biotech', 'Design'];

export const CampusHomeScreen: React.FC = () => {
  const {
    user,
    channelPosts,
    selectedBatch,
    setSelectedBatch,
    selectedBranch,
    setSelectedBranch,
    createChannelPost,
    likeChannelPost,
    volunteers,
    polls,
    votePoll,
    rollRandomVolunteers,
    clubs,
    toggleClubMembership,
    toggleEventRsvp,
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'channels' | 'clubs' | 'polls'>('channels');

  // New Channel Post Form State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Announcement' | 'Notes' | 'ExamAlert' | 'ChitChat'>('Notes');

  // Filtered channel posts
  const filteredPosts = channelPosts.filter((post) => {
    const matchBatch = selectedBatch === 'All' || post.batch === selectedBatch || post.batch === 'All';
    const matchBranch = selectedBranch === 'All' || post.branch === selectedBranch || post.branch === 'All';
    return matchBatch && matchBranch;
  });

  const handlePostSubmit = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      Alert.alert('Required', 'Please enter a title and content for your post.');
      return;
    }
    createChannelPost({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      fileAttachment: newCategory === 'Notes' ? 'Semester_Reference_Guide.pdf' : undefined,
    });
    setNewTitle('');
    setNewContent('');
    setShowCreateModal(false);
  };

  return (
    <View style={styles.container}>
      <Header onPressProfile={() => setIsProfileOpen(true)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* "Your Circles" Stories Row (Matching Inspo) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>Your Circles</Text>
          <Text style={styles.sectionHeaderMeta}>Live Now</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContainer}
        >
          <StoryCircle
            id="add_story"
            name="Broadcast"
            avatar={user.avatar}
            isAdd
            onPress={() => Alert.alert('Campus Story', 'Upload a 24-hour campus snippet')}
          />
          <StoryCircle
            id="sc_1"
            name="Marina"
            avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
            isOnline
          />
          <StoryCircle
            id="sc_2"
            name="Dev Club"
            avatar="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80"
            isOnline
          />
          <StoryCircle
            id="sc_3"
            name="Arjun"
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
            isOnline
          />
          <StoryCircle
            id="sc_4"
            name="Hostel 4"
            avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80"
            isOnline
          />
          <StoryCircle
            id="sc_5"
            name="Music Guild"
            avatar="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80"
            isOnline
          />
        </ScrollView>

        {/* "Campus on Live" Featured Cards Carousel (Inspo Hero Cards) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>Campus on Live</Text>
          <View style={styles.liveIndicatorBadge}>
            <View style={styles.livePulseDot} />
            <Text style={styles.liveIndicatorText}>3 ACTIVE</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.heroCardsContainer}
        >
          <InspoHeroCard
            id="hero_1"
            title="WINDS OF DESTINY • HACKATHON ARENA"
            authorName="Marina"
            authorSubtitle="119 FOLLOWERS"
            authorAvatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
            imageUri="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
            liveBadgeText="LIVE"
            liveDuration="2m"
            viewersCount="86.54k"
            isLive
          />
          <InspoHeroCard
            id="hero_2"
            title="ACOUSTIC SUNSET CYPHER • AMPHI"
            authorName="The Midnight Jam"
            authorSubtitle="MUSIC GUILD"
            authorAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
            imageUri="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80"
            liveBadgeText="LIVE"
            liveDuration="14m"
            viewersCount="3.8k"
            isLive
          />
          <InspoHeroCard
            id="hero_3"
            title="EXAM CRASH LOCKIN • LIBRARY 3F"
            authorName="Study Council"
            authorSubtitle="ACADEMICS"
            authorAvatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
            imageUri="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80"
            liveBadgeText="LIVE"
            liveDuration="45m"
            viewersCount="1.2k"
            isLive
          />
        </ScrollView>

        {/* Feature Sub-Tabs: Channels / Clubs / Volunteer Pollings */}
        <View style={styles.hubTabRow}>
          <TouchableOpacity
            style={[
              styles.hubTabBtn,
              activeSection === 'channels' && styles.activeHubTabBtn,
            ]}
            onPress={() => setActiveSection('channels')}
          >
            <Radio size={14} color={activeSection === 'channels' ? '#ffffff' : THEME.colors.textMuted} />
            <Text
              style={[
                styles.hubTabBtnText,
                activeSection === 'channels' && styles.activeHubTabText,
              ]}
            >
              Batch & Branch
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.hubTabBtn,
              activeSection === 'clubs' && styles.activeHubTabBtn,
            ]}
            onPress={() => setActiveSection('clubs')}
          >
            <Users size={14} color={activeSection === 'clubs' ? '#ffffff' : THEME.colors.textMuted} />
            <Text
              style={[
                styles.hubTabBtnText,
                activeSection === 'clubs' && styles.activeHubTabText,
              ]}
            >
              Club Directory
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.hubTabBtn,
              activeSection === 'polls' && styles.activeHubTabBtn,
            ]}
            onPress={() => setActiveSection('polls')}
          >
            <Sparkles size={14} color={activeSection === 'polls' ? '#ffffff' : THEME.colors.textMuted} />
            <Text
              style={[
                styles.hubTabBtnText,
                activeSection === 'polls' && styles.activeHubTabText,
              ]}
            >
              Volunteer Polls
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= SECTION 1: BATCH & BRANCH CHANNELS ================= */}
        {activeSection === 'channels' && (
          <View style={styles.channelsWrapper}>
            {/* Filter Row: Batches */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>BATCH:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterPills}>
                {BATCHES.map((b) => (
                  <TouchableOpacity
                    key={b}
                    style={[
                      styles.filterPill,
                      selectedBatch === b && styles.activeFilterPill,
                    ]}
                    onPress={() => setSelectedBatch(b)}
                  >
                    <Text
                      style={[
                        styles.filterPillText,
                        selectedBatch === b && styles.activeFilterPillText,
                      ]}
                    >
                      {b === 'All' ? 'All Batches' : `Class of '${b.slice(2)}`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Filter Row: Branches */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>BRANCH:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterPills}>
                {BRANCHES.map((br) => (
                  <TouchableOpacity
                    key={br}
                    style={[
                      styles.filterPill,
                      selectedBranch === br && styles.activeFilterPill,
                    ]}
                    onPress={() => setSelectedBranch(br)}
                  >
                    <Text
                      style={[
                        styles.filterPillText,
                        selectedBranch === br && styles.activeFilterPillText,
                      ]}
                    >
                      {br}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Create Post Action Bar */}
            <View style={styles.createPostBar}>
              <TouchableOpacity
                style={styles.createPostInputBox}
                onPress={() => setShowCreateModal(true)}
              >
                <FileText size={16} color={THEME.colors.textMuted} />
                <Text style={styles.createPostPlaceholder}>
                  Share notes, announcements or question to {selectedBranch} {selectedBatch}...
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.postSubmitIcon}
                onPress={() => setShowCreateModal(true)}
              >
                <Plus size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Create Post Dialog Modal */}
            {showCreateModal && (
              <View style={styles.createModalCard}>
                <Text style={styles.createModalTitle}>
                  Post to {selectedBranch} ({selectedBatch}) Channel
                </Text>
                <TextInput
                  placeholder="Subject / Topic Title (e.g. OS Midsem Notes)"
                  placeholderTextColor={THEME.colors.textMuted}
                  value={newTitle}
                  onChangeText={setNewTitle}
                  style={styles.inputTitle}
                />
                <TextInput
                  placeholder="Share details, syllabus questions, or drive link..."
                  placeholderTextColor={THEME.colors.textMuted}
                  value={newContent}
                  onChangeText={setNewContent}
                  multiline
                  style={styles.inputContent}
                />
                {/* Category Selector */}
                <View style={styles.catRow}>
                  {(['Notes', 'Announcement', 'ExamAlert', 'ChitChat'] as const).map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.catPill,
                        newCategory === cat && styles.activeCatPill,
                      ]}
                      onPress={() => setNewCategory(cat)}
                    >
                      <Text
                        style={[
                          styles.catPillText,
                          newCategory === cat && styles.activeCatPillText,
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.createActionRow}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => setShowCreateModal(false)}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.publishBtn}
                    onPress={handlePostSubmit}
                  >
                    <Send size={14} color="#ffffff" style={{ marginRight: 6 }} />
                    <Text style={styles.publishBtnText}>Publish</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Channel Posts Feed */}
            {filteredPosts.map((post) => (
              <View key={post.id} style={styles.channelPostCard}>
                <View style={styles.postHeader}>
                  <View style={styles.postMetaLeft}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{post.category}</Text>
                    </View>
                    <Text style={styles.postAuthor}>
                      {post.author} • {post.authorBranch}
                    </Text>
                  </View>
                  <Text style={styles.postTime}>{post.createdAt}</Text>
                </View>

                <Text style={styles.postCardTitle}>{post.title}</Text>
                <Text style={styles.postCardContent}>{post.content}</Text>

                {post.fileAttachment && (
                  <View style={styles.attachmentBox}>
                    <FileText size={16} color="#06b6d4" />
                    <Text style={styles.attachmentName}>{post.fileAttachment}</Text>
                    <Text style={styles.downloadHint}>PDF Verified</Text>
                  </View>
                )}

                <View style={styles.postFooter}>
                  <TouchableOpacity
                    style={styles.likeBtn}
                    onPress={() => likeChannelPost(post.id)}
                  >
                    <Heart size={15} color={THEME.colors.accentFlame} />
                    <Text style={styles.likeCount}>{post.likes}</Text>
                  </TouchableOpacity>
                  <View style={styles.commentMeta}>
                    <MessageCircle size={15} color={THEME.colors.textMuted} />
                    <Text style={styles.commentCount}>
                      {post.commentsCount} comments
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ================= SECTION 2: CLUB SECTIONS ================= */}
        {activeSection === 'clubs' && (
          <View style={styles.clubsWrapper}>
            <View style={styles.clubBanner}>
              <Sparkles size={18} color="#f59e0b" />
              <Text style={styles.clubBannerText}>
                Official Club Channels — No WhatsApp Spam, Verified RSVIPs
              </Text>
            </View>

            {clubs.map((club) => (
              <View key={club.id} style={styles.clubCard}>
                <Image source={{ uri: club.coverImage }} style={styles.clubCover} />
                <LinearGradient
                  colors={['transparent', 'rgba(10, 10, 14, 0.95)']}
                  style={StyleSheet.absoluteFill}
                />

                <View style={styles.clubContentOverlay}>
                  <View style={styles.clubHeadRow}>
                    <Image source={{ uri: club.headAvatar }} style={styles.clubHeadAvatar} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={styles.clubHeadName}>{club.headName}</Text>
                        <ShieldCheck size={14} color="#10b981" />
                      </View>
                      <Text style={styles.clubCategoryTag}>{club.category} Society</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.joinClubBtn,
                        club.isMember && styles.joinedClubBtn,
                      ]}
                      onPress={() => toggleClubMembership(club.id)}
                    >
                      <Text
                        style={[
                          styles.joinClubBtnText,
                          club.isMember && styles.joinedClubBtnText,
                        ]}
                      >
                        {club.isMember ? 'Joined' : '+ Join Club'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.clubName}>{club.name}</Text>
                  <Text style={styles.clubTagline}>{club.tagline}</Text>

                  {/* Club Announcements */}
                  {club.announcements.length > 0 && (
                    <View style={styles.announcementBox}>
                      <Text style={styles.announcementHeading}>Latest Broadcast:</Text>
                      <Text style={styles.announcementTitle}>
                        {club.announcements[0].title}
                      </Text>
                      <Text style={styles.announcementBody}>
                        {club.announcements[0].body}
                      </Text>
                    </View>
                  )}

                  {/* Upcoming Club Events */}
                  <Text style={styles.upcomingEventsHeading}>Upcoming Events & Drives</Text>
                  {club.upcomingEvents.map((event) => (
                    <View key={event.id} style={styles.eventRow}>
                      <View style={styles.eventDateBox}>
                        <Calendar size={14} color="#06b6d4" />
                        <Text style={styles.eventDateText}>{event.date}</Text>
                      </View>
                      <View style={styles.eventDetailsCol}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventVenue}>
                          {event.time} • {event.venue}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.rsvpBtn,
                          event.isRsvpd && styles.rsvpdBtn,
                        ]}
                        onPress={() => toggleEventRsvp(club.id, event.id)}
                      >
                        <CheckCircle
                          size={12}
                          color={event.isRsvpd ? '#10b981' : '#ffffff'}
                          style={{ marginRight: 4 }}
                        />
                        <Text
                          style={[
                            styles.rsvpBtnText,
                            event.isRsvpd && styles.rsvpdBtnText,
                          ]}
                        >
                          {event.isRsvpd ? 'RSVP’d' : 'RSVP'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ================= SECTION 3: RANDOM POLLINGS ================= */}
        {activeSection === 'polls' && (
          <View style={styles.pollsWrapper}>
            {/* Volunteer Spotlight & Lucky Draw Wheel */}
            <View style={styles.volunteerSpotlightCard}>
              <View style={styles.volunteerHeaderRow}>
                <View>
                  <Text style={styles.volunteerCardTitle}>Today's Polling Duty</Text>
                  <Text style={styles.volunteerCardSub}>
                    3-4 student volunteers randomly drafted every 24h
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.rollWheelBtn}
                  onPress={rollRandomVolunteers}
                  activeOpacity={0.8}
                >
                  <Shuffle size={14} color="#f59e0b" style={{ marginRight: 4 }} />
                  <Text style={styles.rollWheelText}>Reroll Draw</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.volunteerRoster}>
                {volunteers.map((vol) => (
                  <View key={vol.id} style={styles.volunteerPill}>
                    <Image source={{ uri: vol.avatar }} style={styles.volAvatar} />
                    <View style={{ marginLeft: 8 }}>
                      <Text style={styles.volName}>{vol.name}</Text>
                      <Text style={styles.volRole}>{vol.branch}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Live Polls */}
            {polls.map((poll) => {
              const hasVoted = Boolean(poll.userVotedOptionId);
              return (
                <View key={poll.id} style={styles.pollCard}>
                  <View style={styles.pollMetaRow}>
                    <Text style={styles.pollVolunteerBy}>{poll.volunteerName}</Text>
                    <Text style={styles.pollTimeRemaining}>
                      ⏳ {poll.expiresInHours}h left
                    </Text>
                  </View>

                  <Text style={styles.pollQuestion}>{poll.question}</Text>

                  {/* Options with Animated Bars */}
                  <View style={styles.optionsList}>
                    {poll.options.map((option) => {
                      const percentage =
                        poll.totalVotes > 0
                          ? Math.round((option.votes / poll.totalVotes) * 100)
                          : 0;
                      const isSelected = poll.userVotedOptionId === option.id;

                      return (
                        <TouchableOpacity
                          key={option.id}
                          style={[
                            styles.optionContainer,
                            isSelected && styles.selectedOptionContainer,
                          ]}
                          onPress={() => votePoll(poll.id, option.id)}
                          disabled={hasVoted}
                          activeOpacity={0.8}
                        >
                          {/* Percentage Fill Bar */}
                          {hasVoted && (
                            <View
                              style={[
                                styles.optionProgressBar,
                                {
                                  width: `${percentage}%`,
                                  backgroundColor: isSelected
                                    ? 'rgba(255, 94, 58, 0.35)'
                                    : 'rgba(255, 255, 255, 0.08)',
                                },
                              ]}
                            />
                          )}

                          <View style={styles.optionContentRow}>
                            <Text
                              style={[
                                styles.optionText,
                                isSelected && styles.selectedOptionText,
                              ]}
                            >
                              {option.text}
                            </Text>
                            {hasVoted && (
                              <Text style={styles.percentageText}>{percentage}%</Text>
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <View style={styles.pollFooter}>
                    <Text style={styles.totalVotesText}>
                      {poll.totalVotes} student votes recorded
                    </Text>
                    {hasVoted && (
                      <View style={styles.votedBadge}>
                        <CheckCircle size={12} color="#10b981" />
                        <Text style={styles.votedBadgeText}>Vote Registered</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modals */}
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
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 18,
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  sectionHeaderMeta: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  liveIndicatorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 94, 58, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 94, 58, 0.3)',
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.accentFlame,
  },
  liveIndicatorText: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.accentFlame,
    letterSpacing: 0.5,
  },
  storiesContainer: {
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 4,
  },
  heroCardsContainer: {
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 4,
  },
  hubTabRow: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  hubTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeHubTabBtn: {
    backgroundColor: 'rgba(255, 94, 58, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255, 94, 58, 0.4)',
  },
  hubTabBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  activeHubTabText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  channelsWrapper: {
    paddingHorizontal: 18,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.textMuted,
    marginRight: 8,
    width: 52,
  },
  filterPills: {
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  activeFilterPill: {
    backgroundColor: 'rgba(255, 94, 58, 0.18)',
    borderColor: THEME.colors.accentFlame,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  activeFilterPillText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  createPostBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 12,
  },
  createPostInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  createPostPlaceholder: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  postSubmitIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: THEME.colors.accentFlame,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createModalCard: {
    backgroundColor: '#151520',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  createModalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  inputTitle: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 13,
    marginBottom: 10,
  },
  inputContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 13,
    height: 70,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  catRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  catPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  activeCatPill: {
    backgroundColor: 'rgba(255, 94, 58, 0.25)',
    borderWidth: 1,
    borderColor: THEME.colors.accentFlame,
  },
  catPillText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  activeCatPillText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  createActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cancelBtnText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  publishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: THEME.colors.accentFlame,
  },
  publishBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  channelPostCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postMetaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#06b6d4',
  },
  postAuthor: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  postCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  postCardContent: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
  },
  attachmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(6, 182, 212, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
  },
  attachmentName: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  downloadHint: {
    fontSize: 9,
    color: '#06b6d4',
    fontWeight: '700',
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  likeCount: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    fontWeight: '600',
  },
  commentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentCount: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  clubsWrapper: {
    paddingHorizontal: 18,
  },
  clubBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  clubBannerText: {
    flex: 1,
    fontSize: 11,
    color: '#f59e0b',
    fontWeight: '600',
  },
  clubCard: {
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: THEME.colors.bgElevated,
    position: 'relative',
    minHeight: 280,
  },
  clubCover: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  clubContentOverlay: {
    padding: 16,
    marginTop: -40,
  },
  clubHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  clubHeadAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: THEME.colors.bgVoid,
  },
  clubHeadName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  clubCategoryTag: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  joinClubBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: THEME.colors.accentFlame,
  },
  joinedClubBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  joinClubBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  joinedClubBtnText: {
    color: THEME.colors.textSecondary,
  },
  clubName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  clubTagline: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginBottom: 12,
    lineHeight: 16,
  },
  announcementBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#06b6d4',
  },
  announcementHeading: {
    fontSize: 9,
    fontWeight: '800',
    color: '#06b6d4',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  announcementTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  announcementBody: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    lineHeight: 14,
  },
  upcomingEventsHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  eventDateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    marginRight: 10,
  },
  eventDateText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#06b6d4',
    marginTop: 2,
  },
  eventDetailsCol: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  eventVenue: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  rsvpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  rsvpdBtn: {
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  rsvpBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  rsvpdBtnText: {
    color: '#10b981',
  },
  pollsWrapper: {
    paddingHorizontal: 18,
  },
  volunteerSpotlightCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  volunteerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  volunteerCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  volunteerCardSub: {
    fontSize: 11,
    color: '#f59e0b',
    marginTop: 2,
  },
  rollWheelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
  },
  rollWheelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#f59e0b',
  },
  volunteerRoster: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  volunteerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  volAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  volName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  volRole: {
    fontSize: 9,
    color: THEME.colors.textMuted,
  },
  pollCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  pollMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pollVolunteerBy: {
    fontSize: 10,
    fontWeight: '700',
    color: '#a855f7',
  },
  pollTimeRemaining: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  pollQuestion: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 20,
    marginBottom: 14,
  },
  optionsList: {
    gap: 8,
  },
  optionContainer: {
    position: 'relative',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  selectedOptionContainer: {
    borderColor: THEME.colors.accentFlame,
  },
  optionProgressBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 12,
  },
  optionContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  selectedOptionText: {
    color: '#ffffff',
    fontWeight: '800',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.accentFlame,
  },
  pollFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  totalVotesText: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  votedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  votedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10b981',
  },
});
