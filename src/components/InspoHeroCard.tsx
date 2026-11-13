import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Users, Eye } from 'lucide-react-native';
import { THEME } from '../theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.58;

interface InspoHeroCardProps {
  id: string;
  title: string;
  authorName: string;
  authorSubtitle: string;
  authorAvatar: string;
  imageUri: string;
  liveBadgeText?: string;
  liveDuration?: string;
  viewersCount?: string;
  isLive?: boolean;
  onPress?: () => void;
  onFollow?: () => void;
}

export const InspoHeroCard: React.FC<InspoHeroCardProps> = ({
  title,
  authorName,
  authorSubtitle,
  authorAvatar,
  imageUri,
  liveBadgeText = 'LIVE',
  liveDuration = '2m',
  viewersCount = '4.2k',
  isLive = true,
  onPress,
  onFollow,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = (e: any) => {
    e.stopPropagation?.();
    setIsFollowing((prev) => !prev);
    onFollow?.();
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Background Image */}
      <Image source={{ uri: imageUri }} style={styles.backgroundImage} />

      {/* Gradient Vignette */}
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.4)',
          'transparent',
          'rgba(8, 8, 10, 0.65)',
          'rgba(8, 8, 10, 0.95)',
        ]}
        locations={[0, 0.35, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Top Frosted Chip */}
      <View style={styles.topChipWrapper}>
        <BlurView intensity={35} tint="dark" style={styles.topChip}>
          <Image source={{ uri: authorAvatar }} style={styles.authorAvatar} />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName} numberOfLines={1}>
              {authorName}
            </Text>
            <Text style={styles.authorSub} numberOfLines={1}>
              {authorSubtitle}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.followButton,
              isFollowing && styles.followingButton,
            ]}
            onPress={handleFollow}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.followButtonText,
                isFollowing && styles.followingButtonText,
              ]}
            >
              {isFollowing ? 'Joined' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </BlurView>
      </View>

      {/* Bottom Content & Live Pill */}
      <View style={styles.bottomContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {title}
        </Text>

        {/* Live Status Row */}
        {isLive && (
          <View style={styles.liveBadgeRow}>
            <View style={styles.liveTag}>
              <Text style={styles.liveTagText}>{liveBadgeText}</Text>
            </View>
            <View style={styles.liveDot} />
            <Text style={styles.liveMetaText}>{liveDuration}</Text>
            <View style={styles.liveDot} />
            <View style={styles.viewersCountRow}>
              <Eye size={12} color="#ffffff" style={{ marginRight: 3 }} />
              <Text style={styles.liveMetaText}>{viewersCount}</Text>
            </View>
            <View style={styles.avatarStackPill}>
              <Text style={styles.avatarStackText}>+15</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderRadius: 24,
    marginRight: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: THEME.colors.bgElevated,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
    resizeMode: 'cover',
  },
  topChipWrapper: {
    padding: 10,
  },
  topChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  authorInfo: {
    flex: 1,
    marginLeft: 8,
    marginRight: 6,
  },
  authorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  authorSub: {
    fontSize: 9,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.65)',
    marginTop: 1,
  },
  followButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 200, 0, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 200, 0, 0.4)',
  },
  followingButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  followButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffd000',
  },
  followingButtonText: {
    color: '#ffffff',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 10,
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  liveTag: {
    backgroundColor: THEME.colors.accentFlame,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  liveTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  liveDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 6,
  },
  liveMetaText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  viewersCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStackPill: {
    marginLeft: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  avatarStackText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#ffffff',
  },
});
