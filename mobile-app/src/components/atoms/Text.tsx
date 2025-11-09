import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';

interface TextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'body' | 'small';
  color?: string;
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = COLORS.text,
  style
}) => {
  const textStyle = variant === 'heading'
    ? FONTS.heading
    : variant === 'small'
    ? FONTS.small
    : FONTS.body;

  return (
    <RNText style={[styles.text, textStyle, { color }, style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
  },
});
