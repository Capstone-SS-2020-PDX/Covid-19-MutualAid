import React from 'react';
import { Text,
         View,
         StyleSheet,
         TouchableOpacity,
         Image,
       } from 'react-native';

import Colors from '../config/colors';

const PostingListItem = props => {
    const offeredItemIconImage = '../assets/round_offer.png';
    const requestedItemIconImage = '../assets/round_request.png';
    const itemPlaceHolder = '../assets/image_place_holder.jpg';

    const itemIcon = props.request ? require(requestedItemIconImage)
        : require(offeredItemIconImage);

    const picUrl = props.item_pic;

    return(
        <TouchableOpacity
          style={{ ...styles.listItem, ...props.style }}
          onPress={props.onSelectPosting}
        >
          <View style={styles.itemContent}>
            <View style={styles.listImageContainer}>
              <Image
                style={styles.listImage}
                resizeMode='contain'
                source={picUrl != null?{uri:picUrl}
                : require(itemPlaceHolder)}
              />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitleText}>
                {props.title}
              </Text>
              <View style={styles.postingTypeIconContainer}>
              <Image
                style={styles.postingTypeIconImage}
                resizeMode='contain'
                source={itemIcon}
              />
            </View>
              <Text style={styles.itemCommunityText}>
                Oak Grove
              </Text>
            </View>
          </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        height: 120,
        justifyContent: 'center',
        borderColor: Colors.dark_shade1,
        borderTopWidth: 0.8,
        paddingVertical: 10,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    itemTextContainer: {
        width: '70%',
        alignContent: 'flex-start',
        paddingHorizontal: 5,
    },
    listImageContainer: {
        width: '20%',
        marginRight: 20,
        marginLeft: 10,
    },
    listImage: {
        height: 90,
        width: 90,
        borderWidth: 1,
        borderColor: Colors.dark_shade1,
    },
    itemTitleText: {
        fontSize: 20,
        fontFamily: 'open-sans',
    },
    itemCommunityText: {
        fontSize: 14,
        fontFamily: 'open-sans',
        marginTop: 5,
    },
    postingTypeIconContainer: {
        width: '22%',
    },
    postingTypeIconImage: {
        width: 20,
        height: 20,
        marginTop: 5,
    },
});

export default PostingListItem;
