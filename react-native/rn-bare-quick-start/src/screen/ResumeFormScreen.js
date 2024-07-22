import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './User';

const ResumeFormScreen = ({ navigation }) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(true);

  const saveExperience = async () => {
    try {
      const experience = { company, role, joiningDate, comment };
      const existingExperiences = await AsyncStorage.getItem('experiences');
      const experiences = existingExperiences ? JSON.parse(existingExperiences) : [];
      experiences.push(experience);
      await AsyncStorage.setItem('experiences', JSON.stringify(experiences));
      Alert.alert('Success', 'Experience saved successfully');
      setShow(false);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save experience');
    }
  };

  const toggleShowUser = () => {
    setShow(prevShow => !prevShow);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      <TextInput
        style={styles.input}
        placeholder="Joining Date"
        value={joiningDate}
        onChangeText={setJoiningDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Comment"
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Save Experience" onPress={saveExperience} />
      <Button title={show ? "Hide User Info" : "Show User Info"} onPress={toggleShowUser} />
      {show && <User />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ResumeFormScreen;
