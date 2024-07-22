// SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientWord from './Gradient';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const starAnim = new Animated.Value(0);

  const isLoggedIn = useSelector((state) => state.login.loggedIn); // Access login status from Redux store
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    console.log("Is Logged In: ", isLoggedIn); // Log the isLoggedIn value

    // Check login status and navigate accordingly
    setTimeout(() => {
      if (isLoggedIn) {
        navigation.replace('Main');
      } else {
        navigation.replace('LoginHome');
      }
    }, 3000); // 3 seconds
  }, [navigation, isLoggedIn]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(starAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [fadeAnim, starAnim]);

  const starSpin = starAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#462A7E', '#213068', '#213068']} style={styles.container}>
      <Animated.Image source={require('./logo.png')} style={{ ...styles.image, opacity: fadeAnim }} />
      <GradientWord text="Welcome to MyApp" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    marginTop: -50,
  },
});

export default SplashScreen;
