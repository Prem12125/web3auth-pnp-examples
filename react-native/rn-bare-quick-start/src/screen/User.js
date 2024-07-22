import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const User = () => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://jkinstitute.ac.in/Images/Images/prem.jpg' }} style={styles.profileImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>Prem Narayan</Text>
                <Text style={styles.email}>premnarayan@allduniv.ac.in</Text>
                <View style={styles.additionalInfo}>
                    <Text style={styles.infoTitle}>Role:</Text>
                    <Text style={styles.infoDetail}>Software Developer</Text>
                </View>
                <View style={styles.additionalInfo}>
                    <Text style={styles.infoTitle}>Company:</Text>
                    <Text style={styles.infoDetail}>Nadcab Labs</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        margin: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginVertical: 5,
    },
    additionalInfo: {
        flexDirection: 'row',
        marginTop: 10,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    infoDetail: {
        fontSize: 16,
        color: '#555',
        marginLeft: 5,
    },
});

export default User;
