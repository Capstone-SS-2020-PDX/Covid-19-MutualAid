import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageSelect() {
  
  let [selectedImage, setSelectedImage] = React.useState(null);

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
        <Text style={styles.instructions}>
          Click the button to upload a photo
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    resizeMode: 'contain',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 50,
    marginTop: 120,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: 'black',
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});
