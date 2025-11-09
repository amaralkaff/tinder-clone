import React, { useEffect, useState, useCallback } from 'react';
import { View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardDeck } from '../components/organisms/CardDeck';
import { useRecommendations, useLikePerson, useDislikePerson } from '../services/queries';

export const MainScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useRecommendations(page, 15);
  const likeMutation = useLikePerson();
  const dislikeMutation = useDislikePerson();

  const people = data?.data || [];

  const handleSwipeRight = async (personId: number) => {
    try {
      await likeMutation.mutateAsync(personId);
    } catch (error: any) {
      // Handle 409 Conflict (already liked) gracefully
      if (error?.response?.status !== 409) {
        console.error('Error liking person:', error?.response?.data || error.message);
      }
    }
  };

  const handleSwipeLeft = async (personId: number) => {
    try {
      await dislikeMutation.mutateAsync(personId);
    } catch (error: any) {
      // Handle 409 Conflict (already disliked) gracefully
      if (error?.response?.status !== 409) {
        console.error('Error disliking person:', error?.response?.data || error.message);
      }
    }
  };

  const handleLoadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, [page]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: insets.top
      }}
    >
      {/* Tinder Logo Header */}
      <View style={{
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#FAFAFA',
        zIndex: 100
      }}>
        <Image
          source={{ uri: 'https://logos-world.net/wp-content/uploads/2020/09/Tinder-Logo.png' }}
          style={{ width: 120, height: 40 }}
          resizeMode="contain"
        />
      </View>

      <CardDeck
        people={people}
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </View>
  );
};
