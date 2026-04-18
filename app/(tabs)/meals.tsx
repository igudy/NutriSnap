import { View, Text, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { font, radii, shadow } from '@/lib/theme';
import { useTheme, useThemeColors } from '@/lib/theme-context';
import { PlusIcon, SparkleIcon, FlameIcon } from '@/lib/icons';
import Svg, { Path, Circle } from 'react-native-svg';

const filters = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

const meals = [
  {
    id: 1,
    name: 'Avocado toast & eggs',
    time: 'Today, 8:30 AM',
    type: 'Breakfast',
    kcal: 412,
    protein: 22,
    carbs: 38,
    fats: 19,
    image: require('@/assets/food/foodCenter.png'),
    rating: 'high',
  },
  {
    id: 2,
    name: 'Grilled chicken bowl',
    time: 'Today, 1:15 PM',
    type: 'Lunch',
    kcal: 568,
    protein: 45,
    carbs: 52,
    fats: 18,
    image: require('@/assets/food/foodLeft.png'),
    rating: 'balanced',
  },
  {
    id: 3,
    name: 'Greek yogurt & berries',
    time: 'Yesterday, 3:00 PM',
    type: 'Snack',
    kcal: 186,
    protein: 16,
    carbs: 24,
    fats: 3,
    image: require('@/assets/food/foodRight.png'),
    rating: 'light',
  },
  {
    id: 4,
    name: 'Salmon with quinoa',
    time: 'Yesterday, 7:30 PM',
    type: 'Dinner',
    kcal: 624,
    protein: 42,
    carbs: 48,
    fats: 26,
    image: require('@/assets/food/foodCenter.png'),
    rating: 'high',
  },
];

function SearchIcon({ size = 18, color = '#A8A29E' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={1.8} />
      <Path d="M20 20l-3.5-3.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export default function MealsScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? meals : meals.filter((m) => m.type === activeFilter);
  const totalKcal = filtered.reduce((sum, m) => sum + m.kcal, 0);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.cream }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Soft warm wash at the top */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 260,
          backgroundColor: colors.brand,
          opacity: 0.08,
        }}
      />

      <SafeAreaView edges={['top']}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
          <View>
            <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textMuted }}>
              Meal journal
            </Text>
            <Text style={{ fontFamily: font.bold, fontSize: 26, color: colors.text, letterSpacing: -0.5, marginTop: 2 }}>
              Your meals
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/camera')}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.brand,
              justifyContent: 'center',
              alignItems: 'center',
              ...shadow.brand,
            }}>
            <PlusIcon size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Search */}
        <View className="px-5 pb-3">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              backgroundColor: colors.surface,
              borderRadius: radii.pill,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: colors.borderSoft,
              ...shadow.soft,
            }}>
            <SearchIcon size={18} color={colors.textSubtle} />
            <TextInput
              placeholder="Search meals, ingredients..."
              placeholderTextColor={colors.textSubtle}
              style={{
                flex: 1,
                fontFamily: font.regular,
                fontSize: 14,
                color: colors.text,
                paddingVertical: 12,
              }}
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Summary card */}
      <View className="px-5 pb-3">
        <View
          style={{
            borderRadius: 24,
            ...shadow.soft,
            backgroundColor: colors.surface,
            padding: 18,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.borderSoft,
          }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: font.regular,
                fontSize: 11,
                color: colors.textMuted,
                letterSpacing: 0.5,
              }}>
              THIS WEEK
            </Text>
            <Text
              style={{
                fontFamily: font.bold,
                fontSize: 24,
                color: colors.text,
                marginTop: 4,
                letterSpacing: -0.5,
              }}>
              {meals.length} meals tracked
            </Text>
            <View className="flex-row items-center mt-2" style={{ gap: 8 }}>
              <View className="flex-row items-center" style={{ gap: 4 }}>
                <FlameIcon size={12} color={colors.brand} />
                <Text style={{ fontFamily: font.semibold, fontSize: 12, color: colors.text }}>
                  {totalKcal} kcal
                </Text>
              </View>
              <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textSubtle }}>
                {'\u00B7'}
              </Text>
              <View className="flex-row items-center" style={{ gap: 4 }}>
                <SparkleIcon size={11} color={colors.gold} />
                <Text style={{ fontFamily: font.medium, fontSize: 12, color: colors.textMuted }}>
                  AI analyzed
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: colors.surfaceWarm,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontFamily: font.bold, fontSize: 22, color: colors.brand }}>
              {meals.length}
            </Text>
          </View>
        </View>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, maxHeight: 52 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 8,
          paddingVertical: 8,
          alignItems: 'center',
        }}>
        {filters.map((f) => {
          const active = activeFilter === f;
          return (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: active ? (isDark ? colors.brand : colors.espresso) : colors.surface,
                borderWidth: 1,
                borderColor: active ? (isDark ? colors.brand : colors.espresso) : colors.border,
              }}>
              <Text
                style={{
                  fontFamily: font.semibold,
                  fontSize: 13,
                  color: active ? '#fff' : colors.textMuted,
                }}>
                {f}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Meals list */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140, gap: 12, paddingTop: 4 }}>
        {filtered.map((meal) => (
          <View
            key={meal.id}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 20,
              padding: 14,
              ...shadow.soft,
              borderWidth: 1,
              borderColor: colors.borderSoft,
            }}>
            <View className="flex-row">
              <View
                style={{
                  width: 86,
                  height: 86,
                  borderRadius: 16,
                  overflow: 'hidden',
                  backgroundColor: colors.surfaceMuted,
                }}>
                <Image source={meal.image} style={{ width: 86, height: 86 }} resizeMode="cover" />
              </View>

              <View className="flex-1 ml-3">
                <View className="flex-row items-start justify-between">
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: font.bold, fontSize: 15, color: colors.text }}>
                      {meal.name}
                    </Text>
                    <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                      {meal.time}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 999,
                      backgroundColor: colors.surfaceWarm,
                    }}>
                    <Text style={{ fontFamily: font.semibold, fontSize: 10, color: colors.brand, letterSpacing: 0.4 }}>
                      {meal.type.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mt-3" style={{ gap: 10 }}>
                  <View className="flex-row items-center" style={{ gap: 4 }}>
                    <FlameIcon size={14} color={colors.brand} />
                    <Text style={{ fontFamily: font.bold, fontSize: 13, color: colors.text }}>
                      {meal.kcal} kcal
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Macros strip */}
            <View
              className="flex-row mt-3 pt-3"
              style={{ borderTopWidth: 1, borderTopColor: colors.borderSoft, gap: 12 }}>
              <MacroChip label="P" value={meal.protein} color={colors.protein} />
              <MacroChip label="C" value={meal.carbs} color={colors.carbs} />
              <MacroChip label="F" value={meal.fats} color={colors.fats} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function MacroChip({ label, value, color }: { label: string; value: number; color: string }) {
  const colors = useThemeColors();
  return (
    <View className="flex-1 flex-row items-center" style={{ gap: 8 }}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: color + '20',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontFamily: font.bold, fontSize: 10, color }}>{label}</Text>
      </View>
      <Text style={{ fontFamily: font.semibold, fontSize: 12, color: colors.text }}>
        {value}
        <Text style={{ fontFamily: font.regular, color: colors.textMuted }}>g</Text>
      </Text>
    </View>
  );
}
