import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { CardDeck } from '../components/organisms/CardDeck';
import { Text } from '../components/atoms/Text';
import { useRecommendations, useLikePerson, useDislikePerson } from '../services/queries';
import { COLORS, SPACING } from '../constants';

export const MainScreen: React.FC = () => {
  const { data, isLoading, refetch } = useRecommendations(1, 15);
  const likeMutation = useLikePerson();
  const dislikeMutation = useDislikePerson();

  const people = data?.data || [];

  // Refetch recommendations when we run low on cards
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading" color={COLORS.primary}>
          🔥 Discover
        </Text>
      </View>
      <View style={styles.content}>
        <CardDeck
          people={people}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});
