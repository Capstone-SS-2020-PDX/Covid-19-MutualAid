import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PostingCreationScreen from '../screens/PostingCreationScreen';

import headerOptions from '../config/headerOptions';


const Stack = createStackNavigator();

const PostingCreationStack = props => {
    const { navigation } = props;

    const PostingCreationScreenOptions = {
        title: 'Create a Posting',
        ...headerOptions,
        headerLeft: () => {
            return(
                <TouchableOpacity
                  style={styles.drawerIcon}
                  onPress={() => {
                      navigation.toggleDrawer();
                  }}
                >
                  <Ionicons
                    name='md-menu'
                    size={30}
                  />
                </TouchableOpacity>
            );
        },
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

const styles = StyleSheet.create({
  drawerIcon: {
    paddingLeft: 15,
  },
});

export default PostingCreationStack;
