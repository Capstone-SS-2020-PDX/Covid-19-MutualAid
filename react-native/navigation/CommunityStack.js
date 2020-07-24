import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import CommunityListScreen from '../screens/CommunityListScreen';
import JoinCommunitiesScreen from '../screens/JoinCommunitiesScreen';

import Colors from '../config/colors';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

const Stack = createStackNavigator();

const CommunityStack = props => {
    const { route, navigation } = props;


    const CommunityListScreenOptions = route => {
        return({
            headerTitle: 'My Communities',
            ...headerOptions,
            headerLeft: drawerMenuIcon.bind(this, navigation),
        })
    };

    const JoinCommunitiesScreenOptions = route => {
        return({
            headerTitle: 'Join Communities',
            ...headerOptions,
        })
    };

    return(
        <Stack.Navigator
          initialRouteName='My Communities'
        >
          <Stack.Screen
            name='My Communities'
            component={CommunityListScreen}
            options={CommunityListScreenOptions}
          />
          <Stack.Screen
            name='Join Communities'
            component={JoinCommunitiesScreen}
            options={JoinCommunitiesScreenOptions}
          />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default CommunityStack;
