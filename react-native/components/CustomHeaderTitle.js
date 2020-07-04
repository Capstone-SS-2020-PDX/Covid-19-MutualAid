import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Colors from '../config/colors';
const offeredItemIconImage = '../assets/offered_item.png';
const requestedItemIconImage = '../assets/requested_item.png';

const CustomHeaderTitle = props => {

    const itemIcon = props.request ? require(requestedItemIconImage)
          : require(offeredItemIconImage);

    const isRequest = props.request;

    return(
        <View style={{ ...styles.headerContainer, ...props.style}}>
          <Text style={styles.titleText}>
            {props.request ? 'Request Detail' : 'Offer Detail'}
          </Text>
          <Image
            style={isRequest ? styles.requestIconImage : styles.offerIconImage}
            resizeMode='contain'
            source={itemIcon}
          />
        </View>
    );
};

const styles = StyleSheet.create({
    requestIconImage: {
        width: 70,
        height: 70,
        marginLeft: -5,
    },
    offerIconImage: {
        width: 70,
        height: 70,
        marginLeft: 10,
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
