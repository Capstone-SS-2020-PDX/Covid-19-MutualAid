import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../providers/AuthProvider';
import { addPostingsRoutes } from './addPostingsRoutes';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

import FlaggedPostingsScreen from '../screens/FlaggedPostingsScreen';

const Stack = createStackNavigator();

const ModeratorStack = props => {
    const { navigation } = props;
    const { user, communities } = useContext(AuthContext);

    const FlaggedPostingsScreenOptions = {
        headerTitle: 'Flagged Postings',
        ...headerOptions,
        headerLeft: drawerMenuIcon.bind(this, navigation),
    };

    return (
        <Stack.Navigator
          initialRouteName='FlaggedPostings'
        >
          <Stack.Screen
            name='FlaggedPostings'
            component={FlaggedPostingsScreen}
            options={FlaggedPostingsScreenOptions}
          />
          {addPostingsRoutes(Stack, navigation)}
        </Stack.Navigator>
    );
}

export default ModeratorStack;
