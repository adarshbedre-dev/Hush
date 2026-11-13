import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Bell, Check, Sparkles, MessageCircle, Moon, Camera } from 'lucide-react-native';
import { THEME } from '../theme/theme';
import { useApp } from '../context/AppContext';

export const NotificationModal: React.FC = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    markNotificationRead,
    clearAllNotifications,
  } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <MessageCircle size={18} color="#ff5e3a" />;
      case 'drop':
        return <Camera size={18} color="#06b6d4" />;
      case 'tea':
        return <Sparkles size={18} color="#a855f7" />;
      case 'hostel':
        return <Moon size={18} color="#f59e0b" />;
      default:
        return <Bell size={18} color="#ffffff" />;
    }
  };

  return (
    <Modal
      visible={isNotificationOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setIsNotificationOpen(false)}
    >
      <View style={styles.overlay}>
        <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFill} />

        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Bell size={20} color={THEME.colors.accentFlame} />
              <Text style={styles.title}>Campus Alerts</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsNotificationOpen(false)}
              style={styles.closeBtn}
            >
              <X size={18} color={THEME.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <Text style={styles.notifCountText}>
              {notifications.filter((n) => !n.read).length} unread notifications
            </Text>
            <TouchableOpacity onPress={clearAllNotifications}>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          <ScrollView
            style={styles.list}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {notifications.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Check size={36} color={THEME.colors.textMuted} />
                <Text style={styles.emptyText}>All caught up!</Text>
                <Text style={styles.emptySub}>No new alerts right now.</Text>
              </View>
            ) : (
              notifications.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.notifCard,
                    !item.read && styles.unreadNotifCard,
                  ]}
                  onPress={() => markNotificationRead(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.iconCircle}>{getIcon(item.type)}</View>
                  <View style={styles.notifTextCol}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardTime}>{item.timestamp}</Text>
                    </View>
                    <Text style={styles.cardBody}>{item.body}</Text>
                  </View>
                  {!item.read && <View style={styles.blueDot} />}
                </TouchableOpacity>
              ))
            )}
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
    backgroundColor: '#12121a',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  notifCountText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  clearAllText: {
    fontSize: 12,
    color: THEME.colors.accentFlame,
    fontWeight: '700',
  },
  list: {
    marginTop: 4,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  unreadNotifCard: {
    backgroundColor: 'rgba(255, 94, 58, 0.08)',
    borderColor: 'rgba(255, 94, 58, 0.25)',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifTextCol: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  cardTime: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  cardBody: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 16,
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.accentFlame,
    marginLeft: 8,
    marginTop: 6,
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
  },
  emptySub: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    marginTop: 4,
  },
});
