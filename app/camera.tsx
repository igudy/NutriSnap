import { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    if (photo) {
      setCapturedPhoto(photo.uri);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setCapturedPhoto(result.assets[0].uri);
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
  };

  const handleAnalyse = () => {
    if (capturedPhoto) {
      router.push({ pathname: '/analysis', params: { photoUri: capturedPhoto } });
    }
  };

  // Permission not yet determined
  if (!permission) {
    return <View style={styles.container} />;
  }

  // Permission denied
  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.permissionText}>
          Camera access is needed to snap your meals
        </Text>
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </Pressable>
        <Pressable
          style={[styles.backButton, { top: insets.top + 12 }]}
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>
    );
  }

  // Photo preview mode
  if (capturedPhoto) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedPhoto }} style={styles.preview} />

        {/* Back button */}
        <Pressable
          style={[styles.backButton, { top: insets.top + 12 }]}
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>

        {/* Bottom buttons */}
        <View
          style={[styles.previewButtons, { paddingBottom: insets.bottom + 24 }]}>
          <Pressable style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.retakeButtonText}>Retake</Text>
          </Pressable>
          <Pressable style={styles.analyseButton} onPress={handleAnalyse}>
            <Text style={styles.analyseButtonText}>Analyse Food</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Camera mode
  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />

      {/* Back button */}
      <Pressable
        style={[styles.backButton, { top: insets.top + 12 }]}
        onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>

      {/* Viewfinder corners */}
      <View style={styles.viewfinderContainer} pointerEvents="none">
        <View style={styles.viewfinder}>
          {/* Top-left corner */}
          <View style={[styles.corner, styles.cornerTopLeft]} />
          {/* Top-right corner */}
          <View style={[styles.corner, styles.cornerTopRight]} />
          {/* Bottom-left corner */}
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          {/* Bottom-right corner */}
          <View style={[styles.corner, styles.cornerBottomRight]} />
        </View>
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottomControls, { paddingBottom: insets.bottom + 16 }]}>
        {/* Capture button */}
        <Pressable style={styles.captureButton} onPress={handleTakePhoto}>
          <View style={styles.captureButtonInner}>
            <Ionicons name="camera" size={32} color="#fff" />
          </View>
        </Pressable>

        {/* Choose from gallery */}
        <Pressable style={styles.galleryButton} onPress={handlePickImage}>
          <Ionicons name="images-outline" size={22} color="#fff" />
          <Text style={styles.galleryText}>Choose from gallery</Text>
        </Pressable>
      </View>
    </View>
  );
}

const CORNER_SIZE = 50;
const CORNER_RADIUS = 20;
const CORNER_WIDTH = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  preview: {
    flex: 1,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  viewfinderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewfinder: {
    width: '80%',
    aspectRatio: 0.85,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: '#fff',
    borderTopLeftRadius: CORNER_RADIUS,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: '#fff',
    borderTopRightRadius: CORNER_RADIUS,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: '#fff',
    borderBottomLeftRadius: CORNER_RADIUS,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: '#fff',
    borderBottomRightRadius: CORNER_RADIUS,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 16,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#840404',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  galleryText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'GoogleSans-Medium',
  },
  previewButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  retakeButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  retakeButtonText: {
    fontSize: 16,
    fontFamily: 'GoogleSans-Bold',
    color: '#1F2937',
  },
  analyseButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#840404',
    alignItems: 'center',
  },
  analyseButtonText: {
    fontSize: 16,
    fontFamily: 'GoogleSans-Bold',
    color: '#fff',
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'GoogleSans-Medium',
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 20,
  },
  permissionButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#840404',
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'GoogleSans-Bold',
  },
});
