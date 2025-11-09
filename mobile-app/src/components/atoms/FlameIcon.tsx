import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface FlameIconProps {
  size?: number;
  active?: boolean;
}

export const FlameIcon: React.FC<FlameIconProps> = ({ size = 24, active = false }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FE3C72" />
          <Stop offset="100%" stopColor="#FF655B" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 2C9.5 4 8 6.5 8 9.5C8 12.5 9.5 15 12 17C12 15.5 13 14 14.5 13.5C14 14.5 14 16 15 17.5C17.5 15 19 12.5 19 9.5C19 6.5 17.5 4 15 2C15 3.5 14 5 12 5C12 4 12 3 12 2Z"
        fill={active ? 'url(#flameGradient)' : '#B0B0B0'}
        stroke={active ? 'url(#flameGradient)' : '#B0B0B0'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
