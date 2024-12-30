import '@expo/metro-runtime';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import GameScreen from './GameScreen';

export default function App() {
  const [isWelcomeScreen, setIsWelcomeScreen] = useState(true);

  const handlePress = () => {
    setIsWelcomeScreen(false);
  };

  return (
    <View style={styles.container}>
      {isWelcomeScreen ? (
        <WelcomeScreen onPress={handlePress} />
      ) : (
        <GameScreen />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});