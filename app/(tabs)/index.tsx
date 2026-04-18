import { View, Text, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-gifted-charts';
import Svg, { Polyline } from 'react-native-svg';
import VectorLine from '@/assets/food/vectorLine.svg';
import Avatar4 from '@/assets/food/avatar4.svg';

const MACRO_COLORS = {
  protein: '#2D6A4F',
  carbs: '#52B788',
  fats: '#F4A261',
};

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

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 4,
};

const dailyBreakdown = [
  { day: 'Mon', meals: 1, kcal: 268, image: require('@/assets/food/foodCenter.png') },
  { day: 'Tue', meals: 2, kcal: 268, image: require('@/assets/food/foodLeft.png') },
  { day: 'Wed', meals: 2, kcal: 268, image: require('@/assets/food/foodRight.png') },
  { day: 'Thu', meals: 2, kcal: 268, image: require('@/assets/food/foodCenter.png') },
  { day: 'Fri', meals: 2, kcal: 268, image: require('@/assets/food/foodLeft.png') },
  { day: 'Sat', meals: 2, kcal: 268, image: require('@/assets/food/foodRight.png') },
];

export default function HomeScreen() {
  const username = 'Meeday';
  const totalKcal = 0;
  const protein = { grams: 10, percent: 10 };
  const carbs = { grams: 74, percent: 76 };
  const fats = { grams: 14, percent: 14 };

  const pieData =
    totalKcal <= 0
      ? [
          { value: protein.percent || 1, color: MACRO_COLORS.protein },
          { value: carbs.percent || 1, color: MACRO_COLORS.carbs },
          { value: fats.percent || 1, color: MACRO_COLORS.fats },
        ]
      : [
          { value: protein.percent, color: MACRO_COLORS.protein },
          { value: carbs.percent, color: MACRO_COLORS.carbs },
          { value: fats.percent, color: MACRO_COLORS.fats },
        ];

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const weekRange = `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;

  return (
    <View className="flex-1" style={{ backgroundColor: '#F9FAFB' }}>
      <StatusBar style="light" />

      {/* Orange Header */}
      <View style={{ backgroundColor: '#E34F00' }} className="relative">
        <View className="absolute inset-0" style={{ zIndex: 0 }}>
          <VectorLine width="100%" height="100%" preserveAspectRatio="xMidYMin slice" />
        </View>

        <SafeAreaView edges={['top']} style={{ zIndex: 1 }}>
          <View className="flex-row items-center px-6 pb-[12rem] pt-4">
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#FFE5D9',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'rgba(255,255,255,0.4)',
              }}>
              <Avatar4 width={50} height={50} />
            </View>

            <View className="ml-4 flex-1">
              <Text className="font-sans-bold text-2xl text-white">Hello {username}</Text>
              <Text className="mt-1 font-sans text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                How are you doing today?
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        style={{ marginTop: -100 }}>
        {/* Weekly Overview Card */}
        <View className="mx-5" style={cardStyle}>
          <Text className="text-center font-sans text-sm" style={{ color: '#9CA3AF' }}>
            {weekRange}
          </Text>
          <Text
            className="mb-6 mt-1 text-center font-sans-semibold text-lg"
            style={{ color: '#1F2937' }}>
            This Week{'\u2019'}s Overview
          </Text>

          {/* Chart + Legend Row */}
          <View className="flex-row items-center">
            <View>
              <PieChart
                data={pieData}
                donut
                radius={70}
                innerRadius={48}
                innerCircleColor="white"
                centerLabelComponent={() => (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text
                      style={{
                        fontFamily: 'GoogleSans-Bold',
                        fontSize: 28,
                        color: '#1F2937',
                      }}>
                      {totalKcal}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'GoogleSans-Regular',
                        fontSize: 13,
                        color: '#9CA3AF',
                        marginTop: -2,
                      }}>
                      kcal
                    </Text>
                  </View>
                )}
              />
            </View>

            {/* Legend */}
            <View className="ml-6 flex-1" style={{ gap: 14 }}>
              <View className="flex-row items-center">
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: MACRO_COLORS.protein,
                  }}
                />
                <Text className="ml-2 flex-1 font-sans text-sm" style={{ color: '#6B7280' }}>
                  Protein
                </Text>
                <Text className="font-sans-bold text-base" style={{ color: '#1F2937' }}>
                  {protein.grams}g
                </Text>
                <Text className="ml-2 font-sans text-sm" style={{ color: '#9CA3AF' }}>
                  {protein.percent}%
                </Text>
              </View>

              <View className="flex-row items-center">
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: MACRO_COLORS.carbs,
                  }}
                />
                <Text className="ml-2 flex-1 font-sans text-sm" style={{ color: '#6B7280' }}>
                  Carbs
                </Text>
                <Text className="font-sans-bold text-base" style={{ color: '#1F2937' }}>
                  {carbs.grams}g
                </Text>
                <Text className="ml-2 font-sans text-sm" style={{ color: '#9CA3AF' }}>
                  {carbs.percent}%
                </Text>
              </View>

              <View className="flex-row items-center">
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: MACRO_COLORS.fats,
                  }}
                />
                <Text className="ml-2 flex-1 font-sans text-sm" style={{ color: '#6B7280' }}>
                  Fats
                </Text>
                <Text className="font-sans-bold text-base" style={{ color: '#1F2937' }}>
                  {fats.grams}g
                </Text>
                <Text className="ml-2 font-sans text-sm" style={{ color: '#9CA3AF' }}>
                  {fats.percent}%
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Daily Breakdown */}
        <View className="relative mt-6 px-5 pb-10">
          {/* Subtle background vector lines */}
          <View
            className="absolute"
            style={{ top: 0, left: 0, right: 0, bottom: 0, opacity: 0.4 }}>
            <VectorLine width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          </View>

          {/* Header */}
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-sans-bold text-xl" style={{ color: '#1F2937' }}>
              Daily Breakdown
            </Text>
            <TrendUpIcon size={24} />
          </View>

          {/* Day Cards */}
          <View style={{ gap: 12 }}>
            {dailyBreakdown.map((item) => (
              <View
                key={item.day}
                style={{
                  backgroundColor: '#FFF8F5',
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {/* Day Circle */}
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: '#FFEDE6',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'GoogleSans-Bold',
                      fontSize: 13,
                      color: '#E34F00',
                    }}>
                    {item.day}
                  </Text>
                </View>

                {/* Meal Info */}
                <View className="ml-4 flex-1">
                  <Text className="font-sans-bold text-base" style={{ color: '#1F2937' }}>
                    {item.meals} {item.meals === 1 ? 'Meal' : 'Meals'}
                  </Text>
                  <Text className="mt-1 font-sans text-sm" style={{ color: '#9CA3AF' }}>
                    {item.kcal} kcal
                  </Text>
                </View>

                {/* Food Image */}
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    overflow: 'hidden',
                    backgroundColor: '#F3F4F6',
                  }}>
                  <Image
                    source={item.image}
                    style={{ width: 52, height: 52 }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom spacer */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
