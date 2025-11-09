import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Text } from '../components/atoms/Text';
import { useRegister } from '../services/auth';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const registerMutation = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !passwordConfirmation) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    try {
      await registerMutation.mutateAsync({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      navigation.replace('MainTabs');
    } catch (error: any) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        const errorMessages = Object.values(errors).flat().join('\n');
        Alert.alert('Registration Failed', errorMessages);
      } else {
        Alert.alert('Registration Failed', error?.response?.data?.message || 'Something went wrong');
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-8 py-12">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-7xl mb-4">🔥</Text>
          <Text className="text-3xl font-bold text-pink-500 mb-2">Create Account</Text>
          <Text className="text-base text-gray-500">Join to start matching</Text>
        </View>

        {/* Registration Form */}
        <View className="mb-6">
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-4 text-base"
            placeholder="Full Name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

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
            className="bg-gray-100 rounded-lg px-4 py-3 mb-4 text-base"
            placeholder="Password (min 8 characters)"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-base"
            placeholder="Confirm Password"
            placeholderTextColor="#9CA3AF"
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity
            className="bg-pink-500 rounded-lg py-4 items-center"
            onPress={handleRegister}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-lg font-bold">Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-pink-500 font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
