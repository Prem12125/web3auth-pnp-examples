import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fetchDirectMember } from '../../Api/HandleApi';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Linking } from 'react-native';

const MyDirects = ({ navigation }) => {
  const [directMembers, setDirectMembers] = useState([]);

  useEffect(() => {
    const getDirectMembers = async () => {
      try {
        const members = await fetchDirectMember("0xB3941d0B6499909CE17456597BDd535B65eF69D3");
        console.log('API Response for Direct Members:', members); // Log the response

        if (members && members.length > 0) {  // Directly check if the array has elements
          setDirectMembers(members);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching direct members:', error);
      }
    };

    getDirectMembers();
  }, []);

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
        <Text style={styles.panVerification}>My Directs</Text>
        <View style={styles.rightNavSpace} />
      </View>

      {directMembers.length > 0 ? (
        <FlatList
          data={directMembers}
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
                  <Text style={styles.hashText}>{truncateText(item.txHash, 15)}</Text>
                 <TouchableOpacity onPress={() => Linking.openURL(`https://bscscan.com/tx/${item.txHash}`)}>
                 <AntDesign name="export" size={16} color="#6E57D4" style={{ marginLeft: 29 }} />
                 </TouchableOpacity>
                </View>
                <View style={styles.cardTextRow}>
                  <Icon name="wallet" size={16} color="#6E57D4" />
                  <Text style={styles.labelText}>User Address: </Text>
                  <Text style={styles.infoText}>{truncateText(item.user, 15)}</Text>
                </View>
                <View style={styles.cardTextRow}>
                  <Icon name="cash" size={16} color="#6E57D4" />
                  <Text style={styles.labelText}>Direct Business: </Text>
                  <Text style={styles.infoText}>${item.directbusiness}</Text>
                </View>
                <View style={styles.cardTextRow}>
                  <Icon name="account-group" size={16} color="#6E57D4" />
                  <Text style={styles.labelText}>Team Business: </Text>
                  <Text style={styles.infoText}>${item.staketeambusiness}</Text>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No Data Found</Text>
      )}

      {/* Navigation Button */}
      <TouchableOpacity style={styles.treeButton} onPress={() => navigation.navigate('TeamTree')}>
        <Text style={styles.treeButtonText}>View Tree</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  rightNavSpace: {
    width: 35,
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
  treeButton: {
    backgroundColor: '#6E57D4',
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,  // Add some margin at the bottom
  },
  treeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyDirects;
