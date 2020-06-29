import React, { useState } from 'react';
import { View,
         Text,
         Button,
         TouchableOpacity,
         Image,
         ScrollView,
         StyleSheet,
         TextInput,
       } from 'react-native';
import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import EditPostingScreen from './EditPostingScreen';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';

const url = 'https://cellular-virtue-277000.uc.r.appspot.com/postings/contact/';

const PostingDetailScreen = props => {
  const { route, navigation } = props;
  const [emailText, setEmailText] = useState('');
  const [postingImage, setPostingImage] = useState(null);

  const picUrl = route.params.item_pic;

  const handleReachOut = () => {
    if (emailText.length > 0) {
      console.log('Sending email from ' + emailText + ' to post with id: ' + route.params.id);
      sendEmail(emailText, route.params.id);
    } else {
      console.log('No email provided');
    }
  };

  const sendEmail = (fromEmail, id) => {
    const toEmail = 'canadianfishturkey@gmail.com';
    const request = { postid: id, addressfrom: fromEmail, addressto: toEmail };
    const requestJSON = JSON.stringify(request);
fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: requestJSON,
    })
      .then(response => response.text())
      .then(text => {
        console.log('Response from sendEmail: ' + text);
      })
      .catch(error => console.log('Error from sendEmail: ' + error))
      .finally(() => {});
  }

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
        <Text style={styles.bodyText}>{route.params.description}</Text>
      </ScrollView>
      <View style={styles.inputContainer}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Enter your email...'
          placeholderTextColor={Colors.placeholder_text}
          keyboardType='email-address'
          returnKeyType='done'
          onChangeText={text => setEmailText(text)}
        />
      </View>
      </View>

      <CustomButton
        style={styles.reachOutButton}
        onPress={handleReachOut}
      >
        <Text style={styles.reachOutButtonText}>Reach Out!</Text>
      </CustomButton>

    </Center>
  );
};


const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Colors.light_shade4,
  },
  detailTitle: {
  },
  titleText: {
    // fontSize: 28,
    fontSize: windowWidth / 18,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    borderWidth: 1,
    borderColor: Colors.dark_shade1,
    marginVertical: windowHeight / 25,
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
  inputContainer: {
    width: '80%',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.light_shade4,
    borderRadius: 25,
    borderColor: Colors.placeholder_text,
    borderWidth: 0.5,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,

    shadowColor: Colors.dark_shade1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputText: {
    width: '90%',
    color: Colors.dark_shade1,
  },
});

export default PostingDetailScreen;
