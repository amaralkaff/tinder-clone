import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface HeartIconProps {
  size?: number;
  active?: boolean;
}

export const HeartIcon: React.FC<HeartIconProps> = ({ size = 24, active = false }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FE3C72" />
          <Stop offset="100%" stopColor="#FF655B" />
        </LinearGradient>
      </Defs>
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={active ? 'url(#heartGradient)' : 'none'}
        stroke={active ? 'url(#heartGradient)' : '#B0B0B0'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
