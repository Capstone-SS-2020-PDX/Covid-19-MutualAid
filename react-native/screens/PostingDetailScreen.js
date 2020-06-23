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
import CustomButton from '../components/CustomButton';
import EditPostingScreen from './EditPostingScreen';

import Colors from '../config/colors';

const PostingDetailScreen = props => {
  const picUrl = 'https://picsum.photos/id/237/200';
  const { route, navigation } = props;

  return(
    <Center style={styles.screen}>
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

      <ScrollView style={styles.detailScroll}>
        <Text style={styles.bodyText}>{route.params.body}</Text>
      </ScrollView>

        <CustomButton
          style={styles.reachOutButton}
          onPress={() => console.log('Reach out pressed!')}
        >
          <Text style={styles.reachOutButtonText}>Reach Out!</Text>
        </CustomButton>

    </Center>
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
  detailScroll: {
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
