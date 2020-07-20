import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         TouchableOpacity,
         StyleSheet
       } from 'react-native';

import { notifyMessage } from '../components/CustomToast';
import { showModal, hideModal } from '../components/CustomModal';
import Center from '../components/Center';
import Colors from '../config/colors';
import CustomImagePicker from '../components/CustomImagePicker';
import { postings_url } from '../config/urls';

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
          console.log(response.status);
          return response.json();
      })
      .then(json => {
          console.log(json);
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

    const postingPatchUrl = postings_url + route.params.id + '/';

    const [selectedImage, setSelectedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [formState, setFormState] = useState({
        title: route.params.title,
        desc: route.params.description,
    })

    const submitSave = useRef(null);

    submitSave.current = () => {
        setIsProcessing(true);
        showModal('UPDATING_POSTING');

        handleUpdatePosting(postingPatchUrl, createFormData()).then(() => {
            navigation.goBack();
        });
    };

    useEffect(() => {
        navigation.setParams({submitSave});
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

    return(
        <Center style={styles.screen}>
          <View style={styles.editContent}>
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
          </View>
        </Center>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: 30,
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
        fontSize: 20,
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
});

export default EditPostingScreen;
