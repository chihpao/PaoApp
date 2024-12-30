import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GameScreen() {
  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameText}>歡迎來到遊戲頁面！</Text>
      {/* 在這裡開始製作你的遊戲 */}
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  gameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});