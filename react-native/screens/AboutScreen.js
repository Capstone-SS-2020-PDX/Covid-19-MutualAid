import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Center from '../components/Center';

const AboutScreen = props => {
    return(
        <Center style={styles.screen}>
          <Text style={styles.bodyText}>Check out this lovely About page</Text>
        </Center>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    titleText: {
        fontFamily: 'open-sans-bold',
        fontSize: 36,
        marginBottom: 40,
    },
    bodyText: {
        fontFamily: 'open-sans',
        fontSize: 20,
    },
});

export default AboutScreen;
