import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PostingCreationScreen from '../screens/PostingCreationScreen';

import headerOptions from '../config/headerOptions';


const Stack = createStackNavigator();

const PostingCreationStack = props => {

    const PostingCreationScreenOptions = {
        title: 'Create a Posting',
        ...headerOptions,
    }

    return(
        <Stack.Navigator
          initialRouteName='PostingCreation'
        >
          <Stack.Screen
            name='PostingCreation'
            component={PostingCreationScreen}
            options={PostingCreationScreenOptions}
          />
        </Stack.Navigator>
    );
};

export default PostingCreationStack;
