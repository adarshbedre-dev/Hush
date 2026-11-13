import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Compass,
  MapPin,
  Sparkles,
  Coffee,
  Flame,
} from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { THEME } from '../theme/theme';

export const GlassTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.dockWrapper} pointerEvents="box-none">
      <View style={styles.dockContainer}>
        <BlurView intensity={65} tint="dark" style={StyleSheet.absoluteFill} />

        <View style={styles.innerRow}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            // Center Special Icon (Get to Give)
            if (route.name === 'Drop') {
              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  style={styles.centerGemButton}
                  activeOpacity={0.85}
                >
                  <LinearGradient
                    colors={['#ff5e3a', '#a855f7', '#06b6d4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.centerGemGradient}
                  >
                    <View style={styles.centerGemInner}>
                      <Sparkles size={22} color="#ffffff" strokeWidth={2.5} />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }

            // Normal Tab Icons
            let IconComponent = Compass;
            if (route.name === 'Campus') IconComponent = Compass;
            if (route.name === 'HeatMap') IconComponent = MapPin;
            if (route.name === 'TeaSpotted') IconComponent = Coffee;
            if (route.name === 'Streaks') IconComponent = Flame;

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                <View style={[styles.iconBox, isFocused && styles.activeIconBox]}>
                  <IconComponent
                    size={22}
                    color={
                      isFocused
                        ? THEME.colors.textPrimary
                        : 'rgba(255, 255, 255, 0.45)'
                    }
                    strokeWidth={isFocused ? 2.5 : 1.8}
                  />
                  {isFocused && <View style={styles.activeDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dockWrapper: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dockContainer: {
    width: '100%',
    maxWidth: 390,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(18, 18, 24, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  innerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 6,
  },
  activeIconBox: {
    transform: [{ scale: 1.08 }],
  },
  activeDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: THEME.colors.accentFlame,
  },
  centerGemButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  centerGemGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  centerGemInner: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
    backgroundColor: '#0c0c12',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
