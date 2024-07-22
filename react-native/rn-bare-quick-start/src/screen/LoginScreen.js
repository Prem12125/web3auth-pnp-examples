import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Web3Auth, OPENLOGIN_NETWORK } from '@web3auth/react-native-sdk';
import SInfo from 'react-native-sensitive-info';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
const LoginScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBackgroundColor('green');
      StatusBar.setBarStyle('light-content');
    }
  }, [isFocused]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Call handleWeb3AuthLogin directly when the screen loads
    handleWeb3AuthLogin();
  }, [fadeAnim]);

  const handleWeb3AuthLogin = async () => {
    try {
      console.log('Creating Web3Auth instance...');
      const web3auth = new Web3Auth({
        clientId: 'BMqIp0R3pH9bsM3pn8DXRneszUEA9M8y8MZfa73VfZ-X3kYC49ntjepg6iVoKCsWHn_ZyzmkR6QYHZ56c9M49WY',
        network:  OPENLOGIN_NETWORK.TESTNET,
      });

      console.log('Initializing Web3Auth...');
      await web3auth.init();
      console.log('Web3Auth initialized, connecting...');

      const provider = await web3auth.connect();
      console.log('Login successful:', provider);

      await SInfo.setItem('provider', JSON.stringify(provider), {
        sharedPreferencesName: 'myAppSharedPrefs',
        keychainService: 'myAppKeychain',
      });

      navigation.replace('Main');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogin = () => {
    // Add your login logic here
    if (email === '' || password === '') {
      setErrorMessage('Please fill in all fields');
    } else {
      // Placeholder for actual login logic
      navigation.navigate('Main');
    }
  };

  return (
    <LinearGradient colors={['#434343', '#0b0b0b']} style={styles.container}>
      <Animated.View style={{ ...styles.imageContainer, opacity: fadeAnim }}>
        <Image
          source={require('./splash.png')}
          style={styles.image}
        />
      </Animated.View>
      <Text style={styles.text}>Welcome to MyApp</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleWeb3AuthLogin}>
          <LinearGradient colors={['#ff8c00', '#ffa500']} style={styles.buttonBackground}>
            <Text style={styles.buttonText}>Login with Web3Auth</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <LinearGradient colors={['#ff8c00', '#ffa500']} style={styles.buttonBackground}>
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <LinearGradient colors={['#ff8c00', '#ffa500']} style={styles.buttonBackground}>
            <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b0b0b',
  },
  imageContainer: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 150,
    marginTop: -50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Cursive',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    margin: 10,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: '#ff8c00',
  },
  buttonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default LoginScreen;
