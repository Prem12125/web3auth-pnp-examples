import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RegisterScreen = () => {
  const navigation = useNavigation();

//   const HandleloginScreen = () => {
//     navigation.navigate('RegisterScreen');
// };

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.image} />

      <Text style={styles.title}>Register Here</Text>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Balance :</Text>
        <Text style={styles.balanceAmount}>0</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Referral Id"
        placeholderTextColor="#999"
        value="DSC84247"
        editable={false}
      />

      <Text style={styles.registrationFee}>
        Registration Fee: <Text style={styles.feeAmount}>$520</Text>
      </Text>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* <Text style={styles.loginText}>
        Already have an account?{' '}
        <TouchableOpacity onPress={HandleloginScreen}>
          <Text style={styles.loginLink}>Login Here</Text>
        </TouchableOpacity>
      </Text> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 5,
  },
  balanceAmount: {
    fontSize: 16,
    color: '#FFC107',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    color: '#fff',
    marginBottom: 20,
  },
  registrationFee: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  feeAmount: {
    color: '#FFC107',
  },
  registerButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
  },
  loginLink: {
    color: '#6200EE',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
