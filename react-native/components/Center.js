import React from 'react';
import { View, StyleSheet } from 'react-native';

const Center = props => {
    return(
        <View style={{ ...styles.screen, ...props.style }}>
          {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Center;
