import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SavedPostingListScreen from '../screens/SavedPostingListScreen';

import { AuthContext } from '../providers/AuthProvider';
import { addPostingsRoutes } from './addPostingsRoutes';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

const Stack = createStackNavigator();

const SavedPostingStack = props => {
    const { navigation, route } = props;
    const { user } = useContext(AuthContext);

    const SavedPostingListScreenOptions = {
        headerTitle: 'Saved Postings',
        ...headerOptions,
        headerLeft: drawerMenuIcon.bind(this, navigation),
    };

    return(
        <Stack.Navigator
          initialRouteName='Saved Postings'
        >
          <Stack.Screen
            name='Saved Postings'
            component={SavedPostingListScreen}
            options={SavedPostingListScreenOptions}
          />
          {addPostingsRoutes(Stack, navigation)}
        </Stack.Navigator>
    );
};

export default SavedPostingStack;
