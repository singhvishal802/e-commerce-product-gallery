import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductGalleryScreen from '../screens/ProductGalleryScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { Product } from '../types/Product';

/**
 * Root navigation stack parameter list
 * Defines all available screens and their parameters in the navigation stack
 */

export type RootStackParamList = {
  Gallery: undefined;
  Detail: { product: Product };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * RootNavigator component - Main navigation configuration
 * Sets up the native stack navigator with gallery and detail screens
 * Features:
 * - Fade animation between screens
 * - Custom header hidden
 * @component
 * @returns {React.ReactElement} Navigation stack navigator
 */

const screenOptions = {
  headerShown: false,
  animation: 'fade', // ✅ presentation removed (default value)
} as const;
export default function RootNavigator(): React.ReactElement {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Gallery" component={ProductGalleryScreen} />
      <Stack.Screen name="Detail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
