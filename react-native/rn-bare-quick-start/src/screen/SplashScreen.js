import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientWord from './Gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const starAnim = new Animated.Value(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('loginNewUser');
        console.log("user checking login status",loginStatus);
        setIsLoggedIn(loginStatus === 'true');
      } catch (error) {
        console.error("Error fetching login status: ", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        navigation.replace('Main');
      } else {
        navigation.replace('LoginHome');
      }
    }, 3000);
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
    // background: linear-gradient(45deg, #1e3c72, #2a5298); #43cea2, #185a9d #ff7e5f, #feb47b  #ff6a00, #ee0979 #56ab2f, #a8e063

    <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={[ '#7B2BF9', '#78CCF0']} style={styles.container}>
      <Animated.Image source={require('../../assets/image/dmtSplash.gif')} style={{ ...styles.image, opacity: fadeAnim }} />
      <GradientWord text="Blockchain Helping Network" />
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
