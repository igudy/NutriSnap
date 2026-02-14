import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Avatar1 from '@/assets/food/avatar1.svg';
import Avatar2 from '@/assets/food/avatar2.svg';
import Avatar3 from '@/assets/food/avatar3.svg';
import Avatar4 from '@/assets/food/avatar4.svg';
import Avatar5 from '@/assets/food/avatar5.svg';
import Avatar6 from '@/assets/food/avatar6.svg';
import Avatar7 from '@/assets/food/avatar7.svg';
import Avatar8 from '@/assets/food/avatar8.svg';
import Avatar9 from '@/assets/food/avatar9.svg';

const avatars = [
  { id: 1, Component: Avatar1 },
  { id: 2, Component: Avatar2 },
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
    // Navigation logic will go here
    console.log('Selected Avatar:', selectedAvatar);
    console.log('Nickname:', nickname);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Orange Header */}
      <View style={{ backgroundColor: '#E34F00' }} className="pt-2">
        <SafeAreaView edges={['top']}>
          <View className="px-6 pb-8">
            <Text className="text-white text-3xl font-jakarta-bold text-center mb-4">
              Nutri-Snap
            </Text>
            <Text className="text-white text-2xl font-jakarta-semibold text-center">
              Let's know you
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* White Content Area */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-8">
          {/* Select Avatar Title */}
          <Text className="text-gray-600 text-base font-jakarta-medium text-center mb-6">
            Select Avatar
          </Text>

          {/* Avatar Grid */}
          <View className="flex-row flex-wrap justify-center gap-4 mb-8">
            {avatars.map((avatar) => {
              const AvatarComponent = avatar.Component;
              const isSelected = selectedAvatar === avatar.id;

              return (
                <Pressable
                  key={avatar.id}
                  onPress={() => setSelectedAvatar(avatar.id)}
                  className="relative"
                >
                  {/* Avatar Circle */}
                  <View
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 45,
                      backgroundColor: '#FFE5D9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: isSelected ? 3 : 0,
                      borderColor: isSelected ? '#840404' : 'transparent',
                    }}
                  >
                    <AvatarComponent width={80} height={80} />
                  </View>

                  {/* Checkmark for selected avatar */}
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
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                        ✓
                      </Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Nickname Input */}
          <View className="mb-8">
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              placeholder="Enter Nickname"
              placeholderTextColor="#9CA3AF"
              className="border border-gray-300 rounded-lg px-4 py-4 font-jakarta text-base"
              style={{ backgroundColor: 'white' }}
            />
          </View>

          {/* Get Started Button */}
          <Pressable
            onPress={handleGetStarted}
            className="overflow-hidden rounded-lg active:opacity-90"
          >
            <LinearGradient
              colors={['#840404', '#5C0303']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-5 items-center"
            >
              <Text className="text-white text-lg font-jakarta-bold">
                Get started
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
