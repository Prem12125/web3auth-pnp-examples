import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Text as SvgText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const GradientWord = ({ text }) => (
  <Svg height={height * 0.06} width="100%">
    <Defs>
      <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#c7e619" stopOpacity="1" />
        <Stop offset="0%" stopColor="#abbf39" stopOpacity="1" />

        <Stop offset="100%" stopColor="#78823c" stopOpacity="1" />
      </SvgLinearGradient>
    </Defs>
    <SvgText
      fill="url(#grad)"
      fontSize={width * 0.09}
      fontWeight="bold"
      x="50%"
      y="50%"
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      {text}
    </SvgText>
  </Svg>
);

export default GradientWord;
