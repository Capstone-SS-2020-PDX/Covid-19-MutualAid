import React from 'react';
import { Text,
         View,
         StyleSheet,
         TouchableOpacity,
         Image,
       } from 'react-native';

import Colors from '../config/colors';

const PostingListItem = props => {
    const offeredItemIconImage = '../assets/offered_item.png';
    const requestedItemIconImage = '../assets/requested_item.png';

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
                source={{uri: 'https://source.unsplash.com/random/80x80'}}
              />
            </View>
            <View style={styles.itemTextContent}>
              <Text style={styles.itemTitleText}>
                {props.title}
              </Text>
              <Text style={styles.itemCommunityText}>
                Oak Grove
              </Text>
            </View>
            <View style={styles.postingTypeIconContainer}>
              <Image
                style={styles.postingTypeIconImage}
                resizeMode='contain'
                source={require(offeredItemIconImage)}
              />
            </View>
          </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        borderColor: Colors.dark_shade1,
        borderTopWidth: 0.8,
        paddingVertical: 10,
        paddingHorizontal: 15,

    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemTextContent: {
        width: '50%',
        alignContent: 'flex-start',
    },
    listImageContainer: {
        width: '25%',
        marginRight: 10,
    },
    listImage: {
        height: 80,
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
    },
    postingTypeIconContainer: {
        width: '25%',
    },
    postingTypeIconImage: {
        width: 80,
        height: 80,
    },
});

export default PostingListItem;
