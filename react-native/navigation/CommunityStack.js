import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import CommunityListScreen from '../screens/CommunityListScreen';

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

    return(
        <Stack.Navigator
          initialRouteName='Community List'
        >
          <Stack.Screen
            name='Community List'
            component={CommunityListScreen}
            options={CommunityListScreenOptions}
          />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default CommunityStack;
