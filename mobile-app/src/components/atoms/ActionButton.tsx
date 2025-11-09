import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../../constants';
import { Text } from './Text';

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  variant: 'like' | 'nope';
  style?: ViewStyle;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onPress,
  variant,
  style
}) => {
  const backgroundColor = variant === 'like' ? COLORS.like : COLORS.nope;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text variant="body" color={COLORS.white}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
});
