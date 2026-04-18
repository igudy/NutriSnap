import { View, Text, Pressable } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHomeIcon from '@/assets/homeHomeIcon.svg';
import ChartHomeIcon from '@/assets/chartHomeIcon.svg';
import CameraHomeIcon from '@/assets/cameraHomeIcon.svg';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: 'white',
            paddingBottom: insets.bottom + 4,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
          }}>
          {/* Home Tab */}
          <Pressable
            onPress={() => navigation.navigate('index')}
            style={{ alignItems: 'center', width: 80 }}>
            <HomeHomeIcon
              width={26}
              height={26}
              color={state.index === 0 ? '#4E0202' : '#9CA3AF'}
            />
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                fontFamily: state.index === 0 ? 'GoogleSans-Bold' : 'GoogleSans-Regular',
                color: state.index === 0 ? '#4E0202' : '#9CA3AF',
              }}>
              Home
            </Text>
          </Pressable>

          {/* Camera FAB */}
          <View style={{ alignItems: 'center', marginHorizontal: 16, marginTop: -28 }}>
            <Pressable
              onPress={() => router.push('/camera')}>
              <CameraHomeIcon width={80} height={90} />
            </Pressable>
          </View>

          {/* Stats Tab */}
          <Pressable
            onPress={() => navigation.navigate('stats')}
            style={{ alignItems: 'center', width: 80 }}>
            <ChartHomeIcon
              width={28}
              height={28}
              color={state.index === 1 ? '#4E0202' : '#9CA3AF'}
            />
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                fontFamily: state.index === 1 ? 'GoogleSans-Bold' : 'GoogleSans-Regular',
                color: state.index === 1 ? '#4E0202' : '#9CA3AF',
              }}>
              Stats
            </Text>
          </Pressable>
        </View>
      )}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="stats" />
    </Tabs>
  );
}
