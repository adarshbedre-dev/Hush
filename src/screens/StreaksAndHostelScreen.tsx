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
  Flame,
  Moon,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Lock,
  Unlock,
  Send,
  Coffee,
  Code,
  Zap,
  Award,
  BookOpen,
  ShieldCheck,
  CheckCircle,
  ThumbsUp,
  Sparkles,
} from 'lucide-react-native';
import { THEME } from '../theme/theme';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { ProfileModal } from '../components/ProfileModal';
import { NotificationModal } from '../components/NotificationModal';

const { width } = Dimensions.get('window');

export const StreaksAndHostelScreen: React.FC = () => {
  const {
    user,
    streaks,
    badges,
    checkInStreak,
    pomodoro,
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
    setPomodoroMode,
    setAmbientSound,
    isHostelModeLive,
    toggleHostelModeOverride,
    hostelMessages,
    sendHostelMessage,
    isGirlsHostelUnlocked,
    unlockGirlsHostel,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'streaks' | 'hostel'>('streaks');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Hostel Room Sub-filter
  const [hostelRoom, setHostelRoom] = useState<'boys' | 'girls' | 'common'>('boys');
  const [passcodeInput, setPasscodeInput] = useState('');
  const [hostelMsgInput, setHostelMsgInput] = useState('');

  // Pomodoro Formatting
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const pomodoroProgressPercent = Math.round(
    ((pomodoro.totalSeconds - pomodoro.secondsLeft) / pomodoro.totalSeconds) * 100
  );

  const handleSendHostelMsg = () => {
    if (!hostelMsgInput.trim()) return;
    sendHostelMessage(hostelMsgInput.trim(), hostelRoom);
    setHostelMsgInput('');
  };

  const handleGirlsPasscodeSubmit = () => {
    const success = unlockGirlsHostel(passcodeInput.trim());
    if (!success) {
      Alert.alert('Incorrect Passcode', 'Hint for demo: enter "2025" or "hostel"');
    } else {
      setPasscodeInput('');
    }
  };

  const filteredHostelMessages = hostelMessages.filter((m) => m.room === hostelRoom);

  return (
    <View style={styles.container}>
      <Header onPressProfile={() => setIsProfileOpen(true)} />

      {/* Dual Tab Switcher */}
      <View style={styles.tabBarRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'streaks' && styles.activeTabBtn]}
          onPress={() => setActiveTab('streaks')}
        >
          <Flame size={15} color={activeTab === 'streaks' ? '#ff5e3a' : THEME.colors.textMuted} />
          <Text style={[styles.tabBtnText, activeTab === 'streaks' && styles.activeTabBtnText]}>
            Streaks & Pomodoro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'hostel' && styles.activeTabBtn]}
          onPress={() => setActiveTab('hostel')}
        >
          <Moon size={15} color={activeTab === 'hostel' ? '#a855f7' : THEME.colors.textMuted} />
          <Text style={[styles.tabBtnText, activeTab === 'hostel' && styles.activeTabBtnText]}>
            Hostel Mode (12-4 AM)
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= SECTION 1: STREAKS & POMODORO ================= */}
        {activeTab === 'streaks' && (
          <View style={styles.streaksWrapper}>
            {/* IN-APP POMODORO STUDY LOCK-IN TIMER */}
            <View style={styles.pomodoroCard}>
              <LinearGradient
                colors={['rgba(59, 130, 246, 0.15)', 'rgba(168, 85, 247, 0.08)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.pomodoroHeaderRow}>
                <View>
                  <Text style={styles.pomodoroTitle}>Study Lock-in Pomodoro</Text>
                  <Text style={styles.pomodoroSub}>
                    Focus sessions build your Library Resident streak
                  </Text>
                </View>
                <View style={styles.completedBadge}>
                  <Text style={styles.completedBadgeText}>
                    {pomodoro.sessionsCompleted} Cycles Done
                  </Text>
                </View>
              </View>

              {/* Mode Switch (Study vs Break) */}
              <View style={styles.pomodoroModeRow}>
                <TouchableOpacity
                  style={[
                    styles.modePill,
                    pomodoro.mode === 'study' && styles.activeModePill,
                  ]}
                  onPress={() => setPomodoroMode('study')}
                >
                  <Text
                    style={[
                      styles.modePillText,
                      pomodoro.mode === 'study' && styles.activeModePillText,
                    ]}
                  >
                    Lock-in (25m)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modePill,
                    pomodoro.mode === 'break' && styles.activeModePill,
                  ]}
                  onPress={() => setPomodoroMode('break')}
                >
                  <Text
                    style={[
                      styles.modePillText,
                      pomodoro.mode === 'break' && styles.activeModePillText,
                    ]}
                  >
                    Short Break (5m)
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Circular Clock Indicator */}
              <View style={styles.timerClockContainer}>
                <View style={styles.timerOuterRing}>
                  <Text style={styles.timerDigits}>
                    {formatTime(pomodoro.secondsLeft)}
                  </Text>
                  <Text style={styles.timerModeLabel}>
                    {pomodoro.mode === 'study' ? 'DEEP FOCUS' : 'CHILL BREAK'}
                  </Text>
                  <Text style={styles.timerPercentText}>
                    {pomodoroProgressPercent}% COMPLETE
                  </Text>
                </View>
              </View>

              {/* Timer Controls */}
              <View style={styles.timerControlRow}>
                <TouchableOpacity
                  style={styles.timerResetBtn}
                  onPress={resetPomodoro}
                >
                  <RotateCcw size={16} color={THEME.colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.timerPlayBtn}
                  onPress={pomodoro.isRunning ? pausePomodoro : startPomodoro}
                  activeOpacity={0.8}
                >
                  {pomodoro.isRunning ? (
                    <Pause size={20} color="#ffffff" />
                  ) : (
                    <Play size={20} color="#ffffff" style={{ marginLeft: 3 }} />
                  )}
                </TouchableOpacity>

                {/* Ambient Focus Sounds Toggle */}
                <TouchableOpacity
                  style={styles.soundToggleBtn}
                  onPress={() => {
                    const soundOptions: Array<'none' | 'rain' | 'library' | 'whitenoise'> = [
                      'none',
                      'rain',
                      'library',
                      'whitenoise',
                    ];
                    const nextIndex =
                      (soundOptions.indexOf(pomodoro.ambientSound) + 1) %
                      soundOptions.length;
                    setAmbientSound(soundOptions[nextIndex]);
                  }}
                >
                  <Volume2 size={16} color="#06b6d4" />
                  <Text style={styles.soundToggleText}>
                    {pomodoro.ambientSound === 'none'
                      ? 'Mute'
                      : pomodoro.ambientSound === 'rain'
                      ? 'Lofi Rain'
                      : pomodoro.ambientSound === 'library'
                      ? 'Library Ambience'
                      : 'White Noise'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* STREAKS CARDS (Bunk, Canteen, Study, Sports, Coding) */}
            <Text style={styles.sectionHeading}>Active Streak Records</Text>
            <View style={styles.streaksGrid}>
              {streaks.map((item) => (
                <View key={item.id} style={styles.streakCard}>
                  <View style={styles.streakTopRow}>
                    <View
                      style={[
                        styles.streakIconCircle,
                        { backgroundColor: `${item.badgeColor}20` },
                      ]}
                    >
                      <Flame size={18} color={item.badgeColor} />
                    </View>
                    <View style={styles.streakCounterPill}>
                      <Text style={styles.streakCountNumber}>{item.count}</Text>
                      <Text style={styles.streakDaysLabel}>DAYS</Text>
                    </View>
                  </View>

                  <Text style={styles.streakTitle}>{item.title}</Text>
                  <Text style={styles.streakLastCheckin}>
                    Last: {item.lastCheckedIn}
                  </Text>

                  <View
                    style={[
                      styles.streakBadgeTag,
                      { borderColor: item.badgeColor },
                    ]}
                  >
                    <Award size={10} color={item.badgeColor} />
                    <Text
                      style={[
                        styles.streakBadgeText,
                        { color: item.badgeColor },
                      ]}
                    >
                      {item.badgeName}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.checkinBtn}
                    onPress={() => checkInStreak(item.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.checkinBtnText}>+ Check In Today</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* CODING STREAK & GITHUB COMMIT MATRIX */}
            <View style={styles.codingMatrixCard}>
              <View style={styles.codingHeaderRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Code size={18} color="#a855f7" />
                  <Text style={styles.codingTitle}>Plugged CP & GitHub Matrix</Text>
                </View>
                <Text style={styles.codingHandleText}>@{user.githubUsername}</Text>
              </View>

              <View style={styles.cpMetricsRow}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Codeforces</Text>
                  <Text style={styles.metricValue}>1490 (Specialist)</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>LeetCode Solved</Text>
                  <Text style={styles.metricValue}>324 Problems</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Active Streak</Text>
                  <Text style={styles.metricValue}>38 Days 🔥</Text>
                </View>
              </View>

              {/* 5x7 Commit Heatmap Matrix Simulation */}
              <Text style={styles.matrixLabel}>Commit & Submission Heatmap (Last 35 Days):</Text>
              <View style={styles.matrixGrid}>
                {Array.from({ length: 35 }).map((_, i) => {
                  const intensity = (i * 7 + 3) % 4;
                  const bgColors = [
                    'rgba(255, 255, 255, 0.05)',
                    'rgba(168, 85, 247, 0.3)',
                    'rgba(168, 85, 247, 0.65)',
                    '#a855f7',
                  ];
                  return (
                    <View
                      key={i}
                      style={[
                        styles.matrixCell,
                        { backgroundColor: bgColors[intensity] },
                      ]}
                    />
                  );
                })}
              </View>
            </View>

            {/* BADGES SHOWCASE */}
            <Text style={styles.sectionHeading}>Badges & Trophies Awarded</Text>
            <View style={styles.badgesWrapper}>
              {badges.map((b) => (
                <View key={b.id} style={styles.badgeCard}>
                  <Text style={styles.badgeEmoji}>{b.icon}</Text>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={styles.badgeName}>{b.name}</Text>
                      <View style={styles.tierTag}>
                        <Text style={styles.tierTagText}>Tier {b.tier}</Text>
                      </View>
                    </View>
                    <Text style={styles.badgeDesc}>{b.description}</Text>
                  </View>
                  <CheckCircle size={16} color="#10b981" />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ================= SECTION 2: HOSTEL MODE (12-4 AM) ================= */}
        {activeTab === 'hostel' && (
          <View style={styles.hostelWrapper}>
            {/* Hostel Ambient Alert Banner */}
            <View style={styles.hostelBanner}>
              <LinearGradient
                colors={['rgba(168, 85, 247, 0.2)', 'rgba(59, 130, 246, 0.15)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.hostelBannerContent}>
                <View style={styles.hostelTitleRow}>
                  <Moon size={18} color="#c084fc" />
                  <Text style={styles.hostelMainTitle}>HOSTEL MODE ACTIVE</Text>
                  <View style={styles.curfewBadge}>
                    <Text style={styles.curfewText}>12 AM - 4 AM</Text>
                  </View>
                </View>
                <Text style={styles.hostelDestructText}>
                  ⚠️ All media & texts self-destruct automatically at 8:00 AM!
                </Text>

                {/* Demo Override Toggle */}
                <View style={styles.overrideRow}>
                  <Text style={styles.overrideLabel}>
                    Live Curfew Clock Simulation:
                  </Text>
                  <TouchableOpacity
                    style={styles.overrideBtn}
                    onPress={toggleHostelModeOverride}
                  >
                    <Text style={styles.overrideBtnText}>
                      {isHostelModeLive ? 'Night Active 🌙' : 'Day Mode ☀️'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Hostel Room Switcher */}
            <View style={styles.roomSwitcherRow}>
              <TouchableOpacity
                style={[
                  styles.roomTab,
                  hostelRoom === 'boys' && styles.activeRoomTab,
                ]}
                onPress={() => setHostelRoom('boys')}
              >
                <Text
                  style={[
                    styles.roomTabText,
                    hostelRoom === 'boys' && styles.activeRoomTabText,
                  ]}
                >
                  🔵 Boys Hostel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roomTab,
                  hostelRoom === 'girls' && styles.activeRoomTab,
                ]}
                onPress={() => setHostelRoom('girls')}
              >
                <Text
                  style={[
                    styles.roomTabText,
                    hostelRoom === 'girls' && styles.activeRoomTabText,
                  ]}
                >
                  🟣 Girls Hostel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roomTab,
                  hostelRoom === 'common' && styles.activeRoomTab,
                ]}
                onPress={() => setHostelRoom('common')}
              >
                <Text
                  style={[
                    styles.roomTabText,
                    hostelRoom === 'common' && styles.activeRoomTabText,
                  ]}
                >
                  🟢 Common Lounge
                </Text>
              </TouchableOpacity>
            </View>

            {/* Girls Hostel Security Passcode Lock */}
            {hostelRoom === 'girls' && !isGirlsHostelUnlocked ? (
              <View style={styles.passcodeLockCard}>
                <Lock size={32} color="#a855f7" />
                <Text style={styles.lockHeading}>Girls Hostel Protected Lounge</Text>
                <Text style={styles.lockSub}>
                  Enter residents passcode to unlock verified room discussions.
                </Text>
                <View style={styles.passcodeInputRow}>
                  <TextInput
                    placeholder="Enter resident code (demo: '2025')"
                    placeholderTextColor={THEME.colors.textMuted}
                    value={passcodeInput}
                    onChangeText={setPasscodeInput}
                    secureTextEntry
                    style={styles.passcodeField}
                  />
                  <TouchableOpacity
                    style={styles.unlockBtn}
                    onPress={handleGirlsPasscodeSubmit}
                  >
                    <Text style={styles.unlockBtnText}>Unlock</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              /* Hostel Messages Stream */
              <View style={styles.hostelFeed}>
                {filteredHostelMessages.map((msg) => (
                  <View key={msg.id} style={styles.hostelMsgCard}>
                    <View style={styles.hostelMsgHeader}>
                      <Image
                        source={{ uri: msg.authorAvatar }}
                        style={styles.hostelAuthorAvatar}
                      />
                      <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={styles.hostelAuthorName}>{msg.authorAlias}</Text>
                        <Text style={styles.hostelMsgTime}>{msg.timestamp}</Text>
                      </View>
                      <View style={styles.destructTag}>
                        <Clock size={10} color="#ff5e3a" />
                        <Text style={styles.destructTagText}>Wipes @ 8 AM</Text>
                      </View>
                    </View>

                    <Text style={styles.hostelMsgBody}>{msg.text}</Text>

                    <View style={styles.hostelMsgFooter}>
                      <TouchableOpacity style={styles.upvoteBtn}>
                        <ThumbsUp size={12} color={THEME.colors.accentFlame} />
                        <Text style={styles.upvoteCount}>{msg.upvotes}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Send Hostel Message Bar */}
                <View style={styles.hostelInputBar}>
                  <TextInput
                    placeholder={`Whisper in ${hostelRoom} hostel (wiped at 8 AM)...`}
                    placeholderTextColor={THEME.colors.textMuted}
                    value={hostelMsgInput}
                    onChangeText={setHostelMsgInput}
                    style={styles.hostelTextInput}
                  />
                  <TouchableOpacity
                    style={styles.hostelSendBtn}
                    onPress={handleSendHostelMsg}
                  >
                    <Send size={14} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
  streaksWrapper: {
    gap: 16,
  },
  pomodoroCard: {
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    overflow: 'hidden',
  },
  pomodoroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pomodoroTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  pomodoroSub: {
    fontSize: 10,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  completedBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  completedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#60a5fa',
  },
  pomodoroModeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  modePill: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
  },
  activeModePill: {
    backgroundColor: '#3b82f6',
  },
  modePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  activeModePillText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  timerClockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  timerOuterRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 3,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  timerDigits: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
  },
  timerModeLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#60a5fa',
    letterSpacing: 1,
    marginTop: 2,
  },
  timerPercentText: {
    fontSize: 8,
    color: THEME.colors.textMuted,
    marginTop: 4,
  },
  timerControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 10,
  },
  timerResetBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerPlayBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: THEME.colors.accentFlame,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  soundToggleText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#06b6d4',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 4,
  },
  streaksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  streakCard: {
    width: (width - 46) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  streakTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  streakIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakCounterPill: {
    alignItems: 'flex-end',
  },
  streakCountNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  streakDaysLabel: {
    fontSize: 8,
    color: THEME.colors.textMuted,
    fontWeight: '700',
  },
  streakTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  streakLastCheckin: {
    fontSize: 9,
    color: THEME.colors.textMuted,
    marginBottom: 8,
  },
  streakBadgeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  streakBadgeText: {
    fontSize: 8,
    fontWeight: '700',
  },
  checkinBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkinBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  codingMatrixCard: {
    backgroundColor: 'rgba(168, 85, 247, 0.06)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.25)',
  },
  codingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  codingTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  codingHandleText: {
    fontSize: 11,
    color: '#c084fc',
    fontWeight: '600',
  },
  cpMetricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 8,
    borderRadius: 10,
  },
  metricLabel: {
    fontSize: 9,
    color: THEME.colors.textMuted,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  matrixLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginBottom: 8,
  },
  matrixGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  matrixCell: {
    width: (width - 76) / 7,
    height: 14,
    borderRadius: 3,
  },
  badgesWrapper: {
    gap: 8,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  badgeEmoji: {
    fontSize: 24,
  },
  badgeName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  tierTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  tierTagText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#ffffff',
  },
  badgeDesc: {
    fontSize: 10,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  hostelWrapper: {
    gap: 14,
  },
  hostelBanner: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.35)',
    overflow: 'hidden',
  },
  hostelBannerContent: {
    gap: 6,
  },
  hostelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hostelMainTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  curfewBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  curfewText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#c084fc',
  },
  hostelDestructText: {
    fontSize: 11,
    color: '#fca5a5',
    lineHeight: 15,
  },
  overrideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  overrideLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  overrideBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  overrideBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  roomSwitcherRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 14,
    padding: 4,
  },
  roomTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeRoomTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  roomTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  activeRoomTabText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  passcodeLockCard: {
    backgroundColor: 'rgba(168, 85, 247, 0.08)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.25)',
  },
  lockHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 12,
  },
  lockSub: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  passcodeInputRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  passcodeField: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 12,
  },
  unlockBtn: {
    backgroundColor: '#a855f7',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  unlockBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  hostelFeed: {
    gap: 10,
  },
  hostelMsgCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
  },
  hostelMsgHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hostelAuthorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  hostelAuthorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  hostelMsgTime: {
    fontSize: 9,
    color: THEME.colors.textMuted,
  },
  destructTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 94, 58, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  destructTagText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#ff5e3a',
  },
  hostelMsgBody: {
    fontSize: 13,
    color: '#ffffff',
    lineHeight: 18,
    marginBottom: 8,
  },
  hostelMsgFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  upvoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  upvoteCount: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  hostelInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  hostelTextInput: {
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
  hostelSendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#a855f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
