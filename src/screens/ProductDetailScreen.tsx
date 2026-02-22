import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import ImageCarousel from '../components/ImageCarousel';
import AddToCartButton from '../components/AddToCartButton';
import CommonHeader from '../components/CommonHeader';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

type detailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface Props {
  /** Navigation route with product parameter */
  route: detailScreenRouteProp;
}

const titleAnimation = FadeInLeft.delay(500);
const priceAnimation = FadeInLeft.delay(600);
const ratingAnimation = FadeInLeft.delay(700);
const descAnimation = FadeInLeft.delay(800);

/**
 * ProductDetailScreen - Detailed product view screen
 * Displays comprehensive product information with image carousel
 * Features:
 * - Image carousel with dot indicators
 * - Product details (name, price, description)
 * - Add to cart button with animation
 * - Back button navigation
 * - Fade-in animations for text elements
 * @component
 * @param {Props} props - Component props containing route with product data
 * @returns {React.ReactElement} Product detail screen
 */
export default function ProductDetailScreen({
  route,
}: Props): React.ReactElement {
  const { product } = route.params;
  const { name, price, rating, reviewCount, description, images } = product;

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Product Detail" showBackButton={true} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ImageCarousel images={images} product={product} />
        <Animated.Text entering={titleAnimation} style={styles.title}>
          {name}
        </Animated.Text>
        <Animated.Text entering={priceAnimation} style={styles.price}>
          ${price}
        </Animated.Text>
        {rating && (
          <Animated.View
            entering={ratingAnimation}
            style={styles.ratingContainer}
          >
            <Ionicons name="star" size={16} color="#e6cc05" />
            <Text style={styles.rating}>{rating}</Text>
            {reviewCount && (
              <Text style={styles.reviewCount}>({reviewCount} reviews)</Text>
            )}
          </Animated.View>
        )}
        <Animated.Text entering={descAnimation} style={styles.description}>
          {description}
        </Animated.Text>
      </ScrollView>
      <AddToCartButton product={product} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    margin: 16,
    color: '#1F4788',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 16,
    marginTop: 20,
    color: '#555555',
    lineHeight: 24,
  },
  price: {
    fontSize: 20,
    marginHorizontal: 16,
    fontWeight: '700',
    color: '#27AE60',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F39C12',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
