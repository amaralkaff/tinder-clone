import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Text } from '../components/atoms/Text';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Animated.View style={{ opacity: fadeAnim }} className="items-center">
        <Text className="text-8xl mb-5">🔥</Text>
        <Text className="text-2xl font-bold text-pink-500 mb-2">Tinder Clone</Text>
        <Text className="text-base text-gray-500">Find your match</Text>
      </Animated.View>
    </View>
  );
};
