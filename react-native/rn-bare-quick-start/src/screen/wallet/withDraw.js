import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Platform , Image} from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';

const WalletWithdrawal = () => {
    const [amount, setAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const quickAmounts = [10, 15, 20, 25, 50, 100];
    const [activeButton, setActiveButton] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleQuickAmount = (value) => {
        setAmount(value.toString());
        setActiveButton(value);
    };

    const handleAmountChange = (text) => {
        setAmount(text);
        setActiveButton(null); // Unselect the quick amount when manual input is given
    };

    const handleWithdraw = () => {
        if (!walletAddress) {
            alert('Please enter Wallet Address');
            return;
        }
        if (!amount) {
            alert('Please enter Amount');
            return;
        }

        alert(`Withdrawing $${amount} to wallet address: ${walletAddress}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={25} color="#9286DA" style={styles.navIcon} />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Withdraw Balance</Text>
            </View>
            <ScrollView>
            <Image
                    style={styles.gifImage}
                    source={require('../../../assets/image/image/withdraw1.png')}
                    resizeMode="contain" // Adjust according to your design needs
                />
                <View style={styles.wrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Wallet Address"
                        value={walletAddress}
                        onChangeText={(text) => setWalletAddress(text)}
                        placeholderTextColor="#999"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="$ Enter Amount"
                        keyboardType="numeric"
                        placeholderTextColor="#999"
                        value={amount}
                        onChangeText={handleAmountChange}
                    />
                    <View style={styles.separatorContainer}>
                        <View style={styles.horizontalLine} />
                        <Text style={styles.separatorText}>or quick choice</Text>
                        <View style={styles.horizontalLine} />
                    </View>
                    <View style={styles.quickAmountContainer}>
                        {quickAmounts.map((value, index) => (
                            <TouchableOpacity
                                key={value}
                                style={[
                                    styles.quickAmountButton,
                                    activeButton === value && styles.activeButton,
                                ]}
                                onPress={() => handleQuickAmount(value)}
                            >
                                <Text
                                    style={[
                                        styles.quickAmountText,
                                        activeButton === value && styles.activeButtonText,
                                    ]}
                                >
                                    ${value}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.withdrawButton,
                            amount && walletAddress && styles.activeWithdrawButton,
                        ]}
                        onPress={handleWithdraw}
                        // disabled={!amount || !walletAddress}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="black" />
                        ) : (
                            <Text style={styles.withdrawButtonText}>Withdraw</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const paddingTop = Platform.OS === 'ios' ? wp(15) : '';

const styles = StyleSheet.create({
    gifImage: {
        width: '100%',
        height: wp(50),
        alignSelf: 'center',
        marginVertical: wp(3),
    },
    container: {
        flex: 1,
        backgroundColor: '#0e0519',
    },
    navBar: {
        paddingHorizontal: wp(3),
        paddingTop: hp(5),
        paddingBottom: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E7E2F6',
    },
    navIcon: {
        marginRight: wp(3),
    },
    navTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    wrapper: {
        marginHorizontal: wp(2),
        backgroundColor: '#20182b',
        borderRadius: 10,
        padding: wp(3),
        marginTop: wp(3),
    },
    input: {
        // paddingTop
        height: wp(10),
        borderWidth: 1,
        borderColor: '#f7f7f7',
        borderRadius: 20,
        paddingHorizontal: wp(3),
        color: "#fff",
        fontSize: wp(4),
        backgroundColor: '#20182b',
        marginBottom: wp(2),
        marginTop:wp(3)
    },
    separatorContainer: {
        paddingTop:20,
        paddingBottom:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ad8d17',
        marginHorizontal: 5,
    },
    separatorText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#ad8d17",
    },
    quickAmountContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10,
    },
    quickAmountButton: {
        margin: 5,
        borderColor: '#faf5fe',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#faf5fe',
        paddingHorizontal: wp(2),
        paddingVertical: wp(1.5),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(25),
    },
    quickAmountText: {
        color: '#9286DA',
        fontSize: 16,
    },
    activeButton: {
        backgroundColor: '#9286DA',
    },
    activeButtonText: {
        color: '#fff',
    },
    withdrawButton: {
        borderRadius: 15,
        backgroundColor: '#d9d6f3',
        color: '#fff',
        width: '100%',
        height: 51,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp(4),
    },

     // 955fd4
        // 9286DA
    activeWithdrawButton: {
        backgroundColor: '#955fd4',
    },
    withdrawButtonText: {
        color: '#fff',
        fontSize: 18,
        letterSpacing: 0.9,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default WalletWithdrawal;
