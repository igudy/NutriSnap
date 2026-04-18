import { View, Text, Pressable } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { font, shadow } from '@/lib/theme';
import { useThemeColors } from '@/lib/theme-context';
import { HomeIcon, MealsIcon, StatsIcon, ProfileIcon, CameraIcon } from '@/lib/icons';

type TabKey = 'index' | 'meals' | 'stats' | 'profile';

const TABS: { key: TabKey; label: string; Icon: typeof HomeIcon }[] = [
  { key: 'index', label: 'Home', Icon: HomeIcon },
  { key: 'meals', label: 'Meals', Icon: MealsIcon },
  { key: 'stats', label: 'Stats', Icon: StatsIcon },
  { key: 'profile', label: 'Profile', Icon: ProfileIcon },
];

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => {
        const activeRoute = state.routes[state.index]?.name;

        return (
          <View
            style={{
              position: 'absolute',
              bottom: insets.bottom + 12,
              left: 16,
              right: 16,
              height: 72,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.espresso,
              borderRadius: 36,
              paddingHorizontal: 10,
              ...shadow.deep,
            }}>
            {/* Left 2 tabs */}
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
              {TABS.slice(0, 2).map((tab) => (
                <TabButton
                  key={tab.key}
                  label={tab.label}
                  Icon={tab.Icon}
                  active={activeRoute === tab.key}
                  onPress={() => navigation.navigate(tab.key as never)}
                />
              ))}
            </View>

            {/* Camera FAB */}
            <Pressable
              onPress={() => router.push('/camera')}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                justifyContent: 'center',
                alignItems: 'center',
                ...shadow.brand,
                marginTop: -32,
                borderWidth: 4,
                borderColor: colors.cream,
                backgroundColor: colors.brand,
              }}>
              <CameraIcon size={26} color="#fff" />
            </Pressable>

            {/* Right 2 tabs */}
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
              {TABS.slice(2, 4).map((tab) => (
                <TabButton
                  key={tab.key}
                  label={tab.label}
                  Icon={tab.Icon}
                  active={activeRoute === tab.key}
                  onPress={() => navigation.navigate(tab.key as never)}
                />
              ))}
            </View>
          </View>
        );
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="meals" />
      <Tabs.Screen name="stats" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

function TabButton({
  label,
  Icon,
  active,
  onPress,
}: {
  label: string;
  Icon: typeof HomeIcon;
  active: boolean;
  onPress: () => void;
}) {
  const color = active ? '#FFFFFF' : 'rgba(255,255,255,0.8)';
  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
      }}>
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: active ? 'rgba(227, 79, 0, 0.25)' : 'transparent',
        }}>
        <Icon size={22} color={color} strokeWidth={active ? 2.2 : 1.8} />
      </View>
      <Text
        style={{
          fontFamily: active ? font.semibold : font.regular,
          fontSize: 10,
          color,
          marginTop: 2,
          letterSpacing: 0.3,
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
