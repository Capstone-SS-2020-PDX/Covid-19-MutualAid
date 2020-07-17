import React, { useEffect, useContext, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import Colors from '../config/colors';
import { windowWidth, windowHeight } from '../config/dimensions';
import { users_url } from '../config/urls';

import { AuthContext } from '../providers/AuthProvider';

const UserPostingListScreen = props => {
    const userPostingsUrl = users_url + '/postings/';
    const { user } = useContext(AuthContext);

    return(
        <View style={styles.screen}>
          <Text>This is the user postings list screen for {user.user.username}</Text>
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

export default UserPostingListScreen;
