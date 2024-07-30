import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

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
                            <Image source={require('../../../assets/Icon/makehelp.png')} style={styles.icon} />
                        </View>
                        <Text style={styles.optionText}>Make Help</Text>
                    </View>
                    <View style={styles.option}>
                        <View style={styles.iconContainer}>
                            <Image source={require('../../../assets/Icon/gdhelp.png')} style={styles.icon} />
                        </View>
                        <Text style={styles.optionText}>GD Help</Text>
                    </View>
                    <View style={styles.option}>
                        <View style={styles.iconContainer}>
                            <Image source={require('../../../assets/Icon/rewards.png')} style={styles.icon} />
                        </View>
                        <Text style={styles.optionText}>Rewards</Text>
                    </View>
                    <View style={styles.option}>
                        <View style={styles.iconContainer}>
                            <Image source={require('../../../assets/Icon/myteam.png')} style={styles.icon} />
                        </View>
                        <Text style={styles.optionText}>My Team</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerButton}>
                    <View >
                        <Image source={require('../../../assets/Icon/wallet.png')} style={styles.iconRow} />
                    </View>
                    <Text style={styles.footerButtonText}>Wallet</Text>
                </View>
                <View style={styles.footerButton}>
                    <View >
                        <Image source={require('../../../assets/Icon/rewards.png')} style={styles.iconRow} />
                    </View>
                    <Text style={styles.footerButtonText}>Rewards</Text>
                </View>
                <View style={styles.footerButton}>
                    <View >
                        <Image source={require('../../../assets/Icon/reffaral.png')} style={styles.iconRow} />
                    </View>
                    <Text style={styles.footerButtonText}>Refer</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        // paddingBottom:10,

    },
    wrapper: {
        // backgroundColor:'red',

        height: 150,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        // resizeMode:'cover',
// ,
        width: viewportWidth - 20,
        // height: 200,
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
        width: '30%',
        alignItems: 'center',
    },
    footerButtonText: {
        flexWrap: 'wrap',
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default HomeUpperSection;