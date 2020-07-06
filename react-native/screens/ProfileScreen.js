import React, { useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { AuthContext } from '../providers/AuthProvider';
import { UserContext } from '../providers/UserProvider';

const url = "https:cellular-virtue-277000.uc.r.appspot.com/auth/?format=json";
const ProfileScreen = props => {
    // const { username } = useContext(AuthContext);
    const { user } = useContext(UserContext);

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
          <Text>User Name: {user.username}</Text>
          <Text>email: {user.email}</Text>
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
