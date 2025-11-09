import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SplashScreen } from '../screens/SplashScreen';
import { MainScreen } from '../screens/MainScreen';
import { LikesScreen } from '../screens/LikesScreen';
import { RootStackParamList, MainTabsParamList } from '../types';
import { FlameIcon } from '../components/atoms/FlameIcon';
import { HeartIcon } from '../components/atoms/HeartIcon';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fe3c72',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          height: 72,
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <FlameIcon size={28} active={focused} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={LikesScreen}
        options={{
          tabBarLabel: 'Likes',
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <HeartIcon size={28} active={focused} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
