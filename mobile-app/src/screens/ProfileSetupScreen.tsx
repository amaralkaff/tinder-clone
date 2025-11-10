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
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList } from '../types';
import { Text } from '../components/atoms/Text';
import { useCreateProfile, useUploadPicture } from '../services/profile';

type ProfileSetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileSetup'>;

const STEPS = {
  AGE: 0,
  LOCATION: 1,
  PHOTOS: 2,
};

const TOTAL_STEPS = 3;
const MAX_PHOTOS = 6;

export const ProfileSetupScreen: React.FC = () => {
  const navigation = useNavigation<ProfileSetupScreenNavigationProp>();
  const createProfileMutation = useCreateProfile();
  const uploadPictureMutation = useUploadPicture();
  const insets = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState(STEPS.AGE);
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const handleContinue = () => {
    switch (currentStep) {
      case STEPS.AGE:
        const ageNum = parseInt(age);
        if (!age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
          Alert.alert('Invalid Age', 'Please enter a valid age (18-100)');
          return;
        }
        setCurrentStep(STEPS.LOCATION);
        break;
      case STEPS.LOCATION:
        if (!location.trim()) {
          Alert.alert('Required', 'Please enter your location');
          return;
        }
        setCurrentStep(STEPS.PHOTOS);
        break;
      case STEPS.PHOTOS:
        handleCreateProfile();
        break;
    }
  };

  const handleBack = () => {
    if (currentStep > STEPS.AGE) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateProfile = async () => {
    try {
      // Create profile first (name auto-populated from registration)
      await createProfileMutation.mutateAsync({
        age: parseInt(age),
        location: location.trim(),
      });

      // Upload photos if any were selected
      if (selectedImages.length > 0) {
        setIsUploading(true);
        try {
          for (const imageUri of selectedImages) {
            await uploadPictureMutation.mutateAsync(imageUri);
          }
        } catch (uploadError) {
          console.error('Photo upload error:', uploadError);
          // Continue to app even if photo upload fails
        }
        setIsUploading(false);
      }

      navigation.replace('MainTabs');
    } catch (error: any) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        const errorMessages = Object.values(errors).flat().join('\n');
        Alert.alert('Profile Creation Failed', errorMessages);
      } else {
        Alert.alert('Profile Creation Failed', error?.response?.data?.message || 'Something went wrong');
      }
    }
  };

  const pickImage = async () => {
    if (selectedImages.length >= MAX_PHOTOS) {
      Alert.alert('Maximum Photos', `You can only add up to ${MAX_PHOTOS} photos`);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera roll permissions to add photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSkipPhotos = () => {
    handleCreateProfile();
  };

  const getStepContent = () => {
    switch (currentStep) {
      case STEPS.AGE:
        return {
          title: 'I am',
          placeholder: 'Enter your age',
          value: age,
          onChangeText: setAge,
          helperText: 'You must be 18 or older to use this app.',
          autoCapitalize: 'none' as const,
          keyboardType: 'numeric' as const,
        };
      case STEPS.LOCATION:
        return {
          title: 'I live in',
          placeholder: 'Enter your city',
          value: location,
          onChangeText: setLocation,
          helperText: 'Help others find matches nearby.',
          autoCapitalize: 'words' as const,
          keyboardType: 'default' as const,
        };
      default:
        return null;
    }
  };

  const stepContent = getStepContent();
  const isPhotosStep = currentStep === STEPS.PHOTOS;

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
          {/* Back Button */}
          {currentStep > STEPS.AGE && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/tinder-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {isPhotosStep ? (
            <>
              {/* Photos Step */}
              <Text style={styles.title}>Add your photos</Text>
              <Text style={styles.helperText}>Add at least 2 photos to get better matches</Text>

              {/* Photo Grid */}
              <View style={styles.photoGrid}>
                {selectedImages.map((uri, index) => (
                  <View key={index} style={styles.photoItem}>
                    <Image source={{ uri }} style={styles.photoImage} />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeImage(index)}
                    >
                      <Text style={styles.removeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                {selectedImages.length < MAX_PHOTOS && (
                  <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
                    <Text style={styles.addPhotoText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : stepContent ? (
            <>
              {/* Regular Input Steps */}
              <Text style={styles.title}>{stepContent.title}</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={stepContent.placeholder}
                  placeholderTextColor="#939BA7"
                  value={stepContent.value}
                  onChangeText={stepContent.onChangeText}
                  autoCapitalize={stepContent.autoCapitalize}
                  keyboardType={stepContent.keyboardType}
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleContinue}
                />
              </View>

              <Text style={styles.helperText}>{stepContent.helperText}</Text>
            </>
          ) : null}
        </ScrollView>

        {/* Continue Button */}
        <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 24 }]}>
          {isPhotosStep && (
            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={handleSkipPhotos}
              activeOpacity={0.8}
            >
              <Text style={styles.skipButtonText}>Skip for now</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            disabled={createProfileMutation.isPending || isUploading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FF6036', '#E010CD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              {(createProfileMutation.isPending || isUploading) ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>
                  {isPhotosStep ? 'Complete Profile' : 'Continue'}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 32,
    lineHeight: 40,
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
  inputMultiline: {
    minHeight: 120,
    textAlignVertical: 'top',
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
  skipButton: {
    marginBottom: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skipButtonText: {
    color: '#6B7280',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 16,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    gap: 12,
  },
  photoItem: {
    width: '31%',
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addPhotoButton: {
    width: '31%',
    aspectRatio: 3 / 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  addPhotoText: {
    fontSize: 48,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});
