import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types';
import { Text } from '../components/atoms/Text';
import { useRegister } from '../services/auth';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const STEPS = {
  NAME: 0,
  EMAIL: 1,
  PASSWORD: 2,
  CONFIRM: 3,
};

const TOTAL_STEPS = 4;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const registerMutation = useRegister();
  const insets = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState(STEPS.NAME);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const handleContinue = () => {
    switch (currentStep) {
      case STEPS.NAME:
        if (!name.trim()) {
          Alert.alert('Required', 'Please enter your name');
          return;
        }
        setCurrentStep(STEPS.EMAIL);
        break;
      case STEPS.EMAIL:
        if (!email.trim()) {
          Alert.alert('Required', 'Please enter your email');
          return;
        }
        if (!email.includes('@')) {
          Alert.alert('Invalid Email', 'Please enter a valid email address');
          return;
        }
        setCurrentStep(STEPS.PASSWORD);
        break;
      case STEPS.PASSWORD:
        if (!password) {
          Alert.alert('Required', 'Please enter a password');
          return;
        }
        if (password.length < 8) {
          Alert.alert('Weak Password', 'Password must be at least 8 characters');
          return;
        }
        setCurrentStep(STEPS.CONFIRM);
        break;
      case STEPS.CONFIRM:
        if (!passwordConfirmation) {
          Alert.alert('Required', 'Please confirm your password');
          return;
        }
        if (password !== passwordConfirmation) {
          Alert.alert('Mismatch', 'Passwords do not match');
          return;
        }
        handleRegister();
        break;
    }
  };

  const handleBack = () => {
    if (currentStep > STEPS.NAME) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleRegister = async () => {
    try {
      await registerMutation.mutateAsync({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      // After registration, user needs to create profile
      navigation.replace('ProfileSetup');
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

  const getStepContent = () => {
    switch (currentStep) {
      case STEPS.NAME:
        return {
          title: 'My first name is',
          placeholder: 'Enter your name',
          value: name,
          onChangeText: setName,
          helperText: 'This is how it will appear in Tinder.',
          autoCapitalize: 'words' as const,
          keyboardType: 'default' as const,
          secureTextEntry: false,
        };
      case STEPS.EMAIL:
        return {
          title: 'My email is',
          placeholder: 'Enter your email',
          value: email,
          onChangeText: setEmail,
          helperText: 'We will never share your email with anyone.',
          autoCapitalize: 'none' as const,
          keyboardType: 'email-address' as const,
          secureTextEntry: false,
        };
      case STEPS.PASSWORD:
        return {
          title: 'Create a password',
          placeholder: 'Enter password',
          value: password,
          onChangeText: setPassword,
          helperText: 'Must be at least 8 characters long.',
          autoCapitalize: 'none' as const,
          keyboardType: 'default' as const,
          secureTextEntry: true,
        };
      case STEPS.CONFIRM:
        return {
          title: 'Confirm your password',
          placeholder: 'Re-enter password',
          value: passwordConfirmation,
          onChangeText: setPasswordConfirmation,
          helperText: 'Make sure both passwords match.',
          autoCapitalize: 'none' as const,
          keyboardType: 'default' as const,
          secureTextEntry: true,
        };
      default:
        return null;
    }
  };

  const stepContent = getStepContent();

  if (!stepContent) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        {/* Progress Bar */}
        <View style={[styles.progressContainer, { paddingTop: insets.top }]}>
          <View style={styles.progressBarWrapper}>
            <LinearGradient
              colors={['#FF6036', '#E010CD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBar, { width: `${progress}%` }]}
            />
            <View style={[styles.progressBarEmpty, { width: `${100 - progress}%` }]} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: 20, paddingBottom: insets.bottom + 20 },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/tinder-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>{stepContent.title}</Text>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={stepContent.placeholder}
              placeholderTextColor="#939BA7"
              value={stepContent.value}
              onChangeText={stepContent.onChangeText}
              autoCapitalize={stepContent.autoCapitalize}
              keyboardType={stepContent.keyboardType}
              secureTextEntry={stepContent.secureTextEntry}
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleContinue}
            />
          </View>

          {/* Helper Text */}
          <Text style={styles.helperText}>{stepContent.helperText}</Text>
        </ScrollView>

        {/* Continue Button */}
        <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 24 }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            disabled={registerMutation.isPending}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FF6036', '#E010CD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              {registerMutation.isPending && currentStep === STEPS.CONFIRM ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    width: '100%',
  },
  progressBarWrapper: {
    flexDirection: 'row',
    height: 10,
    width: '100%',
  },
  progressBar: {
    height: 10,
  },
  progressBarEmpty: {
    height: 10,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 24,
    lineHeight: 32,
    color: '#111827',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
    tintColor: '#FE3C72',
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
    lineHeight: 24,
    color: '#111827',
  },
  helperText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#939BA7',
    marginTop: 8,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  button: {
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 20,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    lineHeight: 26,
    fontWeight: 'bold',
    letterSpacing: 0.1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 22,
  },
  footerLink: {
    color: '#FF6036',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: 'bold',
  },
});
