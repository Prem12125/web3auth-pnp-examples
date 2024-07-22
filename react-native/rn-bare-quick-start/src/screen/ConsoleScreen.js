import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getAccounts, getBalance, signMessage, logoutSuccess } from '../store/loginSlice';
import { useNavigation } from '@react-navigation/native';

const ConsoleScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userInfo, accounts, balance, signedMessage, privateKey, web3auth } = useSelector(state => state.login);

  const handleGetAccounts = () => {
    dispatch(getAccounts());
  };

  const handleGetBalance = () => {
    dispatch(getBalance());
  };

  const handleSignMessage = () => {
    dispatch(signMessage());
  };

  const handleLogout = async () => {
    if (!web3auth.ready) {
      console.log('Web3auth not initialized');
      return;
    }

    try {
      await web3auth.logout();
      dispatch(logoutSuccess());
      navigation.navigate('Splash');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Console Screen</Text>
      {userInfo && <Text>User Info: {JSON.stringify(userInfo)}</Text>}
      {accounts && <Text>Accounts: {accounts}</Text>}
      {balance && <Text>Balance: {balance}</Text>}
      {signedMessage && <Text>Signed Message: {signedMessage}</Text>}
      <View style={styles.buttonContainer}>
        <Button title="Get Accounts" onPress={handleGetAccounts} />
        <Button title="Get Balance" onPress={handleGetBalance} />
        <Button title="Sign Message" onPress={handleSignMessage} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ConsoleScreen;
