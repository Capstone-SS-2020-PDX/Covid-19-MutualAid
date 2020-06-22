import React from 'react';
import { Text, Button, StyleSheet } from 'react-native';

import Center from '../components/Center';
import EditPostingScreen from './EditPostingScreen';

const PostingDetailScreen = props => {
  const { route, navigation } = props;

  return(
    <Center style={styles.container}>
      <Text style={styles.titleText}>
        This is definitely a {route.params.name}
      </Text>
      <Text style={styles.bodyText}>
        Body: {route.params.body}
      </Text>
      <Button
        title='Edit this posting'
        onPress={() => navigation.navigate('EditPosting', {
          name: route.params.name,
        })}
      />
    </Center>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
  },
  bodyText: {
    textAlign: 'center',
    fontFamily: 'open-sans',
  },
});

export default PostingDetailScreen;
