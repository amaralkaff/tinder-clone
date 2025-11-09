import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from './Text';

interface ActionButtonProps {
  icon: string;
  onPress: () => void;
  variant: 'like' | 'nope' | 'superlike';
  style?: ViewStyle;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  onPress,
  variant,
  style,
}) => {
  return (
    <TouchableOpacity
      className={`rounded-full items-center justify-center border-4 border-white ${
        variant === 'like'
          ? 'w-20 h-20 bg-emerald-400'
          : variant === 'nope'
          ? 'w-16 h-16 bg-rose-500'
          : 'w-14 h-14 bg-sky-400'
      }`}
      style={[{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8 }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className={variant === 'like' ? 'text-3xl' : 'text-2xl'}>{icon}</Text>
    </TouchableOpacity>
  );
};
