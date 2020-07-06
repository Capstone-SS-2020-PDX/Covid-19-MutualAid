import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

const url = "https:cellular-virtue-277000.uc.r.appspot.com/auth/?format=json";
const ProfileScreen = props => {

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
            .catch(error => console.log(error))
            .finally(() => {

            });
    }, []);


    return(
        <View style={styles.screen}>
          <Text>
            Profile Screen
          </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfileScreen;
