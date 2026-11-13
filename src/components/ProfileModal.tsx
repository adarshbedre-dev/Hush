import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  X,
  ShieldCheck,
  RefreshCw,
  MapPin,
  Code,
  GitBranch,
  Sparkles,
  Award,
} from 'lucide-react-native';
import { THEME } from '../theme/theme';
import { useApp } from '../context/AppContext';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose }) => {
  const { user, toggleLocation, regenerateDailyAlias } = useApp();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />

        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Campus Identity</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={18} color={THEME.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 25 }}
          >
            {/* Real Verified Identity Card */}
            <View style={styles.profileCard}>
              <Image source={{ uri: user.avatar }} style={styles.avatarLarge} />
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <View style={styles.verifiedBadge}>
                    <ShieldCheck size={12} color="#10b981" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>
                <Text style={styles.userDept}>
                  {user.department} • Batch {user.batch}
                </Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>

            {/* Daily Anonymous Persona Card (Privacy & Tea Section) */}
            <View style={styles.aliasCard}>
              <View style={styles.aliasHeader}>
                <View style={styles.aliasIconBox}>
                  <Sparkles size={16} color="#a855f7" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.aliasCardTitle}>Daily Anonymous Alias</Text>
                  <Text style={styles.aliasCardSub}>
                    Used in Tea Section & Confessions
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.regenBtn}
                  onPress={regenerateDailyAlias}
                  activeOpacity={0.7}
                >
                  <RefreshCw size={13} color="#a855f7" style={{ marginRight: 4 }} />
                  <Text style={styles.regenBtnText}>Reroll</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.aliasContent}>
                <Image
                  source={{ uri: user.dailyAliasAvatar }}
                  style={styles.aliasAvatar}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.aliasName}>{user.dailyAlias}</Text>
                  <Text style={styles.aliasDesc}>
                    Your verified student email secures your account, but your identity is wiped and randomly assigned daily so past tea is untraceable.
                  </Text>
                </View>
              </View>
            </View>

            {/* Location Privacy Toggle */}
            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingIconBox}>
                  <MapPin
                    size={18}
                    color={
                      user.isLocationEnabled
                        ? THEME.colors.onlineGreen
                        : THEME.colors.textMuted
                    }
                  />
                </View>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={styles.settingTitle}>Broadcast Live Location</Text>
                  <Text style={styles.settingSub}>
                    {user.isLocationEnabled
                      ? 'Live on Campus HeatMap. Zones glow when you check-in.'
                      : 'Ghost Mode Active: You can view the map, but your presence is hidden.'}
                  </Text>
                </View>
                <Switch
                  value={user.isLocationEnabled}
                  onValueChange={toggleLocation}
                  trackColor={{
                    false: '#262633',
                    true: THEME.colors.onlineGreen,
                  }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>

            {/* Coding Profiles Connected */}
            <View style={styles.statsCard}>
              <Text style={styles.statsCardTitle}>Developer & CP Handles</Text>
              <View style={styles.handleRow}>
                <View style={styles.handleItem}>
                  <GitBranch size={16} color="#ffffff" />
                  <Text style={styles.handleLabel}>@{user.githubUsername}</Text>
                </View>
                <View style={styles.handleItem}>
                  <Code size={16} color="#f59e0b" />
                  <Text style={styles.handleLabel}>CF: {user.codeforcesHandle}</Text>
                </View>
              </View>
              <View style={styles.streakNotice}>
                <Award size={14} color="#a855f7" style={{ marginRight: 6 }} />
                <Text style={styles.streakNoticeText}>
                  38-Day CP commit streak linked with GitHub activity
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111118',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: THEME.colors.accentFlame,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10b981',
  },
  userDept: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  userEmail: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  aliasCard: {
    backgroundColor: 'rgba(168, 85, 247, 0.06)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.25)',
  },
  aliasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aliasIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  aliasCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  aliasCardSub: {
    fontSize: 10,
    color: '#a855f7',
  },
  regenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
  },
  regenBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a855f7',
  },
  aliasContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aliasAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)',
  },
  aliasName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#e9d5ff',
    marginBottom: 4,
  },
  aliasDesc: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    lineHeight: 15,
  },
  settingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  settingSub: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    lineHeight: 15,
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statsCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
  },
  handleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  handleItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  handleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  streakNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  streakNoticeText: {
    fontSize: 11,
    color: '#d8b4fe',
    fontWeight: '600',
  },
});
