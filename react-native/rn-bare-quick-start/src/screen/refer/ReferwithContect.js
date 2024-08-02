import React, { useState, useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Contacts from 'react-native-contacts';
import ListItem from './ReferYourContact'; // Updated import
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';
import ReferList from './ReferList';

const FetchContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [referredContacts, setReferredContacts] = useState([
    {
      recordID: '1',
      givenName: 'John',
      familyName: 'Doe',
      phoneNumbers: [{ number: '123-456-7890' }],
      note: 'referred',
    },
    {
      recordID: '2',
      givenName: 'Jane',
      familyName: 'Smith',
      phoneNumbers: [{ number: '234-567-8901' }],
      note: 'referred',
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'contacts', title: 'Your Contacts' },
    { key: 'referred', title: 'Refer Contacts' },
  ]);
  const [searchText, setSearchText] = useState('');

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
            setError('Contacts permission denied');
            setIsLoading(false);
            return;
          }
        }
        await loadContacts();
      } catch (e) {
        setError('Failed to load contacts');
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
      setContacts(contacts);
    } catch (e) {
      setError('Failed to fetch contacts');
      console.warn(e);
    }
    setIsLoading(false);
  };

  const search = (text) => {
    setSearchText(text);
    if (text === '') {
      loadContacts();
    } else {
      const filteredContacts = contacts.filter(
        (contact) =>
          contact.givenName.toLowerCase().includes(text.toLowerCase()) ||
          contact.familyName.toLowerCase().includes(text.toLowerCase()) ||
          (contact.phoneNumbers[0] && contact.phoneNumbers[0].number.includes(text))
      );
      const filteredReferredContacts = referredContacts.filter(
        (contact) =>
          contact.givenName.toLowerCase().includes(text.toLowerCase()) ||
          contact.familyName.toLowerCase().includes(text.toLowerCase()) ||
          (contact.phoneNumbers[0] && contact.phoneNumbers[0].number.includes(text))
      );
      setContacts(filteredContacts);
      setReferredContacts(filteredReferredContacts);
    }
  };

  const ContactsView = () => (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.recordID.toString()}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          refLink="http://example.com/referral"
        />
      )}
    />
  );

  const ReferredContactsView = () => (
    <FlatList
      data={referredContacts}
      keyExtractor={(item) => item.recordID.toString()}
      renderItem={({ item }) => (
        <ReferList
          item={item}
          refLink="http://example.com/referral"
        />
      )}
    />
  );

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

  const renderScene = SceneMap({
    contacts: ContactsView,
    referred: ReferredContactsView,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={'#777'}
          onChangeText={search}
        />
        <AntDesign name="search1" style={styles.searchIcon} size={20} color="#fff" />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: wp('100%') }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default FetchContactList;

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#20182b',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    padding: 10,
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
  tabBar: {
    backgroundColor: '#20182b',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    margin: 10,
  },
  tabLabel: {
    color: '#ad8d17',
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: '#ad8d17',
    height: 3,
  },
});
