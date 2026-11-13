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
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Camera,
  Lock,
  Unlock,
  Clock,
  Sparkles,
  RefreshCw,
  Send,
  Flame,
  AlertCircle,
  CheckCircle,
} from 'lucide-react-native';
import { THEME } from '../theme/theme';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { ProfileModal } from '../components/ProfileModal';
import { NotificationModal } from '../components/NotificationModal';

const { width } = Dimensions.get('window');
const POST_IMAGE_WIDTH = width - 36;

export const GetToGiveScreen: React.FC = () => {
  const {
    user,
    drops,
    hasUserDropped,
    isDropWindowActive,
    dropTimeRemainingSec,
    submitDrop,
    reactToDrop,
    triggerRandomDrop,
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [cameraMode, setCameraMode] = useState<'front' | 'back'>('back');
  const [snappedImages, setSnappedImages] = useState<{ front: string; back: string } | null>(null);

  // Pre-loaded realistic dual snaps
  const DUAL_PRESETS = [
    {
      back: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80',
      front: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    },
    {
      back: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=700&auto=format&fit=crop&q=80',
      front: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const handleSnap = () => {
    const preset = DUAL_PRESETS[Math.floor(Math.random() * DUAL_PRESETS.length)];
    setSnappedImages(preset);
  };

  const handlePublishDrop = () => {
    if (!snappedImages) {
      Alert.alert('Snap Required', 'Please snap your dual photo before uploading!');
      return;
    }
    submitDrop(
      snappedImages.front,
      snappedImages.back,
      caption.trim() || 'Right now in campus lock-in mode 🚀'
    );
    setSnappedImages(null);
    setCaption('');
  };

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Header onPressProfile={() => setIsProfileOpen(true)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Drop Window Header Alert */}
        <View style={styles.alertCard}>
          <LinearGradient
            colors={['rgba(255, 94, 58, 0.18)', 'rgba(168, 85, 247, 0.12)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.alertContent}>
            <View style={styles.alertLeft}>
              <View style={styles.timerCircle}>
                <Clock size={16} color={THEME.colors.accentFlame} />
              </View>
              <View>
                <Text style={styles.alertTitle}>GET TO GIVE DROP IS LIVE</Text>
                <Text style={styles.alertSubtitle}>
                  {isDropWindowActive
                    ? `Time remaining: ${formatTimer(dropTimeRemainingSec)}`
                    : 'Random drop active!'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.randomTriggerBtn}
              onPress={triggerRandomDrop}
              activeOpacity={0.8}
            >
              <RefreshCw size={12} color="#ffffff" style={{ marginRight: 4 }} />
              <Text style={styles.randomTriggerText}>New Drop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dual Camera Viewfinder (If User hasn't posted or wants to post new) */}
        <View style={styles.cameraBox}>
          <View style={styles.viewfinderFrame}>
            {snappedImages ? (
              <View style={styles.dualPreviewContainer}>
                {/* Primary Photo */}
                <Image
                  source={{ uri: snappedImages.back }}
                  style={styles.primaryPhoto}
                />
                {/* Secondary Picture-in-Picture */}
                <View style={styles.pipPhotoWrapper}>
                  <Image
                    source={{ uri: snappedImages.front }}
                    style={styles.pipPhoto}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.cameraStandby}>
                <Camera size={44} color="rgba(255, 255, 255, 0.4)" />
                <Text style={styles.cameraStandbyText}>
                  Dual Viewfinder Active
                </Text>
                <Text style={styles.cameraStandbySub}>
                  Simultaneous Front & Back Campus Capture
                </Text>
              </View>
            )}

            {/* Shutter / Retake Controls */}
            <View style={styles.cameraControlsBar}>
              {snappedImages ? (
                <TouchableOpacity
                  style={styles.retakeBtn}
                  onPress={() => setSnappedImages(null)}
                >
                  <Text style={styles.retakeBtnText}>Retake</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.shutterBtn}
                  onPress={handleSnap}
                  activeOpacity={0.85}
                >
                  <View style={styles.shutterInnerRing}>
                    <Camera size={24} color="#ffffff" />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Caption Input & Post Button */}
          {snappedImages && (
            <View style={styles.captionBox}>
              <TextInput
                placeholder="What are you doing right now? (e.g. Canteen chai...)"
                placeholderTextColor={THEME.colors.textMuted}
                value={caption}
                onChangeText={setCaption}
                style={styles.captionInput}
              />
              <TouchableOpacity
                style={styles.publishBtn}
                onPress={handlePublishDrop}
                activeOpacity={0.8}
              >
                <Send size={14} color="#ffffff" style={{ marginRight: 6 }} />
                <Text style={styles.publishBtnText}>Post to Unlock</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ================= LOCKED VS UNLOCKED FEED ================= */}
        {!hasUserDropped ? (
          /* Locked State Preview */
          <View style={styles.lockedGateCard}>
            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.lockIconBox}>
              <Lock size={32} color={THEME.colors.accentFlame} />
            </View>
            <Text style={styles.lockTitle}>Campus Feed is Locked</Text>
            <Text style={styles.lockSub}>
              "Get to Give" rule: To view your friends' candid photos and what everyone is doing right now, you must post your own instant snapshot first!
            </Text>
            <TouchableOpacity
              style={styles.unlockCTA}
              onPress={handleSnap}
              activeOpacity={0.8}
            >
              <Camera size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.unlockCTAText}>Snap Photo to Unlock</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Unlocked Feed State */
          <View style={styles.feedWrapper}>
            <View style={styles.unlockedHeader}>
              <CheckCircle size={16} color="#10b981" />
              <Text style={styles.unlockedHeaderText}>
                Feed Unlocked! You shared today's drop.
              </Text>
            </View>

            {drops.map((drop) => {
              return (
                <View key={drop.id} style={styles.dropCard}>
                  {/* Author Header */}
                  <View style={styles.dropAuthorRow}>
                    <Image
                      source={{ uri: drop.authorAvatar }}
                      style={styles.dropAuthorAvatar}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.dropAuthorName}>{drop.authorName}</Text>
                      <Text style={styles.dropAuthorDept}>{drop.department}</Text>
                    </View>
                    <View style={styles.postedAtTag}>
                      <Clock size={10} color={THEME.colors.textMuted} style={{ marginRight: 4 }} />
                      <Text style={styles.postedAtText}>{drop.postedAt}</Text>
                    </View>
                  </View>

                  {/* Dual Photos Container */}
                  <View style={styles.dualPhotoDisplay}>
                    <Image
                      source={{ uri: drop.frontImage }}
                      style={styles.mainFeedPhoto}
                    />
                    {/* Picture in picture back photo */}
                    <View style={styles.pipFeedWrapper}>
                      <Image
                        source={{ uri: drop.backImage }}
                        style={styles.pipFeedPhoto}
                      />
                    </View>
                  </View>

                  {/* Caption */}
                  <Text style={styles.dropCaption}>{drop.caption}</Text>

                  {/* Reaction Bar */}
                  <View style={styles.reactionBar}>
                    {(['🔥', '💀', '☕', '🚀'] as const).map((emoji) => {
                      const count = drop.reactions[emoji] || 0;
                      const hasReacted = drop.userReaction === emoji;

                      return (
                        <TouchableOpacity
                          key={emoji}
                          style={[
                            styles.reactionPill,
                            hasReacted && styles.activeReactionPill,
                          ]}
                          onPress={() => reactToDrop(drop.id, emoji)}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.reactionEmoji}>{emoji}</Text>
                          {count > 0 && (
                            <Text
                              style={[
                                styles.reactionCount,
                                hasReacted && styles.activeReactionCount,
                              ]}
                            >
                              {count}
                            </Text>
                          )}
                        </TouchableOpacity>
                      );
                    })}
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
    paddingHorizontal: 18,
  },
  alertCard: {
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 94, 58, 0.3)',
    overflow: 'hidden',
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  alertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timerCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 94, 58, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  alertSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.accentFlame,
    marginTop: 2,
  },
  randomTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  randomTriggerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  cameraBox: {
    marginBottom: 20,
  },
  viewfinderFrame: {
    height: 320,
    borderRadius: 24,
    backgroundColor: '#101018',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraStandby: {
    alignItems: 'center',
  },
  cameraStandbyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
  },
  cameraStandbySub: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 4,
  },
  dualPreviewContainer: {
    ...StyleSheet.absoluteFill,
  },
  primaryPhoto: {
    ...StyleSheet.absoluteFill,
    resizeMode: 'cover',
  },
  pipPhotoWrapper: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 90,
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  pipPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cameraControlsBar: {
    position: 'absolute',
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  shutterBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  shutterInnerRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.accentFlame,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  retakeBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  captionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  captionInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  publishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.accentFlame,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  publishBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  lockedGateCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 10,
    overflow: 'hidden',
  },
  lockIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 94, 58, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  lockTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  lockSub: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  unlockCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.accentFlame,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  unlockCTAText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  feedWrapper: {
    gap: 16,
  },
  unlockedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  unlockedHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10b981',
  },
  dropCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  dropAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dropAuthorAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dropAuthorName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  dropAuthorDept: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  postedAtTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  postedAtText: {
    fontSize: 9,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  dualPhotoDisplay: {
    height: 340,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
  },
  mainFeedPhoto: {
    ...StyleSheet.absoluteFill,
    resizeMode: 'cover',
  },
  pipFeedWrapper: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 85,
    height: 115,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  pipFeedPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dropCaption: {
    fontSize: 13,
    color: '#ffffff',
    lineHeight: 18,
    marginBottom: 12,
  },
  reactionBar: {
    flexDirection: 'row',
    gap: 8,
  },
  reactionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeReactionPill: {
    backgroundColor: 'rgba(255, 94, 58, 0.25)',
    borderWidth: 1,
    borderColor: THEME.colors.accentFlame,
  },
  reactionEmoji: {
    fontSize: 14,
  },
  reactionCount: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  activeReactionCount: {
    color: '#ffffff',
  },
});
