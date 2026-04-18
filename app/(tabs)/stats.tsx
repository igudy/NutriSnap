import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { font, radii, shadow } from '@/lib/theme';
import { useThemeColors } from '@/lib/theme-context';
import {
  FlameIcon,
  TrendUpIcon,
  SparkleIcon,
  TargetIcon,
  CrownIcon,
  BoltIcon,
} from '@/lib/icons';

const ranges = ['Week', 'Month', 'Year'];

const weightData = [
  { value: 78.2 }, { value: 77.8 }, { value: 77.5 }, { value: 77.1 }, { value: 76.8 },
  { value: 76.4 }, { value: 76.0 }, { value: 75.6 },
];

export default function StatsScreen() {
  const colors = useThemeColors();
  const [range, setRange] = useState('Week');

  const weeklyCalories = [
    { value: 1820, label: 'M' },
    { value: 2150, label: 'T' },
    { value: 1940, label: 'W' },
    { value: 2280, label: 'T' },
    { value: 1780, label: 'F' },
    { value: 2050, label: 'S' },
    { value: 1248, label: 'S', frontColor: colors.brand },
  ];

  const avgCalories = Math.round(weeklyCalories.reduce((s, i) => s + i.value, 0) / weeklyCalories.length);
  const avgProtein = 92;
  const streak = 12;
  const weightChange = -2.2;

  return (
    <View className="flex-1" style={{ backgroundColor: colors.cream }}>
      <StatusBar style="dark" />

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
        <View className="px-5 pt-3 pb-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textMuted }}>
                This week
              </Text>
              <Text
                style={{
                  fontFamily: font.bold,
                  fontSize: 26,
                  color: colors.text,
                  letterSpacing: -0.5,
                  marginTop: 2,
                }}>
                Your performance
              </Text>
            </View>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: colors.surfaceWarm,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CrownIcon size={18} color={colors.gold} />
            </View>
          </View>

          {/* Range toggle */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: colors.surface,
              borderRadius: 999,
              padding: 4,
              marginTop: 18,
              borderWidth: 1,
              borderColor: colors.borderSoft,
              ...shadow.soft,
            }}>
            {ranges.map((r) => {
              const active = range === r;
              return (
                <Pressable
                  key={r}
                  onPress={() => setRange(r)}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 999,
                    backgroundColor: active ? colors.brand : 'transparent',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: active ? font.bold : font.medium,
                      fontSize: 13,
                      color: active ? '#fff' : colors.textMuted,
                    }}>
                    {r}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, paddingTop: 10 }}>
        {/* KPI Grid */}
        <View className="px-5">
          <View className="flex-row" style={{ gap: 10, marginBottom: 10 }}>
            <KpiCard
              icon={<FlameIcon size={18} color={colors.brand} />}
              tintBg="#FFEFE0"
              label="Avg calories"
              value={avgCalories}
              unit="kcal/day"
              trend="+3.2%"
              trendColor={colors.success}
            />
            <KpiCard
              icon={<BoltIcon size={18} color="#7C3AED" />}
              tintBg="#F3EEFF"
              label="Avg protein"
              value={avgProtein}
              unit="g/day"
              trend="+8%"
              trendColor={colors.success}
            />
          </View>
          <View className="flex-row" style={{ gap: 10 }}>
            <KpiCard
              icon={<TargetIcon size={18} color={colors.success} />}
              tintBg={colors.successSoft}
              label="Streak"
              value={streak}
              unit="days"
              trend="Record"
              trendColor={colors.brand}
            />
            <KpiCard
              icon={<TrendUpIcon size={18} color="#2563EB" />}
              tintBg="#DBEAFE"
              label="Weight"
              value={`${weightChange}`}
              unit="kg this month"
              trend="On goal"
              trendColor={colors.success}
            />
          </View>
        </View>

        {/* Calorie bar chart */}
        <View className="mx-5 mt-4" style={{ backgroundColor: colors.surface, borderRadius: 24, padding: 20, ...shadow.card, borderWidth: 1, borderColor: colors.borderSoft }}>
          <View className="flex-row items-center justify-between mb-1">
            <View>
              <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted, letterSpacing: 0.5 }}>
                DAILY CALORIES
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 18, color: colors.text, marginTop: 2 }}>
                This week
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
                +3.2%
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <BarChart
              data={weeklyCalories}
              barWidth={18}
              barBorderRadius={6}
              frontColor={colors.espresso}
              yAxisTextStyle={{ color: colors.textSubtle, fontSize: 10 }}
              xAxisLabelTextStyle={{ color: colors.textMuted, fontSize: 11, fontFamily: font.medium }}
              noOfSections={4}
              maxValue={2500}
              yAxisThickness={0}
              xAxisThickness={0}
              rulesType="solid"
              rulesColor={colors.borderSoft}
              spacing={18}
              height={160}
              disableScroll
            />
          </View>
        </View>

        {/* Weight line chart */}
        <View className="mx-5 mt-4" style={{ backgroundColor: colors.surface, borderRadius: 24, padding: 20, ...shadow.card, borderWidth: 1, borderColor: colors.borderSoft }}>
          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted, letterSpacing: 0.5 }}>
                WEIGHT PROGRESS
              </Text>
              <Text style={{ fontFamily: font.bold, fontSize: 18, color: colors.text, marginTop: 2 }}>
                75.6 kg
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
              <Text style={{ fontFamily: font.semibold, fontSize: 11, color: colors.success }}>
                -2.6 kg
              </Text>
            </View>
          </View>

          <LineChart
            data={weightData}
            color={colors.brand}
            thickness={3}
            curved
            startFillColor={colors.brand}
            endFillColor="#FFFFFF"
            startOpacity={0.3}
            endOpacity={0.02}
            areaChart
            hideRules
            hideDataPoints={false}
            dataPointsColor={colors.brand}
            dataPointsRadius={4}
            yAxisTextStyle={{ color: colors.textSubtle, fontSize: 10 }}
            xAxisColor={colors.borderSoft}
            yAxisColor={colors.borderSoft}
            height={140}
            initialSpacing={10}
            spacing={38}
            noOfSections={4}
            disableScroll
          />
        </View>

        {/* Achievements */}
        <View className="mx-5 mt-4">
          <Text style={{ fontFamily: font.bold, fontSize: 16, color: colors.text, marginBottom: 10 }}>
            Achievements
          </Text>
          <View className="flex-row flex-wrap" style={{ gap: 10 }}>
            <AchievementCard title="12 day streak" sub="Consistency king" icon={'\u{1F525}'} accent={colors.brand} />
            <AchievementCard title="Protein pro" sub="92g average" icon={'\u{1F4AA}'} accent={colors.info} />
            <AchievementCard title="Hydration hero" sub="8 cups a day" icon={'\u{1F4A7}'} accent={colors.success} />
            <AchievementCard title="Goal crusher" sub="-2.6 kg" icon={'\u{1F3C6}'} accent={colors.gold} />
          </View>
        </View>

        {/* AI summary */}
        <View
          className="mx-5 mt-5"
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            ...shadow.card,
            backgroundColor: colors.espresso,
            padding: 20,
          }}>
          <View className="flex-row items-center" style={{ gap: 10, marginBottom: 10 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: 'rgba(201, 169, 89, 0.25)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SparkleIcon size={18} color={colors.goldLight} />
              </View>
              <Text
                style={{
                  fontFamily: font.regular,
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: 1,
                }}>
                WEEKLY AI SUMMARY
              </Text>
            </View>
            <Text
              style={{
                fontFamily: font.bold,
                fontSize: 18,
                color: '#fff',
                lineHeight: 26,
                letterSpacing: -0.2,
              }}>
              Your protein intake is up 8% — muscle recovery windows are hitting consistently.
              Keep carbs moderate and you{'\u2019'}ll see another 1 kg by next week.
            </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function KpiCard({
  icon,
  tintBg,
  label,
  value,
  unit,
  trend,
  trendColor,
}: {
  icon: React.ReactNode;
  tintBg: string;
  label: string;
  value: string | number;
  unit: string;
  trend: string;
  trendColor: string;
}) {
  const colors = useThemeColors();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 14,
        ...shadow.soft,
        borderWidth: 1,
        borderColor: colors.borderSoft,
      }}>
      <View className="flex-row items-center justify-between mb-2">
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 12,
            backgroundColor: tintBg,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {icon}
        </View>
        <Text style={{ fontFamily: font.semibold, fontSize: 10, color: trendColor }}>
          {trend}
        </Text>
      </View>
      <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted, marginTop: 4 }}>
        {label}
      </Text>
      <Text style={{ fontFamily: font.bold, fontSize: 22, color: colors.text, marginTop: 2, letterSpacing: -0.5 }}>
        {value}
      </Text>
      <Text style={{ fontFamily: font.regular, fontSize: 10, color: colors.textSubtle }}>
        {unit}
      </Text>
    </View>
  );
}

function AchievementCard({
  title,
  sub,
  icon,
  accent,
}: {
  title: string;
  sub: string;
  icon: string;
  accent: string;
}) {
  const colors = useThemeColors();
  return (
    <View
      style={{
        flexBasis: '48%',
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        padding: 14,
        ...shadow.soft,
        borderWidth: 1,
        borderColor: colors.borderSoft,
      }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: accent + '20',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
      </View>
      <Text style={{ fontFamily: font.bold, fontSize: 13, color: colors.text }}>{title}</Text>
      <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
        {sub}
      </Text>
    </View>
  );
}
