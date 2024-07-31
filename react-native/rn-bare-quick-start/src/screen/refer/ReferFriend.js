import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FetchContactList from './ReferwithContect';

const ReferScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Together, we're going further!</Text>
      <View style={styles.referContainer}>
        <Text style={styles.referText}>I refer now!</Text>
        <Text style={styles.subText}>Refer and introduce the Trust Id to your contacts.</Text>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} placeholder="Username" />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FetchContactList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#7D40E7', // Light purple button color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReferScreen;
