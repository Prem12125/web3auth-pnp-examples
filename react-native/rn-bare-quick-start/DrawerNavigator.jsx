import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './AppNavigator'; // Import AppNavigator
import ResumeFormScreen from './src/screen/ResumeFormScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="App">
      <Drawer.Screen name="projectX" component={AppNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="Main" component={ResumeFormScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
