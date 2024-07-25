import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width: viewportWidth } = Dimensions.get('window');

const carouselItems = [
  {
    imgUrl: 'https://www.jkinstitute.ac.in/Images/Images/prem.jpg', // replace with actual image URLs
    caption: 'PhonePe Rewards'
  },
  {
    imgUrl: 'https://www.jkinstitute.ac.in/Images/Images/prem.jpg',
    caption: 'PhonePe Rewards'
  },
  {
    imgUrl: 'https://www.jkinstitute.ac.in/Images/Images/prem.jpg',
    caption: 'PhonePe Rewards'
  },
  {
    imgUrl: 'https://www.jkinstitute.ac.in/Images/Images/prem.jpg',
    caption: 'PhonePe Rewards'
  },
  // Add more items as needed
];

const HomeUpperSection = () => {
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} autoplay>
        {carouselItems.map((item, index) => (
          <View style={styles.slide} key={index}>
            <Image source={{ uri: item.imgUrl }} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <View style={styles.transferSection}>
        <Text style={styles.sectionTitle}>Transfer Money</Text>
        <View style={styles.transferOptions}>
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <Image source={require('../APPLE.png')} style={styles.icon} />
            </View>
            <Text style={styles.optionText}>To Mobile Number</Text>
          </View>
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <Image source={require('../APPLE.png')} style={styles.icon} />
            </View>
            <Text style={styles.optionText}>To Bank/UPI ID</Text>
          </View>
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <Image source={require('../APPLE.png')} style={styles.icon} />
            </View>
            <Text style={styles.optionText}>To Self Account</Text>
          </View>
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <Image source={require('../APPLE.png')} style={styles.icon} />
            </View>
            <Text style={styles.optionText}>Check Bank Balance</Text>
          </View>
        </View>
        <View style={styles.upiSection}>
          <Text style={styles.upiText}>UPI Lite: <Text style={styles.link}>Try Now</Text></Text>
          <Text style={styles.upiText}>UPI ID: 9694287342@ybl</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <Text style={styles.footerButtonText}>PhonePe Wallet</Text>
        </View>
        <View style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Explore Rewards</Text>
        </View>
        <View style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Refer & Get ₹100</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: viewportWidth - 40,
    height: 200,
    borderRadius: 10,
  },
  transferSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: '#20182b',
    borderRadius: 10,
    paddingVertical: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  transferOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    alignItems: 'center',
    width: '23%', // Adjust this to fit within the container
  },
  iconContainer: {
    backgroundColor: '#955fd4',
    padding: 10,
    borderRadius: 17,
    marginBottom: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  optionText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  upiSection: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  upiText: {
    color: '#fff',
    fontSize: 14,
  },
  link: {
    color: '#00E676',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  footerButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  footerButtonText: {
    borderColor:'#fff',
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomeUpperSection;
