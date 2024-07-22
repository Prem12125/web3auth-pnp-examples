import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, StyleSheet, Platform } from 'react-native';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store'; // Adjust the import path accordingly

const App = () => {
  return (
    <>
      {/* {Platform.OS === 'ios' && <View style={styles.statusBar} />} */}
      <StatusBar backgroundColor={'#eeeef7'} barStyle={'dark-content'} hidden={true} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#eeeef7',
  },
});

export default App;
