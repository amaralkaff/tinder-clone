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
  onLoadMore?: () => void;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export const CardDeck: React.FC<CardDeckProps> = ({
  people,
  onSwipeRight,
  onSwipeLeft,
  onLoadMore,
  isLoading = false,
  error,
  onRetry,
}) => {
  const swiperRef = useRef<Swiper<Person>>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [swipedIds, setSwipedIds] = useState<Set<number>>(new Set());
  const insets = useSafeAreaInsets();

  // Reset cardIndex and swipedIds when people array changes
  React.useEffect(() => {
    setCardIndex(0);
    setSwipedIds(new Set());
  }, [people]);

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
    // Safety check: ensure person exists at index
    if (!people[index]) {
      return;
    }

    const personId = people[index].id;

    // Prevent duplicate swipes
    if (swipedIds.has(personId)) {
      return;
    }

    setSwipedIds(prev => new Set(prev).add(personId));
    onSwipeRight(personId);
    setCardIndex(index + 1);
  };

  const handleSwipeLeft = (index: number) => {
    // Safety check: ensure person exists at index
    if (!people[index]) {
      return;
    }

    const personId = people[index].id;

    // Prevent duplicate swipes
    if (swipedIds.has(personId)) {
      return;
    }

    setSwipedIds(prev => new Set(prev).add(personId));
    onSwipeLeft(personId);
    setCardIndex(index + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginBottom: 110 }}>
        <Swiper
          key={`swiper-${people.map(p => p.id).join('-')}`}
          ref={swiperRef}
          cards={people}
          renderCard={(person) => {
            if (!person) return null;
            return <ProfileCard key={person.id} person={person} />;
          }}
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
          onSwipedAll={() => {
            if (onLoadMore) {
              onLoadMore();
            }
          }}
          cardIndex={cardIndex}
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={12}
          stackScale={4}
          cardVerticalMargin={45}
          cardHorizontalMargin={16}
          disableBottomSwipe
          infinite={false}
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
                  marginTop: 55,
                  marginLeft: -35,
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
                  marginTop: 55,
                  marginLeft: 35,
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

      {/* Action Buttons - Only Nope and Like (others marked with X) */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 70,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
          paddingTop: 12,
          zIndex: 10,
          elevation: 10,
          backgroundColor: 'transparent',
        }}
      >
        <ActionButton
          variant="nope"
          onPress={() => {
            if (swiperRef.current && cardIndex < people.length) {
              swiperRef.current.swipeLeft();
            }
          }}
        />
        <ActionButton
          variant="like"
          onPress={() => {
            if (swiperRef.current && cardIndex < people.length) {
              swiperRef.current.swipeRight();
            }
          }}
        />
      </View>
    </View>
  );
};
