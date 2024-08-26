import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screen/Home/HomeScreen';
import ResumeFormScreen from './src/screen/ResumeFormScreen';
import UserProfile from './src/user/UserProfile';
import WalletScreenUI from './src/screen/wallet/walletScreen';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import MyDirects from './src/screen/myDirects/MyDirects';

const Tab = createBottomTabNavigator();

const walletGrey = require('./assets/Icon/walletGrey.png');
const walletTomato = require('./assets/Icon/walletTomato.png');

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
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {isFocused && <View style={styles.focusedLine} />}
            {route.name === 'Wallet' ? (
              <Image
                source={isFocused ? walletTomato : walletGrey}
                style={{ width: 24, height: 24, marginBottom:2 }}
              />
            ) : (
              <Ionicons
                name={
                  route.name === 'Home'
                    ? isFocused
                      ? 'home'
                      : 'home-outline'
                    : route.name === 'My Directs'
                      ? isFocused
                        ? 'document'
                        : 'document-outline'
                      : route.name === 'Profile'
                        ? isFocused
                          ? 'person'
                          : 'person-outline'
                        : 'circle'
                }
                size={24}
                color={isFocused ? 'tomato' : '#808080'}
              />
            )}
            <Text style={{ color: isFocused ? 'tomato' : 'gray' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="My Directs" component={MyDirects} options={{headerShown:false}}/>
      <Tab.Screen name="Wallet" component={WalletScreenUI} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 80,
  },
  tabBar: {
    flexDirection: 'row',
    height: 80,
    marginTop: 10,
    marginLeft: 1,
    marginRight: 5,
    borderTopWidth: 0,
    elevation: 10,
    backgroundColor: 'transparent', // Make the background transparent
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
