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
            <Image
              style={styles.listImage}
              resizeMode='contain'
              source={{uri: 'https://source.unsplash.com/random/80x80'}}
            />
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
        paddingHorizontal: 20,

    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemTextContent: {
        alignContent: 'flex-start',
    },
    listImage: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: Colors.dark_shade1,
    },
    itemTitleText: {
        fontSize: 20,
        fontFamily: 'open-sans',
    },
    postingTypeIconImage: {
        width: 80,
        height: 80,
    },
});

export default PostingListItem;
