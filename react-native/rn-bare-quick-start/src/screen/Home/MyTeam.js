import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fetchUserTeam } from '../../Api/HandleApi';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const MyTeam = ({ navigation }) => {
  const [teamData, setTeamData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);

  useEffect(() => {
    const getUserDetails = async () => {
      const details = await fetchUserTeam("0xB3941d0B6499909CE17456597BDd535B65eF69D3");
      if (details && details.data) {
        setTeamData(details.data);
      }
    };

    getUserDetails();
  }, []);

  const filteredData = teamData.filter((item) => item.level === selectedLevel);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <View style={styles.container}>
      <View style={styles.NavBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
          <AntDesign name="arrowleft" size={25} color="#6E57D4" />
        </TouchableOpacity>
        <Text style={styles.panVerification}>My Team</Text>
        <View style={styles.rightNavSpace} />
      </View>

      <ScrollView horizontal={true} style={styles.tabBar} showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4, 5, 6].map((level) => (
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
      </ScrollView>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Icon name="account-circle-outline" size={50} color="#F4D03F" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.cardTitle}>{item.userId}</Text>
              <View style={styles.cardTextRow}>
                <Icon name="key-variant" size={16} color="#6E57D4" />
                <Text style={styles.labelText}>Txn Hash: </Text>
                <Text style={styles.hashText}>{truncateText(item.txHash, 24)}</Text>
              </View>
              <View style={styles.cardTextRow}>
                <Icon name="wallet" size={16} color="#6E57D4" />
                <Text style={styles.labelText}>User Address: </Text>
                <Text style={styles.infoText}>{truncateText(item.sender, 20)}</Text>
              </View>
              <View style={styles.cardTextRow}>
                <Icon name="cash" size={16} color="#6E57D4" />
                <Text style={styles.labelText}>Direct Business: </Text>
                <Text style={styles.infoText}>${item.amount}</Text>
              </View>
              <View style={styles.cardTextRow}>
                <Icon name="account-group" size={16} color="#6E57D4" />
                <Text style={styles.labelText}>Team Business: </Text>
                <Text style={styles.infoText}>${item.income}</Text>
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
    backgroundColor: '#22162A',
    paddingVertical: 10,
    marginBottom: 15,
    maxHeight: 70, 
    minHeight:70
  },
  tabButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,  
    borderRadius: 5,
    marginHorizontal: 5,
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
