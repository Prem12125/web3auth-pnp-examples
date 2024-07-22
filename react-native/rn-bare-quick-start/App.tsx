import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, StyleSheet, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store'; // Adjust the import path accordingly
import DrawerNavigator from './DrawerNavigator';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'#eeeef7'} barStyle={'dark-content'} hidden={true} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

// const styles = StyleSheet.create({
//   statusBar: {
//     height: Platform.OS === 'ios' ? 20 : 0,
//     backgroundColor: '#eeeef7',
//   },
// });

export default App;
