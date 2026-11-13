import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from './src/context/AppContext';
import { GlassTabBar } from './src/components/GlassTabBar';
import { CampusHomeScreen } from './src/screens/CampusHomeScreen';
import { HeatMapScreen } from './src/screens/HeatMapScreen';
import { GetToGiveScreen } from './src/screens/GetToGiveScreen';
import { TeaAndSpottedScreen } from './src/screens/TeaAndSpottedScreen';
import { StreaksAndHostelScreen } from './src/screens/StreaksAndHostelScreen';
import { THEME } from './src/theme/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <View style={styles.appContainer}>
            <Tab.Navigator
              tabBar={(props) => <GlassTabBar {...props} />}
              screenOptions={{
                headerShown: false,
                animation: 'fade',
              }}
            >
              <Tab.Screen name="Campus" component={CampusHomeScreen} />
              <Tab.Screen name="HeatMap" component={HeatMapScreen} />
              <Tab.Screen name="Drop" component={GetToGiveScreen} />
              <Tab.Screen name="TeaSpotted" component={TeaAndSpottedScreen} />
              <Tab.Screen name="Streaks" component={StreaksAndHostelScreen} />
            </Tab.Navigator>
          </View>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: THEME.colors.bgVoid,
  },
});
