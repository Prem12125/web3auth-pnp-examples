import React from 'react';
import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WalletScreenUI = () => {
  // Static data for display purposes
  const dummyTransactions = Array.from({ length: 5 }, (_, index) => ({
    txn_id: `TXN${index + 1}`,
    date: "2021-07-20",
    message: "Payment Received",
    amount: (index + 1) * 100,
    time: "10:00 AM"
  }));

  const renderItem = ({ item, index }) => (
    <View style={styles.Row} key={index.toString()}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.arrowBg}>
          <Image
            source={require('../assets/image/arrow-down.png')}
            style={{ width: 25, height: 25 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ marginStart: wp(2) }}>
          <Text style={styles.Label}>{item.txn_id}</Text>
          <Text style={styles.Info}>{item.date}</Text>
          <Text style={styles.InfoMessage}>{item.message}</Text>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.amountText, { color: '#26C85D' }]}>+</Text>
          <Text style={styles.amount}>₹ {item.amount}</Text>
        </View>
        <Text style={{ ...styles.Info, textAlign: 'right' }}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/image/bg.png')}
      style={styles.background}>
      <View style={styles.NavBar}>
        <Text style={styles.panVerification}>Wallet</Text>
      </View>
      <View style={{ padding: wp(5), marginTop: wp(4) }}>
        <View style={styles.cards}>
          <View>
            <Image
              source={require('../assets/image/purple-wallet.png')}
              style={styles.walletImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.caption}>Current Wallet Balance</Text>
            <Text style={styles.valueInfo}>₹ 1500.00</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: wp(5) }}>
          {/* Placeholder for buttons */}
          <View style={styles.centeredContent}><Text>Add Money</Text></View>
          <View style={styles.centeredContent}><Text>Send Money</Text></View>
          <View style={styles.centeredContent}><Text>Receive Money</Text></View>
          <View style={styles.centeredContent}><Text>Withdraw Balance</Text></View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: wp(3) }}>
          <Text style={styles.heading}>Recent Transaction</Text>
          <Image
            source={require('../assets/image/sorting.png')}
            style={{ width: 25, height: 25 }}
            resizeMode='contain'
          />
        </View>

        <FlatList
          data={dummyTransactions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
};

export default WalletScreenUI;
