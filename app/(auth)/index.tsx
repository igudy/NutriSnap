import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import VectorLine from '@/assets/food/vectorLine.svg';
import FoodLeft from '@/assets/food/foodLeft.svg';
import FoodCenter from '@/assets/food/foodCenter.svg';
import FoodRight from '@/assets/food/foodRight.svg';
import CheckBox from '@/assets/food/checkBox.svg';

export default function HomeScreen() {
  const handleGetStarted = () => {
    // Navigation logic will go here
    console.log('Get started pressed');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#E34F00' }}>
      <StatusBar style="light" />

      {/* Background Vector Lines */}
      <View className="absolute inset-0">
        <VectorLine width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        {/* Title */}
        <View className="items-center pt-20">
          <Text className="text-white text-4xl font-jakarta-bold">
            Nutri-Snap
          </Text>
        </View>

        {/* Food Images with Checkbox */}
        <View className="flex-1 items-center justify-center -mt-10">
          <View className="relative w-full items-center">
            {/* Food Bowls Row */}
            <View className="flex-row items-center justify-center w-full">
              {/* Left Food */}
              <View className="absolute left-0 -ml-16">
                <FoodLeft width={180} height={180} />
              </View>

              {/* Center Food */}
              <View className="z-10">
                <FoodCenter width={240} height={240} />
              </View>

              {/* Right Food */}
              <View className="absolute right-0 -mr-16">
                <FoodRight width={180} height={180} />
              </View>
            </View>

            {/* Checkbox below center food */}
            <View className="mt-4 z-20">
              <CheckBox width={80} height={80} />
            </View>
          </View>
        </View>

        {/* Bottom Content */}
        <View className="pb-12">
          {/* Main Text */}
          <View className="mb-6">
            <Text className="text-white text-5xl font-jakarta-bold text-center leading-tight">
              No logging.
            </Text>
            <Text className="text-white text-5xl font-jakarta-bold text-center leading-tight">
              No hassle.
            </Text>
          </View>

          {/* Subtitle */}
          <View className="mb-8">
            <Text className="text-white text-base font-jakarta-medium text-center leading-relaxed px-2">
              Just snap a photo of your meal and{'\n'}
              let AI track your macros automatically.{'\n'}
              View your weekly nutrition at a glance.
            </Text>
          </View>

          {/* Get Started Button */}
          <Pressable
            onPress={handleGetStarted}
            className="overflow-hidden rounded-full active:opacity-90"
          >
            <LinearGradient
              colors={['#840404', '#840404']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-5 items-center"
            >
              <Text className="text-white text-xl font-jakarta-bold">
                Get started
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
