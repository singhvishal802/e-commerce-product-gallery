import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import CartIcon from './CartIcon';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  /** The title text to display in the header */
  title: string;
  /** Whether to show a back button (optional, defaults to false) */
  showBackButton?: boolean;
}

/**
 * CommonHeader component - Reusable header for all screens
 * Features:
 * - Displays title text
 * - Optional back button for navigation
 * - Cart icon in the header
 * - Memoized to prevent unnecessary re-renders
 * @component
 * @param {Props} props - Component props
 * @returns {React.ReactElement} Header component
 */
const CommonHeader = React.memo(function CommonHeader({
  title,
  showBackButton = false,
}: Props): React.ReactElement {
  const navigation = useNavigation<any>();

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <Pressable onPress={handleBackPress}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </Pressable>
      ) : (
        <View style={{ width: 24 }} /> // placeholder to keep title centered
      )}
      <Text style={styles.title}>{title}</Text>
      <CartIcon />
    </View>
  );
});

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
  },
});
