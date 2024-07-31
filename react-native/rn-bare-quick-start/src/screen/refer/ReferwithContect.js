import React, { useState, useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Contacts from 'react-native-contacts';
import ListItem from './ReferListItem'; // Updated import
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const FetchContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const requestPermissionsAndGetContacts = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts Permission',
              message: 'This app would like to view your contacts.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setError("Contacts permission denied");
            setIsLoading(false);
            return;
          }
        }
        await loadContacts();
      } catch (e) {
        setError("Failed to load contacts");
        console.error(e);
      }
    };

    requestPermissionsAndGetContacts();
  }, []);

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const contacts = await Contacts.getAll();
      contacts.sort((a, b) => (a.givenName || '').localeCompare(b.givenName || ''));
      console.log("Contacts loaded:", contacts);  // Check the structure here
      setContacts(contacts);
    } catch (e) {
      setError("Failed to fetch contacts");
      console.warn(e);
    }
    setIsLoading(false);
  };

  const search = (text) => {
    if (text === '') {
      loadContacts();
    } else {
      const filteredContacts = contacts.filter(
        (contact) =>
          contact.givenName.toLowerCase().includes(text.toLowerCase()) ||
          contact.familyName.toLowerCase().includes(text.toLowerCase()) ||
          (contact.phoneNumbers[0] && contact.phoneNumbers[0].number.includes(text))
      );
      setContacts(filteredContacts);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9286DA" />
        <Text style={{ color: '#666' }}>Fetching Contacts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: '#666' }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={'rgba(53, 53, 53, 0.5)'}
          onChangeText={search}
        />
        <AntDesign name="search1" style={styles.searchIcon} size={20} color="#000" />
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID.toString()}
        renderItem={({ item }) => {
          console.log("Item in FlatList renderItem:", item);  // This should log each item
          return (
            <ListItem
              item={item}
              refLink="http://example.com/referral"
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FetchContactList;

const styles = StyleSheet.create({
//   searchSection: {
//     flexDirection: 'row',
//     padding: 10,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
  searchSection: {
    // flex: 1,
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
  input: {
    flex: 1,
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#ccc',
  },
  searchIcon: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
