// src/screen/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Add signup logic here
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default SignupScreen;
// import React from "react";
// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import theme from '../screen/Thm';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const mailIcon = <Icon name="envelope-o" size={25} color="#FFF" />
// const googleIcon = <Icon name="google" size={25} color="#FFF" />
// const facebookIcon = <Icon name="facebook" size={25} color="#FFF" />

// import { 
//     Nunito_400Regular,
//     Nunito_700Bold
// } from '@expo-google-fonts/nunito';

// export default function SignupScreen({ navigation }){
//     // const [loaded] = useFonts({
//     //     Nunito_400Regular,
//     //     Nunito_700Bold,
//     // });
      
//     // if (!loaded) {
//     //     return null;
//     // }
//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Register</Text>
//             <Text style={styles.subheader}>Register your account here.</Text>
//             <View style={styles.input_area}>
//                 <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Register')}>
//                     <Text style={styles.text}>{mailIcon} Email</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button}>
//                     <Text style={styles.text}>{googleIcon} Google</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button}>
//                     <Text style={styles.text}>{facebookIcon} Facebook</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     header: {
//         fontSize: 30,
//         fontFamily: 'Nunito',
//         color: theme.PRIMARY_COLOR,
//         textTransform: 'uppercase',
//         fontFamily: 'Nunito_700Bold',
//     },
//     subheader: {
//         margin: 10,
//         color: theme.TEXT_COLOR,
//         fontFamily: 'Nunito_400Regular'
//     },
//     input_area : {
//         width: '80%'
//     },
//     button: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 12,
//         paddingHorizontal: 32,
//         borderRadius: 10,
//         elevation: 3,
//         backgroundColor: theme.PRIMARY_COLOR,
//         marginTop: 12,
//         height: 50
//     },
//     text : {
//         fontSize: 16,
//         fontFamily: 'Nunito_700Bold',
//         letterSpacing: 0.25,
//         color: 'white',
//         textTransform: 'uppercase'
//     },
// });