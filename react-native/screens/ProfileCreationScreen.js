import React, { useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { UserContext } from '../providers/UserProvider';

const ProfileCreationScreen = props => {
    const { user } = useContext(UserContext);

    return(
        <View>
          <Text>{user.username}'s Account Creation Screen</Text>
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

export default ProfileCreationScreen;
