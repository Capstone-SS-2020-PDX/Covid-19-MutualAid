import React from 'react';
import { Text,
         View,
         StyleSheet,
         TouchableOpacity
       } from 'react-native';

import Center from './Center';

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
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 20,
    }
});

export default PostingListItem;
