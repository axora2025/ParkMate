import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

export default function Driver() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.title}>Driver</Text>
        <Text>Find parking near you</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe:{ flex:1, backgroundColor:'#fff' },
  center:{ flex:1, alignItems:'center', justifyContent:'center' },
  title:{ fontSize:22, fontWeight:'700', marginBottom:8 },
});
