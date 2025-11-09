import React from 'react';
import { FlatList, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Person } from '../../types';
import { ProfileCard } from '../molecules/ProfileCard';
import { Text } from '../atoms/Text';

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
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fe3c72" />
      </View>
    );
  }

  if (!people || people.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-2xl font-bold text-gray-700 text-center mb-4">
          No likes yet
        </Text>
        <Text className="text-base text-gray-500 text-center">
          Start swiping to find your matches
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={people}
      renderItem={({ item }) => (
        <View className="mb-4 items-center">
          <ProfileCard person={item} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      className="p-4"
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fe3c72"
          />
        ) : undefined
      }
    />
  );
};
