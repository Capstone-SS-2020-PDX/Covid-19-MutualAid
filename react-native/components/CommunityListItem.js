import React, { useContext } from 'react';
import { Text,
         View,
         StyleSheet,
         TouchableOpacity,
         Image,
       } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../config/colors';
import { AuthContext } from '../providers/AuthProvider';

const CommunityListItem = props => {

    return(
        <TouchableOpacity
          style={{...styles.listItem, ...props.style}}
          onPress={() => props.onSelectCommunity(props.id)}
        >
          <View style={styles.itemContent}>
            <View style={styles.listImageContainer}>
              <Image
                style={styles.listImage}
                resizeMode='cover'
                source={{ uri: props.home_pic }}
              />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.communityNameText}>{props.name}</Text>
              <Text>Members: {props.members.length}</Text>
              <Text>Postings: {props.postings.length}</Text>
            </View>
            <View style={styles.iconContainer}>
              {
                  props.isHome
                  ? <AntDesign
                    name='home'
                    size={35}
                    color={Colors.contrast2}
                  />
                  : null
              }
            </View>
          </View>
        </TouchableOpacity>

    );
}

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
        width: '50%',
        alignContent: 'flex-start',
        paddingHorizontal: 10,
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
    communityNameText: {
        fontSize: 20,
        marginBottom: 10,
    },
    iconContainer: {
        width: '20%',
        marginRight: -10,
    },
});

export default CommunityListItem;
