import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransactionCard from '../../customStyle/CustomCard';
import CustomCard2 from '../../customStyle/CustomCard1';
import HomeUpperSection from './HomeUperSection';

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
      <Image source={{ uri: item.image }} style={styles.imageSlider} resizeMode="contain" />
    </View>
  );

  return (
    <>
      <View style={styles.rectangleView}>
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../../../assets/image/logo.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <HomeUpperSection />
      {/* Uncomment this section if you want to use the slider */}
      {/* <View style={styles.sliderContainer}>
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
      </View> */}
      <View style={styles.cardContainer}>
        <TransactionCard />
      </View>
      <View style={{ height: 130 }}>
        <CustomCard2 />
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'grey',
    padding: 10,
  },
  rectangleView: {
    width: '100%',
    height: 70,
  },
  headingContainer: {
    paddingTop: 30,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
    shadowColor: 'rgba(0.1, 0.2, 0.1, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
    shadowOpacity: 0.1,
  },
  sliderContainer: {
    height: 200,
    paddingTop: 20,
  },
  slider: {
    alignItems: 'center',
  },
  sliderItem: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSlider: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardContainer: {
    flexDirection: 'row',
    margin: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

export default HomeScreen;
