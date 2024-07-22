import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupMenu from './PopupMenuButton';

const ResumePreviewScreen = ({ navigation }) => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const storedExperiences = await AsyncStorage.getItem('experiences');
        if (storedExperiences) {
          setExperiences(JSON.parse(storedExperiences));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load experiences');
      }
    };

    loadExperiences();
  }, []);

  const deleteExperience = async (index) => {
    try {
      const updatedExperiences = experiences.filter((_, i) => i !== index);
      await AsyncStorage.setItem('experiences', JSON.stringify(updatedExperiences));
      setExperiences(updatedExperiences);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete experience');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Resume Preview</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      {/* <PopupMenu/> */}
      <FlatList
        data={experiences}
        renderItem={({ item, index }) => (
          <View style={styles.experienceContainer}>
           
            <Text style={styles.text}>Company: {item.company}</Text>
            <Text style={styles.text}>Role: {item.role}</Text>
            <Text style={styles.text}>Joining Date: {item.joiningDate}</Text>
            <Text style={styles.text}>Comment: {item.comment}</Text>
            <Button title="Delete" onPress={() => deleteExperience(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Add padding to avoid overlapping with the AppBar
  },
  appBar: {
    height: 60,
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  experienceContainer: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    marginBottom: 5,
  },
});

export default ResumePreviewScreen;
