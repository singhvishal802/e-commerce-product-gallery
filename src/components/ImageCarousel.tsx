import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  FadeIn,
} from 'react-native-reanimated';
import { Product } from '../types/Product';
import CarouselItem from './CarouselItem';
import DotIndicator from './DotIndicator';

interface Props {
  /** Array of image URLs to display in the carousel */
  images: string[];
  /** Product object used for shared element transitions */
  product: Product;
}

const paginationAnimation = FadeIn.delay(600).duration(400);

/**
 * ImageCarousel component - Horizontal scrollable image carousel with pagination indicators
 * Features:
 * - Horizontal scrolling with paging
 * - Animated dot indicators showing current position
 * - Shared element transitions
 * - Smooth scroll handling with reanimated
 * @component
 * @param {Props} props - Component props
 * @returns {React.ReactElement} Carousel component with images and indicators
 */
const ImageCarousel = React.memo(function ImageCarousel({
  images,
  product,
}: Props): React.ReactElement {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const carouselItems = useMemo(
    () =>
      images.map((uri, index) => (
        <CarouselItem
          key={index}
          uri={uri}
          index={index}
          scrollX={scrollX}
          sharedTag={index === 0 ? `product-${product.id}` : undefined}
        />
      )),
    [images, product.id, scrollX],
  );

  const dots = useMemo(
    () =>
      images.map((_, index) => (
        <DotIndicator key={index} index={index} scrollX={scrollX} />
      )),
    [images, scrollX],
  );

  return (
    <View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {carouselItems}
      </Animated.ScrollView>

      <Animated.View style={styles.pagination} entering={paginationAnimation}>
        {dots}
      </Animated.View>
    </View>
  );
});

export default ImageCarousel;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
});
