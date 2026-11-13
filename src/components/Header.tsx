import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Bell, Sparkles } from 'lucide-react-native';
import { THEME } from '../theme/theme';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onPressProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPressProfile }) => {
  const { user, unreadNotifsCount, setIsNotificationOpen } = useApp();

  return (
    <View style={styles.container}>
      {/* Adverse Brand Logo & Star */}
      <View style={styles.brandRow}>
        <View style={styles.starGlowBox}>
          <Sparkles size={20} color="#ff8a00" />
        </View>
        <Text style={styles.brandText}>Adverse</Text>
        <View style={styles.campusBadge}>
          <Text style={styles.campusBadgeText}>CAMPUS</Text>
        </View>
      </View>

      {/* Right Actions: Notifications & Avatar */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsNotificationOpen(true)}
          activeOpacity={0.7}
        >
          <Bell size={20} color={THEME.colors.textPrimary} />
          {unreadNotifsCount > 0 && (
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>
                {unreadNotifsCount > 9 ? '9+' : unreadNotifsCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={onPressProfile}
          activeOpacity={0.8}
        >
          <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
          <View
            style={[
              styles.onlineDot,
              {
                backgroundColor: user.isLocationEnabled
                  ? THEME.colors.onlineGreen
                  : THEME.colors.textMuted,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: THEME.colors.bgVoid,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starGlowBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 138, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 138, 0, 0.28)',
  },
  brandText: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    letterSpacing: -0.5,
  },
  campusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
  },
  campusBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.accentFlame,
    letterSpacing: 0.8,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: THEME.colors.bgGlass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.borderSubtle,
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: THEME.colors.accentFlame,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  notifBadgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: THEME.colors.bgVoid,
  },
});
