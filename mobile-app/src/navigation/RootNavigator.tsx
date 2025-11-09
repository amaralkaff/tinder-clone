import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
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
              <Image
                source={{ uri: 'https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png' }}
                style={{
                  width: 46,
                  height: 46,
                  tintColor: focused ? '#fe3c72' : '#9ca3af'
                }}
                resizeMode="contain"
              />
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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
