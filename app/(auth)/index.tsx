import { View, Text, Pressable, ScrollView, Image, FlatList, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import VectorLine from '@/assets/food/vectorLine.svg';
import CheckBox from '@/assets/food/checkBox.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = 300;
const ITEM_SPACING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

const foodImages = [
  { id: 1, source: require('@/assets/food/foodLeft.png') },
  { id: 2, source: require('@/assets/food/foodCenter.png') },
  { id: 3, source: require('@/assets/food/foodRight.png') },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(auth)/avatar-selection');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#E34F00' }}>
      <StatusBar style="light" />

      {/* Background Vector Lines */}
      <View className="absolute inset-0" style={{ zIndex: 0 }}>
        <VectorLine width="100%" height="100%" preserveAspectRatio="xMidYMin slice" />
      </View>

      {/* Content */}
      <SafeAreaView className="flex-1" style={{ zIndex: 1 }}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-6">
            {/* Title */}
            <View className="items-center pt-6">
              <Text className="mb-20 mt-10 font-sans-bold text-4xl text-white">Nutri-Snap</Text>
            </View>

            {/* Food Images Carousel */}
            <View className="items-center justify-center" style={{ marginTop: -60, height: 400 }}>
              <FlatList
                data={foodImages}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                contentContainerStyle={{
                  paddingHorizontal: ITEM_SPACING,
                }}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: ITEM_WIDTH,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 300,
                        height: 300,
                        borderRadius: 30,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={item.source}
                        style={{ width: 280, height: 280 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />

              {/* Checkbox below carousel */}
              <View className="z-20" style={{ marginTop: -40 }}>
                <CheckBox width={90} height={90} />
              </View>
            </View>

            {/* Bottom Content */}
            <View className="pb-10">
              {/* Main Text */}
              <View className="mb-4">
                <Text className="text-center font-sans-bold text-4xl leading-tight text-white">
                  No logging.
                </Text>
                <Text className="text-center font-sans-bold text-4xl leading-tight text-white">
                  No hassle.
                </Text>
              </View>

              {/* Subtitle */}
              <View className="mb-6">
                <Text className="text-center font-sans-medium text-base leading-relaxed text-white">
                  Just snap a photo of your meal and{'\n'}
                  let AI track your macros automatically.{'\n'}
                  View your weekly nutrition at a glance.
                </Text>
              </View>

              {/* Get Started Button */}
              <Pressable
                onPress={handleGetStarted}
                className="overflow-hidden rounded-lg active:opacity-90"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}>
                <LinearGradient
                  colors={['#A01F1F', '#6B0F0F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="items-center justify-center py-5">
                  <Text className="py-4 text-center font-sans-bold text-xl text-white">
                    Get Started
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
