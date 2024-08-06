import React, { useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { Text } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  // Validation function
  const validateInput = () => {
    if (cardNumber.length !== 16) {
      Alert.alert('Invalid Card Number', 'Please enter a valid 16-digit card number.');
      return false;
    }
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      Alert.alert('Invalid Expiry Date', 'Please enter a valid expiry date in MM/YY format.');
      return false;
    }
    if (cvv.length !== 3) {
      Alert.alert('Invalid CVV', 'Please enter a valid 3-digit CVV.');
      return false;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return false;
    }
    return true;
  };

  // Payment handling logic
  const handlePayment = () => {
    if (validateInput()) {
      // Mock payment process
      Alert.alert('Payment Successful', `You have paid $${amount} successfully.`);
      // Navigate to the next screen or reset inputs
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setAmount('');
      navigation.navigate('Home'); // Example navigation
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.NavBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign style={styles.searchIcon} name="arrowleft" size={25} color="#fff" />
        </TouchableOpacity>

        <View style={{ width: '80%' }}>
          <Text style={styles.header}>Payment Details</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
          maxLength={16}
          onChangeText={setCardNumber}
          value={cardNumber}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          keyboardType="numeric"
          maxLength={5}
          onChangeText={setExpiryDate}
          value={expiryDate}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>CVV</Text>
        <TextInput
          style={styles.input}
          placeholder="123"
          keyboardType="numeric"
          maxLength={3}
          onChangeText={setCvv}
          value={cvv}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          onChangeText={setAmount}
          value={amount}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <MaterialIcons name="payment" size={25} color="#fff" />
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const paddingTop = Platform.OS === 'ios' ? 45 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  NavBar: {
    paddingTop: paddingTop,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // marginLeft:10,
    // paddingLeft:100,
    padding: 10,
    backgroundColor: '#333',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 10,
  },
  inputContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#333',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchIcon: {
    paddingLeft: 10,
  },
});

export default PaymentScreen;
