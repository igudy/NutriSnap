import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Avatar4 from '@/assets/food/avatar4.svg';
import { font, radii, shadow } from '@/lib/theme';
import { useTheme, useThemeColors } from '@/lib/theme-context';
import {
  CrownIcon,
  BellIcon,
  SettingsIcon,
  TargetIcon,
  SparkleIcon,
  ChevronRightIcon,
  FlameIcon,
} from '@/lib/icons';

export default function ProfileScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { isDark, setMode } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.cream }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Soft warm wash at the top */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 280,
          backgroundColor: colors.brand,
          opacity: 0.08,
        }}
      />

      <SafeAreaView edges={['top']}>
        <View className="px-5 pt-3 pb-5">
          <View className="flex-row items-center justify-between">
            <Text style={{ fontFamily: font.regular, fontSize: 12, color: colors.textMuted }}>
              Account
            </Text>
            <Pressable
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.borderSoft,
                ...shadow.soft,
              }}>
              <SettingsIcon size={18} color={colors.text} />
            </Pressable>
          </View>

          <View className="flex-row items-center mt-5" style={{ gap: 14 }}>
            <View
              style={{
                width: 76,
                height: 76,
                borderRadius: 38,
                backgroundColor: colors.surfaceWarm,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Avatar4 width={68} height={68} />
            </View>
            <View style={{ flex: 1 }}>
              <View className="flex-row items-center" style={{ gap: 8 }}>
                <Text style={{ fontFamily: font.bold, fontSize: 22, color: colors.text, letterSpacing: -0.5 }}>
                  Meeday
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    backgroundColor: colors.surfaceWarm,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 999,
                  }}>
                  <CrownIcon size={12} color={colors.gold} />
                  <Text style={{ fontFamily: font.bold, fontSize: 10, color: colors.gold, letterSpacing: 0.5 }}>
                    PRO
                  </Text>
                </View>
              </View>
              <Text style={{ fontFamily: font.regular, fontSize: 13, color: colors.textMuted, marginTop: 2 }}>
                meeday@nutrisnap.ai
              </Text>
              <View className="flex-row items-center mt-2" style={{ gap: 4 }}>
                <FlameIcon size={12} color={colors.brand} />
                <Text style={{ fontFamily: font.semibold, fontSize: 12, color: colors.text }}>
                  12 day streak
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Stats strip */}
        <View
          className="mx-5"
          style={{
            backgroundColor: colors.surface,
            borderRadius: 24,
            padding: 18,
            ...shadow.card,
            borderWidth: 1,
            borderColor: colors.borderSoft,
            flexDirection: 'row',
          }}>
          <StatBlock label="Meals" value="258" />
          <Divider />
          <StatBlock label="Days active" value="47" />
          <Divider />
          <StatBlock label="Goal" value="-2.6kg" accent={colors.success} />
        </View>

        {/* Upgrade card */}
        <Pressable
          className="mx-5 mt-4"
          style={{
            borderRadius: 24,
            ...shadow.card,
            backgroundColor: colors.brand,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
          }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: 'rgba(255,255,255,0.22)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CrownIcon size={22} color={colors.goldLight} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: font.regular,
                fontSize: 11,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: 0.5,
              }}>
              NUTRI-SNAP PRIVATE
            </Text>
            <Text style={{ fontFamily: font.bold, fontSize: 17, color: '#fff', marginTop: 2 }}>
              Unlock the concierge tier
            </Text>
            <Text
              style={{
                fontFamily: font.regular,
                fontSize: 12,
                color: 'rgba(255,255,255,0.9)',
                marginTop: 2,
              }}>
              Personal dietitian, lab integrations, chef meal plans.
            </Text>
          </View>
          <ChevronRightIcon size={20} color="#fff" />
        </Pressable>

        {/* Sections */}
        <SectionHeader title="Goals & preferences" />
        <SectionCard>
          <Row
            icon={<TargetIcon size={18} color={colors.brand} />}
            tintBg={colors.surfaceWarm}
            label="Daily calorie goal"
            value="2,000 kcal"
          />
          <RowDivider />
          <Row
            icon={<SparkleIcon size={18} color={colors.gold} />}
            tintBg="#FFF7E6"
            label="Dietary style"
            value="High protein"
          />
          <RowDivider />
          <Row
            icon={<FlameIcon size={18} color={colors.brand} />}
            tintBg={colors.surfaceWarm}
            label="Macro targets"
            value="P 30 / C 45 / F 25"
          />
        </SectionCard>

        <SectionHeader title="App" />
        <SectionCard>
          <Row
            icon={<BellIcon size={18} color={colors.info} />}
            tintBg="#DBEAFE"
            label="Notifications"
            rightAccessory={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.brand }}
                thumbColor="#fff"
              />
            }
          />
          <RowDivider />
          <Row
            icon={<SparkleIcon size={18} color="#7C3AED" />}
            tintBg="#F3EEFF"
            label="Dark mode"
            rightAccessory={
              <Switch
                value={isDark}
                onValueChange={(v) => setMode(v ? 'dark' : 'light')}
                trackColor={{ false: colors.border, true: colors.brand }}
                thumbColor="#fff"
              />
            }
          />
          <RowDivider />
          <Row
            icon={<SettingsIcon size={18} color={colors.textMuted} />}
            tintBg={colors.surfaceMuted}
            label="Units"
            value="Metric (kg, cm)"
          />
        </SectionCard>

        <SectionHeader title="Support" />
        <SectionCard>
          <Row label="Help center" value="Browse guides" />
          <RowDivider />
          <Row label="Privacy policy" value="" />
          <RowDivider />
          <Row label="Rate Nutri-Snap" value={'\u2605\u2605\u2605\u2605\u2605'} />
        </SectionCard>

        <Pressable
          className="mx-5 mt-5"
          style={{
            backgroundColor: colors.surface,
            borderRadius: radii.lg,
            paddingVertical: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
          }}>
          <Text style={{ fontFamily: font.semibold, fontSize: 14, color: colors.fats }}>
            Sign out
          </Text>
        </Pressable>

        <Text
          style={{
            fontFamily: font.regular,
            fontSize: 11,
            color: colors.textSubtle,
            textAlign: 'center',
            marginTop: 16,
          }}>
          v1.0.0 {'\u00B7'} Built with {'\u2665'} in Lagos
        </Text>
      </ScrollView>
    </View>
  );
}

