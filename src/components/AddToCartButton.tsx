import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useCartStore } from '../store/useCartStore';
import { Product } from '../types/Product';

/**
 * AddToCartButton component - Button that adds a product to the shopping cart
 * Features:
 * - Timing animation on button press
 * - Integrates with cart store
 * - Visual feedback with opacity animation
 * @component
 * @param {Object} props - Component props
 * @param {Product} props.product - The product to add to cart
 * @returns {React.ReactElement} The button component
 */
const AddToCartButton = React.memo(function AddToCartButton({
  product,
}: {
  product: Product;
}): React.ReactElement {
  const addToCart = useCartStore(state => state.addToCart);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = useCallback(() => {
    addToCart(product);
    opacity.value = withSequence(
      withTiming(0.5, { duration: 100 }),
      withTiming(1.0, { duration: 250 }),
    );
  }, [product, addToCart, opacity]);

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.text}>Add to Cart</Text>
      </Animated.View>
    </Pressable>
  );
});

export default AddToCartButton;

const styles = StyleSheet.create({
  button: {
    margin: 20,
    padding: 16,
    backgroundColor: '#111',
    borderRadius: 12,
    alignItems: 'center',
  },
  text: { color: '#fff', fontWeight: '600' },
});
