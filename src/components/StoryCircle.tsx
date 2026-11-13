import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { THEME } from '../theme/theme';

interface StoryCircleProps {
  id: string;
  name: string;
  avatar: string;
  isAdd?: boolean;
  isOnline?: boolean;
  onPress?: () => void;
}

export const StoryCircle: React.FC<StoryCircleProps> = ({
  name,
  avatar,
  isAdd = false,
  isOnline = true,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: avatar }} style={styles.squircleImage} />
        {isAdd ? (
          <View style={styles.addBadge}>
            <Plus size={12} color="#ffffff" strokeWidth={3} />
          </View>
        ) : (
          isOnline && <View style={styles.onlineBadge} />
        )}
      </View>
      <Text style={styles.nameText} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 14,
    width: 64,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    padding: 2,
    position: 'relative',
    backgroundColor: THEME.colors.bgElevated,
  },
  squircleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME.colors.onlineGreen,
    borderWidth: 2,
    borderColor: THEME.colors.bgVoid,
  },
  addBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: THEME.colors.accentFlame,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: THEME.colors.bgVoid,
  },
  nameText: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '500',
    color: THEME.colors.textSecondary,
    textAlign: 'center',
  },
});
