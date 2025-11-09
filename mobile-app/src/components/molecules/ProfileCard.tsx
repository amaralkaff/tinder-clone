import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Person } from '../../types';
import { Text } from '../atoms/Text';
import { BASE_URL } from '../../constants';

interface ProfileCardProps {
  person: Person;
  style?: ViewStyle;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ person, style }) => {
  const primaryPicture = person.pictures?.[0]?.image_url
    ? `${BASE_URL}${person.pictures[0].image_url}`
    : 'https://via.placeholder.com/400';

  // Debug logging
  console.log('ProfileCard - Person:', person.name);
  console.log('ProfileCard - Image URL:', primaryPicture);

  return (
    <View
      className="w-full h-full rounded-2xl bg-white overflow-hidden"
      style={[
        {
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 8,
          elevation: 4,
        },
        style,
      ]}
    >
      <Image
        source={{ uri: primaryPicture }}
        className="w-full h-full"
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        className="absolute bottom-0 left-0 right-0 p-4 pb-6"
      >
        <Text className="text-3xl font-bold text-white mb-1">
          {person.name}, {person.age}
        </Text>
        {person.location && (
          <Text className="text-base text-white opacity-90">
            {person.location}
          </Text>
        )}
        {person.bio && (
          <Text className="text-sm text-white opacity-85 mt-2" numberOfLines={2}>
            {person.bio}
          </Text>
        )}
      </LinearGradient>
    </View>
  );
};
