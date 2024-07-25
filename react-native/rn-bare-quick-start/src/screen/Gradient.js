import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Defs, LinearGradient as SVGLinearGradient, Stop, Text as SVGText } from 'react-native-svg';

const GradientWord = ({ text }) => {
  return (
    <View style={styles.textContainer}>
      <Svg height="50" width="300">
        <Defs>
          <SVGLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <Stop offset="30%" stopColor="#ffffff" stopOpacity="1" />
            {/* <Stop offset="100%" stopColor="#78CCF0" stopOpacity="1" />s */}
          </SVGLinearGradient>
        </Defs>
        <SVGText
          fill="url(#grad)"
          fontSize="22"
          fontWeight="bold"
          x="0"
          y="35"
          textAnchor="start"
        >
          {text}
        </SVGText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GradientWord;
