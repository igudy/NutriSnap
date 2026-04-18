import { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, font, shadow } from '@/lib/theme';
import { ArrowLeftIcon, SparkleIcon, CameraIcon } from '@/lib/icons';

function GalleryIcon({ size = 20, color = '#fff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
        stroke={color}
        strokeWidth={1.8}
      />
      <Circle cx={9} cy={10} r={1.5} fill={color} />
      <Path d="M4 17l5-5 4 4 3-3 4 4" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function FlashIcon({ size = 20, color = '#fff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M13 2L3 14h7l-1 8 11-14h-7z" />
    </Svg>
  );
}

export default function CameraScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState(false);

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    if (photo) setCapturedPhoto(photo.uri);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) setCapturedPhoto(result.assets[0].uri);
  };

  const handleRetake = () => setCapturedPhoto(null);

  const handleAnalyse = () => {
    if (capturedPhoto) router.push({ pathname: '/analysis', params: { photoUri: capturedPhoto } });
  };

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: colors.espresso }]}>
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 24,
            backgroundColor: 'rgba(227,79,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255,122,46,0.4)',
            marginBottom: 24,
          }}>
          <CameraIcon size={32} color={colors.brandLight} />
        </View>
        <Text style={styles.permissionTitle}>Let{'\u2019'}s see your plate</Text>
        <Text style={styles.permissionText}>
          We need camera access to snap meals and let our AI do the heavy lifting.
        </Text>
        <Pressable
          onPress={requestPermission}
          style={{
            borderRadius: 999,
            backgroundColor: colors.brand,
            paddingVertical: 16,
            paddingHorizontal: 32,
            ...shadow.brand,
          }}>
          <Text style={styles.permissionButtonText}>Grant permission</Text>
        </Pressable>
        <Pressable
          style={[styles.pillButton, { top: insets.top + 12, left: 16 }]}
          onPress={() => router.back()}>
          <ArrowLeftIcon size={18} color="#fff" />
        </Pressable>
      </View>
    );
  }

  // Preview mode
  if (capturedPhoto) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedPhoto }} style={styles.preview} />

        {/* Dark overlays for legibility */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 100,
            backgroundColor: 'rgba(0,0,0,0.45)',
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 160,
            backgroundColor: 'rgba(0,0,0,0.55)',
          }}
        />

        <Pressable
          style={[styles.pillButton, { top: insets.top + 12, left: 16 }]}
          onPress={handleRetake}>
          <ArrowLeftIcon size={18} color="#fff" />
        </Pressable>

        <View style={{ position: 'absolute', top: insets.top + 14, left: 0, right: 0, alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(0,0,0,0.5)',
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.15)',
            }}>
            <SparkleIcon size={14} color={colors.goldLight} />
            <Text style={{ fontFamily: font.semibold, fontSize: 12, color: '#fff', letterSpacing: 0.5 }}>
              Ready to analyze
            </Text>
          </View>
        </View>

        <View style={[styles.previewButtons, { paddingBottom: insets.bottom + 24 }]}>
          <Pressable style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.retakeButtonText}>Retake</Text>
          </Pressable>
          <Pressable
            onPress={handleAnalyse}
            style={{
              flex: 1,
              borderRadius: 18,
              backgroundColor: colors.brand,
              paddingVertical: 18,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 8,
              ...shadow.brand,
            }}>
            <SparkleIcon size={16} color="#fff" />
            <Text style={styles.analyseButtonText}>Analyse with AI</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Camera mode
  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" flash={flashOn ? 'on' : 'off'} />

      {/* Top overlay for legibility */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          backgroundColor: 'rgba(0,0,0,0.45)',
        }}
      />
      {/* Bottom overlay for legibility */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          backgroundColor: 'rgba(0,0,0,0.55)',
        }}
      />

      {/* Top bar */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 12,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}>
        <Pressable style={styles.pillButton} onPress={() => router.back()}>
          <ArrowLeftIcon size={18} color="#fff" />
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: 'rgba(0,0,0,0.45)',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.15)',
          }}>
          <SparkleIcon size={14} color={colors.goldLight} />
          <Text style={{ fontFamily: font.semibold, fontSize: 12, color: '#fff', letterSpacing: 0.5 }}>
            AI VISION
          </Text>
        </View>

        <Pressable
          style={[styles.pillButton, { backgroundColor: flashOn ? colors.brand : 'rgba(0,0,0,0.45)' }]}
          onPress={() => setFlashOn((v) => !v)}>
          <FlashIcon size={18} color="#fff" />
        </Pressable>
      </View>

      {/* Viewfinder corners */}
      <View style={styles.viewfinderContainer} pointerEvents="none">
        <View style={styles.viewfinder}>
          <View style={[styles.corner, styles.cornerTopLeft]} />
          <View style={[styles.corner, styles.cornerTopRight]} />
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          <View style={[styles.corner, styles.cornerBottomRight]} />
        </View>
      </View>

      {/* Hint text */}
      <View
        style={{
          position: 'absolute',
          bottom: 220,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: font.medium,
            fontSize: 14,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: 0.3,
          }}>
          Center your plate in the frame
        </Text>
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottomControls, { paddingBottom: insets.bottom + 28 }]}>
        <View style={styles.controlRow}>
          <Pressable style={styles.sideButton} onPress={handlePickImage}>
            <GalleryIcon size={22} color="#fff" />
            <Text style={styles.sideButtonText}>Gallery</Text>
          </Pressable>

          <Pressable style={styles.captureOuter} onPress={handleTakePhoto}>
            <View style={[styles.captureInner, { backgroundColor: colors.brand }]}>
              <View style={styles.captureDot} />
            </View>
          </Pressable>

          <View style={styles.sideButton}>
            <View style={{ opacity: 0 }}>
              <GalleryIcon size={22} color="#fff" />
              <Text style={styles.sideButtonText}>Placeholder</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const CORNER_SIZE = 44;
const CORNER_RADIUS = 28;
const CORNER_WIDTH = 4;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  camera: { flex: 1 },
  preview: { flex: 1, resizeMode: 'cover' },
  pillButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  viewfinderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewfinder: { width: '82%', aspectRatio: 1, position: 'relative' },
  corner: { position: 'absolute', width: CORNER_SIZE, height: CORNER_SIZE },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: colors.brand,
    borderTopLeftRadius: CORNER_RADIUS,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: colors.brand,
    borderTopRightRadius: CORNER_RADIUS,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: colors.brand,
    borderBottomLeftRadius: CORNER_RADIUS,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: colors.brand,
    borderBottomRightRadius: CORNER_RADIUS,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
  },
  sideButton: { alignItems: 'center', gap: 4, width: 60 },
  sideButtonText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    fontFamily: 'GoogleSans-Medium',
    letterSpacing: 0.3,
  },
  captureOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  captureInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  previewButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  retakeButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  retakeButtonText: { fontSize: 15, fontFamily: 'GoogleSans-Bold', color: '#fff' },
  analyseButtonText: { fontSize: 15, fontFamily: 'GoogleSans-Bold', color: '#fff' },
  permissionTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'GoogleSans-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  permissionText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontFamily: 'GoogleSans-Regular',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
  },
  permissionButtonText: { color: '#fff', fontSize: 16, fontFamily: 'GoogleSans-Bold', letterSpacing: 0.3 },
});