function StatBlock({ label, value, accent }: { label: string; value: string; accent?: string }) {
  const colors = useThemeColors();
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontFamily: font.bold, fontSize: 20, color: accent ?? colors.text, letterSpacing: -0.5 }}>
        {value}
      </Text>
      <Text style={{ fontFamily: font.regular, fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
        {label}
      </Text>
    </View>
  );
}

function Divider() {
  const colors = useThemeColors();
  return <View style={{ width: 1, alignSelf: 'stretch', backgroundColor: colors.borderSoft, marginHorizontal: 6 }} />;
}

function SectionHeader({ title }: { title: string }) {
  const colors = useThemeColors();
  return (
    <Text
      style={{
        fontFamily: font.semibold,
        fontSize: 12,
        color: colors.textMuted,
        letterSpacing: 1,
        marginHorizontal: 24,
        marginTop: 24,
        marginBottom: 10,
      }}>
      {title.toUpperCase()}
    </Text>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();
  return (
    <View
      className="mx-5"
      style={{
        backgroundColor: colors.surface,
        borderRadius: 20,
        ...shadow.soft,
        borderWidth: 1,
        borderColor: colors.borderSoft,
        overflow: 'hidden',
      }}>
      {children}
    </View>
  );
}

function Row({
  icon,
  tintBg,
  label,
  value,
  rightAccessory,
}: {
  icon?: React.ReactNode;
  tintBg?: string;
  label: string;
  value?: string;
  rightAccessory?: React.ReactNode;
}) {
  const colors = useThemeColors();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, gap: 12 }}>
      {icon ? (
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            backgroundColor: tintBg ?? colors.surfaceMuted,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {icon}
        </View>
      ) : null}
      <Text style={{ flex: 1, fontFamily: font.semibold, fontSize: 14, color: colors.text }}>
        {label}
      </Text>
      {rightAccessory ? (
        rightAccessory
      ) : (
        <>
          {value ? (
            <Text style={{ fontFamily: font.regular, fontSize: 13, color: colors.textMuted }}>
              {value}
            </Text>
          ) : null}
          <ChevronRightIcon size={16} color={colors.textSubtle} />
        </>
      )}
    </View>
  );
}

function RowDivider() {
  const colors = useThemeColors();
  return <View style={{ height: 1, backgroundColor: colors.borderSoft, marginLeft: 64 }} />;
}
