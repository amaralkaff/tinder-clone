import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Person } from '../../types';
import { ProfileCard } from '../molecules/ProfileCard';
import { Text } from '../atoms/Text';
import { COLORS, SPACING } from '../../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CardDeckProps {
  people: Person[];
  onSwipeRight: (personId: number) => void;
  onSwipeLeft: (personId: number) => void;
  isLoading?: boolean;
}

export const CardDeck: React.FC<CardDeckProps> = ({
  people,
  onSwipeRight,
  onSwipeLeft,
  isLoading = false
}) => {
  const swiperRef = useRef<Swiper<Person>>(null);
  const [cardIndex, setCardIndex] = useState(0);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!people || people.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="heading" color={COLORS.text}>
          No more profiles
        </Text>
        <Text variant="body" color={COLORS.text} style={styles.emptyText}>
          Check back later for new recommendations
        </Text>
      </View>
    );
  }

  const handleSwipeRight = (index: number) => {
    const person = people[index];
    onSwipeRight(person.id);
    setCardIndex(index + 1);
  };

  const handleSwipeLeft = (index: number) => {
    const person = people[index];
    onSwipeLeft(person.id);
    setCardIndex(index + 1);
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={people}
        renderCard={(person) => <ProfileCard person={person} />}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        cardIndex={cardIndex}
        backgroundColor="transparent"
        stackSize={3}
        stackSeparation={15}
        stackScale={10}
        disableBottomSwipe
        disableTopSwipe
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: COLORS.nope,
                borderColor: COLORS.nope,
                color: COLORS.white,
                borderWidth: 1,
                fontSize: 24,
                fontWeight: 'bold',
                padding: 10,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30,
              },
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: COLORS.like,
                borderColor: COLORS.like,
                color: COLORS.white,
                borderWidth: 1,
                fontSize: 24,
                fontWeight: 'bold',
                padding: 10,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30,
              },
            },
          },
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    marginTop: SPACING.md,
    textAlign: 'center',
  },
});
