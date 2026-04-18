import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Avatar1 from '@/assets/food/avatar1.svg';
import Avatar3 from '@/assets/food/avatar3.svg';
import Avatar4 from '@/assets/food/avatar4.svg';
import Avatar5 from '@/assets/food/avatar5.svg';
import Avatar6 from '@/assets/food/avatar6.svg';
import Avatar7 from '@/assets/food/avatar7.svg';
import Avatar8 from '@/assets/food/avatar8.svg';
import Avatar9 from '@/assets/food/avatar9.svg';
import { font, radii, shadow } from '@/lib/theme';
import { useTheme, useThemeColors } from '@/lib/theme-context';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@/lib/icons';

const avatars = [
  { id: 1, Component: Avatar1 },
  { id: 2, Component: Avatar9 },
  { id: 3, Component: Avatar3 },
  { id: 4, Component: Avatar4 },
  { id: 5, Component: Avatar5 },
  { id: 6, Component: Avatar6 },
  { id: 7, Component: Avatar7 },
  { id: 8, Component: Avatar8 },
];

const goals = [
  { id: 'lose', label: 'Lose weight', emoji: '\u{1F525}' },
  { id: 'maintain', label: 'Stay balanced', emoji: '\u2696\uFE0F' },
  { id: 'gain', label: 'Build muscle', emoji: '\u{1F4AA}' },
  { id: 'track', label: 'Just track', emoji: '\u{1F4DD}' },
];

export default function AvatarSelectionScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { isDark } = useTheme();
  const [selectedAvatar, setSelectedAvatar] = useState<number>(2);
  const [nickname, setNickname] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<string>('maintain');

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.cream }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        {/* Top bar */}
        <View className="flex-row items-center justify-between px-5 pt-2">
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.surface,
              justifyContent: 'center',
              alignItems: 'center',
              ...shadow.soft,
            }}>
            <ArrowLeftIcon size={18} color={colors.text} />
          </Pressable>

          <View className="flex-row items-center" style={{ gap: 6 }}>
            <View style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: colors.brand }} />
            <View style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
          </View>

          <Text style={{ fontFamily: font.medium, fontSize: 13, color: colors.textMuted }}>
            Step 1 / 2
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}>
          {/* Title */}
          <View className="px-6 pt-6">
            <Text
              style={{
                fontFamily: font.bold,
                fontSize: 32,
                color: colors.text,
                letterSpacing: -0.5,
                lineHeight: 38,
              }}>
              Let{'\u2019'}s make it yours.
            </Text>
            <Text
              style={{
                fontFamily: font.regular,
                fontSize: 15,
                color: colors.textMuted,
                marginTop: 8,
                lineHeight: 22,
              }}>
              Pick an avatar, drop a name, and tell us{'\n'}what matters most to you.
            </Text>
          </View>

          {/* Avatar grid */}
          <View style={{ marginTop: 28 }}>
            <View className="flex-row items-center justify-between px-6 mb-4">
              <Text style={{ fontFamily: font.semibold, fontSize: 13, color: colors.textMuted, letterSpacing: 1 }}>
                AVATAR
              </Text>
              <Text style={{ fontFamily: font.medium, fontSize: 12, color: colors.brand }}>
                Tap to select
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
              {avatars.map((avatar) => {
                const AvatarComponent = avatar.Component;
                const isSelected = selectedAvatar === avatar.id;
                return (
                  <Pressable
                    key={avatar.id}
                    onPress={() => setSelectedAvatar(avatar.id)}
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 48,
                      backgroundColor: isSelected ? colors.brand : colors.surface,
                      justifyContent: 'center',
                      alignItems: 'center',
                      ...(isSelected ? shadow.brand : shadow.soft),
                      borderWidth: isSelected ? 0 : 1,
                      borderColor: colors.borderSoft,
                    }}>
                    <View
                      style={{
                        width: 86,
                        height: 86,
                        borderRadius: 43,
                        backgroundColor: isSelected ? '#FFE5D9' : colors.surfaceWarm,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AvatarComponent width={80} height={80} />
                    </View>
                    {isSelected && (
                      <View
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: colors.espresso,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 3,
                          borderColor: colors.cream,
                        }}>
                        <CheckIcon size={14} />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* Nickname */}
          <View className="px-6" style={{ marginTop: 32 }}>
            <Text
              style={{
                fontFamily: font.semibold,
                fontSize: 13,
                color: colors.textMuted,
                letterSpacing: 1,
                marginBottom: 10,
              }}>
              NICKNAME
            </Text>
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: radii.lg,
                borderWidth: 1,
                borderColor: nickname ? colors.brand : colors.border,
                paddingHorizontal: 18,
                paddingVertical: 4,
                ...shadow.soft,
              }}>
              <TextInput
                value={nickname}
                onChangeText={setNickname}
                placeholder="What should we call you?"
                placeholderTextColor={colors.textSubtle}
                style={{
                  fontFamily: font.medium,
                  fontSize: 16,
                  color: colors.text,
                  paddingVertical: 16,
                }}
              />
            </View>
          </View>

          {/* Goals */}
          <View className="px-6" style={{ marginTop: 28 }}>
            <Text
              style={{
                fontFamily: font.semibold,
                fontSize: 13,
                color: colors.textMuted,
                letterSpacing: 1,
                marginBottom: 12,
              }}>
              YOUR GOAL
            </Text>
            <View className="flex-row flex-wrap" style={{ gap: 10 }}>
              {goals.map((g) => {
                const active = selectedGoal === g.id;
                return (
                  <Pressable
                    key={g.id}
                    onPress={() => setSelectedGoal(g.id)}
                    style={{
                      flexBasis: '48%',
                      backgroundColor: active ? (isDark ? colors.brand : colors.espresso) : colors.surface,
                      borderRadius: radii.lg,
                      paddingVertical: 18,
                      paddingHorizontal: 16,
                      borderWidth: 1,
                      borderColor: active ? (isDark ? colors.brand : colors.espresso) : colors.border,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      ...(active ? shadow.deep : shadow.soft),
                    }}>
                    <Text style={{ fontSize: 22 }}>{g.emoji}</Text>
                    <Text
                      style={{
                        fontFamily: font.semibold,
                        fontSize: 14,
                        color: active ? '#fff' : colors.text,
                        flex: 1,
                      }}>
                      {g.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Primary CTA */}
        <View className="px-6 pb-2 pt-4">
          <Pressable
            onPress={handleGetStarted}
            style={{
              borderRadius: radii.pill,
              backgroundColor: colors.brand,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 18,
              paddingHorizontal: 24,
              gap: 10,
              ...shadow.brand,
            }}>
            <Text
              style={{
                fontFamily: font.bold,
                fontSize: 17,
                color: '#fff',
                letterSpacing: 0.3,
              }}>
              Continue
            </Text>
            <ArrowRightIcon size={18} color="#fff" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
