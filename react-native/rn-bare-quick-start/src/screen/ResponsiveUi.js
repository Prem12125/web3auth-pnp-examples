import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Button, Animated } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window');
const data = [
  { title: 'Slider 1', color: '#f1c40f', image: 'https://jkinstitute.ac.in/Images/Images/prem.jpg' },
  { title: 'Slider 2', color: '#e67e22', image: 'https://miro.medium.com/v2/resize:fill:96:96/0*06HkeblCrXuFDS1H' },
  { title: 'Slider 3', color: '#16a085', image: 'https://via.placeholder.com/300x150.png?text=Slider+3' },
];

const icons = [
  { icon: 'https://via.placeholder.com/100', text: 'Icon 1' },
  { icon: 'https://via.placeholder.com/100', text: 'Icon 2' },
  { icon: 'https://via.placeholder.com/100', text: 'Icon 3' },
];

const ResponsiveUi = () => {
  const scrollViewRef = useRef(null);
  const currentIndex = useRef(0);
  const intervalId = useRef(null);
  const [selectedTab, setSelectedTab] = useState('tab1');
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

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3498db', '#85C1E9']
  });

  const renderItem = (item) => (
    <View key={item.title} style={[styles.sliderItem, { backgroundColor: item.color }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
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
     
      <View style={styles.flexContainer}>
        <View style={styles.iconContainer}>
          {icons.map((iconItem, index) => (
            <View key={index} style={styles.iconWrapper}>
              <View style={styles.iconCircle}>
                <Image source={{ uri: iconItem.icon }} style={styles.icon} />
              </View>
              <Text style={styles.iconText}>{iconItem.text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'tab1' && styles.selectedTab]}
            onPress={() => setSelectedTab('tab1')}
          >
            <Text style={[styles.tabText, selectedTab === 'tab1' && styles.selectedTabText]}>Content 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'tab2' && styles.selectedTab]}
            onPress={() => setSelectedTab('tab2')}
          >
            <Text style={[styles.tabText, selectedTab === 'tab2' && styles.selectedTabText]}>Content 2</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content}>
          {selectedTab === 'tab1' ? (
            <View style={[styles.flexItem3, { backgroundColor: 'yellow' }]}>
              <Text style={styles.text}>Content 3</Text>
              <Text style={styles.text}>More content for tab 1...</Text>
              <Text style={styles.text}>More content for tab 1...</Text>
              <Text style={styles.text}>More content for tab 1...</Text>
              <Text style={styles.text}>More content for tab 1...</Text>
              <Text style={styles.text}>More content for tab 1...</Text>
              <Text style={styles.text}>More content for tab 1...</Text>
              <Text style={styles.text}>More content for tab 1...</Text>
            </View>
          ) : (
            <View style={[styles.flexItem3, { backgroundColor: 'red' }]}>
              <Text style={styles.text}>Content 4</Text>
              <Text style={styles.text}>More content for tab 2...</Text>
              <Text style={styles.text}>More content for tab 2...</Text>
              <Text style={styles.text}>More content for tab 2...</Text>
              <Text style={styles.text}>More content for tab 2...</Text>
              <Text style={styles.text}>More content for tab 2...</Text>
              <Text style={styles.text}>More content for tab 2...</Text>
              <Text style={styles.text}>More content for tab 2...</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Animated.View style={[styles.animatedButton, { backgroundColor }]}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Send Data</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
      width: "100%",
      height: 200,
    },
  rectangleView: {
    width: '100%',
  },
  hi: {
    color: '#000',
  },
  text: {
    color: '#9286da',
  },
  headingContainer: {
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
    // height: 100,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sliderContainer: {
    // paddingTop:40,
    marginTop:40,
    height: height / 5,
  },
  slider: {
    alignItems: 'center',
  },
  sliderItem: {
    width: width,
    height: '100%', // Ensure slider item takes the full height of the container
    justifyContent: 'center',
    alignItems: 'center',
  },
  // image: {
  //   width: '100%',
  //   height: '100%',
  // },
  flexContainer: {
    flex: 3.5,
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 182, 193, 0.5)',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    backgroundColor: '#fff',
    // width: 100,
    height: 37,
    margin: 5,
  },
  searchIcon: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconText: {
    marginTop: 8,
    color: 'black',
    fontSize: 14,
    fontWeight: '800',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  selectedTab: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  selectedTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  flexItem3: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
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

export default ResponsiveUi;



// buttonContainer: {
//     flex: 0.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   buttonWrapper: {
//     width: '80%',
//     paddingVertical: 15,
//     borderRadius: 25,
//     overflow: 'hidden',
//     backgroundColor: '#3498db',
//   },
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     position: 'relative',
//   },
//   lightSpot: {
//     position: 'absolute',
//     width: '30%',
//     height: '100%',
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//     borderRadius: 25,
//     zIndex: 1,
//   },
// });