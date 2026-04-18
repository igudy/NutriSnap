import { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import VectorLine from '@/assets/food/vectorLine.svg';
import CheckBadge from '@/assets/food/checkBox.svg';
import { font, radii, shadow } from '@/lib/theme';
import { useThemeColors } from '@/lib/theme-context';

const { width } = Dimensions.get('window');

const slides = [
  { id: 'left', image: require('@/assets/food/foodLeft.png') },
  { id: 'bowl', image: require('@/assets/food/foodCenter.png') },
  { id: 'right', image: require('@/assets/food/foodRight.png') },
];

const SET_LENGTH = slides.length;

// Triple the slides so we can silently wrap the scroll position while the user sees a seamless loop.
const LOOPED_SLIDES = [0, 1, 2].flatMap((set) =>
  slides.map((s, i) => ({ ...s, _key: `${set}-${i}` }))
);

// Start in the middle set, on the bowl (middle slide) so neighbours peek on both sides.
const INITIAL_INDEX = SET_LENGTH + 1;

const CARD_WIDTH = Math.round(width * 0.62);
const SPACING = Math.round(width * 0.06);
const ITEM_SIZE = CARD_WIDTH + SPACING;
const SIDE_PADDING = (width - CARD_WIDTH) / 2;

export default function LandingScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const [active, setActive] = useState(INITIAL_INDEX % SET_LENGTH);
  const scrollRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(INITIAL_INDEX * ITEM_SIZE)).current;

  const handleGetStarted = () => {
    router.push('/(auth)/avatar-selection');
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / ITEM_SIZE);
    const dot = ((page % SET_LENGTH) + SET_LENGTH) % SET_LENGTH;
    if (dot !== active) setActive(dot);
  };

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const page = Math.round(x / ITEM_SIZE);
    if (page < SET_LENGTH) {
      scrollRef.current?.scrollTo({ x: (page + SET_LENGTH) * ITEM_SIZE, animated: false });
    } else if (page >= SET_LENGTH * 2) {
      scrollRef.current?.scrollTo({ x: (page - SET_LENGTH) * ITEM_SIZE, animated: false });
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.brand }}>
      <StatusBar style="light" />

      {/* Soft vector lines on the warm orange */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.35 }}>
        <VectorLine width="100%" height="100%" preserveAspectRatio="xMidYMin slice" />
      </View>

      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        {/* Wordmark */}
        <View className="items-center pt-2">
          <Text
            style={{
              fontFamily: font.bold,
              fontSize: 22,
              color: '#fff',
              letterSpacing: -0.3,
            }}>
            Nutri-Snap
          </Text>
        </View>

        {/* Arc carousel */}
        <View style={{ marginTop: 28 }}>
          <Animated.ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            decelerationRate="fast"
            contentOffset={{ x: INITIAL_INDEX * ITEM_SIZE, y: 0 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true, listener: handleScroll }
            )}
            onMomentumScrollEnd={handleMomentumEnd}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingHorizontal: SIDE_PADDING,
              paddingVertical: 12,
            }}>
            {LOOPED_SLIDES.map((s, i) => {
              const inputRange = [
                (i - 1) * ITEM_SIZE,
                i * ITEM_SIZE,
                (i + 1) * ITEM_SIZE,
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.82, 1, 0.82],
                extrapolate: 'clamp',
              });
              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [36, 0, 36],
                extrapolate: 'clamp',
              });
              const rotate = scrollX.interpolate({
                inputRange,
                outputRange: ['-10deg', '0deg', '10deg'],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.7, 1, 0.7],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={s._key}
                  style={{
                    width: CARD_WIDTH,
                    marginHorizontal: SPACING / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ scale }, { translateY }, { rotate }],
                    opacity,
                  }}>
                  {/* Placemat card behind the plate */}
                  <View
                    style={{
                      width: CARD_WIDTH,
                      height: CARD_WIDTH,
                      borderRadius: 28,
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={s.image}
                      style={{ width: CARD_WIDTH * 0.95, height: CARD_WIDTH * 0.95 }}
                      resizeMode="contain"
                    />
                  </View>
                </Animated.View>
              );
            })}
          </Animated.ScrollView>

          {/* Check badge tucked under the center plate */}
          <View style={{ alignItems: 'center', marginTop: -24 }} pointerEvents="none">
            <CheckBadge width={64} height={64} />
          </View>

          {/* Pagination */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 6,
              marginTop: 16,
            }}>
            {slides.map((_, i) => {
              const isActive = i === active;
              return (
                <Pressable
                  key={i}
                  onPress={() =>
                    scrollRef.current?.scrollTo({
                      x: (SET_LENGTH + i) * ITEM_SIZE,
                      animated: true,
                    })
                  }
                  style={{
                    width: isActive ? 22 : 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* Copy */}
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 28 }}>
          <Text
            style={{
              fontFamily: font.bold,
              fontSize: 44,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 50,
              letterSpacing: -0.8,
            }}>
            No logging.
          </Text>
          <Text
            style={{
              fontFamily: font.bold,
              fontSize: 44,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 50,
              letterSpacing: -0.8,
            }}>
            No hassle.
          </Text>

          <Text
            style={{
              fontFamily: font.medium,
              fontSize: 15,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              lineHeight: 22,
              marginTop: 18,
            }}>
            Just snap a photo of your meal and let AI{'\n'}
            track your macros automatically.{'\n'}
            View your weekly nutrition at a glance.
          </Text>
        </View>

        {/* CTA */}
        <View className="px-6 pb-4">
          <Pressable
            onPress={handleGetStarted}
            style={{
              borderRadius: radii.lg,
              backgroundColor: colors.espresso,
              paddingVertical: 20,
              alignItems: 'center',
              ...shadow.deep,
            }}>
            <Text
              style={{
                fontFamily: font.bold,
                fontSize: 17,
                color: '#fff',
                letterSpacing: 0.2,
              }}>
              Get started
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
