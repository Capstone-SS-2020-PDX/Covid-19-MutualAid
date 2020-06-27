import React from 'react';
import { Text,
         View,
         StyleSheet,
         TouchableOpacity,
         Image,
       } from 'react-native';

import Colors from '../config/colors';

const PostingListItem = props => {
    return(
        <TouchableOpacity
          style={{ ...styles.listItem, ...props.style }}
          onPress={props.onSelectPosting}
        >
            <Text style={styles.text}>
              {props.title}
            </Text>
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
    text: {
        fontSize: 20,
    }
});

export default PostingListItem;
