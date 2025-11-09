import React, { useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Person } from '../../types';
import { ProfileCard } from '../molecules/ProfileCard';
import { ActionButton } from '../atoms/ActionButton';
import { Text } from '../atoms/Text';

interface CardDeckProps {
  people: Person[];
  onSwipeRight: (personId: number) => void;
  onSwipeLeft: (personId: number) => void;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export const CardDeck: React.FC<CardDeckProps> = ({
  people,
  onSwipeRight,
  onSwipeLeft,
  isLoading = false,
  error,
  onRetry,
}) => {
  const swiperRef = useRef<Swiper<Person>>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fe3c72" />
        <Text className="text-base text-gray-500 mt-4">Loading profiles...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-2xl font-bold text-red-500 text-center mb-3">
          Connection Error
        </Text>
        <Text className="text-base text-gray-600 text-center mb-6">
          {error.message || 'Failed to load profiles. Please check your connection.'}
        </Text>
        {onRetry && (
          <ActionButton
            icon="🔄"
            onPress={onRetry}
            variant="like"
          />
        )}
      </View>
    );
  }

  if (!people || people.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-2xl font-bold text-gray-700 text-center mb-3">
          No more profiles
        </Text>
        <Text className="text-base text-gray-500 text-center">
          Check back later for new recommendations
        </Text>
      </View>
    );
  }

  const handleSwipeRight = (index: number) => {
    onSwipeRight(people[index].id);
    setCardIndex(index + 1);
  };

  const handleSwipeLeft = (index: number) => {
    onSwipeLeft(people[index].id);
    setCardIndex(index + 1);
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
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
          stackScale={5}
          cardVerticalMargin={60}
          cardHorizontalMargin={20}
          disableBottomSwipe
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'transparent',
                  borderColor: '#ec5e6f',
                  color: '#ec5e6f',
                  borderWidth: 3,
                  fontSize: 32,
                  fontWeight: 'bold',
                  padding: 10,
                  borderRadius: 8,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 40,
                  marginLeft: -40,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'transparent',
                  borderColor: '#01df8a',
                  color: '#01df8a',
                  borderWidth: 3,
                  fontSize: 32,
                  fontWeight: 'bold',
                  padding: 10,
                  borderRadius: 8,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 40,
                  marginLeft: 40,
                },
              },
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: 'transparent',
                  borderColor: '#3ab4f2',
                  color: '#3ab4f2',
                  borderWidth: 3,
                  fontSize: 28,
                  fontWeight: 'bold',
                  padding: 10,
                  borderRadius: 8,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        />
      </View>

      {/* Action Buttons */}
      <View
        className="flex-row justify-around items-center mx-8 mb-20"
        style={{ bottom: insets.bottom }}
      >
        <ActionButton icon="✕" variant="nope" onPress={() => swiperRef.current?.swipeLeft()} />
        <ActionButton icon="★" variant="superlike" onPress={() => swiperRef.current?.swipeTop()} />
        <ActionButton icon="♥" variant="like" onPress={() => swiperRef.current?.swipeRight()} />
      </View>
    </View>
  );
};
