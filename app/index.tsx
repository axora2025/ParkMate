// app/index.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const FOOTER_HEIGHT = 52;  // button height
const FOOTER_VPAD   = 16;  // vertical padding around footer

export default function Onboarding() {
  const [step, setStep] = useState<0 | 1>(0); // 0 = first, 1 = second
  const insets = useSafeAreaInsets();

  const bottomSafe = Math.max(insets.bottom, FOOTER_VPAD);
  const contentPadBottom = FOOTER_HEIGHT + bottomSafe + 12; // keep dots above footer

  const onPrimary = () => {
    if (step === 0) setStep(1);
    else router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Top bar (Skip only on first slide) */}
      <View style={styles.topBar}>
        <Text style={{ color: 'transparent' }}> </Text>
        {step === 0 ? (
          <Pressable onPress={() => setStep(1)} hitSlop={8}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        ) : (
          <Text style={{ color: 'transparent' }}> </Text>
        )}
      </View>

      {/* Body (scrollable so content never hides the footer) */}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.body, { paddingBottom: contentPadBottom }]}
      >
        {step === 0 ? (
          <>
            <Image source={require('../assets/slide1.png')} style={styles.art} resizeMode="contain" />
            <View style={styles.textBlock}>
              <Text style={styles.title}>
                Discover <Text style={styles.highlight}>Best and Safer</Text>
              </Text>
              <Text style={styles.subtitle}>Place For Your Vehicle</Text>
            </View>
          </>
        ) : (
          <>
            <Image source={require('../assets/slide2.png')} style={styles.art} resizeMode="contain" />
            <View style={styles.textBlock}>
              <Text style={styles.title}>
                Join <Text style={styles.highlight}>and Earn</Text>
              </Text>
              <Text style={styles.subtitle}>
                If you have a Free space in urban areas and you like to earn from it by providing parking area  Register Now
              </Text>
            </View>
          </>
        )}

        {/* Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, step === 0 && styles.dotActive]} />
          <View style={[styles.dot, step === 1 && styles.dotActive]} />
        </View>
      </ScrollView>

      {/* Fixed footer button */}
      <View style={[styles.footer, { paddingBottom: bottomSafe }]}>
        <Pressable style={styles.cta} onPress={onPrimary}>
          <Text style={styles.ctaText}>{step === 0 ? 'Next' : 'Get Start'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },

  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skip: { fontSize: 14, color: '#6B7280', fontWeight: '600' },

  body: { flexGrow: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 8 },

  art: { width: '100%', height: 260, marginTop: 8 },
  textBlock: { marginTop: 24, alignItems: 'center' },
  title: { fontSize: 24, lineHeight: 32, fontWeight: '600', color: '#222', textAlign: 'center' },
  highlight: { fontWeight: '800', color: '#1E5AF9' },
  subtitle: { marginTop: 12, fontSize: 16, lineHeight: 22, color: '#6B7280', textAlign: 'center' },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 16 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D1D5DB' },
  dotActive: { backgroundColor: '#1E5AF9', width: 8, height: 8 },

  footer: { paddingHorizontal: 24, backgroundColor: '#FFFFFF' },
  cta: {
    height: FOOTER_HEIGHT,
    borderRadius: 10,
    backgroundColor: '#1E5AF9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  ctaText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
