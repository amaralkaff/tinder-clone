import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Person } from '../../types';
import { Text } from '../atoms/Text';
import { BASE_URL } from '../../constants';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 24) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.25;

interface ProfileGridCardProps {
  person: Person;
  onPress?: () => void;
}

export const ProfileGridCard: React.FC<ProfileGridCardProps> = ({ person, onPress }) => {
  const hasPicture = person.pictures?.[0]?.image_url;
  const primaryPicture = hasPicture
    ? `${BASE_URL}${person.pictures[0].image_url}`
    : null;

  return (
    <TouchableOpacity
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
      }}
      className="rounded-lg overflow-hidden bg-white"
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={primaryPicture ? { uri: primaryPicture } : require('../../../assets/images/placeholder.png')}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        className="absolute bottom-0 left-0 right-0 p-2"
      >
        <Text className="text-base font-bold text-white" numberOfLines={1}>
          {person.name}
        </Text>
        <Text className="text-sm text-white opacity-90" numberOfLines={1}>
          {person.age}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
