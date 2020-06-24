import React from 'react';
import { View, Button, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../config/colors';

const CustomButton = props => {
    return(
        <TouchableOpacity
          style={{ ...styles.customButton, ...props.style }}
          onPress={props.onPress}
        >
        {props.children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    customButton: {
        width: '80%',
        backgroundColor: Colors.primary,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        elevation: 5,
    }
});

export default CustomButton;
