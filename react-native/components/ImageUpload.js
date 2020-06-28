import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; 

export default function ImageSelect() {
  
  let [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [1,1],
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });

  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>    
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Image source={{ uri: selectedImage.localUri }} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
      <AntDesign style={styles.instructions} name="pluscircleo" size={200} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  image: {
    width: '70%',
    height: '90%',
    borderRadius: 150,
    resizeMode: 'contain',
  },
  instructions: {
    textAlign: 'center',
    marginTop: '5%'
  },
  button: {
    backgroundColor: '#fff',
    width: '90%',
    height: '90%',
    borderRadius: 150,
  },
});
