import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  MapPin,
  Flame,
  Radio,
  EyeOff,
  Navigation,
  Compass,
  Zap,
  Coffee,
  BookOpen,
  Laptop,
  Moon,
} from 'lucide-react-native';
import { THEME } from '../theme/theme';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { ProfileModal } from '../components/ProfileModal';
import { NotificationModal } from '../components/NotificationModal';
import { CampusZone } from '../types';

const { width } = Dimensions.get('window');
const MAP_HEIGHT = 300;

export const HeatMapScreen: React.FC = () => {
  const {
    user,
    zones,
    selectedZone,
    setSelectedZone,
    spawnInZone,
    toggleLocation,
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Study':
        return <BookOpen size={16} color="#3b82f6" />;
      case 'Food':
        return <Coffee size={16} color="#ff5e3a" />;
      case 'Tech':
        return <Laptop size={16} color="#10b981" />;
      case 'Living':
        return <Moon size={16} color="#ff2a6d" />;
      default:
        return <Zap size={16} color="#f59e0b" />;
    }
  };

  const currentZone = zones.find((z) => z.id === user.currentZoneId) || selectedZone;

  return (
    <View style={styles.container}>
      <Header onPressProfile={() => setIsProfileOpen(true)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Control: Location On/Off Switch */}
        <View style={styles.privacyBanner}>
          <View style={styles.privacyLeft}>
            <View
              style={[
                styles.privacyIconCircle,
                {
                  backgroundColor: user.isLocationEnabled
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(255, 255, 255, 0.08)',
                },
              ]}
            >
              {user.isLocationEnabled ? (
                <Radio size={16} color={THEME.colors.onlineGreen} />
              ) : (
                <EyeOff size={16} color={THEME.colors.textMuted} />
              )}
            </View>
            <View>
              <Text style={styles.privacyTitle}>
                {user.isLocationEnabled
                  ? 'Location Broadcasting: ON'
                  : 'Ghost Mode: Active'}
              </Text>
              <Text style={styles.privacySub}>
                {user.isLocationEnabled
                  ? 'Zones glow when students spawn in real-time'
                  : 'You can explore the heatmap, but your avatar is hidden'}
              </Text>
            </View>
          </View>
          <Switch
            value={user.isLocationEnabled}
            onValueChange={toggleLocation}
            trackColor={{
              false: '#22222e',
              true: THEME.colors.onlineGreen,
            }}
            thumbColor="#ffffff"
          />
        </View>

        {/* Radar Graphic Campus HeatMap Container */}
        <View style={styles.mapCard}>
          {/* Map Grid Pattern / Radar Lines */}
          <View style={styles.radarBackground}>
            <View style={styles.radarRing1} />
            <View style={styles.radarRing2} />
            <View style={styles.radarRing3} />
            <View style={styles.radarCrossX} />
            <View style={styles.radarCrossY} />
          </View>

          {/* Map Header Overlay */}
          <View style={styles.mapHeaderOverlay}>
            <View style={styles.liveBadge}>
              <Flame size={12} color="#ff5e3a" />
              <Text style={styles.liveBadgeText}>LIVE SATELLITE RADAR</Text>
            </View>
            <Text style={styles.activeSumText}>
              {zones.reduce((acc, z) => acc + z.activeStudents, 0)} Students Active
            </Text>
          </View>

          {/* Campus Zones Plotted on Radar with Glow */}
          {zones.map((zone) => {
            const isSelected = selectedZone?.id === zone.id;
            const isUserHere = user.isLocationEnabled && user.currentZoneId === zone.id;

            return (
              <TouchableOpacity
                key={zone.id}
                style={[
                  styles.zoneBeacon,
                  {
                    left: `${zone.coordinates.x}%`,
                    top: `${zone.coordinates.y}%`,
                  },
                ]}
                onPress={() => setSelectedZone(zone)}
                activeOpacity={0.8}
              >
                {/* Outer Glow Halo Ring */}
                <View
                  style={[
                    styles.beaconHalo,
                    {
                      borderColor: zone.glowColor,
                      backgroundColor: `${zone.glowColor}22`,
                      transform: [{ scale: isSelected ? 1.4 : 1 }],
                    },
                  ]}
                />

                {/* Center Beacon Pin */}
                <View
                  style={[
                    styles.beaconPin,
                    {
                      backgroundColor: zone.glowColor,
                      borderColor: isSelected ? '#ffffff' : zone.glowColor,
                    },
                  ]}
                >
                  <Text style={styles.beaconStudentCount}>
                    {zone.activeStudents}
                  </Text>
                </View>

                {/* User Spawn Indicator */}
                {isUserHere && (
                  <View style={styles.userMarkerPill}>
                    <Navigation size={8} color="#ffffff" />
                    <Text style={styles.userMarkerText}>YOU</Text>
                  </View>
                )}

                {/* Zone Label Floating */}
                <View style={styles.beaconLabelBox}>
                  <Text style={styles.beaconLabelText}>{zone.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Bottom Map Compass Hint */}
          <View style={styles.mapFooterOverlay}>
            <Compass size={14} color={THEME.colors.textMuted} />
            <Text style={styles.compassText}>NORTH CAMPUS RECEPTOR</Text>
          </View>
        </View>

        {/* Selected Zone Deep Dive Card */}
        {selectedZone && (
          <View style={styles.zoneDetailCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.05)', 'transparent']}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.zoneDetailHeader}>
              <View style={styles.categoryIconCircle}>
                {getCategoryIcon(selectedZone.category)}
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.zoneDetailTitle}>{selectedZone.name}</Text>
                <Text style={styles.zoneDetailVibe}>{selectedZone.vibe}</Text>
              </View>

              {/* Crowd Tag */}
              <View
                style={[
                  styles.crowdTag,
                  {
                    backgroundColor:
                      selectedZone.crowdLevel === 'Packed'
                        ? 'rgba(255, 94, 58, 0.2)'
                        : 'rgba(6, 182, 212, 0.15)',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.crowdTagText,
                    {
                      color:
                        selectedZone.crowdLevel === 'Packed'
                          ? '#ff5e3a'
                          : '#06b6d4',
                    },
                  ]}
                >
                  {selectedZone.crowdLevel}
                </Text>
              </View>
            </View>

            <Text style={styles.zoneDetailDesc}>{selectedZone.description}</Text>

            {/* Quick Stats Row */}
            <View style={styles.zoneStatsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Active Now</Text>
                <Text style={styles.statValue}>
                  {selectedZone.activeStudents} Students
                </Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Radar Glow</Text>
                <Text style={[styles.statValue, { color: selectedZone.glowColor }]}>
                  High Intensity
                </Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Status</Text>
                <Text style={styles.statValue}>Open 24/7</Text>
              </View>
            </View>

            {/* Spawn / Check-in Here Button */}
            <TouchableOpacity
              style={[
                styles.spawnBtn,
                user.currentZoneId === selectedZone.id && styles.spawnedBtn,
              ]}
              onPress={() => spawnInZone(selectedZone.id)}
              activeOpacity={0.8}
            >
              <MapPin
                size={16}
                color="#ffffff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.spawnBtnText}>
                {user.currentZoneId === selectedZone.id
                  ? 'Currently Spawned Here'
                  : `Spawn in ${selectedZone.name}`}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* All Campus Zones Directory List */}
        <Text style={styles.zoneListHeading}>All Campus Hubs & Dens</Text>
        <View style={styles.zonesListWrapper}>
          {zones.map((zone) => {
            const isUserHere = user.currentZoneId === zone.id;
            return (
              <TouchableOpacity
                key={zone.id}
                style={[
                  styles.zoneRowItem,
                  selectedZone?.id === zone.id && styles.selectedZoneRowItem,
                ]}
                onPress={() => setSelectedZone(zone)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.zoneRowColorBar,
                    { backgroundColor: zone.glowColor },
                  ]}
                />
                <View style={styles.zoneRowContent}>
                  <View style={styles.zoneRowTop}>
                    <Text style={styles.zoneRowName}>{zone.name}</Text>
                    <Text style={styles.zoneRowStudents}>
                      🔥 {zone.activeStudents}
                    </Text>
                  </View>
                  <Text style={styles.zoneRowSub}>{zone.vibe}</Text>
                </View>
                {isUserHere && (
                  <View style={styles.activeCheckBadge}>
                    <Text style={styles.activeCheckText}>HERE</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

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
  privacyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 18,
    padding: 14,
    marginTop: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  privacyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  privacyIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  privacyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  privacySub: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginTop: 2,
    lineHeight: 14,
  },
  mapCard: {
    height: MAP_HEIGHT,
    borderRadius: 24,
    backgroundColor: '#0c0c14',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  radarBackground: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarRing1: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    position: 'absolute',
  },
  radarRing2: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    position: 'absolute',
  },
  radarRing3: {
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
    position: 'absolute',
  },
  radarCrossX: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    position: 'absolute',
  },
  radarCrossY: {
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    position: 'absolute',
  },
  mapHeaderOverlay: {
    position: 'absolute',
    top: 12,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 94, 58, 0.3)',
  },
  liveBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ff5e3a',
    letterSpacing: 0.5,
  },
  activeSumText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  mapFooterOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  compassText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.textMuted,
    letterSpacing: 0.5,
  },
  zoneBeacon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    marginLeft: -24,
    marginTop: -24,
  },
  beaconHalo: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
  },
  beaconPin: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  beaconStudentCount: {
    fontSize: 8,
    fontWeight: '800',
    color: '#ffffff',
  },
  userMarkerPill: {
    position: 'absolute',
    top: -12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#ff5e3a',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  userMarkerText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#ffffff',
  },
  beaconLabelBox: {
    position: 'absolute',
    bottom: -14,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  beaconLabelText: {
    fontSize: 8,
    fontWeight: '600',
    color: '#ffffff',
  },
  zoneDetailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  zoneDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneDetailTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  zoneDetailVibe: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  crowdTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  crowdTagText: {
    fontSize: 10,
    fontWeight: '800',
  },
  zoneDetailDesc: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 16,
    marginBottom: 14,
  },
  zoneStatsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  spawnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.accentFlame,
    paddingVertical: 12,
    borderRadius: 14,
  },
  spawnedBtn: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  spawnBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  zoneListHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
  },
  zonesListWrapper: {
    gap: 8,
  },
  zoneRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  selectedZoneRowItem: {
    borderColor: THEME.colors.accentFlame,
    backgroundColor: 'rgba(255, 94, 58, 0.05)',
  },
  zoneRowColorBar: {
    width: 4,
    height: 36,
    borderRadius: 2,
    marginRight: 12,
  },
  zoneRowContent: {
    flex: 1,
  },
  zoneRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  zoneRowName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  zoneRowStudents: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  zoneRowSub: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  activeCheckBadge: {
    backgroundColor: 'rgba(255, 94, 58, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  activeCheckText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.accentFlame,
  },
});
