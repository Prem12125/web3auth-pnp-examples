import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FetchContactList from './ReferwithContect';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const ReferScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container,{flex:1}]}>
      <View style={styles.NavBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            style={styles.searchIcon}
            name="arrowleft"
            size={25}
            color="#9286DA"
          />
        </TouchableOpacity>
        <Text style={styles.panVerification}>Refer Friend</Text>
       
      </View>
      <View style={[styles.container,{paddingHorizontal:5}]}>
      <Text style={styles.headerText}>Together, we're going further!</Text>
      <View style={styles.referContainer}>
        <Text style={styles.referText}>I refer now!</Text>
        <Text style={styles.subText}>Refer and introduce the Trust Id to your contacts.</Text>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="Username"  placeholderTextColor="#777"  />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>

      <FetchContactList/>
    </View>
  );
};

const styles = StyleSheet.create({
  NavBar: {
    paddingHorizontal: wp(3),
    paddingTop:hp(5),
    paddingBottom:hp(2),
    // marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7E2F6',
  },
  panVerification: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center', // Center the text horizontally
    flex: 1, // Allow the text to take up available space
  },
  container: {
    // flex: 1,
    // padding: 10,
    backgroundColor: '#0e0519', // Background color
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  referContainer: {
    backgroundColor: '#20182b',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  referText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7D40E7', // Light purple color for text
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#ad8d17',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color:'#fff'
  },
  button: {
    backgroundColor: '#955fd4', // Light purple button color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReferScreen;
