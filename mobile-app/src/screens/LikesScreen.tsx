import React from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileGridCard } from '../components/molecules/ProfileGridCard';
import { Text } from '../components/atoms/Text';
import { useLikedPeople } from '../services/queries';

export const LikesScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { data, isLoading, refetch, isRefetching } = useLikedPeople(1, 15);

  const people = data?.data || [];

  if (isLoading && !isRefetching) {
    return (
      <View
        className="flex-1 bg-gray-50 items-center justify-center"
        style={{ paddingTop: insets.top }}
      >
        <ActivityIndicator size="large" color="#fe3c72" />
      </View>
    );
  }

  if (!people || people.length === 0) {
    return (
      <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
        <View className="p-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-700">Matches</Text>
        </View>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-xl font-semibold text-gray-700 mb-2">No likes yet</Text>
          <Text className="text-base text-gray-500 text-center">
            Start swiping to find your matches
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <View className="p-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-700">Matches</Text>
        <Text className="text-xs text-gray-500 mt-1">
          {people.length} {people.length === 1 ? 'person' : 'people'}
        </Text>
      </View>
      <FlatList
        data={people}
        renderItem={({ item }) => <ProfileGridCard person={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 8, paddingHorizontal: 8 }}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 16, gap: 8 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#fe3c72"
          />
        }
      />
    </View>
  );
};
