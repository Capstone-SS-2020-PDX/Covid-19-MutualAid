import React from 'react';
import { Text,
         View,
         StyleSheet,
         TouchableOpacity
       } from 'react-native';

import Center from './Center';

const PostingListItem = props => {
   return(
      <View style={{ ...styles.listItem, ...props.style }}>
        <TouchableOpacity
          onPress={props.onSelectPosting}
        >
          <Center>
            <Text style={styles.text}>
              {props.title}
            </Text>
          </Center>
        </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   listItem: {
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginVertical: 5,
      paddingVertical: 10,
   },
   text: {
      fontSize: 20,
   }
});

export default PostingListItem;
