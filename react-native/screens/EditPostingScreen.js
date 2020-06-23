import React, { useRef, useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

import Center from '../components/Center';

async function apiCall(data) {
    // make POST request with data
};

const EditPostingScreen = props => {
    const { route, navigation } = props;
    const [formState, setFormState] = useState({});
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
        <Center style={styles.container}>
          <Text>
            Editing {route.params.id}
          </Text>
        </Center>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 30,

    },
});

export default EditPostingScreen;
