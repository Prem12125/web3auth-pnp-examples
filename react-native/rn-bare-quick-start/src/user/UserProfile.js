import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform, TextInput } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { getAccounts, logoutSuccess } from '../store/loginSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@ethersproject/shims';
import { useWeb3Auth } from '../providers/Web3AuthProvider'; // Adjust the import path accordingly

const UserProfile = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const { userInfo, accounts } = useSelector(state => state.login);
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(userInfo?.name || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const { web3auth, setWeb3Auth } = useWeb3Auth();

  useEffect(() => {
    const init = async () => {
      console.log('Initializing Web3Auth...');
      await web3auth.init();
      console.log('Web3Auth initialized');
      handleGetAccounts();
      loadProfileImage();
      loadUserName();
    };
    init();
  }, [web3auth]);

  const loadProfileImage = async () => {
    const image = await AsyncStorage.getItem('profileImage');
    if (image) {
      setProfileImage({ uri: image });
    }
  };

  const handleImagePicker = async () => {
    try {
      const response = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
        await AsyncStorage.setItem('profileImage', response.assets[0].uri);
      }
    } catch (error) {
      console.log('Error picking image: ', error);
    }
  };

  const handleGetAccounts = () => {
    console.log('Retrieving accounts...');
    dispatch(getAccounts());
    console.log('Accounts retrieved');
  };

  const handleLogout = async () => {
    if (!web3auth.ready) {
      console.log('Web3Auth not initialized');
      return;
    }

    console.log('Starting logout process...');
    try {
      await web3auth.logout();
      console.log('Web3Auth logout successful');
      dispatch(logoutSuccess());
      setWeb3Auth(null);
      console.log('Redux logout success dispatched');
      await AsyncStorage.setItem('userName', '');
      await AsyncStorage.setItem('profileImage', '');

      // navigation.navigate('Splash');
      navigation.replace('Splash');
      // navigation.navigate('Splash')
      console.log('Navigated to Splash screen');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const loadUserName = async () => {
    const storedUserName = await AsyncStorage.getItem('userName');
    if (storedUserName) {
      setName(storedUserName);
    } else {
      setName(userInfo?.name || '');
    }
  };

  const handleSaveName = async () => {
    setIsEditingName(false);
    await AsyncStorage.setItem('userName', name);
    console.log('User name saved:', name);
  };

  return (
   
      <>
      {/* <View style={[styles.NavBar} ,{backgroundColor:'#20182b'}]} /> */}

      <View style={[styles.NavBar,{backgroundColor:'#0e0519'} ]} />
      <ScrollView style={{backgroundColor:'#0e0519'}}>
        <View style={[styles.profileImageContainer]}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              source={profileImage || require('../../assets/image/account-user.png')}
              style={styles.image}
              resizeMode="cover"/>
            <View style={styles.plusIconContainer}>
              <Ionicons name="add-circle" size={30} color="#FF0000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.infoContainer(screenHeight),]}>
          <View style={styles.Row}>
            <View style={styles.AccountContainer}>
              <View>
                <Text style={styles.Label}>Name</Text>
                {isEditingName ? (
                  <TextInput
                    style={styles.input1}
                    value={name}
                    
                    onChangeText={setName}
                    onBlur={handleSaveName}
                  />
                ) : (
                  <TouchableOpacity onPress={() => setIsEditingName(true)}>
                    <Text style={styles.Info}>{name || userInfo?.name || 'N/A'}</Text>
                  </TouchableOpacity>
                )}
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
                <Text style={styles.Label}>Account</Text>
                <Text style={styles.Info}>{accounts || 'N/A'}</Text>
              </View>
            </View>
          </View>
         
          <View style={styles.Row}>
            <View style={styles.AccountContainerLogout}>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      </>
  );
};

const paddingTop = Platform.OS === 'ios' ? wp(15) : '';

const styles = StyleSheet.create({
  
  background1:{
   backgroundColor:'#0e0519'
  },


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
  plusIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  // 20182b   20182b  0e0519
  infoContainer: (screenHeight) => ({
    backgroundColor: '#20182b',
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
    width: '100%',
  },
  Label: {
    color: '#9286DA',
    fontSize: wp(3.5),
  },
  Info: {
    color: '#fff',
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
  input1: {
    height: 40,
    borderColor: '#ccc',
  color: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    marginTop: wp(1),
  },
});

export default UserProfile;
