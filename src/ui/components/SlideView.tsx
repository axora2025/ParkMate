import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  highlighted?: string | null;
  subtitle: string;
  image: number;
};

export default function SlideView({ title, highlighted, subtitle, image }: Props) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.illustration} resizeMode="contain" />
      <View style={styles.textBlock}>
        <Text style={styles.title}>
          {title}{' '}
          {highlighted ? <Text style={styles.highlight}>{highlighted}</Text> : null}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingHorizontal: 24 },
  illustration: { width: '100%', height: 260, marginTop: 8 },
  textBlock: { marginTop: 24, alignItems: 'center' },
  title: { fontSize: 24, lineHeight: 32, textAlign: 'center', fontWeight: '600', color: '#222' },
  highlight: { fontWeight: '800', color: '#1E5AF9' },
  subtitle: { marginTop: 12, fontSize: 16, lineHeight: 22, textAlign: 'center', color: '#6B7280' },
});
