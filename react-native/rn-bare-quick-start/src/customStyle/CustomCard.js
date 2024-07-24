import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';

const TransactionCard = () => {
  return (
    <ImageBackground 
      source={require('./background.png')} 
      style={styles.card}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://jkinstitute.ac.in/Images/Images/prem.jpg' }} 
          style={styles.profileImage} 
          resizeMode="cover"
        />
        <Text style={styles.amount}>+ $54.23</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.fromText}>From</Text>
        <Text style={styles.nameText}>Prem Narayan</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.dateText}>24 July, 2024</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    // width: '68%', 
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  amount: {
    paddingLeft:20,
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    marginBottom: 20,
  },
  fromText: {
    color: '#666',
    fontSize: 14,
  },
  nameText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  dateText: {
    color: '#999',
    fontSize: 12,
  },
});

export default TransactionCard;
