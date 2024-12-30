import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Button,
  Dimensions,
  PanResponder,
  Animated
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function WelcomeScreen({ onPress }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const paddlePosition = new Animated.ValueXY({ x: SCREEN_WIDTH/2 - 50, y: SCREEN_HEIGHT - 100 });
  const ballPosition = new Animated.ValueXY({ x: SCREEN_WIDTH/2, y: SCREEN_HEIGHT - 150 });
  const [ballVelocity, setBallVelocity] = useState({ x: 5, y: -10 });
  const [items, setItems] = useState([]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      let newX = paddlePosition.x._value + gestureState.dx;
      if (newX < 0) newX = 0;
      if (newX > SCREEN_WIDTH - 100) newX = SCREEN_WIDTH - 100;
      paddlePosition.setValue({ x: newX, y: paddlePosition.y._value });
    }
  });

  useEffect(() => {
    if (gameStarted) {
      const gameLoop = setInterval(() => {
        moveBall();
        checkCollisions();
        spawnItems();
      }, 16);
      return () => clearInterval(gameLoop);
    }
  }, [gameStarted, ballPosition, ballVelocity]);

  const moveBall = () => {
    const newX = ballPosition.x._value + ballVelocity.x;
    const newY = ballPosition.y._value + ballVelocity.y;
    
    // 邊界碰撞檢測
    if (newX <= 0 || newX >= SCREEN_WIDTH - 20) {
      setBallVelocity({ ...ballVelocity, x: -ballVelocity.x });
    }
    
    // 重力效果
    setBallVelocity({ ...ballVelocity, y: ballVelocity.y + 0.5 });
    
    ballPosition.setValue({ x: newX, y: newY });
  };

  const checkCollisions = () => {
    // 檢查與彈跳板的碰撞
    if (ballPosition.y._value >= paddlePosition.y._value - 20 &&
        ballPosition.x._value >= paddlePosition.x._value &&
        ballPosition.x._value <= paddlePosition.x._value + 100) {
      setBallVelocity({ ...ballVelocity, y: -12 });
    }
    
    // 遊戲結束條件
    if (ballPosition.y._value > SCREEN_HEIGHT) {
      setGameStarted(false);
    }
  };

  return (
    <ImageBackground 
      source={{uri: 'https://i.imgur.com/MtHeYrE.jpg'}} 
      style={styles.backgroundImage} 
      resizeMode="cover"
    >
      {!gameStarted ? (
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>塔塔大作戰</Text>
          <Button 
            title="開始遊戲" 
            onPress={() => setGameStarted(true)} 
            color="#841584" 
          />
        </View>
      ) : (
        <View style={styles.gameContainer}>
          <Text style={styles.scoreText}>分數: {score}</Text>
          <Animated.View 
            style={[styles.ball, ballPosition.getLayout()]} 
          />
          <Animated.View 
            {...panResponder.panHandlers}
            style={[styles.paddle, paddlePosition.getLayout()]} 
          />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  gameContainer: {
    flex: 1,
    width: '100%',
  },
  scoreText: {
    fontSize: 24,
    color: '#fff',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  ball: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
  },
  paddle: {
    width: 100,
    height: 20,
    backgroundColor: '#841584',
    position: 'absolute',
    borderRadius: 10,
  }
});