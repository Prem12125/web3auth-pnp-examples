import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TransactionCard from '../customStyle/CustomCard';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const data = [
  { title: 'Slider 1', color: '#f1c40f', image: 'https://jkinstitute.ac.in/Images/Images/prem.jpg' },
  { title: 'Slider 2', color: '#e67e22', image: 'https://miro.medium.com/v2/resize:fill:96:96/0*06HkeblCrXuFDS1H' },
  { title: 'Slider 3', color: '#16a085', image: 'https://via.placeholder.com/300x150.png?text=Slider+3' },
];

const HomeScreen = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const currentIndex = useRef(0);
  const intervalId = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const startAutoScroll = () => {
    intervalId.current = setInterval(() => {
      if (scrollViewRef.current) {
        currentIndex.current = (currentIndex.current + 1) % data.length;
        scrollViewRef.current.scrollTo({
          x: currentIndex.current * width,
          animated: true,
        });
      }
    }, 5000); // 5 seconds interval
  };

  const stopAutoScroll = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  useEffect(() => {
    startAutoScroll();
    startAnimation();

    return () => stopAutoScroll();
  }, []);

  const handleScrollBeginDrag = () => {
    stopAutoScroll();
  };

  const handleScrollEndDrag = () => {
    startAutoScroll();
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const renderItem = (item) => (
    <View key={item.title} style={[styles.sliderItem, { backgroundColor: item.color }]}>
      <Image source={{ uri: item.image }} style={styles.imageSlider} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.rectangleView}>
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('./logo.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {/* <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor={'rgba(53, 53, 53, 0.5)'}
            />
            <AntDesign
              style={styles.searchIcon}
              name="search1"
              size={20}
              color="#000"
            />
          </View>
          <AntDesign
            name="scan1"
            size={24}
            style={{ margin: 5 }}
            color={'#000'}
          /> */}
          {/* <Feather name="bell" size={24} style={{ margin: 5 }} color={'#000'} />
          <Entypo name="wallet" size={24} style={{ margin: 5 }} color={'#000'} /> */}
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slider}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
        >
          {data.map(renderItem)}
        </ScrollView>
      </View>
      <View style={styles.cardContainer}>
        <TransactionCard />
        <TransactionCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'grey',
    padding: 10,
  },
  rectangleView: {
    width: '100%',
  },
  text: {
    color: '#9286da',
  },
  headingContainer: {
    paddingTop: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    justifyContent: 'space-between',
    backgroundColor: '#eeeef7',
    shadowColor: 'rgba(0.1, 0.2, 0.1, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
    shadowOpacity: 0.1,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 37,
    margin: 5,
  },
  searchIcon: {
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sliderContainer: {
    height: 250,
  },
  slider: {
    alignItems: 'center',
  },
  sliderItem: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSlider: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    margin: 10,
    // paddingRight: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly', 
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  animatedButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
