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
  const hasPicture = person.pictures?.[0]?.image_url;
  const primaryPicture = hasPicture
    ? `${BASE_URL}${person.pictures[0].image_url}`
    : null;

  return (
    <View
      style={[
        {
          width: '100%',
          height: 500,
          borderRadius: 12,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          backgroundColor: '#fff',
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 5,
        },
        style,
      ]}
    >
      <Image
        source={primaryPicture ? { uri: primaryPicture } : require('../../../assets/images/placeholder.png')}
        style={{
          width: '100%',
          height: '100%'
        }}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={200}
        onError={(error) => {
          console.error('Image load error:', error.error);
        }}
      />

      {/* Simple bottom gradient overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 180,
          justifyContent: 'flex-end',
          paddingHorizontal: 28,
          paddingBottom: 40,
        }}
      >
        {/* Name and Age */}
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: 8,
            textShadowColor: 'rgba(0,0,0,0.95)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 5,
            letterSpacing: 0.1,
            lineHeight: 36,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {person.name}, {person.age}
        </Text>

        {/* Location */}
        {person.location && (
          <Text
            style={{
              fontSize: 15,
              color: '#FFFFFF',
              opacity: 1,
              textShadowColor: 'rgba(0,0,0,0.8)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 4,
              letterSpacing: 0.05,
              lineHeight: 20,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            📍 {person.location}
          </Text>
        )}
      </LinearGradient>
    </View>
  );
};
