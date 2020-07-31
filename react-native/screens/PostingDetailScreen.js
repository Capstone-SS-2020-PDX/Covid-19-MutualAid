import React, { useState, useContext, useLayoutEffect } from 'react';
import { View,
         KeyboardAvoidingView,
         Text,
         Button,
         TouchableOpacity,
         Image,
         ScrollView,
         StyleSheet,
         TextInput,
         ActivityIndicator,
       } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { WToast } from 'react-native-smart-tip'
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import EditPostingScreen from './EditPostingScreen';

const offeredItemIconImage = '../assets/offered_item.png';
const requestedItemIconImage = '../assets/requested_item.png';
const itemPlaceHolder = '../assets/image_place_holder.jpg';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';
import { showModal, hideModal } from '../components/CustomModal';
import { notifyMessage } from '../components/CustomToast';
import { email_url, profiles_url, postings_url } from '../config/urls';

import { AuthContext } from '../providers/AuthProvider';


const PostingDetailScreen = props => {
  const { user, updateProfile } = useContext(AuthContext);
  const { route, navigation } = props;
  const [postingImage, setPostingImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const radius = 4000;
  const picUrl = route.params.item_pic;
  const isModeratorView = route.params.moderatorView;
  const isOwned = user.user.id === route.params.owner;

  if(route.params.location !== null) {
    var point = route.params.location;
    console.log(point)
    point = point.slice(point.indexOf('(') + 1, point.indexOf(')'));
    console.log(point);
    var longitude = parseFloat(point.slice(0, point.indexOf(' ')));
    var latitude = parseFloat(point.slice(point.indexOf(' ') + 1));
    var latlng = {latitude, longitude};
    var truePoint = {latitude, longitude};
  }
  else {
    console.log("null point");
  }
  console.log(latlng);

  /*
    This dynamically calculates a safe value to shift the true location while still ensuring
    that the radius will encompass the point
  */
 const rando = (radius, latlng) => {
  radius = radius - 50; // give us some breathing room

  // get degree shift based on radius
  // this guarantees the shifted point will be within radius
  let deg = Math.sqrt((radius * radius) / 2 ) / 111320; 
  console.log("Degree shift: " + deg);
  let lat = Math.random() * (deg - (-deg)) - deg;
  let lng = Math.random() * (deg - (-deg)) - deg;

  console.log(lat + ', ' + lng);

  latlng.latitude = latlng.latitude + lat;
  latlng.longitude = latlng.longitude + lng;
}

rando(radius, latlng);

console.log(latlng);


  useLayoutEffect(() => {

    if (!isOwned && !isModeratorView) {

      const isFavorited = user.profile.saved_postings.includes(route.params.id);
      const heartIcon = isFavorited ? 'heart' : 'hearto';

      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.favIcon}
            onPress={() => handleToggleFavorite(!isFavorited)}
          >
            <AntDesign
              name={heartIcon}
              size={25}
              color={Colors.light_shade4}
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, user.profile]);

  const handleToggleFavorite = status => {
    const url = profiles_url + user.profile.id + '/';
    let savedPostings = user.profile.saved_postings;

    if (status === true) {
      savedPostings.push(route.params.id);
    } else {
      savedPostings = savedPostings.filter(id => id !== route.params.id);
    }
    const payload = { 'saved_postings': savedPostings };

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(response => {
      // console.log("Server Response: " + response.status);
      return response.json();
    }).then(json => {
      // console.log("Server response after toggling favorite");
      // console.log(json);
      updateProfile(json);
    });

  };

  const handleReachOut = () => {
    if (!isProcessing) {
      setIsProcessing(true);
      showModal('SENDING_EMAIL');
      sendEmail(user.user.email, route.params.id);
    } else {
      console.log('Processing, please wait');
    }
  };

  const sendEmail = (fromEmail, id) => {
    const request = { postid: id, addressfrom: fromEmail };
    const requestJSON = JSON.stringify(request);

    fetch(email_url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: requestJSON,
    })
      .then(response => {console.log(response.status); return response.text() })
      .then(text => {
        console.log('Response from sendEmail: ' + text);
      })
      .catch(error => {
        console.log('Error from sendEmail: ' + error)
        notifyMessage('Oops! something went wrong...');
      })
      .finally(() => {
        resetFormState();
        setIsProcessing(false)
        hideModal();
        notifyMessage('Email sent successfully!');
        navigateToHomeStack();
      });
  }

  const handleDeletePosting = () => {
    showModal('DELETE_POSTING');
    const url = postings_url + route.params.id + '/';

    fetch(url, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.text());
      }
    }).then(json => {
      hideModal();
      notifyMessage('Posting Deleted Successfully!');
      navigation.goBack();
    }).catch(error => {
      hideModal();
      notifyMessage('Whoops! Something went wrong!!');
    }).finally(() => {
    });
  };

  const handleUnflagPosting = () => {
    showModal('UPDATING_POSTING');
    const url = postings_url + route.params.id + '/';
    const payload = JSON.stringify({ flagged: 0 });

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: payload,
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.text());
      }
    }).then(json => {
      hideModal();
      notifyMessage('Posting un-flagged Successfully!');
      navigation.goBack();
    }).catch(error => {
      console.log(JSON.stringify(error));
      hideModal();
      notifyMessage('Whoops! Something went wrong!!');
    }).finally(() => {
    });
  };

  const resetFormState = () => {
    setIsProcessing(false);
  };

  // Navigates to the Home Screen stack when called
  const navigateToHomeStack = () => {
    navigation.navigate('Home', {screen: 'Feed'})
  };

  const renderBottomButton = () => {
    if (isModeratorView) {
      return (
        <View style={styles.moderatorButtonsContainer}>
          <CustomButton
            style={{...styles.reachOutButton, ...styles.unflagButton}}
            onPress={() => {
              handleUnflagPosting();
            }}
          >
            <Text style={styles.reachOutButtonText}>Unflag Posting</Text>
          </CustomButton>
          <CustomButton
            style={{...styles.reachOutButton, ...styles.deleteButton}}
            onPress={() => {
              handleDeletePosting();
            }}
          >
            <Text style={styles.reachOutButtonText}>Delete Posting</Text>
          </CustomButton>
        </View>
      );

    } else if (route.params.owner === user.user.id) {
      return(
        <CustomButton
          style={{...styles.reachOutButton, ...styles.deleteButton}}
          onPress={() => {
            navigation.navigate('EditPosting', {
              ...route.params,
            })
          }}
        >
          <Text style={styles.reachOutButtonText}>Edit Posting</Text>
        </CustomButton>
      );
    } else {
      return(
        <CustomButton
          style={styles.reachOutButton}
          onPress={() => {
            handleReachOut();
          }}
        >
          <Text style={styles.reachOutButtonText}>Reach Out!</Text>
        </CustomButton>
      );
    }
  };

  const screenContent = (
    <>
      <View style={styles.detailTitleContainer}>
        <Text style={styles.detailTitleText}>{route.params.title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.itemImage}
          resizeMode='cover'

          source={picUrl != null
                  ? {uri:picUrl}
                  : require(itemPlaceHolder)
                 }

        />
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>
          Created on: <Text style={styles.boldText}>{route.params.created_on}{'  '}</Text>
          Available: <Text style={styles.boldText}>{route.params.count}</Text>
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
          <Text style={styles.bodyText}>{route.params.description}</Text>
          <View style={styles.map}>
          <MapView 
            provider={PROVIDER_GOOGLE}
            style={{
              height: 250,
              width: 250,
            }}
            initialRegion={{
              ...latlng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Circle
              center={latlng}
              radius={radius}
              fillColor='rgba(50,10,10,0.2)'
            />
            <Marker
              coordinate={truePoint}
            />
          </MapView>
          </View>
        </View>

      { renderBottomButton() }
    </>
  )

  return(
      <ScrollView contentContainerStyle={styles.scrollScreen}>
        {screenContent}
      </ScrollView>
  );
};


const styles = StyleSheet.create({
  map: {
    alignSelf: 'center',
    backgroundColor: Colors.light_shade4,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10
  },
  scrollScreen: {
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.light_shade4,
  },
  screen: {
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    backgroundColor: Colors.light_shade4,
    alignItems: 'center'
  },
  detailTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitleText: {
    marginLeft: windowWidth / 128,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: RFPercentage(4.2),
    marginTop: 10,
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
  deleteButton: {
    backgroundColor: Colors.contrast3,
  },
  unflagButton: {
    backgroundColor: Colors.contrast2,
  },
  moderatorButtonsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
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
  cancelText: {
    color: Colors.contrast2,
    fontSize: 20,
  },
  activityIndicator: {
    marginTop: windowHeight / 40,
  },
  favIcon: {
    marginRight: 20,
  },
});

export default PostingDetailScreen;
