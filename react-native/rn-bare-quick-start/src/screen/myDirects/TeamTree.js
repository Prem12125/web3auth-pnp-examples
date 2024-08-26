import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fetchDirectMemberPlace } from '../../Api/HandleApi';

const TreeNode = ({ node, onClick }) => {
    const isPlaceholder = node.walletAddress === null;
    const logoSource = require('../logo.png');

    return (
        <TouchableOpacity onPress={() => !isPlaceholder && onClick(node)} disabled={isPlaceholder}>
            <View style={[styles.node, isPlaceholder && styles.placeholderNode]}>
                <Image source={logoSource} style={styles.logo} />
                <Text style={[styles.nodeText, isPlaceholder && styles.placeholderText]}>
                    {isPlaceholder ? 'Empty' : node.userId}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const Tree = ({ data, onClickNode, navigation }) => {
    const childrenToShow = [...data.children];
    while (childrenToShow.length < 4) {
        childrenToShow.push({ userId: 'Placeholder', walletAddress: null });
    }

    return (
        <>
       
        <View style={styles.treeContainer}>
           
            <View style={styles.centralNodeContainer}>
                <TreeNode node={data} onClick={onClickNode} />
            </View>
            <Svg height="200" width="100%">
    <Line x1="50.4%" y1="0" x2="50.4%%" y2="70" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4,4" />
    {/* <Line x1="15%" y1="40" x2="85%" y2="40" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4,4" /> */}
    <Line x1="50.4%" y1="70" x2="15%" y2="160" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4,4" />
    <Line x1="50.4%" y1="70" x2="37%" y2="160" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4,4" />
    <Line x1="50.4%" y1="70" x2="63%" y2="160" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4,4" />
    <Line x1="50.4%" y1="70" x2="85%" y2="160" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4,4" />
</Svg>


            <View style={styles.childrenContainer}>
                {childrenToShow.map((node, index) => (
                    <View key={index} style={styles.childWrapper}>
                        <TreeNode node={node} onClick={onClickNode} />
                    </View>
                ))}
            </View>
        </View>
        </>

    );
};

export default function TeamTree({ navigation }) {
    const [treeData, setTreeData] = useState({
        userId: "DMT39691",
        walletAddress: "0xB3941d0B6499909CE17456597BDd535B65eF69D3",
        children: []
    });
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchDirectMemberPlace(treeData.walletAddress).then(data => {
            const children = data.map(member => ({
                userId: member.userId,
                walletAddress: member.user
            }));
            setTreeData(prevState => ({ ...prevState, children }));
        });
    }, []);

    const handleClick = async (node) => {
        const data = await fetchDirectMemberPlace(node.walletAddress);
        const children = data.map(member => ({
            userId: member.userId,
            walletAddress: member.user
        }));

        setHistory(prevHistory => [...prevHistory, treeData]);

        setTreeData({
            userId: node.userId,
            walletAddress: node.walletAddress,
            children
        });
    };

    const handleBack = () => {
        if (history.length > 0) {
            const previousState = history[history.length - 1];
            setHistory(prevHistory => prevHistory.slice(0, -1));
            setTreeData(previousState);
        }
    };

    return (
        <>
        
        <View style={styles.NavBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign style={styles.icon} name="arrowleft" size={25} color="#9286DA" />
                </TouchableOpacity>
                <Text style={styles.header1}>My Team Tree</Text>
                <View style={styles.rightPlaceholder}></View>
            </View>
        <View style={styles.fixedContainer}>
  
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} disabled={history.length === 0}   style={history.length === 0 ? styles.backButtonDisabled : styles.backButton1}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Your Level Tree</Text>
                <View style={styles.rightPlaceholder}></View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Tree data={treeData} onClickNode={handleClick} navigation={navigation} />
            </ScrollView>
            {/* <View style={styles.footer}>
                <Text style={styles.footerText}>Selected Node: {treeData.userId}</Text>
            </View> */}
           
        </View>

        </>

    );
}

const styles = StyleSheet.create({
    fixedContainer: {
        flex: 1,
        backgroundColor: '#0e0519',
        // padding: 20,
        justifyContent: 'space-between',
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign:'center',
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,

        // fontSize: 24,
        // fontWeight: 'bold',
        // alignSelf: 'center',
    },
    header1: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
      },
    backButton: {
        // backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
    },
    backButton1: {
        backgroundColor: '#955fd4',
        padding: 10,
        borderRadius: 5,
    },
    backButtonDisabled:{
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingTop:40
    },
    footer: {
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#2c2c2c',
        borderRadius: 5,
    },
    footerText: {
        color: '#fff',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#333',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#444',
    },
    navItem: {
        alignItems: 'center',
    },
    navItemText: {
        color: '#fff',
        fontSize: 16,
    },
    treeContainer: {
        alignItems: 'center',
    },
    centralNodeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    childrenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '3%',
        marginTop: -40,
    },
    childWrapper: {
        width: '23%',
        alignItems: 'center',
        // backgroundColor:'#955fd4',
        justifyContent: 'center',
    },
    node: {
        width: 87,
        height: 100,
        backgroundColor: '#955fd4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
    },
    nodeText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
    icon: {
        marginRight: 10,
    },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    placeholderNode: {
        backgroundColor: '#e0e0e0',
        borderStyle: 'dashed',
    },
    placeholderText: {
        color: '#888',
    },
    rightPlaceholder: {
        width: 25,
    },
});
