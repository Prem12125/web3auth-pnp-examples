import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store'; // Adjust the import path accordingly
import DrawerNavigator from './DrawerNavigator'; // Adjust the import path accordingly
import { Web3AuthProvider } from './src/providers/Web3AuthProvider'; 
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'#eeeef7'} barStyle={'dark-content'} hidden={true} />
      <Web3AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              {/* <DrawerNavigator /> */}
              <AppNavigator/>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </Web3AuthProvider>
    </>
  );
};

export default App;
