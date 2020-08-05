import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = props => {
    return(
        <View style={styles.screen}>
          <Text>Settings Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingsScreen;
