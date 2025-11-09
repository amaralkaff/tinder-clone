import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardDeck } from '../components/organisms/CardDeck';
import { useRecommendations, useLikePerson, useDislikePerson } from '../services/queries';

export const MainScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { data, isLoading, error, refetch } = useRecommendations(1, 15);
  const likeMutation = useLikePerson();
  const dislikeMutation = useDislikePerson();

  const people = data?.data || [];

  // Debug logging
  useEffect(() => {
    console.log('MainScreen - isLoading:', isLoading);
    console.log('MainScreen - error:', error);
    console.log('MainScreen - data:', data);
    console.log('MainScreen - people count:', people.length);
  }, [isLoading, error, data, people]);

  useEffect(() => {
    if (people.length < 3 && !isLoading) {
      refetch();
    }
  }, [people.length, isLoading, refetch]);

  const handleSwipeRight = async (personId: number) => {
    try {
      await likeMutation.mutateAsync(personId);
    } catch (error) {
      console.error('Error liking person:', error);
    }
  };

  const handleSwipeLeft = async (personId: number) => {
    try {
      await dislikeMutation.mutateAsync(personId);
    } catch (error) {
      console.error('Error disliking person:', error);
    }
  };

  return (
    <View
      className="flex-1 bg-gray-50"
      style={{ paddingTop: insets.top }}
    >
      <CardDeck
        people={people}
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </View>
  );
};
