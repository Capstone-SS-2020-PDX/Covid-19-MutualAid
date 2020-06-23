import React from 'react';
import { View,
         Text,
         Button,
         TouchableOpacity,
         Image,
         Dimensions,
         ScrollView,
         StyleSheet
       } from 'react-native';

import Center from '../components/Center';
import EditPostingScreen from './EditPostingScreen';

import Colors from '../config/colors';

const PostingDetailScreen = props => {
  const picUrl = 'https://picsum.photos/id/237/200';
  const { route, navigation } = props;

  return(
    <ScrollView contentContainerStyle={styles.screen}>
      <Center >
        <View style={styles.detailTitle}>
          <Text style={styles.titleText}>{route.params.title}</Text>
        </View>

        <View style={styles.detailImageRow}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.itemImage}
              resizeMode='cover'
              source={{uri: picUrl}}
            />
          </View>
        </View>

        <View style={styles.detailBody}>
          <Text style={styles.bodyText}>{route.params.body}</Text>
        </View>

        <View style={styles.reachOutButtonContainer}>
          <TouchableOpacity
            style={styles.reachOutButton}
            onPress={() => {
              console.log('Reach out pressed!');
            }}
          >
            <Text style={styles.reachOutButtonText}>Reach Out!</Text>
          </TouchableOpacity>
        </View>

      </Center>
    </ScrollView>


    // <Center style={styles.container}>
    //   <Text style={styles.titleText}>
    //     This is definitely a {route.params.name}
    //   </Text>
    //   <Text style={styles.bodyText}>
    //     Body: {route.params.body}
    //   </Text>
    //   <Button
    //     title='Edit this posting'
    //     onPress={() => navigation.navigate('EditPosting', {
    //       name: route.params.name,
    //     })}
    //   />
    // </Center>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
    padding: 20,
  },
  detailTitle: {
  },
  titleText: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: Colors.dark_shade1,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 26,
  },
  bodyText: {
    fontFamily: 'open-sans',
  },
  reachOutButtonContainer: {
    width: '80%',
  },
  reachOutButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
    elevation: 5,
  },
  reachOutButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default PostingDetailScreen;
