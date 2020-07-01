import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PostingCreationScreen from '../screens/PostingCreationScreen';
import ImageUpload from '../components/ImageUpload';

import Colors from '../config/colors';
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
                    color={Colors.light_shade4}
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
          <Stack.Screen
            name='ImageUploader'
            component={ImageUpload}
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
