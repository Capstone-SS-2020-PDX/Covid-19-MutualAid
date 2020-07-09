import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { users_url, profiles_url } from '../config/urls';

const ProfileEditScreen = props => {
    const handleProfileUpdate = () => {
        const userUrl = users_url + user.id + '/';
        const profileUrl = profiles_url + user.profile + '/';

        let userData = user;
        userData.first_name = formValue.first_name;
        userData.last_name = formValue.last_name;
        sendRequest(JSON.stringify(userData), userUrl);

        let profileData = { user: user.id, profile_text: formValue.profile_text }
        sendRequest(JSON.stringify(profileData), profileUrl);
    };

    return(
        <View style={styles.screen}>
          <Text>Edit Profile Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default ProfileEditScreen;
