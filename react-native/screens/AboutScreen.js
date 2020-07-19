import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../config/colors';
import UnorderedList from 'react-native-unordered-list';
import Center from '../components/Center';
import { windowHeight, windowWidth } from '../config/dimensions';

const AboutScreen = props => {
    return(
        <Center style={styles.screen}>
            <ScrollView contentContainerStyle={styles.screen}>
            <View style={ styles.imageContainer }>
                <Image
                style={ styles.image }
                resizeMode='contain'
                source={ require('../assets/CommonGoods-Title.png') }
                fadeDuration={ 300 }
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.bodyText}>Common Goods is a PSU Computer Science Capstone Project created by: </Text>

                <UnorderedList style={styles.names}>
                    <Text>Erik Haake - Team Lead</Text> 
                </UnorderedList>
                <UnorderedList style={styles.names}>
                    <Text>Simon Barton</Text>
                </UnorderedList>
                <UnorderedList style={styles.names}>
                    <Text>Sean Sisson</Text>
                </UnorderedList>
                <UnorderedList style={styles.names}>
                    <Text>Roland Ballinger</Text>
                </UnorderedList>
                <UnorderedList style={styles.names}>
                    <Text>Allie Hanson</Text>
                </UnorderedList>
                <UnorderedList style={styles.names}>
                    <Text>Michael Jenkins</Text>
                </UnorderedList>

                <Text style={{...styles.bodyText, marginTop: 10}}>It was developed in order to assist mutual aid efforts and encourage community building.</Text>
                <Text style={{...styles.bodyText}}>We encourage users to assist their neighbors however they can, whether they are able to reciprocate the gesture or not. We believe that no matter the situation, where there is humanity there is the capability for kindess.</Text>
                <Text style={{...styles.bodyText, alignSelf: 'center', fontWeight: 'bold'}}>Be good to each other.</Text>
            </View>

            <Text style={{...styles.bodyText, marginHorizontal: 15, fontSize: 12, marginTop: 20}}>The backend of Common Goods is implemented using a Django web framework which is hosted on a Google App Engine instance, which is configured to communicate with a CloudSQL Postgres database.</Text>
            <Text style={{...styles.bodyText, marginHorizontal: 15, fontSize: 12}}>The frontend is implemented via React Native and Expo with REST requests that are sent through the Django API endpoint. iOS and Android are both supported through React Native.</Text>
            </ScrollView>
        </Center>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'flex-start',
        backgroundColor: Colors.light_shade4,
        alignItems: 'center'
    },
    textContainer: {
        borderWidth: 2,
        borderColor: Colors.dark_shade1,
        marginHorizontal: 15,
        padding: 10
    },
    names: {
        marginLeft: 10
    },
    bodyText: {
        fontFamily: 'open-sans',
        fontSize: 15,
        marginBottom: 10
    },
    imageContainer: {
        width: windowWidth * 0.7,
        height: windowWidth * 0.7,
        overflow: 'hidden',
        marginVertical: -30
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default AboutScreen;
