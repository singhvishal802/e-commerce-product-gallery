import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import CommonHeader from '../components/CommonHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '../types/Product';

/**
 * ProductGalleryScreen - Main product listing screen
 * Displays all products in a scrollable list with product cards
 * Features:
 * - FlatList rendering for performance
 * - Product cards with animations
 * - Navigation to product detail screen
 * - Header with title and cart icon
 * @component
 * @returns {React.ReactElement} Product gallery screen
 */

interface Props {
  item: Product;
  index: number;
}
const keyExtractor = (item: Product) => item.id.toString();
const renderItem = ({ item, index }: Props): React.ReactElement => (
  <ProductCard product={item} index={index} />
);
export default function ProductGalleryScreen(): React.ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Product Gallery" />
      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
