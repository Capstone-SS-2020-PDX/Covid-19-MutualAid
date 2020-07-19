import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserPostingListScreen from '../screens/UserPostingListScreen';

import { AuthContext } from '../providers/AuthProvider';
import { addPostingsRoutes } from './addPostingsRoutes';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

const Stack = createStackNavigator();

const UserPostingStack = props => {
    const { navigation } = props;
    const { user } = useContext(AuthContext);

    const UserPostingListScreenOptions = {
        headerTitle: 'My Postings',
        ...headerOptions,
        headerLeft: drawerMenuIcon.bind(this, navigation),
    };

    return(
        <Stack.Navigator
          initialRouteName='User Postings'
        >
          <Stack.Screen
            name='User Postings'
            component={UserPostingListScreen}
            options={UserPostingListScreenOptions}
          />
          {addPostingsRoutes(Stack, navigation)}
        </Stack.Navigator>
    );
};

export default UserPostingStack;
