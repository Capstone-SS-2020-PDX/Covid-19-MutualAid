import React from 'react';
import { Text, Button, StyleSheet } from 'react-native';

import Center from '../components/Center';
import EditPostingScreen from './EditPostingScreen';

const PostingDetailScreen = props => {
  const { route, navigation } = props;

  return(
    <Center style={styles.container}>
      <Text>
        This is definitely a {route.params.name}
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
});

export default PostingDetailScreen;
