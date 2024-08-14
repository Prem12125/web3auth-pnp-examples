// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screen/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import LoginHome from './src/screen/LoginUser'
import ConsoleScreen from './src/screen/ConsoleScreen';
import UserProfile from './src/user/UserProfile';
import WalletScreenUI from './src/screen/wallet/walletScreen';
import ReferFriend from './src/screen/refer/ReferFriend';
import WalletWithdrawal from './src/screen/wallet/withDraw';
import { State } from 'react-native-gesture-handler';
import QRCodeScannerScreen from './src/screen/wallet/qrCodeScanner';
import PaymentScreen from './src/screen/wallet/PaymentScreen';
import MyTeam from './src/screen/Home/MyTeam';
import RegisterScreen from './src/user/RegisterScreen';
import HelpScreen from './src/screen/Home/MakeHelp';
import GDHelpScreen from './src/screen/Home/GdHelp';
// import LineChartExample from './src/screen/LineGraph';
// import LineChartExample1 from './src/screen/LineGraph1';


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
      name='UserProfile'
      component={UserProfile}
      options={{headerShown:false}}
/>  
      <Stack.Screen 
        name="Main" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }} 
      />
      {/* <Stack.Screen
      name='WalletConnectComponent'
      component={WalletConnectComponent}
      
      /> */}

      <Stack.Screen 
      name='WalletScreenUI'
      component={WalletScreenUI}
      options={{ headerShown: false
      }} 
      /> 
      {/* <Stack.Screen
      name='LineChartExample'
      component={LineChartExample}
      />
      <Stack.Screen
      name='LineChartExample1'
      component={LineChartExample1}
      /> */}
      <Stack.Screen 
      name='ReferFriend'
      component={ReferFriend}
      options={{headerShown:false}}
      />
      < Stack.Screen
      name='withdrawBalance'
      component={WalletWithdrawal}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name="QRCodeScannerScreen"
      component={QRCodeScannerScreen}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name='PaymentScreen'
      component={PaymentScreen}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name='myTeam'
      component={MyTeam}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name='RegisterScreen'
      component={RegisterScreen}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name='HelpScreen'
      component={HelpScreen}
      options={{headerShown:false}}
      
      />
      <Stack.Screen
      name='GDHelpScreen'
      component={GDHelpScreen}
      options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
