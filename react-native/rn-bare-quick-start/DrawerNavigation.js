// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screen/Home/HomeScreen';
import ResumeFormScreen from './src/screen/ResumeFormScreen';
import ResumePreviewScreen from './src/screen/ResumePreviewScreen';
import ResponsiveUi from './src/screen/ResponsiveUi';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="ResumeForm" component={ResumeFormScreen} />
      <Drawer.Screen name="ResumePreview" component={ResumePreviewScreen} />
      <Drawer.Screen name="ResponsiveUi" component={ResponsiveUi} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
