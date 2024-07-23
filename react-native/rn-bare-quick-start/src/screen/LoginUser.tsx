
  import React, { useEffect, useState } from 'react';
  import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Animated,
    TextInput,
    TouchableOpacity,
    StatusBar,
  } from 'react-native';
  
  import '@ethersproject/shims';
  import { ethers } from 'ethers';
  import * as WebBrowser from '@toruslabs/react-native-web-browser';
  import EncryptedStorage from 'react-native-encrypted-storage';
  import Web3Auth, {
    LOGIN_PROVIDER,
    OPENLOGIN_NETWORK,
    ChainNamespace,
  } from '@web3auth/react-native-sdk';
  import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
  import LinearGradient from 'react-native-linear-gradient';
  import CustomButton from '../customStyle/CustomButton';
  import { useNavigation } from '@react-navigation/native';
  import { useDispatch } from 'react-redux';
  import { loginSuccess } from '../store/loginSlice';
  
  const scheme = 'projectx';
  const redirectUrl = `${scheme}://openlogin`;
  
  const clientId = 'BHHDik5lqQ3psVh6I474DxaARw2vFbraf5NOz6Y2Y_RDHglXoboaMmgXBCwVdKZpXpbVJ7rx35KjYp5swq93ngc'; // replace with your actual clientId
  
  const chainConfig = {
    chainNamespace: ChainNamespace.EIP155,
    chainId: '0xaa36a7',
    rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
    displayName: 'Ethereum Sepolia Testnet',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    ticker: 'ETH',
    tickerName: 'Ethereum',
    decimals: 18,
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  };
  
  const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
    config: {
      chainConfig,
    },
  });
  
  const web3auth = new Web3Auth(WebBrowser, EncryptedStorage, {
    clientId,
    redirectUrl,
    network: OPENLOGIN_NETWORK.SAPPHIRE_DEVNET,
  });
  
  export default function LoginScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch(); // Use useDispatch hook from react-redux
    const [loggedIn, setLoggedIn] = useState(false);
    const [console1, setConsole] = useState<string>('');
    const [email, setEmail] = useState<string>('');
  
    useEffect(() =>  {
      const init = async () => {
        await web3auth.init();
        if (web3auth.privKey) {
          await ethereumPrivateKeyProvider.setupProvider(web3auth.privKey);
          setLoggedIn(true);
          dispatch(loginSuccess({ userInfo: web3auth.userInfo(), privateKey: web3auth.privKey, web3auth }));
        }
      };
      init();
    });
  
    useEffect(() => {
      if (loggedIn) {
        navigation.navigate('Main' as never);
      }
    }, [loggedIn, navigation]);
  
    const login = async () => {
      try {
        if (!web3auth.ready) {
          setConsole('Web3auth not initialized');
          return;
        }
        if (!email) {
          setConsole('Enter email first');
          return;
        }
  
        setConsole('Logging in');
        await web3auth.login({
          loginProvider: LOGIN_PROVIDER.EMAIL_PASSWORDLESS,
          extraLoginOptions: {
            login_hint: email,
          },
        });
  
        if (web3auth.privKey) {
          await ethereumPrivateKeyProvider.setupProvider(web3auth.privKey);
          setLoggedIn(true);
          
          // Dispatch loginSuccess action with user information and private key
          dispatch(loginSuccess({ userInfo: web3auth.userInfo(), privateKey: web3auth.privKey, web3auth }));
        }
      } catch (e: any) {
        setConsole(e.message);
      }
    };
    const loginGoogle = async () => {
      try {
        if (!web3auth.ready) {

          setConsole('Web3auth not initialized');
          return;
        }
     
    
        setConsole('Logging in');
        try {
          
        await web3auth.login({
          loginProvider: LOGIN_PROVIDER.GOOGLE,
        });
    
        } catch (error) {
          console.log('prem re try login ', error);
        }
        if (web3auth.privKey) {
          await ethereumPrivateKeyProvider.setupProvider(web3auth.privKey);
          setLoggedIn(true);
          
          // Dispatch loginSuccess action with user information and private key
          dispatch(loginSuccess({ userInfo: web3auth.userInfo(), privateKey: web3auth.privKey, web3auth }));
        }
      } catch (e: any) {
        setConsole(e.message);
      }
    };
    
  
    const loginFacebook = async () => {
      try {
        if (!web3auth.ready) {
          setConsole('Web3auth not initialized');
          return;
        }
  
        setConsole('Logging in');
        await web3auth.login({
          loginProvider: LOGIN_PROVIDER.FACEBOOK,
        });
  
        if (web3auth.privKey) {
          await ethereumPrivateKeyProvider.setupProvider(web3auth.privKey);
          setLoggedIn(true);
          
          // Dispatch loginSuccess action with user information and private key
          dispatch(loginSuccess({ userInfo: web3auth.userInfo(), privateKey: web3auth.privKey, web3auth }));
        }
      } catch (e: any) {
        setConsole(e.message);
      }
    };
  
    const loginApple = async () => {
      try {
        if (!web3auth.ready) {
          setConsole('Web3auth not initialized');
          return;
        }
  
        setConsole('Logging in');
        await web3auth.login({
          loginProvider: LOGIN_PROVIDER.APPLE,
        });
  
        if (web3auth.privKey) {
          await ethereumPrivateKeyProvider.setupProvider(web3auth.privKey);
          setLoggedIn(true);
          
          // Dispatch loginSuccess action with user information and private key
          dispatch(loginSuccess({ userInfo: web3auth.userInfo(), privateKey: web3auth.privKey, web3auth }));
        }
      } catch (e: any) {
        setConsole(e.message);
      }
    };
  
    const getAccounts = async () => {
      if (!web3auth.privKey) {
        uiConsole('provider not set');
        return;
      }
      setConsole('Getting account');
      const provider = new ethers.Wallet(web3auth.privKey, ethers.getDefaultProvider('https://rpc.ankr.com/eth_sepolia'));
      const address = await provider.getAddress();
      uiConsole(address);
    };
  
    const getBalance = async () => {
      if (!web3auth.privKey) {
        uiConsole('provider not set');
        return;
      }
      setConsole('Fetching balance');
      const provider = new ethers.Wallet(web3auth.privKey, ethers.getDefaultProvider('https://rpc.ankr.com/eth_sepolia'));
      // const balance = ethers.utils.formatEther(await provider.getBalance());
      // uiConsole(balance);
    };
  
    const signMessage = async () => {
      if (!web3auth.privKey) {
        uiConsole('provider not set');
        return;
      }
      setConsole('Signing message');
      const provider = new ethers.Wallet(web3auth.privKey, ethers.getDefaultProvider('https://rpc.ankr.com/eth_sepolia'));
      const signedMessage = await provider.signMessage('YOUR_MESSAGE');
      uiConsole(signedMessage);
    };
  
    const launchWalletServices = async () => {
      if (!web3auth) {
        setConsole('Web3auth not initialized');
        return;
      }
      setConsole('Launch Wallet Services');
      await web3auth.launchWalletServices(chainConfig);
    };
  
    const uiConsole = (...args: unknown[]) => {
      setConsole(JSON.stringify(args || {}, null, 2) + '\n\n\n\n' + console1);
    };
  
      const loggedInView = (
        <View style={styles.buttonArea}>
          <Button
            title="Get User Info"
            onPress={() => uiConsole(web3auth.userInfo())}
          />
          <Button title="Get Accounts" onPress={() => getAccounts()} />
          <Button title="Get Balance" onPress={() => getBalance()} />
          <Button title="Sign Message" onPress={() => signMessage()} />
          <Button title="Show Wallet UI" onPress={() => launchWalletServices()} />
        </View>
      );
  
      const unloggedInView = (
        <View style={styles.buttonAreaLogin}>
          <Animated.Image
            source={require('./logo.png')}
            style={{ ...styles.image }}
          />
  
          <Text style={styles.continueStyle}>Email </Text>
          <View style={{ justifyContent: 'center', paddingLeft: 20, paddingRight: 20, paddingTop: 20, width: '100%' }}>
            <TextInput
            style={styles.inputEmail}
            onChangeText={setEmail}
            placeholderTextColor="#C7C9D6"
            placeholder="Enter email"
          />
          </View>
          <View style={{ justifyContent: 'center', paddingLeft: 20, paddingRight: 20, width: '100%' }}>
            <CustomButton title="Login with Email" onPress={login} />
          </View>
  
          <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
            <Text style={styles.continueStyle}>Continue with </Text>
            <View style={styles.row}>
              <View style={styles.container1}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={
                    ()=>{
                      loginGoogle();

                    }
                    }>
                    <Image
                      source={require('./GOOGLE.png')}
                      style={styles.logoImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.container1}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={loginFacebook}>
                    <Image
                      source={require('./FACEBOOK.png')}
                      style={styles.logoImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.container1}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={loginApple}>
                    <Image
                      source={require('./APPLE.png')}
                      style={styles.logoImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
  
      return (
        <>
        <StatusBar backgroundColor={'green'} barStyle={'dark-content'} hidden={true} />
        <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#462A7E', '#213068', '#213068']} style={styles.container}>
          <View style={styles.container}>
            {loggedIn ? loggedInView : unloggedInView}
          </View>
        </LinearGradient>
        </>
      );
    }
  
    const styles = StyleSheet.create({
      inputEmail: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        color: '#fff',
        borderRadius: 100,
        marginBottom: 20,
      },
      container1: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
      },
      imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      image: {
        width: 200,
        height: 200,
        borderRadius: 75, 
      },
      logoImage: {
        width: 50,
        height: 50,
        borderRadius: 75,
      },
      container: {
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 30,
      },
      buttonArea: {
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 30,
      },
      buttonAreaLogin: {
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 50,
        width: '100%',
      },
      signInText: {
        fontSize: 30,
        color: '#fff',
      },
      continueStyle: {
        fontSize: 20,
        paddingTop: 100,
        color: '#C7C9D6'
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 50,
        paddingRight: 50,
        width: '100%',
      },
    });
  