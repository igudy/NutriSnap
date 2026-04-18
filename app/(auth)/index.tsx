import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import VectorLine from '@/assets/food/vectorLine.svg';
import CheckBox from '@/assets/food/checkBox.svg';

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
              <Text className="mb-6 mt-4 font-sans-bold text-4xl text-white">Nutri-Snap</Text>
            </View>

            {/* Single Centered Food Image */}
            <View className="items-center">
              <View
                style={{
                  width: 280,
                  height: 280,
                  borderRadius: 30,
                  backgroundColor: 'rgba(255, 180, 100, 0.35)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('@/assets/food/foodCenter.png')}
                  style={{ width: 260, height: 260 }}
                  resizeMode="contain"
                />
              </View>

              {/* Checkbox below image */}
              <View style={{ marginTop: -20 }}>
                <CheckBox width={70} height={70} />
              </View>
            </View>

            {/* Bottom Content */}
            <View className="mt-4">
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
              <View>
                <Text className="text-center font-sans-medium text-base leading-relaxed text-white">
                  Just snap a photo of your meal and{'\n'}
                  let AI track your macros automatically.{'\n'}
                  View your weekly nutrition at a glance.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Get Started Button - Pinned to bottom */}
        <View className="px-6 pb-4 pt-4">
          <Pressable
            onPress={handleGetStarted}
            className="overflow-hidden rounded-2xl active:opacity-90"
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
              style={{ borderRadius: 16 }}
              className="items-center justify-center py-5">
              <Text className="py-4 text-center font-sans-bold text-lg text-white">
                Get Started
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
