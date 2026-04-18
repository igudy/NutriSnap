import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import VectorLine from '@/assets/food/vectorLine.svg';

const fallbackImage = require('@/assets/food/foodCenter.png');

const MACRO_COLORS = {
  protein: '#2D6A4F',
  carbs: '#F4A261',
  fats: '#52B788',
};

export default function AnalysisScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  // Dummy analysis data (will be replaced with real AI analysis later)
  const totalCalories = 258;
  const protein = { grams: 37, percent: 32 };
  const carbs = { grams: 74, percent: 64 };
  const fatsData = { grams: 5, percent: 4 };

  const handleRetake = () => {
    router.back();
  };

  const handleSaveMeal = () => {
    // Dismiss analysis + camera (2 screens) to get back to tabs
    router.dismiss(2);
  };

  return (
    <View style={styles.container}>
      {/* Orange background - absolutely positioned behind everything */}
      <View style={styles.orangeBg}>
        <VectorLine width="100%" height="100%" preserveAspectRatio="xMidYMin slice" />
      </View>

      {/* Header bar */}
      <SafeAreaView edges={['top']}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Analysis Complete</Text>
        </View>
      </SafeAreaView>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}>
        {/* Food Image Card */}
        <View style={styles.imageCard}>
          <Image source={photoUri ? { uri: photoUri } : fallbackImage} style={styles.foodImage} />
        </View>

        {/* Total Calories Card */}
        <View style={styles.calorieCard}>
          <Text style={styles.calorieLabel}>Total Calories</Text>
          <Text style={styles.calorieValue}>{totalCalories}</Text>
          <Text style={styles.calorieUnit}>kcal</Text>
        </View>

        {/* Macro Breakdown */}
        <View style={styles.macrosContainer}>
          <MacroRow
            label="Protein"
            grams={protein.grams}
            percent={protein.percent}
            color={MACRO_COLORS.protein}
          />
          <MacroRow
            label="Carbs"
            grams={carbs.grams}
            percent={carbs.percent}
            color={MACRO_COLORS.carbs}
          />
          <MacroRow
            label="Fats"
            grams={fatsData.grams}
            percent={fatsData.percent}
            color={MACRO_COLORS.fats}
          />
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={[styles.bottomButtons, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.retakeButton} onPress={handleRetake}>
          <Text style={styles.retakeButtonText}>Retake</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleSaveMeal}>
          <Text style={styles.saveButtonText}>Save Meal</Text>
        </Pressable>
      </View>
    </View>
  );
}

function MacroRow({
  label,
  grams,
  percent,
  color,
}: {
  label: string;
  grams: number;
  percent: number;
  color: string;
}) {
  return (
    <View style={styles.macroRow}>
      <View style={styles.macroHeader}>
        <View style={styles.macroLabelRow}>
          <View style={[styles.macroDot, { backgroundColor: color }]} />
          <Text style={styles.macroLabel}>{label}</Text>
        </View>
        <Text style={styles.macroGrams}>{grams}g</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.macroPercent}>{percent}% of macros</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  orangeBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 340,
    backgroundColor: '#E34F00',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'GoogleSans-SemiBold',
    color: '#fff',
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  imageCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#F4A261',
    backgroundColor: '#fff',
  },
  foodImage: {
    width: '100%',
    height: 260,
  },
  calorieCard: {
    marginTop: 20,
    backgroundColor: '#FFF5EE',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F4A261',
    paddingVertical: 20,
    alignItems: 'center',
  },
  calorieLabel: {
    fontSize: 15,
    fontFamily: 'GoogleSans-Regular',
    color: '#6B7280',
  },
  calorieValue: {
    fontSize: 52,
    fontFamily: 'GoogleSans-Bold',
    color: '#1F2937',
    marginTop: 2,
  },
  calorieUnit: {
    fontSize: 16,
    fontFamily: 'GoogleSans-Regular',
    color: '#9CA3AF',
    marginTop: -4,
  },
  macrosContainer: {
    marginTop: 24,
    gap: 20,
  },
  macroRow: {
    gap: 6,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  macroDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  macroLabel: {
    fontSize: 16,
    fontFamily: 'GoogleSans-Medium',
    color: '#1F2937',
  },
  macroGrams: {
    fontSize: 18,
    fontFamily: 'GoogleSans-Bold',
    color: '#1F2937',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  macroPercent: {
    fontSize: 13,
    fontFamily: 'GoogleSans-Regular',
    color: '#9CA3AF',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 12,
    backgroundColor: '#F9FAFB',
  },
  retakeButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  retakeButtonText: {
    fontSize: 16,
    fontFamily: 'GoogleSans-Bold',
    color: '#1F2937',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#840404',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'GoogleSans-Bold',
    color: '#fff',
  },
});
