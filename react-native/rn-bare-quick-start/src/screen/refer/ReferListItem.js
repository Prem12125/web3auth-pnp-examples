import React, { memo, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Checkbox } from 'react-native-paper';

import PropTypes from 'prop-types';
import Avatar from './Avatar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const getAvatarInitials = textString => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};

const ListItem = props => {
  const { item, refLink } = props;

  const handleWhatsAppShare = () => {
    const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : '';
    const cleanedPhoneNumber = phoneNumber.replace(/\s/g, ''); // Remove all whitespace characters
  
    const message = `Join DMT Club and earn rewards instantly! Follow: ${refLink}`;
    
    let whatsappUrl;
    if (Platform.OS === 'ios') {
      // For iOS, use a different URL scheme
      whatsappUrl = `https://wa.me/${cleanedPhoneNumber}?text=${encodeURIComponent(message)}`;
    } else {
      // For Android, use the standard URL scheme
      whatsappUrl = `whatsapp://send?phone=${cleanedPhoneNumber}&text=${encodeURIComponent(message)}`;
    }
  
    // Open WhatsApp with the pre-filled message
    Linking.openURL(whatsappUrl);
  };

  const handleTelegramShare = () => {
    const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : '';
    const newNum = phoneNumber.replace(/\s/g, ''); // Remove all whitespace characters
    const message = `Join DMT Club and earn rewards instantly! Follow : ${props.link}`;
    Linking.openURL(`https://t.me/${newNum}?text=${encodeURIComponent(message)}`);
    
  };

  const handleMessageShare = () => {
    // Check if the item has phone numbers
    if (item.phoneNumbers && item.phoneNumbers.length > 0) {
      // Extract the first phone number
      const phoneNumber = item.phoneNumbers[0].number;
      // Remove all whitespace characters from the phone number
      const cleanedPhoneNumber = phoneNumber.replace(/\s/g, '');
      // Construct the message to be sent
      const message = `Join DMT Club and earn rewards instantly! Follow : ${refLink}`;
      
      let smsUrl;
      if (Platform.OS === 'ios') {
        // Construct the URL for sharing via SMS in iOS
        smsUrl = `sms:${cleanedPhoneNumber}:&body=${encodeURIComponent(message)}`;
      } else {
        // Construct the URL for sharing via SMS in Android
        smsUrl = `sms:${cleanedPhoneNumber}?body=${encodeURIComponent(message)}`;
      }
      
      // Open the SMS app with the pre-filled message
      Linking.openURL(smsUrl);
    } 
  };

  return (
    <View>
      {/* <TouchableOpacity oness={() => onPrss(item)}> */}
      <View style={styles.itemContainer}>
        <View style={styles.leftElementContainer}>
          <Avatar
            img={item.hasThumbnail ? { uri: item.thumbnailPath } : undefined}
            placeholder={getAvatarInitials(
              `${item.givenName} ${item.familyName}`,
            )}
            width={40}
            height={40}
          />
        </View>
        <View style={styles.rightSectionContainer}>
          <View style={styles.mainTitleContainer}>
            <Text
              style={
                styles.titleStyle
              }>{`${item.givenName} ${item.familyName}`}</Text>
            <Text style={styles.phoneNumberStyle}>
              {item.phoneNumbers && item.phoneNumbers.length > 0
                ? item.phoneNumbers[0].number
                : ''}
            </Text>
          </View>
        </View>
        <View>

          <View style={styles.iconView}>
            <FontAwesome
              style={[styles.searchIcon, { marginRight: 7 }]}
              name="whatsapp"
              size={25}
              color="#35d366"
              onPress={handleWhatsAppShare}
            />
            <FontAwesome
              style={[styles.searchIcon, { marginRight: 7 }]}
              name="telegram"
              size={25}
              color="#32a5df"
              onPress={handleTelegramShare}
            />
            <AntDesign
              style={styles.searchIcon}
              name="message1"
              size={25}
              color="#000"
             onPress={handleMessageShare}
            />
          </View>

        </View>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  iconView: {
    flexDirection: 'row'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    // height: 63,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingLeft: 13,
  },
  rightSectionContainer: {
    paddingVertical: 10,

    marginLeft: 18,
    flexDirection: 'row',
    flex: 20,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: '#B9B9B9',
  },

  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },

  titleStyle: {
    fontSize: 16,
    color: '#000',
    textTransform: 'capitalize',
  },

  phoneNumberStyle: {
    fontSize: 14,
    color: '#888',
  },


});

export default memo(ListItem);

ListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};
