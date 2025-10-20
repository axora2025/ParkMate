import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import HomeController from '../src/core/controllers/HomeController';
import RoleOption from '../src/core/models/RoleOption';

const CARD_RADIUS = 14;
const ICON_SIZE = 64; // 👈 make the icon larger/smaller by changing this

export default function Home() {
  const controller = useMemo(() => new HomeController(), []);
  const options = controller.getOptions();

  return (
    <SafeAreaView style={styles.safe} edges={['top','bottom']}>
      <View style={styles.container}>
        <Text style={styles.back}>‹</Text>

        {/* header */}
        <View style={styles.header}>
          <Text style={styles.welcome}>{controller.getWelcomeTitle()}</Text>
          <Text style={styles.brand}>ParkMate</Text>
          <Text style={styles.subtitle}>Choose how you'd like to use the app</Text>
        </View>

        {/* center cards */}
        <View style={styles.centerBlock}>
          <View style={styles.cards}>
            {options.map(opt => <OptionCard key={opt.id} option={opt} />)}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function OptionCard({ option }: { option: RoleOption }) {
  return (
    <Pressable
      onPress={option.onPress}
      style={({pressed}) => [styles.card, pressed && { opacity: 0.95 }]}
      android_ripple={{ color: '#e9eefc' }}
    >
      <View style={styles.cardInner}>
        <Image source={option.icon} style={styles.icon} resizeMode="contain" />
        <Text style={styles.cardTitle}>{option.title}</Text>
        <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F2F4F8' },
  container: { flex: 1, paddingHorizontal: 20 },
  back: { fontSize: 22, color: '#111', marginTop: 4 },

  header: { marginTop: 8, alignItems: 'center' },
  welcome: { fontSize: 24, fontWeight: '700', color: '#111' },
  brand: { fontSize: 26, fontWeight: '800', color: '#2E7CF6', marginTop: 2 },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 10, textAlign: 'center' },

  centerBlock: { flex: 1, justifyContent: 'center' },
  cards: { gap: 16 },

  card: {
    borderRadius: CARD_RADIUS,
    backgroundColor: '#FFF',
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    // Android elevation
    elevation: 6,
    // Visible border - much darker for testing
    borderWidth: 2,
    borderColor: '#000',
  },
  cardInner: {
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 18,
  },

  // BIG centered icon like your image
  icon: { width: ICON_SIZE, height: ICON_SIZE, marginBottom: 12 },

  cardTitle: { fontSize: 18, fontWeight: '800', color: '#111', textAlign: 'center' },
  cardSubtitle: { marginTop: 6, fontSize: 13, color: '#6B7280', textAlign: 'center' },
});

export {};