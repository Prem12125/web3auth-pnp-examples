// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screen/HomeScreen';
import ResumeFormScreen from './src/screen/ResumeFormScreen';
import ResumePreviewScreen from './src/screen/ResumePreviewScreen';
import ResponsiveUi from './src/screen/ResponsiveUi';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={route.key} style={styles.tabBarItem}>
            {isFocused && <View style={styles.focusedLine} />}
            <Ionicons
              name={
                route.name === 'Home'
                  ? isFocused
                    ? 'home'
                    : 'home-outline'
                  : route.name === 'ResumeForm'
                    ? isFocused
                      ? 'document'
                      : 'document-outline'
                    : route.name === 'ResumePreview'
                      ? isFocused
                        ? 'eye'
                        : 'eye-outline'
                      : route.name === 'ResponsiveUi'
                        ? isFocused
                          ? 'settings'
                          : 'settings-outline'
                        : 'circle'
              }
              size={24}
              color={isFocused ? 'tomato' : 'gray'}
              onPress={onPress}
              onLongPress={onLongPress}
            />
            <Text
              style={{ color: isFocused ? 'tomato' : 'gray' }}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="ResumeForm" component={ResumeFormScreen} />
      <Tab.Screen name="ResumePreview" component={ResumePreviewScreen} options={{
          headerShown: true,
          headerTitle: () => (
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor={'rgba(53, 53, 53, 0.5)'}
              />
            </View>
          )
        }} />
      <Tab.Screen name="ResponsiveUi" component={ResponsiveUi} options={{headerShown:false}} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 90,
    borderTopWidth: 0,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    height: 37,
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: '90%',
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#424242',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  focusedLine: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 3,
    backgroundColor: 'red',
  },
});

export default BottomTabNavigator;
