import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  Vibration,
  View,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import RNQRGenerator from 'rn-qr-generator';
import { ActivityIndicator } from 'react-native-paper';

const QRCodeScannerScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [cameraActive, setCameraActive] = useState(true);
  const [walletAddress, setWalletAddress] = useState(''); // Renamed to walletAddress
  const { hasPermission, requestPermission } = useCameraPermission();

  const device = useCameraDevice('back');
  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, [hasPermission, requestPermission]);

  const [torchActive, setTorchActive] = useState(false); // State to track torch status

  const [vibrated, setVibrated] = useState(false);
  const toggleTorch = () => {
    setTorchActive((prevState) => !prevState); // Toggle torch status
  };

  const isJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleCodeScan = (scannedValue) => {
    console.log('Scanned value:', scannedValue);

    if (isJSON(scannedValue)) {
      try {
        const data = JSON.parse(scannedValue);
        // Assuming you expect a userId in the JSON
        if (data?.userId) {
          Vibration.vibrate();
          setCameraActive(false);
          navigation.replace('PaymentScreen', { scannedCode: scannedValue });
        } else {
          Alert.alert('Invalid QR Code', 'The scanned QR code is not valid.');
        }
      } catch (error) {
        Alert.alert('Error', 'Scanned data is not valid JSON.');
        console.error('JSON Parse error:', error);
      }
    } else {
      // Handle non-JSON scanned values
      if (scannedValue === 'Wallet Address Not Found') {
        Alert.alert('Error', 'Wallet address could not be found.');
      } else {
        // Fill the wallet address with scanned value
        setWalletAddress(scannedValue);
        bottomSheetRef.current.open(); // Open bottom sheet to show wallet address
      }
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (codes?.length > 0 && !vibrated) {
        const firstCodeValue = codes[0]?.value;
        if (!firstCodeValue) return;
        setVibrated(true);

        handleCodeScan(firstCodeValue);
      }
    },
  });

  useEffect(() => {
    setVibrated(false);
  }, []);

  const selectFromGallery = () => {
    const options = {
      title: 'Select QR Code Image',
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImageUri = response.assets[0].uri;
        try {
          decodeQRCode(selectedImageUri);
        } catch (error) {
          console.error('Error decoding QR code:', error);
          Alert.alert('Error', 'Failed to decode QR code. Please try again.');
        }
      }
    });
  };

  const decodeQRCode = async (imageUri) => {
    try {
      const response = await RNQRGenerator.detect({ uri: imageUri });
      const { values } = response;
      if (values && values?.length > 0) {
        const firstValue = values[0];
        if (firstValue) {
          Vibration.vibrate();
          setCameraActive(false);
          navigation.replace('PaymentScreen', { scannedCode: firstValue });
        } else {
          Alert.alert('Cannot detect QR code in image');
        }
      } else {
        console.log('No QR code values detected.');
        Alert.alert('No QR code values detected.');
      }
    } catch (error) {
      console.log('Cannot detect QR code in image', error);
      Alert.alert('Error', 'Failed to decode QR code.');
    }
  };

  if (!device) return <View style={styles.container} />;
  useEffect(() => {
    bottomSheetRef.current.open();
  }, []);

  function checkValidWalletAddress() {
    setLoading(true);
    // Simulate wallet address validation
    const isValid = walletAddress.length === 42; // Assuming a valid wallet address length
    setLoading(false);

    if (isValid) {
      bottomSheetRef.current.close();
      setCameraActive(false);
      navigation.replace('PaymentScreen', { scannedCode: walletAddress });
    } else {
      Alert.alert('Invalid Wallet Address', 'Please enter a valid wallet address.');
    }
  }

  const bottomSheetRef = useRef();
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.NavBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign style={styles.searchIcon} name="arrowleft" size={25} color="#fff" />
        </TouchableOpacity>

        <View style={{ width: wp(73) }}>
          <Text style={styles.panVerification}>Scan QR Code to pay</Text>
        </View>
      </View>
      <View style={styles.container}>
        {hasPermission ? (
          <>
            <Camera
              style={styles.camera}
              device={device}
              isActive={cameraActive}
              codeScanner={codeScanner}
              torch={torchActive ? 'on' : 'off'}
            />
            {/* Frame for the QR code */}
            <View style={styles.frame}>
              <View style={styles.frameTopLeft} />
              <View style={styles.frameTopRight} />
              <View style={styles.frameBottomLeft} />
              <View style={styles.frameBottomRight} />
            </View>
            <View style={styles.overlay}>
              <Text style={styles.qrtext}>Place QR code inside frame to scan</Text>
              <View style={styles.assetIcon}>
                <TouchableOpacity onPress={toggleTorch} style={[styles.torchButton, { zIndex: 3 }]}>
                  {torchActive ? (
                    <MaterialIcons
                      style={styles.searchIcon}
                      name="flashlight-off"
                      size={30}
                      color="#fff"
                    />
                  ) : (
                    <MaterialIcons
                      style={styles.searchIcon}
                      name="flashlight-on"
                      size={30}
                      color="#fff"
                    />
                  )}
                  <Text style={styles.qrtext}>Light</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={selectFromGallery} style={styles.galleryButton}>
                  <Entypo style={styles.searchIcon} name="images" size={30} color="#fff" />
                  <Text style={styles.qrtext}>Upload from Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}
      </View>
      <RBSheet
        ref={bottomSheetRef}
        height={175}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            zIndex: 2, // Ensure bottom sheet is on top of other elements
          },
        }}
      >
        <View style={styles.bottomSheetContent}>
          <View style={styles.inputContainer}>
            <Text style={[styles.text, { paddingBottom: wp(2), textAlign: 'center' }]}>
              Pay using wallet address
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Wallet Address"
              onChangeText={setWalletAddress}
              value={walletAddress} // Updated to use walletAddress state
              placeholderTextColor="#999"
              autoFocus={route?.params?.routeparam ? true : false}
              keyboardType="default" // Updated keyboard type to default for wallet address
              maxLength={42} // Assuming a maximum wallet address length
            />
            <TouchableOpacity
              style={walletAddress.length >= 42 ? styles.button : styles.buttonDisable}
              onPress={walletAddress.length >= 42 ? checkValidWalletAddress : null} 
            >
              {loading ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <Text style={[styles.buttonText, walletAddress.length >= 42 ? null : styles.buttonTextDisabled]}>
                  Continue
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </>
  );
};

