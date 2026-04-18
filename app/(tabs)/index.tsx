import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-gifted-charts';
import { useRouter } from 'expo-router';
import Avatar4 from '@/assets/food/avatar4.svg';
import { font, radii, shadow } from '@/lib/theme';
import { useThemeColors } from '@/lib/theme-context';
import {
  BellIcon,
  FlameIcon,
  TrendUpIcon,
  SparkleIcon,
  WaterDropIcon,
  TargetIcon,
  ChevronRightIcon,
  BoltIcon,
} from '@/lib/icons';

const recentMeals = [
  { day: 'Mon', meals: 1, kcal: 268, image: require('@/assets/food/foodCenter.png'), name: 'Breakfast bowl' },
  { day: 'Tue', meals: 2, kcal: 412, image: require('@/assets/food/foodLeft.png'), name: 'Grilled salmon' },
  { day: 'Wed', meals: 2, kcal: 528, image: require('@/assets/food/foodRight.png'), name: 'Pasta primavera' },
  { day: 'Thu', meals: 2, kcal: 305, image: require('@/assets/food/foodCenter.png'), name: 'Avocado toast' },
];

export default function HomeScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const MACRO_COLORS = {
    protein: colors.protein,
    carbs: colors.carbs,
    fats: colors.fats,
  };
  const username = 'Meeday';
  const totalKcal = 1248;
  const goalKcal = 2000;
  const protein = { grams: 87, percent: 32 };
  const carbs = { grams: 156, percent: 52 };
  const fats = { grams: 42, percent: 16 };
  const streak = 12;
  const water = { cups: 5, goal: 8 };
  const progress = Math.min(totalKcal / goalKcal, 1);

  const pieData = [
    { value: protein.percent, color: MACRO_COLORS.protein },
    { value: carbs.percent, color: MACRO_COLORS.carbs },
    { value: fats.percent, color: MACRO_COLORS.fats },
  ];

  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const greeting = (() => {
    const hr = today.getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.cream }}>
      <StatusBar style="dark" />

      {/* Subtle warm wash at the very top */}
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
        {/* Top strip: greeting + bell */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-5">
          <View className="flex-row items-center" style={{ gap: 12 }}>
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: colors.surfaceWarm,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Avatar4 width={42} height={42} />
            </View>
            <View>
              <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textMuted }}>
                {greeting}
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 20, color: colors.text, marginTop: 1, letterSpacing: -0.3 }}>
                {username}
              </Text>
            </View>
          </View>

          <Pressable
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: colors.surface,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.borderSoft,
              ...shadow.soft,
            }}>
            <BellIcon size={18} color={colors.text} />
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.brand,
                borderWidth: 1.5,
                borderColor: colors.surface,
              }}
            />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Streak + water stats */}
        <View className="flex-row px-5 mb-4" style={{ gap: 10 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              borderRadius: 18,
              padding: 14,
              borderWidth: 1,
              borderColor: colors.borderSoft,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              ...shadow.soft,
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#FFEFE0',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FlameIcon size={20} color={colors.brand} />
            </View>
            <View>
              <Text style={{ fontFamily: font.regular, fontSize: 10, color: colors.textMuted, letterSpacing: 0.5 }}>
                STREAK
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 18, color: colors.text }}>
                {streak} days
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              borderRadius: 18,
              padding: 14,
              borderWidth: 1,
              borderColor: colors.borderSoft,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              ...shadow.soft,
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#DBEAFE',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <WaterDropIcon size={18} color={colors.info} />
            </View>
            <View>
              <Text style={{ fontFamily: font.regular, fontSize: 10, color: colors.textMuted, letterSpacing: 0.5 }}>
                WATER
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 18, color: colors.text }}>
                {water.cups}/{water.goal}
              </Text>
            </View>
          </View>
        </View>

        {/* Hero calorie card */}
        <View
          className="mx-5"
          style={{
            backgroundColor: colors.surface,
            borderRadius: 28,
            padding: 22,
            ...shadow.card,
            borderWidth: 1,
            borderColor: colors.borderSoft,
          }}>
          <View className="flex-row items-start justify-between mb-2">
            <View>
              <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textMuted, letterSpacing: 0.5 }}>
                TODAY{'\u2019'}S INTAKE
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 18, color: colors.text, marginTop: 4 }}>
                Daily Progress
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                backgroundColor: colors.successSoft,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999,
              }}>
              <TrendUpIcon size={12} color={colors.success} />
              <Text style={{ fontFamily: font.semibold, fontSize: 11, color: colors.success }}>
                On track
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mt-4">
            {/* Ring chart */}
            <View style={{ position: 'relative' }}>
              <PieChart
                data={pieData}
                donut
                radius={74}
                innerRadius={56}
                innerCircleColor={colors.surface}
                centerLabelComponent={() => (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: font.bold, fontSize: 30, color: colors.text }}>
                      {totalKcal}
                    </Text>
                    <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted }}>
                      / {goalKcal} kcal
                    </Text>
                  </View>
                )}
              />
            </View>

            {/* Macro rows */}
            <View className="flex-1 ml-4" style={{ gap: 10 }}>
              <MacroRow color={MACRO_COLORS.protein} label="Protein" grams={protein.grams} percent={protein.percent} />
              <MacroRow color={MACRO_COLORS.carbs} label="Carbs" grams={carbs.grams} percent={carbs.percent} />
              <MacroRow color={MACRO_COLORS.fats} label="Fats" grams={fats.grams} percent={fats.percent} />
            </View>
          </View>

          {/* Linear goal progress */}
          <View style={{ marginTop: 18 }}>
            <View className="flex-row items-center justify-between mb-2">
              <Text style={{ fontFamily: font.medium, fontSize: 12, color: colors.textMuted }}>
                Goal progress
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 12, color: colors.text }}>
                {Math.round(progress * 100)}%
              </Text>
            </View>
            <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.surfaceMuted, overflow: 'hidden' }}>
              <View
                style={{
                  width: `${progress * 100}%`,
                  height: '100%',
                  borderRadius: 4,
                  backgroundColor: colors.brand,
                }}
              />
            </View>
          </View>
        </View>

        {/* Quick actions */}
        <View className="mx-5" style={{ marginTop: 18 }}>
          <View className="flex-row items-center justify-between mb-3">
            <Text style={{ fontFamily: font.bold, fontSize: 16, color: colors.text }}>
              Quick actions
            </Text>
          </View>
          <View className="flex-row" style={{ gap: 10 }}>
            <QuickAction
              icon={<SparkleIcon size={18} color={colors.gold} />}
              label="Snap meal"
              sub="AI analysis"
              onPress={() => router.push('/camera')}
              tintBg="#FFF7E6"
            />
            <QuickAction
              icon={<TargetIcon size={18} color={colors.brand} />}
              label="Set goal"
              sub="Daily target"
              tintBg={colors.surfaceWarm}
            />
            <QuickAction
              icon={<BoltIcon size={18} color="#7C3AED" />}
              label="Insights"
              sub="Weekly"
              tintBg="#F3EEFF"
            />
          </View>
        </View>

        {/* AI insight banner */}
        <Pressable
          className="mx-5"
          style={{
            marginTop: 18,
            borderRadius: 24,
            ...shadow.card,
            backgroundColor: colors.brand,
            padding: 18,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
          }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              backgroundColor: 'rgba(255,255,255,0.22)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SparkleIcon size={22} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: font.regular, fontSize: 11, color: 'rgba(255,255,255,0.9)', letterSpacing: 0.5 }}>
              AI INSIGHT
            </Text>
            <Text style={{ fontFamily: font.bold, fontSize: 15, color: '#fff', marginTop: 2 }}>
              You{'\u2019'}re 12% over your carbs today
            </Text>
            <Text style={{ fontFamily: font.regular, fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 2 }}>
              Try a lean protein snack next.
            </Text>
          </View>
          <ChevronRightIcon size={18} color="#fff" />
        </Pressable>

        {/* Recent meals */}
        <View className="mx-5" style={{ marginTop: 22 }}>
          <View className="flex-row items-center justify-between mb-3">
            <Text style={{ fontFamily: font.bold, fontSize: 18, color: colors.text }}>
              Recent meals
            </Text>
            <Pressable>
              <Text style={{ fontFamily: font.medium, fontSize: 13, color: colors.brand }}>
                See all
              </Text>
            </Pressable>
          </View>

          <View style={{ gap: 10 }}>
            {recentMeals.map((item) => (
              <View
                key={item.day}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: radii.lg,
                  padding: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...shadow.soft,
                  borderWidth: 1,
                  borderColor: colors.borderSoft,
                }}>
                <View
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 16,
                    overflow: 'hidden',
                    backgroundColor: colors.surfaceMuted,
                  }}>
                  <Image source={item.image} style={{ width: 54, height: 54 }} resizeMode="cover" />
                </View>
                <View className="ml-3 flex-1">
                  <Text style={{ fontFamily: font.semibold, fontSize: 14, color: colors.text }}>
                    {item.name}
                  </Text>
                  <View className="flex-row items-center mt-1" style={{ gap: 6 }}>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 999,
                        backgroundColor: colors.surfaceWarm,
                      }}>
                      <Text style={{ fontFamily: font.medium, fontSize: 11, color: colors.brand }}>
                        {item.day}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textMuted }}>
                      {item.meals} {item.meals === 1 ? 'meal' : 'meals'}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontFamily: font.bold, fontSize: 16, color: colors.text }}>
                    {item.kcal}
                  </Text>
                  <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted }}>
                    kcal
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function MacroRow({ color, label, grams, percent }: { color: string; label: string; grams: number; percent: number }) {
  const colors = useThemeColors();
  return (
    <View>
      <View className="flex-row items-center justify-between" style={{ marginBottom: 4 }}>
        <View className="flex-row items-center" style={{ gap: 6 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
          <Text style={{ fontFamily: font.medium, fontSize: 12, color: colors.textMuted }}>
            {label}
          </Text>
        </View>
        <Text style={{ fontFamily: font.bold, fontSize: 13, color: colors.text }}>
          {grams}g
        </Text>
      </View>
      <View style={{ height: 5, backgroundColor: colors.surfaceMuted, borderRadius: 3, overflow: 'hidden' }}>
        <View style={{ width: `${percent}%`, height: '100%', backgroundColor: color, borderRadius: 3 }} />
      </View>
    </View>
  );
}

function QuickAction({
  icon,
  label,
  sub,
  tintBg,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  tintBg: string;
  onPress?: () => void;
}) {
  const colors = useThemeColors();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        padding: 14,
        ...shadow.soft,
        borderWidth: 1,
        borderColor: colors.borderSoft,
      }}>
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: tintBg,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        {icon}
      </View>
      <Text style={{ fontFamily: font.bold, fontSize: 13, color: colors.text }}>{label}</Text>
      <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
        {sub}
      </Text>
    </Pressable>
  );
}
