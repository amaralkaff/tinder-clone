import React from 'react';
import { View, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Person } from '../../types';
import { COLORS, SPACING } from '../../constants';
import { Text } from '../atoms/Text';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;
const CARD_WIDTH = SCREEN_WIDTH * 0.9;

interface ProfileCardProps {
  person: Person;
  style?: ViewStyle;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ person, style }) => {
  const primaryPicture = person.pictures?.[0]?.url || 'https://via.placeholder.com/400';

  return (
    <View style={[styles.card, style]}>
      <Image
        source={{ uri: primaryPicture }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.infoContainer}>
        <Text variant="heading" color={COLORS.white}>
          {person.name}, {person.age}
        </Text>
        <Text variant="body" color={COLORS.white} style={styles.location}>
          {person.location}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  location: {
    marginTop: SPACING.xs,
  },
});
