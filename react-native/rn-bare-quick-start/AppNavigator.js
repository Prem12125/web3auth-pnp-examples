// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screen/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import LoginHome from './src/screen/LoginUser'
import ConsoleScreen from './src/screen/ConsoleScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
         <Stack.Screen 
        name="LoginHome" 
        component={LoginHome} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ headerShown: false }} 
      />
      
  
      <Stack.Screen 
        name="ConsoleScreen" 
        component={ConsoleScreen} 
        options={{ headerShown: false }} 
      />
  
      <Stack.Screen 
        name="Main" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
