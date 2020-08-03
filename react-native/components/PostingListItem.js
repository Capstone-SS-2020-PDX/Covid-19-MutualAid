import React, { useContext } from 'react';
import { Text,
         View,
         StyleSheet,
         TouchableOpacity,
         Image,
       } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../config/colors';
import { AuthContext } from '../providers/AuthProvider';

const PostingListItem = props => {
    const { user, communities } = useContext(AuthContext);
   
    const offeredItemIconImage = '../assets/round_offer.png';
    const requestedItemIconImage = '../assets/round_request.png';
    const itemPlaceHolder = '../assets/image_place_holder.jpg';

    const itemIcon = props.request ? require(requestedItemIconImage)
        : require(offeredItemIconImage);
    const itemType = props.request ? 'Request'
        : 'Offer';

    const picUrl = props.item_pic;

    const isModeratorView = props.moderatorView;
    const isOwned = user.user.id == props.owner;
    const isFavorited = user.profile.saved_postings.includes(props.id);
    
    const isFlagged = props.flagged;

    let communityName;
    if (props.in_community) {
        communityName = communities.find(community => props.in_community === community.id).name;
    } else {
        communityName = 'Oak Grove';
    }

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
              <View style={styles.itemTitleRow}>
                <View style={styles.itemTitleContainer}>
                  <Text style={styles.itemTitleText}>
                    {props.title}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <View style={isFlagged?
                      styles.heartIconContainerFlag:
                      styles.heartIconContainerNoFlag}>
                    {(!isOwned && !isModeratorView && isFavorited)? (
                      <AntDesign
                        name={'heart'}
                        size={24}
                        color={Colors.contrast2}
                      />)
                    : (null)}
                  </View>
                  <View style={styles.flagIconContainer}>
                    {isFlagged? (
                    <Ionicons 
                        name="ios-flag" 
                        size={24} 
                        color={Colors.contrast3} />)
                    : (null)
                    }
                  </View>
                </View>
              </View>
              <View style={styles.postingTypeContainer}>
                <Image
                  style={styles.postingTypeIconImage}
                  resizeMode='contain'
                  source={itemIcon}
                />
                <Text style={styles.itemDetailText}>
                  {itemType}
                </Text>
              </View>
              <View style={styles.postingTypeContainer}>
                <Entypo 
                    name="location-pin" 
                    size={20} 
                    color="black" 
                    style={{marginTop: 5}} />
                <Text style={styles.itemDetailText}>
                  {communityName}
                </Text>
              </View>
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
    itemTitleRow: {
        flexDirection: 'row',
    },
    itemTitleContainer: {
        width: '75%',
        marginRight: '5%',
    },
    itemTitleText: {
        fontSize: 20,
        fontFamily: 'open-sans',
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    heartIconContainerFlag: {
      marginRight: '7%',
    },
    heartIconContainerNoFlag: {
    },
    flagIconContainer: {
    },
    itemDetailText: {
        fontSize: 14,
        fontFamily: 'open-sans',
        marginTop: 5,
        marginLeft: 10,
    },
    postingTypeContainer: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    postingTypeIconImage: {
        width: 20,
        height: 20,
        marginTop: 5,
    },
});

export default PostingListItem;
