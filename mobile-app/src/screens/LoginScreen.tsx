import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Text } from '../components/atoms/Text';
import { useLogin } from '../services/auth';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const loginMutation = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      navigation.replace('MainTabs');
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error?.response?.data?.message || 'Invalid credentials'
      );
    }
  };

  return (
    <View className="flex-1 bg-white px-8 justify-center">
      {/* Header */}
      <View className="items-center mb-12">
        <Text className="text-7xl mb-4">🔥</Text>
        <Text className="text-3xl font-bold text-pink-500 mb-2">Tinder Clone</Text>
        <Text className="text-base text-gray-500">Sign in to continue</Text>
      </View>

      {/* Login Form */}
      <View className="mb-6">
        <TextInput
          className="bg-gray-100 rounded-lg px-4 py-3 mb-4 text-base"
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-base"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          className="bg-pink-500 rounded-lg py-4 items-center"
          onPress={handleLogin}
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-bold">Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Register Link */}
      <View className="flex-row justify-center">
        <Text className="text-gray-600">Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-pink-500 font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
