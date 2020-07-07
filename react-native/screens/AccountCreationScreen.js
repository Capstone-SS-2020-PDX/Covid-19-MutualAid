import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { UserContext } from '../providers/UserProvider';

const AccountCreationScreen = props => {
    return(
        <View>
          <Text>Account Creation Screen</Text>
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

export default AccountCreationScreen;
