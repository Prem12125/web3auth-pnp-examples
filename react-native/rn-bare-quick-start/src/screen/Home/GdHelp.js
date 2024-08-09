import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const GDHelpScreen = ({ navigation }) => {
  const faqs = [
    { question: "What is General Data?", answer: "General Data (GD) refers to non-specific data that can be used across various domains and applications." },
    { question: "How do I access GD?", answer: "You can access General Data through our platform by signing in and navigating to the GD section." },
    { question: "What are the uses of GD?", answer: "GD can be used for research, analysis, and developing various data-driven applications." },
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
        <Text style={styles.header}>GD Help</Text>
        <View style={styles.rightPlaceholder}></View>
      </View>
      <ScrollView style={styles.container}>
        <View style={{ padding: 15 }}>
          <Text style={styles.subHeader}>Introduction</Text>
          <Text style={styles.introduction}>
            General Data (GD) is a versatile dataset that can be utilized for a wide range of purposes. Whether you're looking to conduct research, perform data analysis, or develop innovative applications, GD provides the foundational data you need.
          </Text>

          <Text style={styles.subHeader}>FAQs</Text>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqContainer}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          ))}

          <Text style={styles.subHeader}>Resources</Text>
          <View style={styles.faqContainer}>
            <Text style={styles.resource}>- GD Documentation</Text>
            <Text style={styles.resource}>- GD Tutorials</Text>
            <Text style={styles.resource}>- GD API Reference</Text>
          </View>

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
    color: '#955fd4',
  },
  introduction: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
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
    color: '#fff',
  },
  answer: {
    fontSize: 14,
    marginTop: 5,
    color: '#ad8d17',
  },
  resource: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
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

export default GDHelpScreen;
