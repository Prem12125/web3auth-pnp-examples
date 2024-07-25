import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomCard2 = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.title}>CASHIER</Text>
        <View style={styles.icons}>
          <Icon name="help-circle-outline" size={24} color="#fff" style={styles.icon} />
          <Icon name="dots-horizontal" size={24} color="#fff" style={styles.icon} />
        </View>
      </View> */}
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://jkinstitute.ac.in/Images/Images/prem.jpg' }}
          style={styles.avatar}
        />
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.name}>Sir</Text>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login </Text>
          <Icon name="arrow-right" size={16} color="#f56b00" />
          <Text style={styles.loginSubText}>to Make Payments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fingerprintButton}>
          <Icon name="fingerprint" size={32} color="#f56b00" />
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountButton}>
            <Text style={styles.accountButtonText}>My account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#171717',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  content: {
    backgroundColor: '#262626',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  greeting: {
    color: '#fff',
    fontSize: 18,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#f56b00',
    fontSize: 16,
  },
  loginSubText: {
    color: '#fff',
    fontSize: 16,
  },
  fingerprintButton: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addButton: {
    backgroundColor: '#1e2a78',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  accountButton: {
    backgroundColor: '#505050',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  accountButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomCard2;
