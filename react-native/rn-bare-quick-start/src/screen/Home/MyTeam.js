import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const dummyData = [
  {
    txnHash: '0x1234...abcd',
    userAddress: '0x9876...wxyz',
    userId: 'User001',
    totalDirectBusiness: 500,
    totalTeamBusiness: 2000,
    level: 1,
  },
  {
    txnHash: '0x5678...efgh',
    userAddress: '0x4321...lmno',
    userId: 'User002',
    totalDirectBusiness: 300,
    totalTeamBusiness: 1500,
    level: 2,
  },
  {
    txnHash: '0x9101...ijkl',
    userAddress: '0x1357...pqrs',
    userId: 'User003',
    totalDirectBusiness: 700,
    totalTeamBusiness: 3000,
    level: 3,
  },
  {
    txnHash: '0x1357...qrst',
    userAddress: '0x2468...abcd',
    userId: 'User004',
    totalDirectBusiness: 600,
    totalTeamBusiness: 2500,
    level: 4,
  },
  {
    txnHash: '0x2468...ijkl',
    userAddress: '0x3691...mnop',
    userId: 'User005',
    totalDirectBusiness: 800,
    totalTeamBusiness: 3500,
    level: 1,
  },
  {
    txnHash: '0x3691...mnop',
    userAddress: '0x4821...qrst',
    userId: 'User006',
    totalDirectBusiness: 400,
    totalTeamBusiness: 1800,
    level: 2,
  },
  {
    txnHash: '0x4821...qrst',
    userAddress: '0x5943...uvwx',
    userId: 'User007',
    totalDirectBusiness: 900,
    totalTeamBusiness: 3700,
    level: 3,
  },
  {
    txnHash: '0x5943...uvwx',
    userAddress: '0x6064...yzab',
    userId: 'User008',
    totalDirectBusiness: 500,
    totalTeamBusiness: 2200,
    level: 4,
  },
];

const MyTeam = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState(1);

  const filteredData = dummyData.filter((item) => item.level === selectedLevel);

  return (
    <View style={styles.container}>
      <View style={styles.NavBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
          <AntDesign name="arrowleft" size={25} color="#6E57D4" />
        </TouchableOpacity>
        <Text style={styles.panVerification}>My Team</Text>
        <View style={styles.rightNavSpace} />
      </View>

      <View style={styles.tabBar}>
        {[1, 2, 3, 4].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setSelectedLevel(level)}
            style={[
              styles.tabButton,
              selectedLevel === level && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabButtonText,
                selectedLevel === level && styles.activeTabButtonText,
              ]}
            >
              Level {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.txnHash}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Icon name="account-circle-outline" size={50} color="#F4D03F" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.cardTitle}>{item.userId}</Text>
              <View style={styles.cardTextRow}>
                <Icon name="key-variant" size={16} color="#6E57D4" />
                <Text style={styles.labelText}> Txn Hash: </Text>
                <Text style={styles.hashText}>{item.txnHash}</Text>
              </View>
              <View style={styles.cardTextRow}>
                <Icon name="wallet" size={16} color="#6E57D4" />
                <Text style={styles.labelText}> User Address: </Text>
                <Text style={styles.infoText}>{item.userAddress}</Text>
              </View>
              <View style={styles.cardTextRow}>
                <Icon name="cash" size={16} color="#6E57D4" />
                <Text style={styles.labelText}> Direct Business: </Text>
                <Text style={styles.infoText}>${item.totalDirectBusiness}</Text>
              </View>
              <View style={styles.cardTextRow}>
                <Icon name="account-group" size={16} color="#6E57D4" />
                <Text style={styles.labelText}> Team Business: </Text>
                <Text style={styles.infoText}>${item.totalTeamBusiness}</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noDataText}>No Data Found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0519',
  },
  NavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E7E2F6',
    paddingHorizontal: wp(3),
    paddingTop: hp(5),
    paddingBottom: hp(2),
    marginBottom: 10,
  },
  navButton: {
    paddingHorizontal: 10,
  },
  panVerification: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6E57D4',
  },
  rightNavSpace: {
    width: 35,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#22162A',
    paddingVertical: 10,
    marginBottom: 15,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  activeTabButton: {
    backgroundColor: '#6E57D4',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#D7D7D7',
  },
  activeTabButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#22162A',
    borderRadius: 12,
    marginHorizontal: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F4D03F',
    marginBottom: 8,
  },
  cardTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelText: {
    fontSize: 14,
    color: '#6E57D4',
  },
  hashText: {
    fontSize: 14,
    color: '#D7D7D7',
  },
  infoText: {
    fontSize: 14,
    color: '#D7D7D7',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginVertical: 20,
  },
});

export default MyTeam;
