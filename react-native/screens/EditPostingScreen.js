import React, { useRef, useState, useEffect } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         TouchableOpacity,
         StyleSheet
       } from 'react-native';

import Center from '../components/Center';
import Colors from '../config/colors';

async function apiCall(data) {
    // make POST request with data
};

const EditPostingScreen = props => {
    const { route, navigation } = props;
    const [formState, setFormState] = useState({});
    const [bodyText, setBodyText] = useState(route.params.body);
    const submit = useRef(null);

    submit.current = () => {
        // make API call with new form state
        apiCall(formState).then(() => {
            navigation.goBack();
        });
    };

    useEffect(() => {
        navigation.setParams({submit});
    }, []);

    return(
        <Center style={styles.screen}>
          <Text style={styles.titleText}>
              Edit Your Posting
            </Text>
          <View style={styles.editContent}>
            <Text style={styles.editBodyHeader}>Edit Title</Text>
            <TextInput
              style={styles.editTextInput}
              onChangeText={text => setBodyText(text)}
              multiline={true}
            >
              {route.params.title}
            </TextInput>
          </View>
          <View style={styles.editContent}>
            <Text style={styles.editBodyHeader}>Edit Body</Text>
            <TextInput
              style={styles.editTextInput}
              onChangeText={text => setBodyText(text)}
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
