import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface CarouselItemProps {
  uri: string;
  index: number;
  scrollX: SharedValue<number>;
  sharedTag?: string;
}

const CarouselItem = React.memo(function CarouselItem({
  uri,
  index,
  scrollX,
  sharedTag,
}: CarouselItemProps) {
  const scaleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value / width,
      [index - 1, index, index + 1],
      [0.9, 1, 0.9],
      Extrapolation.CLAMP,
    );
    return { transform: [{ scale }] };
  });

  return (
    <Animated.View style={[styles.wrapper, scaleStyle]}>
      <Animated.Image
        sharedTransitionTag={sharedTag}
        source={{ uri }}
        style={styles.image}
      />
    </Animated.View>
  );
});

export default CarouselItem;

const styles = StyleSheet.create({
  wrapper: {
    width,
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
