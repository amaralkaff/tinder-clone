import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ProfileList } from '../components/organisms/ProfileList';
import { Text } from '../components/atoms/Text';
import { useLikedPeople } from '../services/queries';
import { COLORS, SPACING } from '../constants';

export const LikesScreen: React.FC = () => {
  const { data, isLoading, refetch, isRefetching } = useLikedPeople(1, 15);

  const people = data?.data || [];

  const handleRefresh = () => {
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading" color={COLORS.like}>
          💚 Your Likes
        </Text>
      </View>
      <View style={styles.content}>
        <ProfileList
          people={people}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          refreshing={isRefetching}
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  content: {
    flex: 1,
  },
});
