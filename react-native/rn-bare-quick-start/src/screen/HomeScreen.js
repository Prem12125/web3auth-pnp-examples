import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.rectangleView}>
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require('./logo.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={styles.searchSection}>
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
          />
          <Feather name="bell" size={24} style={{ margin: 5 }} color={'#000'} />
          <Entypo name="wallet" size={24} style={{ margin: 5 }} color={'#000'} />
        </View>
      </View>

      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Resume Form"
        onPress={() => navigation.navigate('ConsoleScreen')}
      />
      <Button
        title="Go to Resume Preview"
        onPress={() => navigation.navigate('ResumePreview')}
      />
      <Button
        title="Responsive Ui"
        onPress={() => navigation.navigate('ResponsiveUi')}
      />
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
  hi: {
    color: '#000',
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
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#424242',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
