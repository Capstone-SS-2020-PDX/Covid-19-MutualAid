import React, { useContext, useRef, useState, useEffect, useLayoutEffect } from 'react';
import { View,
         ScrollView,
         Text,
         TextInput,
         Button,
         Picker,
         TouchableOpacity,
         Platform,
         StyleSheet
       } from 'react-native';
import KeyboardShift from 'react-native-keyboardshift-razzium';

import { notifyMessage } from '../components/CustomToast';
import { showModal, hideModal } from '../components/CustomModal';
import Center from '../components/Center';
import Colors from '../config/colors';
import CustomImagePicker from '../components/CustomImagePicker';
import { postings_url } from '../config/urls';

import { AuthContext } from '../providers/AuthProvider';

const handleUpdatePosting = async (url, data) => {

    console.log("Outgoing payload: " + JSON.stringify(data));

    return fetch(url, {
      method: 'PATCH',
      headers: {
        'content-type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => {
          // console.log(response.status);
          return response.json();
      })
      .then(json => {
          // console.log(json);
      })
      .catch(error => {
          console.log(error.message)
      })
      .finally(() => {
          hideModal();
          notifyMessage('Posting Updated Successfully!');
      });
};

const EditPostingScreen = props => {
    const { route, navigation } = props;
    const { communities } = useContext(AuthContext);

    const isAndroid = Platform.OS === 'android' ? true : false;
    const postingPatchUrl = postings_url + route.params.id + '/';

    const [selectedImage, setSelectedImage] = useState(null);
    const inCommunity = communities.find(community => community.id === route.params.in_community);
    const [selectedCommunity, setSelectedCommunity] = useState(inCommunity);
    const [isProcessing, setIsProcessing] = useState(false);
    const [formState, setFormState] = useState({
        title: route.params.title,
        desc: route.params.description,
    })
    const placeholderImage = route.params.item_pic;

    const submitEditPosting = useRef(null);

    submitEditPosting.current = () => {
        setIsProcessing(true);
        showModal('UPDATING_POSTING');

        handleUpdatePosting(postingPatchUrl, createFormData()).then(() => {
            navigation.goBack();
        });
    };

    useEffect(() => {
        navigation.setParams({submitEditPosting});
    }, []);

  const createFormData = () => {
    // const categoryValue = isCategorySwitchEnabled ? 'services' : 'goods';
    // const requestValue = isRequestSwitchEnabled ? true : false;

    const data = new FormData();

    if (selectedImage) {
      data.append('item_pic', selectedImage);
    }

      data.append('title', formState.title);
      data.append('desc', formState.desc);
      data.append('in_community', selectedCommunity.id);
      // data.append('count', itemCount);
    // data.append('owner', user.user.id);
    // data.append('category', categoryValue);
    // data.append('request', requestValue);
    // data.append('in_community', user.profile.home);

    return data;
  };

    const updateForm = (text, input) => {
        setFormState({ ...formState, [input]: text });
    };

    const getImage = () => {
        return selectedImage;
    };

    const selectImage = imageData => {
        console.log("In selectImage: " + JSON.stringify(imageData));
        setSelectedImage(imageData);
    };

    const renderCommunityPicker = () => {
        if (isAndroid) {
            return(
                <View style={{ alignItems: 'center'}}>
                  <Text style={styles.editBodyHeader}>Community</Text>
                  <View style={{...styles.inputView, ...styles.communityPickerContainer}}>
                    <Picker
                      style={styles.communityPicker}
                      selectedValue={selectedCommunity}
                      onValueChange={(itemValue, itemIndex) => setSelectedCommunity(itemValue)}
                    >
                      { renderCommunityPickerItems() }
                    </Picker>
                  </View>
                </View>
            );
        } else {
            // return(
            //     <View style={{...styles.inputView, flexDirection: 'column', height: 80, paddingVertical: 10}}>
            //       <Button
            //         onPress={showiOSActionSheet}
            //         title='Choose Home Community'
            //       />
            //       <Text style={styles.text}>{selectedCommunity.name}</Text>
            //     </View>
            // );
        }
    };

    const renderCommunityPickerItems = () => {
        return communities.map(community =>
            <Picker.Item label={community.name} value={community} key={community.id}/>
        );
    }

    return(
        <KeyboardShift>
          {() => (
              <ScrollView>
        <Center style={styles.screen}>
          <View style={styles.editContent}>
          <View style={styles.imageContainer}>
            <CustomImagePicker
              iconName='images'
              onSelectImage={selectImage}
              getImage={getImage}
              setImage={setSelectedImage}

              placeholderImage={placeholderImage}
            />
          </View>
            <Text style={styles.editBodyHeader}>Title</Text>
            <TextInput
              style={styles.editTextInput}
              onChangeText={text => updateForm(text, 'title')}
              multiline={true}
            >
              {route.params.title}
            </TextInput>
          </View>
          <View style={styles.editContent}>
            <Text style={styles.editBodyHeader}>Description</Text>
            <TextInput
              style={styles.editTextInput}
              onChangeText={text => updateForm(text, 'desc')}
              multiline={true}
            >
              {route.params.description}
            </TextInput>
          { renderCommunityPicker() }
          </View>
        </Center>
              </ScrollView>
          )}
        </KeyboardShift>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: Colors.light_shade4,
    },
    titleText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    editContent: {
        width: '100%',
        alignItems: 'center',
    },
    editBodyHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    editTextInput: {
        width: '100%',
        borderWidth: 2,
        borderColor: 'gray',
        fontSize: 18,
        padding: 10,
        borderRadius: 20,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10
    },
    communityPickerContainer: {
        // width: '80%',
        width: 300,
        alignItems: 'center',
    },
    communityPicker: {
        height: 50,
        width: '80%',
    },
});

export default EditPostingScreen;
