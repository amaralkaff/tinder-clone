import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';

interface ActionButtonProps {
  onPress: () => void;
  variant: 'rewind' | 'nope' | 'star' | 'like' | 'boost';
  style?: ViewStyle;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  variant,
  style,
}) => {
  const getButtonConfig = (): {
    size: string;
    bg: string;
    iconColor: string;
    icon: React.ReactElement;
  } => {
    switch (variant) {
      case 'rewind':
        return {
          size: 'w-14 h-14',
          bg: 'bg-yellow-500',
          iconColor: '#FCD34D',
          icon: (
            <Svg width={22} height={22} viewBox="0 0 24 24">
              <Path
                d="M12 5v6l4 2m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#FCD34D"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          ),
        };
      case 'nope':
        return {
          size: 'w-16 h-16',
          bg: 'bg-white',
          iconColor: '#FF6B6B',
          icon: (
            <Svg width={26} height={26} viewBox="0 0 24 24">
              <Path
                d="M6 6l12 12M6 18L18 6"
                stroke="#FF6B6B"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ),
        };
      case 'star':
        return {
          size: 'w-14 h-14',
          bg: 'bg-white',
          iconColor: '#3B82F6',
          icon: (
            <Svg width={26} height={26} viewBox="0 0 24 24">
              <Polygon
                points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
                fill="#3B82F6"
              />
            </Svg>
          ),
        };
      case 'like':
        return {
          size: 'w-16 h-16',
          bg: 'bg-white',
          iconColor: '#10B981',
          icon: (
            <Svg width={26} height={26} viewBox="0 0 24 24">
              <Path
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                fill="#10B981"
              />
            </Svg>
          ),
        };
      case 'boost':
        return {
          size: 'w-14 h-14',
          bg: 'bg-white',
          iconColor: '#A855F7',
          icon: (
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path
                d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                fill="#A855F7"
              />
            </Svg>
          ),
        };
      default:
        return {
          size: 'w-16 h-16',
          bg: 'bg-gray-400',
          iconColor: '#FFFFFF',
          icon: (
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FFFFFF" strokeWidth={2} fill="none" />
            </Svg>
          ),
        };
    }
  };

  const config = getButtonConfig();

  return (
    <TouchableOpacity
      className={`${config.size} rounded-full items-center justify-center ${config.bg}`}
      style={[
        {
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 4,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {config.icon}
    </TouchableOpacity>
  );
};
