import { View, Text, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Polyline, Line } from 'react-native-svg';
import VectorLine from '@/assets/food/vectorLine.svg';

// --- Inline icon components ---

function MealsTrackedIcon({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6h18M3 6v12a2 2 0 002 2h14a2 2 0 002-2V6M3 6l1-3h16l1 3"
        stroke="#E34F00"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 12c0 2.2 1.8 4 4 4s4-1.8 4-4"
        stroke="#E34F00"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function CaloriesIcon({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2c0 4-4 6-4 10a4 4 0 008 0c0-4-4-6-4-10z"
        stroke="#E34F00"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 18a2 2 0 002-2c0-2-2-3-2-5-0 2-2 3-2 5a2 2 0 002 2z"
        stroke="#E34F00"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ActiveDaysIcon({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={4}
        width={18}
        height={18}
        rx={2}
        stroke="#E34F00"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1={16} y1={2} x2={16} y2={6} stroke="#E34F00" strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={8} y1={2} x2={8} y2={6} stroke="#E34F00" strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={3} y1={10} x2={21} y2={10} stroke="#E34F00" strokeWidth={1.6} />
      <Path d="M9 15l2 2 4-4" stroke="#E34F00" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function TrendUpIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="23 6 13.5 15.5 8.5 10.5 1 18"
        stroke="#16A34A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="17 6 23 6 23 12"
        stroke="#16A34A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// --- Card style helper ---
const cardStyle = {
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 3,
};

// --- Dummy data ---
const stats = {
  mealsTracked: 258,
  calories: 258,
  activeDays: 5,
};

const dailyAverages = {
  protein: 1,
  carbs: 11,
  fats: 2,
};

const recentMeals = [
  {
    id: 1,
    day: 'Tue',
    kcal: 268,
    protein: 10,
    carbs: 74,
    fats: 14,
    image: require('@/assets/food/foodCenter.png'),
  },
];

export default function StatsScreen() {
  return (
    <View className="flex-1" style={{ backgroundColor: '#F9FAFB' }}>
      <StatusBar style="light" />

      {/* Orange Header */}
      <View style={{ backgroundColor: '#E34F00' }} className="relative">
        <View className="absolute inset-0" style={{ zIndex: 0 }}>
          <VectorLine width="100%" height="100%" preserveAspectRatio="xMidYMin slice" />
        </View>

        <SafeAreaView edges={['top']} style={{ zIndex: 1 }}>
          <View className="px-6 pb-32 pt-4">
            <Text className="font-sans-bold text-3xl text-white">Your Stats</Text>
            <Text className="mt-2 font-sans text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Weekly insights and progress
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        style={{ marginTop: -100 }}>
        {/* Summary Card */}
        <View className="mx-5" style={cardStyle}>
          <View className="flex-row justify-between">
            {/* Meals Tracked */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: '#FFF5F0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                <MealsTrackedIcon size={26} />
              </View>
              <Text
                style={{
                  fontFamily: 'GoogleSans-Bold',
                  fontSize: 32,
                  color: '#1F2937',
                }}>
                {stats.mealsTracked}
              </Text>
              <Text className="mt-1 font-sans text-xs" style={{ color: '#9CA3AF' }}>
                Meals Tracked
              </Text>
            </View>

            {/* Calories */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: '#FFF5F0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                <CaloriesIcon size={26} />
              </View>
              <Text
                style={{
                  fontFamily: 'GoogleSans-Bold',
                  fontSize: 32,
                  color: '#1F2937',
                }}>
                {stats.calories}
              </Text>
              <Text className="mt-1 font-sans text-xs" style={{ color: '#9CA3AF' }}>
                Calories
              </Text>
            </View>

            {/* Active Days */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: '#FFF5F0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                <ActiveDaysIcon size={26} />
              </View>
              <Text
                style={{
                  fontFamily: 'GoogleSans-Bold',
                  fontSize: 32,
                  color: '#1F2937',
                }}>
                {stats.activeDays}
              </Text>
              <Text className="mt-1 font-sans text-xs" style={{ color: '#9CA3AF' }}>
                Active Days
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Averages Card */}
        <View className="mx-5 mt-5" style={cardStyle}>
          {/* Header */}
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="font-sans-bold text-lg" style={{ color: '#1F2937' }}>
              Daily Averages
            </Text>
            <TrendUpIcon size={24} />
          </View>

          {/* Macro Cards */}
          <View className="flex-row" style={{ gap: 12 }}>
            {/* Protein */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#EFF6FF',
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#3B82F6',
                  marginBottom: 8,
                }}
              />
              <Text className="font-sans text-sm" style={{ color: '#6B7280' }}>
                Protein
              </Text>
              <Text
                style={{
                  fontFamily: 'GoogleSans-Bold',
                  fontSize: 22,
                  color: '#1F2937',
                  marginTop: 4,
                }}>
                {dailyAverages.protein}g
              </Text>
            </View>

            {/* Carbs */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFBEB',
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#F59E0B',
                  marginBottom: 8,
                }}
              />
              <Text className="font-sans text-sm" style={{ color: '#6B7280' }}>
                Carbs
              </Text>
              <Text
                style={{
                  fontFamily: 'GoogleSans-Bold',
                  fontSize: 22,
                  color: '#1F2937',
                  marginTop: 4,
                }}>
                {dailyAverages.carbs}g
              </Text>
            </View>

            {/* Fats */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFF1F2',
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#EF4444',
                  marginBottom: 8,
                }}
              />
              <Text className="font-sans text-sm" style={{ color: '#6B7280' }}>
                Fats
              </Text>
              <Text
                style={{
                  fontFamily: 'GoogleSans-Bold',
                  fontSize: 22,
                  color: '#1F2937',
                  marginTop: 4,
                }}>
                {dailyAverages.fats}g
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Meals Card */}
        <View className="mx-5 mb-8 mt-5" style={cardStyle}>
          <Text className="mb-5 font-sans-bold text-lg" style={{ color: '#1F2937' }}>
            Recent Meals
          </Text>

          {recentMeals.map((meal) => (
            <View key={meal.id} className="flex-row items-center">
              {/* Food Image */}
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  overflow: 'hidden',
                  backgroundColor: '#F3F4F6',
                }}>
                <Image
                  source={meal.image}
                  style={{ width: 56, height: 56 }}
                  resizeMode="cover"
                />
              </View>

              {/* Day + Calories */}
              <View className="ml-4 flex-1">
                <Text className="font-sans-bold text-base" style={{ color: '#1F2937' }}>
                  {meal.day}
                </Text>
                <Text className="mt-1 font-sans text-sm" style={{ color: '#9CA3AF' }}>
                  {meal.kcal} kcal
                </Text>
              </View>

              {/* Macro Breakdown */}
              <View style={{ alignItems: 'flex-end' }}>
                <Text className="font-sans text-sm" style={{ color: '#6B7280' }}>
                  P: {meal.protein}g
                </Text>
                <Text className="font-sans text-sm" style={{ color: '#6B7280' }}>
                  C: {meal.carbs}g
                </Text>
                <Text className="font-sans text-sm" style={{ color: '#6B7280' }}>
                  F: {meal.fats}g
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom spacer for tab bar */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
