import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const offeredItemIconImage = '../assets/offered_item.png';
const requestedItemIconImage = '../assets/requested_item.png';

const IconDisplay = props => {

    const itemIcon = props.request ? require(requestedItemIconImage)
          : require(offeredItemIconImage);

    return(
        <View style={{ ...styles.postingTypeIconContainer, ...props.style}}>
          <Image
            style={styles.postingTypeIconImage}
            resizeMode='contain'
            source={itemIcon}
          />
        </View>
    );
};

const styles = StyleSheet.create({
  postingTypeIconContainer: {
    marginHorizontal: 8,
  },
  postingTypeIconImage: {
    width: 70,
    height: 70,
  },
});

export default IconDisplay;
