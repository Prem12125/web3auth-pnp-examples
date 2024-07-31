import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList, ImageBackground, RefreshControl, StyleSheet, TouchableOpacity ,View, Text, Image, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const WalletScreenUI = () => {
  const navigation = useNavigation();

  // Static data for display purposes
  const dummyTransactions = Array.from({ length: 3 }, (_, index) => ({
    txn_id: `TXN${index + 1}`,
    date: "2021-07-20",
    message: "Payment Received",
    amount: (index + 1) * 100,
    time: "10:00 AM"
  }));

  const renderItem = ({ item, index }) => (
    <View style={styles.Row} key={index.toString()}>
      <View style={{ flexDirection: 'row', }}>
        <View style={styles.arrowBg}>
          <Image
            source={require('../../../assets/image/image/arrow-down.png')}
            style={{ width: 25, height: 25 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ marginStart: wp(2), }}>
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
      <View style={styles.background}>
        <View style={styles.NavBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              style={styles.searchIcon}
              name="arrowleft"
              size={25}
              color="#9286DA"
            />
          </TouchableOpacity>
          <Text style={styles.panVerification}>Wallet</Text>
        </View>

        <View style={{ padding: wp(5), marginTop: wp(4) }}>
          <View style={styles.cards}>
            <View style={{
              backgroundColor: '#955fd4',
              padding: 10,
              borderRadius: 17,
              marginBottom: 5,
            }}>
              <Image
                source={require('../../../assets/image/image/wallet.png')}
                style={styles.walletImage}
                resizeMode="contain"
              />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.caption}>Current Wallet Balance</Text>
              <Text style={styles.valueInfo}>₹ 1500.00</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: wp(5) }}>
            <TouchableOpacity style={styles.centeredContent}>
              <Image
                source={require('../../../assets/image/image/purple-wallet.png')}
                style={styles.SmallImage}
                resizeMode="contain"
              />
              <Text style={styles.caption}>ADD </Text>
              <Text style={styles.bigCaption}>Money </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.centeredContent}>
              <Image
                source={require('../../../assets/image/image/sendmoney.png')}
                style={styles.SmallImage}
                resizeMode="contain"
              />
              <Text style={styles.caption}>Send </Text>
              <Text style={styles.bigCaption}>Money </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.centeredContent}>
              <Image
                source={require('../../../assets/image/image/receive.png')}
                style={styles.SmallImage}
                resizeMode="contain"
              />
              <Text style={styles.caption}>Receive </Text>
              <Text style={styles.bigCaption}>Money </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.centeredContent}>
              <Image
                source={require('../../../assets/image/image/with.png')}
                style={styles.SmallImage}
                resizeMode="contain"
              />
              <Text style={styles.caption}>Withdrawal </Text>
              <Text style={styles.bigCaption}>Balance </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: wp(3), }}>
            <Text style={styles.heading}>Recent Transaction</Text>
            <Image
              source={require('../../../assets/image/image/sorting.png')}
              style={{ width: 25, height: 25 }}
              resizeMode='contain'
            />
          </View>
          <View style={{ height: 1, backgroundColor: 'white' }}></View>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <FlatList
            data={dummyTransactions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
    </ScrollView>

        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  panVerification: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    paddingLeft:wp(35)
  },
  background: {
    flex: 1,
    backgroundColor: '#0e0519'
  },
  circularImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  circularImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomDivider: {
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderBottomWidth: 0.5,
    marginVertical: wp(2),
  },
  Row: {
    backgroundColor: '#20182b',
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    marginLeft: wp(5),
    marginVertical: wp(2),
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  mainHeading: {
    color: '#000',
    fontSize: wp(4.5),
    fontWeight: '500',
  },
  subDescription: {
    color: '#333',
    fontSize: wp(3.8),
    lineHeight: wp(5),
    marginTop: wp(1),
    flexWrap: 'wrap',
  },
  heading: {
    color: '#ad8d17',
    fontSize: wp(5),
    marginBottom: wp(5),
  },
  NavBar: {
    paddingHorizontal: wp(3),
    paddingTop: hp(5),
    paddingBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7E2F6',
  },
  Label: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '600',
  },
  Info: {
    color: '#ad8d17',
    fontSize: wp(3.5),
  },
  InfoMessage: {
    color: '#ad8d17',
    fontSize: wp(2.8),
  },
  arrowBg: {
    width: 45,
    height: 45,
    backgroundColor: '#D9D6F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -35,
  },
  smallCards: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
    width: '48%',
    marginVertical: wp(2),
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: wp(5)
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cards: {
    flexDirection: 'row',
    padding: wp(6),
    marginVertical: wp(2),
    backgroundColor: '#20182b',
    borderRadius: 10,
  },
  caption: {
    color: '#955fd4',
    fontSize: wp(4),
  },
  valueInfo: {
    color: '#fff',
    fontSize: wp(7),
    fontWeight: 'bold',
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(4),
    paddingHorizontal: wp(4),
    marginHorizontal: wp(4),
    marginBottom: wp(4),
  },
  linkBtnText: {
    color: '#9286DA',
    fontSize: wp(4.5),
  },
  bigCaption: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  bigCaptionModel: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '500',
  },
  image: {
    width: 100,
    height: 100,
  },
  walletImage: {
    width: 50,
    height: 50,
  },
  SmallImage: {
    width: 30,
    height: 30,
  },
  amountText: {
    fontSize: wp(5),
    padding: wp(1),
    fontWeight: '600',
  },
  amount: {
    color: '#fff'
  },
  horiLine: {
    height: 2,
    width: 55,
  },
  separator: {
    marginHorizontal: wp(5),
    height: '100%',
    borderRightWidth: 0.5,
    borderColor: '#9286da',
  },
  bottomDivider: {
    borderStyle: 'solid',
    borderColor: '#00000025',
    borderBottomWidth: 0.5,
    marginVertical: wp(1.5),
  },
  NodataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nodataImage: {
    width: 200,
    height: 200,
    marginTop: wp(5),
  },
  norecordTxt: {
    fontSize: wp(5),
    textAlign: 'center',
    color: '#9286DA',
    fontWeight: '500',
  },
  rowModel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: wp(4),
    marginVertical: wp(0.5),
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moddelNav: {
    paddingVertical: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: wp(.2),
    borderBottomColor: '#9286da',
  },
  ModeTextView: {
    paddingLeft: wp(13),
    justifyContent: 'center',
  },
  cancelText: {
    color: '#9286DA',
    fontSize: wp(4),
    fontWeight: '500'
  },
  ModeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  button: {
    paddingTop: hp(2),
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: hp(2),
    paddingHorizontal: wp(3),
    marginVertical: wp(2)
  },
  recactive: {
    backgroundColor: '#d9d6f3',
    borderRadius: 10,
    color: '#000',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextActive: {
    color: '#9286da',
    fontSize: 15,
    letterSpacing: 0.9,
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
    textAlign: 'left',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "#7e7e7f"
  },
  scrollViewContent: {
    // flexGrow: 1.5,
    paddingBottom:200
  }
});

export default WalletScreenUI;
