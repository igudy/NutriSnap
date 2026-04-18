import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { font, shadow } from '@/lib/theme';
import { useThemeColors } from '@/lib/theme-context';
import {
  ArrowLeftIcon,
  SparkleIcon,
  FlameIcon,
  CheckIcon,
  BoltIcon,
  TrendUpIcon,
} from '@/lib/icons';

const fallbackImage = require('@/assets/food/foodCenter.png');

type Macro = { grams: number; percent: number; kcal: number };

export default function AnalysisScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  const dishName = 'Mixed bowl';
  const confidence = 94;
  const healthScore = 82;
  const totalCalories = 548;
  const protein: Macro = { grams: 37, percent: 32, kcal: 148 };
  const carbs: Macro = { grams: 74, percent: 52, kcal: 296 };
  const fats: Macro = { grams: 12, percent: 16, kcal: 104 };

  const ingredients = [
    { name: 'Grilled chicken breast', portion: '120g', kcal: 198 },
    { name: 'Quinoa', portion: '80g', kcal: 112 },
    { name: 'Avocado', portion: '50g', kcal: 80 },
    { name: 'Cherry tomatoes', portion: '60g', kcal: 18 },
    { name: 'Olive oil drizzle', portion: '8g', kcal: 70 },
  ];

  const insights = [
    { label: 'Protein-rich', tone: 'good' },
    { label: 'Balanced macros', tone: 'good' },
    { label: 'Watch sodium', tone: 'warn' },
  ];

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
          height: 380,
          backgroundColor: colors.brand,
          opacity: 0.08,
        }}
      />

      <SafeAreaView edges={['top']}>
        <View className="flex-row items-center justify-between px-5 pt-2 pb-2">
          <Pressable
            onPress={() => router.back()}
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
            <ArrowLeftIcon size={18} color={colors.text} />
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: colors.successSoft,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
            }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success }} />
            <Text style={{ fontFamily: font.semibold, fontSize: 11, color: colors.success, letterSpacing: 0.5 }}>
              ANALYZED
            </Text>
          </View>
          <View style={{ width: 42 }} />
        </View>

        <View className="items-center px-5 pt-3" style={{ paddingBottom: 22 }}>
          {/* Food image on a soft warm plate */}
          <View style={{ position: 'relative', alignItems: 'center', marginBottom: 18 }}>
            <View
              style={{
                position: 'absolute',
                width: 210,
                height: 210,
                borderRadius: 105,
                backgroundColor: colors.surfaceWarm,
              }}
            />
            <View
              style={{
                width: 180,
                height: 180,
                borderRadius: 90,
                overflow: 'hidden',
                backgroundColor: colors.surfaceMuted,
                ...shadow.soft,
              }}>
              <Image
                source={photoUri ? { uri: photoUri } : fallbackImage}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            {/* Confidence badge */}
            <View
              style={{
                position: 'absolute',
                bottom: -14,
                backgroundColor: colors.surface,
                borderRadius: 999,
                paddingVertical: 7,
                paddingHorizontal: 14,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                borderWidth: 1,
                borderColor: colors.borderSoft,
                ...shadow.card,
              }}>
              <SparkleIcon size={12} color={colors.gold} />
              <Text style={{ fontFamily: font.bold, fontSize: 12, color: colors.text }}>
                {confidence}% match
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: font.bold,
              fontSize: 28,
              color: colors.text,
              letterSpacing: -0.5,
              marginTop: 8,
            }}>
            {dishName}
          </Text>
          <Text
            style={{
              fontFamily: font.regular,
              fontSize: 13,
              color: colors.textMuted,
              marginTop: 4,
            }}>
            {ingredients.length} ingredients detected
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 110, paddingTop: 18 }}>
        {/* Calories + Health score row */}
        <View className="px-5 flex-row" style={{ gap: 10 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              borderRadius: 22,
              padding: 16,
              ...shadow.soft,
              borderWidth: 1,
              borderColor: colors.borderSoft,
            }}>
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 11,
                backgroundColor: '#FFEFE0',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <FlameIcon size={17} color={colors.brand} />
            </View>
            <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted, letterSpacing: 0.5 }}>
              CALORIES
            </Text>
            <Text style={{ fontFamily: font.bold, fontSize: 26, color: colors.text, marginTop: 2, letterSpacing: -0.5 }}>
              {totalCalories}
              <Text style={{ fontFamily: font.regular, fontSize: 13, color: colors.textSubtle }}> kcal</Text>
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              borderRadius: 22,
              padding: 16,
              ...shadow.soft,
              borderWidth: 1,
              borderColor: colors.borderSoft,
            }}>
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 11,
                backgroundColor: colors.successSoft,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <TrendUpIcon size={17} color={colors.success} />
            </View>
            <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted, letterSpacing: 0.5 }}>
              HEALTH SCORE
            </Text>
            <Text style={{ fontFamily: font.bold, fontSize: 26, color: colors.text, marginTop: 2, letterSpacing: -0.5 }}>
              {healthScore}
              <Text style={{ fontFamily: font.regular, fontSize: 13, color: colors.textSubtle }}>/100</Text>
            </Text>
          </View>
        </View>

        {/* Insights chips */}
        <View className="px-5 mt-3 flex-row flex-wrap" style={{ gap: 8 }}>
          {insights.map((i) => (
            <View
              key={i.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: i.tone === 'good' ? colors.successSoft : '#FEF3C7',
                paddingHorizontal: 12,
                paddingVertical: 7,
                borderRadius: 999,
              }}>
              {i.tone === 'good' ? (
                <CheckIcon size={11} color={colors.success} strokeWidth={3} />
              ) : (
                <BoltIcon size={11} color="#D97706" />
              )}
              <Text
                style={{
                  fontFamily: font.semibold,
                  fontSize: 12,
                  color: i.tone === 'good' ? colors.success : '#92400E',
                }}>
                {i.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Macros breakdown */}
        <View
          className="mx-5 mt-4"
          style={{
            backgroundColor: colors.surface,
            borderRadius: 24,
            padding: 20,
            ...shadow.card,
            borderWidth: 1,
            borderColor: colors.borderSoft,
          }}>
          <Text style={{ fontFamily: font.bold, fontSize: 16, color: colors.text, marginBottom: 4 }}>
            Macro breakdown
          </Text>
          <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textMuted, marginBottom: 16 }}>
            Per-serving macronutrient profile
          </Text>

          <View style={{ gap: 18 }}>
            <MacroRow label="Protein" color={colors.protein} {...protein} />
            <MacroRow label="Carbs" color={colors.carbs} {...carbs} />
            <MacroRow label="Fats" color={colors.fats} {...fats} />
          </View>
        </View>

        {/* Ingredients */}
        <View className="mx-5 mt-4">
          <Text style={{ fontFamily: font.bold, fontSize: 16, color: colors.text, marginBottom: 10 }}>
            Detected ingredients
          </Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 20,
              ...shadow.soft,
              borderWidth: 1,
              borderColor: colors.borderSoft,
              overflow: 'hidden',
            }}>
            {ingredients.map((ing, idx) => (
              <View key={ing.name}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    gap: 12,
                  }}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      backgroundColor: colors.surfaceWarm,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ fontFamily: font.bold, fontSize: 11, color: colors.brand }}>
                      {idx + 1}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: font.semibold, fontSize: 14, color: colors.text }}>
                      {ing.name}
                    </Text>
                    <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textMuted, marginTop: 1 }}>
                      {ing.portion}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: font.bold, fontSize: 13, color: colors.text }}>
                    {ing.kcal}
                    <Text style={{ fontFamily: font.regular, color: colors.textMuted }}> kcal</Text>
                  </Text>
                </View>
                {idx < ingredients.length - 1 && (
                  <View style={{ height: 1, backgroundColor: colors.borderSoft, marginLeft: 60 }} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: insets.bottom + 12,
          backgroundColor: colors.cream,
          borderTopWidth: 1,
          borderTopColor: colors.borderSoft,
          flexDirection: 'row',
          gap: 10,
        }}>
        <Pressable
          onPress={() => router.back()}
          style={{
            flex: 1,
            paddingVertical: 16,
            borderRadius: 18,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
          }}>
          <Text style={{ fontFamily: font.bold, fontSize: 15, color: colors.text }}>Retake</Text>
        </Pressable>

        <Pressable
          onPress={() => router.dismiss(2)}
          style={{
            flex: 1.5,
            borderRadius: 18,
            backgroundColor: colors.brand,
            paddingVertical: 16,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            ...shadow.brand,
          }}>
          <CheckIcon size={16} color="#fff" strokeWidth={3} />
          <Text style={{ fontFamily: font.bold, fontSize: 15, color: '#fff' }}>Save meal</Text>
        </Pressable>
      </View>
    </View>
  );
}

function MacroRow({
  label,
  color,
  grams,
  percent,
  kcal,
}: {
  label: string;
  color: string;
  grams: number;
  percent: number;
  kcal: number;
}) {
  const colors = useThemeColors();
  return (
    <View>
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color }} />
          <Text style={{ fontFamily: font.semibold, fontSize: 14, color: colors.text }}>
            {label}
          </Text>
        </View>
        <View className="flex-row items-baseline" style={{ gap: 4 }}>
          <Text style={{ fontFamily: font.bold, fontSize: 16, color: colors.text }}>
            {grams}g
          </Text>
          <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textMuted }}>
            {'\u00B7'} {kcal} kcal
          </Text>
        </View>
      </View>
      <View style={{ height: 8, backgroundColor: colors.surfaceMuted, borderRadius: 4, overflow: 'hidden' }}>
        <View style={{ width: `${percent}%`, height: '100%', backgroundColor: color, borderRadius: 4 }} />
      </View>
      <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textSubtle, marginTop: 4 }}>
        {percent}% of macros
      </Text>
    </View>
  );
}
