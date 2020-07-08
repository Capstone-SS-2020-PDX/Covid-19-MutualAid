import React, { useState, useEffect, } from 'react';
import { View, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import { windowHeight, windowWidth } from '../config/dimensions';


const CustomImagePicker = (props) => {
    var selectedImage = props.getImage();

    useEffect(() => {
        props.onSelectImage(selectedImage);
    }, [selectedImage]);

    // Handles letting the user select an image from their library
    const openCameraAsync = async () => {
        let cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        let libraryPermission = await ImagePicker.requestCameraRollPermissionsAsync();

        if (!cameraPermission.granted  || !libraryPermission.granted) {
            alert('Permission to access camera and library is required!');
            return;
        }

        let cameraResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [1,1],
            resizeMethod: 'contain'
        });

        if (cameraResult.cancelled === true) {
            return;
        }

        let imageName = (Math.random() * 1000).toString().concat('.jpg');
        let resizedImage = await ImageManipulator.manipulateAsync(
            cameraResult.uri,
            [
                { resize: {
                    width: 1000
                }},
            ],
            { compress: 0.5 },
        )

        props.setImage({uri: resizedImage.uri, type: 'image/jpeg', name: imageName});
    };

    // Handles letting the user select an image from their library
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1,1],
            resizeMethod: 'contain'
        });

        if (pickerResult.cancelled === true) {
            return;
        }

        let imageName = (Math.random() * 1000).toString().concat('.jpg');
        let resizedImage = await ImageManipulator.manipulateAsync(
            pickerResult.uri,
            [
                { resize: {
                    width: 1000
                }},
            ],
            { compress: 0.5 },
        )

        props.setImage({uri: resizedImage.uri, type: 'image/jpeg', name: imageName});
    };

    const selectImageOption = () => {
        Alert.alert(
            "Image Upload",
            "Choose an image from your library, or take one with your camera.",
            [
                {
                    text:"Cancel",
                    style: "cancel"
                },
                {
                    text: "Camera",
                    onPress: () => openCameraAsync()
                },
                {
                    text: "Library",
                    onPress: () => openImagePickerAsync()
                }
            ],
            { onDismiss: () => {} }
        );
    }

    return(
        <TouchableOpacity onPress={selectImageOption}>

          { selectedImage 
            ? <Image source={{ uri: selectedImage.uri }} style={styles.image} />
            : <FontAwesome5
                size={150}
                name={props.iconName}
              />
          }

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        width: windowWidth / 3,
        height: windowHeight / 4,
        aspectRatio: 1,
        borderColor: 'black',
        borderWidth: 1
    },
});

export default CustomImagePicker;