const paddingTop = Platform.OS === 'ios' ? wp(15) : '';

const styles = StyleSheet.create({
overlay:{
    paddingTop:20,
    paddingBottom:20
}
 , container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    ...StyleSheet.absoluteFillObject, 
  },
  galleryButton: {
    paddingTop: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  torchButton: {
    paddingTop: wp(3),
  },
  assetIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overlayImage: {
    position: 'absolute',
    width: 150,
    height: 150,
    alignSelf: 'center',
    top: '50%',
    left: '50%',
  },
  NavBar: {
    paddingTop: paddingTop,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    padding: 10,
    backgroundColor: '#333',
  },
  panVerification: {
    fontSize: wp(5),
    fontWeight: '500',
    color: '#fff',
    paddingLeft: wp(3.5),
  },
  horiLine: {
    width: '20%',
    height: 2,
    resizeMode: 'contain',
  },
  qrtext: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 5,
  },
  inputContainer: {
    marginTop: wp(2),
    marginHorizontal: wp(4),
    marginVertical: wp(5),
  },
  input: {
    height: wp(10),
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    color: '#000',
  },
  button: {
    marginLeft: wp(1),
    marginTop: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    backgroundColor: '#9286da',
    borderRadius: wp(2),
  },
  buttonDisable: {
    marginLeft: wp(1),
    marginTop: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    backgroundColor: '#d6d6dd',
    borderRadius: wp(2),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: '#727275',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  upiInst: {
    marginTop: wp(1),
    color: 'red',
    fontSize: wp(2.5),
    fontWeight: '500',
    marginBottom: wp(1),
    marginLeft: wp(2),
  },
  text: {
    fontSize: 12, // Adjust font size as needed
    fontWeight: 'bold', // Adjust font weight as needed
    color: '#7e7e7f',
  },
  // Styles for the QR code frame
  frame: {
    // position: 'absolute',
    // top: '20%', 
    // left: '20%',
    width: wp(60), // Width of the frame
    height: wp(60), // Height of the frame
    borderWidth: 4,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  frameTopLeft: {
    position: 'absolute',
    top: -3,
    left: -3,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  frameTopRight: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  frameBottomLeft: {
    position: 'absolute',
    bottom: -3,
    left: -3,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  frameBottomRight: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
});

export default QRCodeScannerScreen;
