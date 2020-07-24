import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Colors from '../config/colors';
const offeredItemIconImage = '../assets/round_offer.png';
const requestedItemIconImage = '../assets/round_request.png';

const CustomHeaderTitle = props => {

    const itemIcon = props.request ? require(requestedItemIconImage)
          : require(offeredItemIconImage);

    const isRequest = props.request;

    return(
        <View style={{ ...styles.headerContainer, ...props.style}}>
          <Image
            style={styles.iconImage}
            resizeMode='contain'
            source={itemIcon}
          />
          <Text style={styles.titleText}>
            {props.request ? 'Request Detail' : 'Offer Detail'}
          </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    iconImage: {
        width: 25,
        height: 25,
        marginRight: 12,
    },
    titleText: {
        color: Colors.light_shade4,
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomHeaderTitle;
