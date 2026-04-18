import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import VectorLine from '@/assets/food/vectorLine.svg';
import Avatar1 from '@/assets/food/avatar1.svg';
import Avatar3 from '@/assets/food/avatar3.svg';
import Avatar4 from '@/assets/food/avatar4.svg';
import Avatar5 from '@/assets/food/avatar5.svg';
import Avatar6 from '@/assets/food/avatar6.svg';
import Avatar7 from '@/assets/food/avatar7.svg';
import Avatar8 from '@/assets/food/avatar8.svg';
import Avatar9 from '@/assets/food/avatar9.svg';

const avatars = [
  { id: 1, Component: Avatar1 },
  { id: 2, Component: Avatar9 },
  { id: 3, Component: Avatar3 },
  { id: 4, Component: Avatar4 },
  { id: 5, Component: Avatar5 },
  { id: 6, Component: Avatar6 },
  { id: 7, Component: Avatar7 },
  { id: 8, Component: Avatar8 },
  { id: 9, Component: Avatar9 },
];

export default function AvatarSelectionScreen() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<number>(2);
  const [nickname, setNickname] = useState('');

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Orange Header */}
      <View style={{ backgroundColor: '#E34F00' }} className="relative pt-2">
        {/* Background Vector Lines */}
        <View className="absolute inset-0" style={{ zIndex: 0 }}>
          <VectorLine width="100%" height="100%" preserveAspectRatio="xMidYMin slice" />
        </View>

        <SafeAreaView edges={['top']} style={{ zIndex: 1 }}>
          <View className="px-6 pb-12">
            <Text className="mb-4 text-center font-sans-bold text-3xl text-white">Nutri-Snap</Text>
            <Text className="text-center font-sans-semibold text-2xl text-white">
              Let{'\u2019'}s know you
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: -24,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: 'white',
        }}>
        <View className="px-6 py-8">
          <Text className="mb-6 text-center font-sans-medium text-base text-gray-600">
            Select Avatar
          </Text>

          <View className="mb-8 flex-row flex-wrap justify-center gap-5">
            {avatars.map((avatar) => {
              const AvatarComponent = avatar.Component;
              const isSelected = selectedAvatar === avatar.id;

              return (
                <Pressable
                  key={avatar.id}
                  onPress={() => setSelectedAvatar(avatar.id)}
                  className="relative">
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: '#FFE5D9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: isSelected ? 3 : 0,
                      borderColor: isSelected ? '#840404' : 'transparent',
                    }}>
                    <AvatarComponent width={90} height={90} />
                  </View>

                  {isSelected && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -4,
                        right: -4,
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: '#E74C3C',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: 'white',
                      }}>
                      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Nickname Input */}
          <View>
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              placeholder="Enter Nickname"
              placeholderTextColor="#9CA3AF"
              className="rounded-lg border border-gray-300 px-4 py-4 font-sans text-base"
              style={{ backgroundColor: 'white' }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Get Started Button - Pinned to bottom */}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }}>
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
