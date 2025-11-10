import React, { useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Text } from '../components/atoms/Text';
import { authStorage } from '../services/auth';
import { profileApi } from '../services/profile';

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

    const checkAuth = async () => {
      const token = await authStorage.getToken();

      let destination: keyof RootStackParamList = 'Login';

      if (token) {
        // User is logged in, check if they have a profile
        try {
          await profileApi.getProfile();
          destination = 'MainTabs';
        } catch (error: any) {
          // Profile doesn't exist, need to create one
          if (error?.response?.status === 404) {
            destination = 'ProfileSetup';
          } else {
            // Other error, assume they need to login again
            destination = 'Login';
          }
        }
      }

      setTimeout(() => {
        navigation.replace(destination);
      }, 1500);
    };

    checkAuth();
  }, [navigation, fadeAnim]);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Animated.View style={{ opacity: fadeAnim }} className="items-center">
        <Image
          source={require('../../assets/images/tinder-logo.png')}
          style={{ width: 200, height: 200, tintColor: '#FE3C72' }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};
