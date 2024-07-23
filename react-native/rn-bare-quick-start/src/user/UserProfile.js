import React, { useEffect } from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { getAccounts,  signMessage, logoutSuccess } from '../store/loginSlice';

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



const UserProfile = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const { userInfo, accounts,  signedMessage } = useSelector(state => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      console.log("prem checking log in ");
      await web3auth.init();
      handleGetAccounts();
      handleSignMessage();
      // if (web3auth.privKey) {
      //   await ethereumPrivateKeyProvider.setupProvider(web3auth.privKey);

      //   setLoggedIn(true);
      //   dispatch(loginSuccess({ userInfo: web3auth.userInfo(), privateKey: web3auth.privKey, web3auth }));
      // }
    };
    init();
  }, []);

 

  const handleGetAccounts = () => {
    dispatch(getAccounts());
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
    <ImageBackground
      source={require('../../assets/image/bg.png')} 
      style={styles.background}>
      <View style={styles.NavBar}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('HomeTab')}>
          <AntDesign
            style={styles.searchIcon}
            name="arrowleft"
            size={25}
            color="#9286DA"
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.panVerification}>Account</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/image/progress-navbar.png')}
            style={styles.horiLine}
            resizeMode="contain"
          />
        </View> */}
      </View>
      <ScrollView>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/image/account-user.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoContainer(screenHeight)}>
          <View style={styles.Row}>
            <View style={styles.AccountContainer}>
              <View>
                <Text style={styles.Label}>Name</Text>
                <Text style={styles.Info}>{userInfo?.name || 'N/A'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.Row}>
            <View style={styles.AccountContainer}>
              <View>
                <Text style={styles.Label}>Email</Text>
                <Text style={styles.Info}>{userInfo?.email || 'N/A'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.Row}>
            <View style={styles.AccountContainer}>
              <View>
                <Text style={styles.Label}>Type of Login</Text>
                <Text style={styles.Info}>{userInfo?.typeOfLogin || 'N/A'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.Row}>
            <View style={styles.AccountContainer}>
              <View>
                <Text style={styles.Label}>Verifier</Text>
                <Text style={styles.Info}>{userInfo?.verifier || 'N/A'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.Row}>
            <View style={styles.AccountContainer}>
              <View>
                <Text style={styles.Label}>Account</Text>
                <Text style={styles.Info}>{accounts || 'N/A'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.Row}>
            <View style={styles.AccountContainer}>
              <View>
                <Text style={styles.Label}>Signed Message</Text>
                <Text style={styles.Info}>{signedMessage || 'N/A'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.Row}>
          <View style={styles.Row}>
            <View style={styles.AccountContainerLogout}>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const paddingTop = Platform.OS === 'ios' ? wp(15) : '';

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(5),
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  profileImageContainer: {
    flexDirection: 'flex',
    marginTop: wp(5),
    alignItems: 'center',
  },
  infoContainer: (screenHeight) => ({
    backgroundColor: '#FFFFFF87',
    padding: wp(5),
    marginTop: wp(5),
    height: screenHeight / 1.3,
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
  }),
  Row: {
    flexDirection: 'row',
    marginTop: wp(2),
  },
  NavBar: {
    paddingTop: paddingTop,
    paddingHorizontal: wp(3),
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panVerification: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  AccountContainer: {
    paddingBottom: 10,
    paddingTop: 3,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderBottomWidth: 0.5,
    width: '100%',
  },
  AccountContainerLogout: {
    paddingBottom: 10,
    paddingTop: 3,
    // borderStyle: 'solid',
    // borderColor: '#ccc',
    // borderBottomWidth: 0.5,
    width: '100%',
  },
  Label: {
    color: '#9286DA',
    fontSize: wp(3.5),
  },
  Info: {
    color: '#000',
    fontSize: wp(4.2),
    lineHeight: wp(5),
    marginTop: wp(1),
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  horiLine: {
    height: 2,
    width: 55,
  },
});

export default UserProfile;
