# 🛍️ Product Gallery App

A React Native product browsing app featuring smooth animations, shared element transitions, and a shopping cart.

---

## 🧰 Technical Stack

### Core Framework

| Technology   | Version |
| ------------ | ------- |
| React Native | 0.84.0  |
| TypeScript   | 5.x     |
| React        | 19.x    |

### Navigation

| Library                          | Purpose                |
| -------------------------------- | ---------------------- |
| `@react-navigation/native`       | Core navigation        |
| `@react-navigation/native-stack` | Native stack navigator |
| `react-native-safe-area-context` | Safe area handling     |

### Animation

| Library                      | Purpose                        |
| ---------------------------- | ------------------------------ |
| `react-native-reanimated` v4 | All animations and transitions |

Reanimated was chosen over the built-in Animated API because:

- Animations run entirely on the **UI thread** — no JS bridge crossing
- Supports **shared element transitions** between screens
- Provides `useAnimatedScrollHandler` for scroll-driven animations
- Consistent 60fps performance even under heavy JS load

### State Management

| Library   | Purpose           |
| --------- | ----------------- |
| `zustand` | Global cart state |

Zustand was chosen over Redux or Context API because:

- Minimal boilerplate — store set up in a single file
- Selective subscriptions prevent unnecessary re-renders
- Lightweight bundle size

### Icons

| Library                               | Purpose                     |
| ------------------------------------- | --------------------------- |
| `@react-native-vector-icons/ionicons` | UI icons throughout the app |

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AddToCartButton.tsx   # Animated add to cart button
│   ├── CartIcon.tsx          # Header cart icon with badge
│   ├── CarouselItem.tsx      # Single carousel image with scale animation
│   ├── CommonHeader.tsx      # Reusable header component
│   ├── DotIndicator.tsx      # Animated pagination dot
│   ├── ImageCarousel.tsx     # Horizontal image carousel
│   └── ProductCard.tsx       # Product card with staggered fade-in animation
├── navigation/
│   └── RootNavigator.tsx     # Stack navigator configuration
├── screens/
│   ├── ProductGalleryScreen.tsx   # Product listing screen
│   └── ProductDetailScreen.tsx    # Product detail screen
├── store/
│   └── useCartStore.ts       # Zustand cart store
├── data/
│   └── products.ts           # Static product data
└── types/
    └── Product.ts            # Product type definition
```

---

## ✨ Features

- **Product Gallery** — FlatList with performance optimisations
- **Staggered Animations** — Cards fade in with sequential delays on first load only
- **Shared Element Transitions** — Product image animates seamlessly from gallery card into detail screen
- **Image Carousel** — Horizontal paging carousel with scale interpolation and animated dot indicators
- **Animated Cart Badge** — Bounces when item count increases, skips animation on mount
- **Pulse Button Animation** — Add to Cart button pulses on press using opacity sequence

---

## ⚠️ Known Limitations & Trade-offs

### 1. Static Product Data

Products are loaded from a local `products.ts` file rather than a remote API. There is no loading state, error handling, or pagination.

### 2. No Remove From Cart on UI

While `removeFromCart` and `clearCart` actions exist in the Zustand store, there is no UI currently exposed to remove items. A cart screen would be needed to surface this functionality.

### 3. Shared Element Transition — First Image Only

The shared element transition is applied only to the first image in the carousel (`index === 0`). If the user has swiped to a different image before navigating back, the transition will still animate from/to the first image rather than the currently visible one.

### 4. Cart Badge Count Limit

The cart badge displays the raw item count with no upper limit cap. For counts above 99, the badge will expand beyond its intended circular shape. A common fix (`99+`) has not been implemented.

### 5. Image Loading States

`Animated.Image` components in the carousel have no loading placeholder or error fallback. On slow networks, images may appear blank until fully loaded.

### 6. No Unit or Integration Tests

The app ships without a test suite. Given the animation-heavy nature of the codebase, testing with React Native Testing Library and Reanimated's mock setup would be a valuable addition.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- React Native CLI
- Xcode (iOS) or Android Studio (Android)

### Installation

```bash
# Install dependencies
npm install

# iOS — install pods
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

---

## 🔧 Performance Optimisations Applied

| Technique                               | Where Used                      |
| --------------------------------------- | ------------------------------- |
| `React.memo`                            | All components                  |
| `useCallback`                           | Event handlers                  |
| `useMemo`                               | Carousel item and dot rendering |
| `useSharedValue` + UI thread animations | All Reanimated animations       |
| Selective Zustand selectors             | `CartIcon`, `AddToCartButton`   |
| `removeClippedSubviews`                 | FlatList                        |
| Extracted `renderItem` / `keyExtractor` | FlatList                        |
| `as const` for stable references        | Navigator screen options        |
| `useRef` guard for mount animation      | CartIcon                        |

## Profiling Insight

Performance was verified using the **React Native Performance Monitor** (accessible via the in-app developer menu) on iOS and Android simulators, as real device testing was not available. All animations are driven exclusively by Reanimated's `SharedValue` and `useAnimatedStyle`, ensuring zero JavaScript thread involvement during animation execution.

---

## 📩 Design Liaison Note

> **To:** Lead Product Designer
> **Re:** Animation Strategy & Implementation Notes

Hi,

I wanted to give you a quick update on how the animations were implemented across the product gallery app. Since there were no strict design specs provided for the animation behaviour, I made deliberate choices to balance visual quality with performance — specifically, all animations are driven by Reanimated V3's UI thread worklets using `useSharedValue` and `useAnimatedStyle`, which ensures 60 FPS without touching the JavaScript thread. For the carousel, I used an `interpolate`-based scale effect (0.9 → 1.0) and dual opacity/scale animations on the dot indicators to create a polished, responsive feel as users swipe between images. The shared element transition on the product image between the gallery and detail screen was implemented using Reanimated's `sharedTransitionTag`, giving the navigation a native, fluid quality. For the Add to Cart button, I opted for a `withTiming`-based opacity pulse rather than a spring animation, as timing functions are more predictable and less likely to overshoot on lower-end Android devices — this achieves a comparable tactile feel with better cross-device consistency. Happy to iterate on any of the animation curves or timings in the next sprint if you'd like to refine the feel further.

---

## 🙏 Thank You

Thank you for taking the time to review this submission. I thoroughly enjoyed building this app and exploring the capabilities of React Native Reanimated for smooth, performant animations. I put careful thought into every component — from the shared element transitions to the UI thread optimisations — and I hope it reflects my attention to detail and passion for crafting great mobile experiences. I look forward to your feedback and the opportunity to discuss the implementation further.
