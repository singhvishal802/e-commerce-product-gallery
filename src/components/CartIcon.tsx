import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useCartStore } from '../store/useCartStore';
import Ionicons from '@react-native-vector-icons/ionicons';

/**
 * CartIcon component - Displays the shopping cart icon with badge count
 * Features:
 * - Shows number of items in cart via badge
 * - Animated bounce effect when cart count changes
 * - Uses Ionicons for the cart icon
 * - Memoized to prevent unnecessary re-renders
 * @component
 * @returns {React.ReactElement} Cart icon with animated badge
 */
const CartIcon = React.memo(function CartIcon(): React.ReactElement {
  const itemCount = useCartStore(state => state.items.length);
  const scale = useSharedValue(1);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (itemCount === 0) return;
    scale.value = withSequence(withSpring(1.3), withSpring(1));
  }, [itemCount]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View>
      <Ionicons name="cart-outline" size={30} color="#000" />
      {itemCount > 0 ? (
        <Animated.View style={[styles.badge, animatedStyle]}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
});

export default CartIcon;

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
