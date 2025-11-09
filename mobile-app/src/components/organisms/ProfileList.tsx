import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Person } from '../../types';
import { ProfileCard } from '../molecules/ProfileCard';
import { Text } from '../atoms/Text';
import { COLORS, SPACING } from '../../constants';

interface ProfileListProps {
  people: Person[];
  isLoading?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const ProfileList: React.FC<ProfileListProps> = ({
  people,
  isLoading = false,
  onRefresh,
  refreshing = false,
}) => {
  if (isLoading && !refreshing) {
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
          No likes yet
        </Text>
        <Text variant="body" color={COLORS.text} style={styles.emptyText}>
          Start swiping to find your matches
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={people}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <ProfileCard person={item} style={styles.card} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
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
  listContent: {
    padding: SPACING.md,
  },
  cardContainer: {
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  card: {
    width: '100%',
  },
});
