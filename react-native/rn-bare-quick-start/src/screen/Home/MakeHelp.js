import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HelpScreen = ({ navigation }) => {
  const faqs = [
    { question: "How do I join?", answer: "You can join by signing up on our website and following the onboarding steps." },
    { question: "How do I recruit new members?", answer: "Share your referral link or invite them directly from the app." },
    { question: "What are the benefits of joining?", answer: "You can earn commissions, bonuses, and grow your network." },
    // Add more FAQs as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.NavBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign
            style={styles.icon}
            name="arrowleft"
            size={25}
            color="#9286DA"
          />
        </TouchableOpacity>
        <Text style={styles.header}>Make Help</Text>
        <View style={styles.rightPlaceholder}></View>
      </View>
      <ScrollView style={styles.container}>

      <View style={{padding:15}}>
      <Text style={styles.subHeader}>FAQs</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}

      <Text style={styles.subHeader}>Live Support</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>
    

      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#0e0519',
  },
  NavBar: {
    paddingHorizontal: wp(3),
    paddingTop: hp(5),
    paddingBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7E2F6',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 50,
    alignItems: 'flex-start',
  },
  rightPlaceholder: {
    width: 50,
  },
  icon: {
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color:'#955fd4'
  },
  faqContainer: {
    backgroundColor: '#20182b',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#fff'
  },
  answer: {
    fontSize: 14,
    marginTop: 5,
    color:'#ad8d17'
  },
  button: {
    backgroundColor: '#955fd4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HelpScreen;
