import React, { useState } from 'react';
import { View,
         Text,
         Button,
         TouchableOpacity,
         Image,
         ScrollView,
         StyleSheet,
         TextInput,
         Modal,
         ActivityIndicator,
       } from 'react-native';
import { WToast } from 'react-native-smart-tip'

import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import EditPostingScreen from './EditPostingScreen';

const offeredItemIconImage = '../assets/offered_item.png';
const requestedItemIconImage = '../assets/requested_item.png';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';

const emailUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/postings/contact/';

const PostingDetailScreen = props => {
  const { route, navigation } = props;
  const [emailText, setEmailText] = useState('');
  const [postingImage, setPostingImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const picUrl = route.params.item_pic;

  const handleReachOut = () => {
    if (emailText.length > 0) {
      console.log('Sending email from ' + emailText + ' to post with id: ' + route.params.id);
      setIsProcessing(true);
      sendEmail(emailText, route.params.id);
    } else {
      console.log('No email provided');
    }
  };

  const sendEmail = (fromEmail, id) => {
    const request = { postid: id, addressfrom: fromEmail };
    const requestJSON = JSON.stringify(request);

    fetch(emailUrl, {
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
        notifyMessage('Email sent successfully!');
        resetFormState();
        navigateToHomeStack();
      })
      .catch(error => {
        console.log('Error from sendEmail: ' + error)
        notifyMessage('Oops! something went wrong...');
      })
      .finally(() => {
      });
  }

  const resetFormState = () => {
    setIsProcessing(false);
    setEmailText('');
    setIsModalVisible(!isModalVisible);
  };
 
  // Navigates to the Home Screen stack when called
  const navigateToHomeStack = () => {
    navigation.navigate('Home', {screen: 'Feed'})
  }

  const notifyMessage = msg => {
    const toastOptions = {
      data: msg,
      textColor: Colors.light_shade4,
      backgroundColor: Colors.dark_shade1,
      position: WToast.position.CENTER,
      duration: WToast.duration.SHORT,
      position: WToast.position.CENTER,
      // icon: <ActivityIndicator color='#fff' size={'large'}/>
    }

    WToast.show(toastOptions)
  }

  const itemIcon = route.params.request ? require(requestedItemIconImage)
        : require(offeredItemIconImage);

  const screenContent = (
    <>
      <View style={styles.detailTitleContainer}>
        <Text style={styles.detailTitleText}>{route.params.title}</Text>
       </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.itemImage}
            resizeMode='cover'
            source={picUrl != null ? {uri: picUrl}: null}
          />
        </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>
          Created on: <Text style={styles.boldText}>{route.params.created_on}{'  '}</Text>
          Available: <Text style={styles.boldText}>{route.params.count}</Text>
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <ScrollView style={styles.descriptionScroll}>
          <Text style={styles.bodyText}>{route.params.description}</Text>
        </ScrollView>
      </View>

      <CustomButton
        style={styles.reachOutButton}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Text style={styles.reachOutButtonText}>Reach Out!</Text>
      </CustomButton>


      <Modal
        visible={isModalVisible}
        animationType='slide'
        onRequestClose={() => console.log('modal closing')}
        onDismiss={() => console.log('modal dismissed')}
      >
        <View style={styles.reachOutModalViewContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>
              Enter your email to get in contact!
            </Text>
          </View>

          { isProcessing
            ? <View style={styles.activityIndicator}>
                <ActivityIndicator size='large' color={Colors.primary}/>
              </View>
            : <>

                <View style={styles.inputContainer}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder='Enter your email...'
                      placeholderTextColor={Colors.placeholder_text}
                      keyboardType='email-address'
                      returnKeyType='done'
                      onChangeText={text => setEmailText(text)}
                      value={emailText}
                    />
                  </View>
                </View>
                <CustomButton
                  style={styles.confirmButton}
                  onPress={() => {
                    handleReachOut();
                  }}
                >
                  <Text style={styles.reachOutButtonText}>Confirm</Text>
                </CustomButton>
                <TouchableOpacity
                  onPress={() => {
                    console.log('reach out cancelled');
                    setIsModalVisible(!isModalVisible);
                  }}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </>
          }
        </View>
      </Modal>
    </>
  )

  return(
    windowHeight < 650
      ? <ScrollView
          contentContainerStyle={styles.scrollScreen}
        >
          {screenContent}
        </ScrollView>
    : <Center style={styles.screen}>
      {screenContent}
    </Center>
  );
};


const styles = StyleSheet.create({
  scrollScreen: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Colors.light_shade4,
  },
  screen: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Colors.light_shade4,
  },
  detailTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitleText: {
    marginLeft: windowWidth / 35,
    fontSize: windowWidth / 14,
    fontFamily: 'open-sans-bold',
    marginTop: 10,
  },
  postingTypeIconContainer: {
    marginHorizontal: 8,
  },
  postingTypeIconImage: {
    width: 80,
    height: 80,
  },
  detailRow: {
    flexDirection: 'row',
  },
  detailText: {
    fontSize: windowWidth / 32,
  },
  boldText: {
    fontWeight: 'bold',
  },
  imageContainer: {
    width: windowWidth / 1.5,
    height: windowWidth / 1.5,
    marginTop: 10,
    borderWidth: 2,
    borderColor: Colors.dark_shade1,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  descriptionContainer: {
    width: '100%',
  },
  descriptionScroll: {
    padding: 5,
  },
  detailContainer: {
    alignItems: 'center',
    marginBottom: windowHeight / 200,
  },
  bodyText: {
    fontFamily: 'open-sans',
    fontSize: windowWidth / 25,
    textAlign: 'center',
  },
  reachOutButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 5,
  },
  reachOutButtonText: {
    color: Colors.light_shade4,
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
  reachOutModalViewContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 10,
    padding: 10,
    backgroundColor: "white",
  },
  confirmButton: {
    marginBottom: 20,
  },
  modalTitleContainer: {
    marginBottom: 200,
  },
  modalTitle: {
    fontSize: 40,
    textAlign: 'center',
  },
  cancelText: {
    color: Colors.contrast2,
    fontSize: 20,
  },
  activityIndicator: {
    marginTop: windowHeight / 40,
  },
});

export default PostingDetailScreen;
