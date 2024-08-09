import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const { width: viewportWidth } = Dimensions.get('window');

const carouselItems = [
    {
        imgUrl: require('./slider/slider1.png'),
        caption: 'PhonePe Rewards'
    },
    {
        imgUrl: require('./slider/slider2.png'),
        caption: 'PhonePe Rewards'
    },
    {
        imgUrl: require('./slider/slider3.png'),
        caption: 'PhonePe Rewards'
    },
];

const HomeUpperSection = () => {
    const navigation = useNavigation();

    const handleWalletPress = () => {
        console.log("Wallet Pressed");
        navigation.navigate('Wallet');
    };

    const handleRewardsPress = () => {
        console.log("Rewards Pressed");
        navigation.navigate('WalletScreenUI');
        // Additional logic for rewards
    };

    const handleMakeHelp = () => {
        console.log("Rewards Pressed");
        navigation.navigate('HelpScreen');
        // Additional logic for rewards
    };

    const handleGdHelp = () => {
        console.log("Rewards Pressed");
        navigation.navigate('GDHelpScreen');
        // Additional logic for rewards
    };


    const handleMyTeam = () => {
        console.log("Rewards Pressed");
        navigation.navigate('myTeam');
        // Additional logic for rewards
    };


    const handleReferPress = () => {
        console.log("Refer Pressed");
        navigation.navigate('ReferFriend')
        // Additional logic for referral
    };

    return (
        <View style={styles.container}>
            <Swiper style={styles.wrapper} autoplay>
                {carouselItems.map((item, index) => (
                    <View style={styles.slide} key={index}>
                        <Image source={item.imgUrl} style={styles.image} />
                    </View>
                ))}
            </Swiper>
            <View style={styles.transferSection}>
                <Text style={styles.sectionTitle}>DMT Club</Text>
                <View style={styles.transferOptions}>
                    <View style={styles.option}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={handleMakeHelp}>
                                <Image source={require('../../../assets/Icon/makehelp.png')} style={styles.icon} />

                            </TouchableOpacity>
                        </View>
                        <Text style={styles.optionText}>Make Help</Text>
                    </View>
                    <View style={styles.option}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={handleGdHelp}>
                                <Image source={require('../../../assets/Icon/gdhelp.png')} style={styles.icon} />

                            </TouchableOpacity>
                        </View>
                        <Text style={styles.optionText}>GD Help</Text>
                    </View>
                    <View style={styles.option}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={handleRewardsPress}>
                                <Image source={require('../../../assets/Icon/rewards.png')} style={styles.icon} />

                            </TouchableOpacity>
                        </View>
                        <Text style={styles.optionText}>Rewards</Text>
                    </View>
                    <View style={styles.option}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={handleMyTeam}>
                                <Image source={require('../../../assets/Icon/myteam.png')} style={styles.icon} />

                            </TouchableOpacity>
                        </View>
                        <Text style={styles.optionText}>My Team</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={handleWalletPress}>
                    <View>
                        <Image source={require('../../../assets/Icon/wallet.png')} style={styles.iconRow} />
                    </View>
                    <Text style={styles.footerButtonText}>Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleRewardsPress}>
                    <View>
                        <Image source={require('../../../assets/Icon/rewards.png')} style={styles.iconRow} />
                    </View>
                    <Text style={styles.footerButtonText}>Rewards</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleReferPress}>
                    <View>
                        <Image source={require('../../../assets/Icon/reffaral.png')} style={styles.iconRow} />
                    </View>
                    <Text style={styles.footerButtonText}>Refer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    wrapper: {
        height: 150,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: viewportWidth - 20,
        borderRadius: 10,
    },
    transferSection: {
        marginTop: 15,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        backgroundColor: '#20182b',
        borderRadius: 10,
        paddingVertical: 15,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
    },
    transferOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    option: {
        alignItems: 'center',
        width: '23%',
    },
    iconContainer: {
        backgroundColor: '#955fd4',
        padding: 10,
        borderRadius: 17,
        marginBottom: 5,
    },
    icon: {
        width: 30,
        height: 30,
    },
    iconRow: {
        width: 20,
        height: 20,
        marginRight: 20,
    },
    optionText: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingHorizontal: 10,
    },
    footerButton: {
        backgroundColor: '#20182b',
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    footerButtonText: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default HomeUpperSection;
