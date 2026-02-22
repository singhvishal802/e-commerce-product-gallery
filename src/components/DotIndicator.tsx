import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function DotIndicator({
  index,
  scrollX,
}: {
  index: number;
  scrollX: SharedValue<number>;
}) {
  const dotStyle = useAnimatedStyle(() => {
    const progress = scrollX.value / width;
    const scale = interpolate(
      progress,
      [index - 1, index, index + 1],
      [0.8, 1.4, 0.8],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      progress,
      [index - 1, index, index + 1],
      [0.3, 1, 0.3],
      Extrapolation.CLAMP,
    );
    return { transform: [{ scale }], opacity };
  });

  return <Animated.View style={[styles.dot, dotStyle]} />;
}

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#111',
    marginHorizontal: 6,
  },
});
