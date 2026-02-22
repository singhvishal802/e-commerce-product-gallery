import React, { useRef, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../types/Product';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Ionicons from '@react-native-vector-icons/ionicons';
/**
 * ProductCard component - Card displaying product information in a list
 * Features:
 * - Staggered fade-in animation based on index
 * - Navigates to product detail screen on press
 * - Displays product image and price
 * - Shared element transitions for images
 * - Memoized to prevent unnecessary re-renders
 * @component
 * @param {Object} props - Component props
 * @param {Product} props.product - The product to display
 * @param {number} props.index - Index position for staggered animation
 * @returns {React.ReactElement} Product card component
 */
const ProductCard = React.memo(function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}): React.ReactElement {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const hasAnimated = useRef(false);

  const handlePress = useCallback(() => {
    navigation.navigate('Detail', { product });
  }, [navigation, product]);

  const enteringAnimation = hasAnimated.current
    ? undefined
    : FadeInDown.delay(200 * index).withCallback(() => {
        hasAnimated.current = true;
      });

  return (
    <Animated.View entering={enteringAnimation}>
      <Pressable style={styles.card} onPress={handlePress}>
        <Animated.Image
          sharedTransitionTag={`product-${product.id}`}
          source={{ uri: product.images[0] }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#e6cc05" />
            <Text style={styles.rating}>{product.rating || 'N/A'}</Text>
            {product.reviewCount ? (
              <Text style={styles.reviewCount}>({product.reviewCount})</Text>
            ) : null}
          </View>
          <Text style={styles.price}>${product.price}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  infoContainer: {
    flex: 1,
    margin: 20,
    gap: 8,
    flexShrink: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F4788',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F39C12',
  },
  reviewCount: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    color: '#27AE60',
    fontWeight: '700',
  },
});
