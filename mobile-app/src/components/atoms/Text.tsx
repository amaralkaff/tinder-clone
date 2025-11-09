import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps } from 'react-native';

interface TextProps extends Omit<RNTextProps, 'style'> {
  children: React.ReactNode;
  variant?: 'heading' | 'body' | 'small';
  color?: string;
  style?: TextStyle;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color,
  style,
  className,
  ...rest
}) => {
  const variantClass = variant === 'heading'
    ? 'text-2xl font-bold'
    : variant === 'small'
    ? 'text-sm'
    : 'text-base';

  const textColor = color ? { color } : {};

  return (
    <RNText {...rest} className={`${variantClass} ${className || ''}`} style={[textColor, style]}>
      {children}
    </RNText>
  );
};
