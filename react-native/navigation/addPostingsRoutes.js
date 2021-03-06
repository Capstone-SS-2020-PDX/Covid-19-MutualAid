import React from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButton } from '@react-navigation/stack';

import PostingDetailScreen from '../screens/PostingDetailScreen';
import EditPostingScreen from '../screens/EditPostingScreen';

import Colors from '../config/colors';
import { headerOptions }  from '../config/navigation-options';
import CustomHeaderTitle from '../components/CustomHeaderTitle';

// Combine multiple screen routes that can be shown on different...
// Navigation stacks.
export const addPostingsRoutes = (Stack, navigation) => {
    const handleDone = route => {
        return(
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() => {
                  console.log(`Finish Editing ${route.params.id}`);
                  if (route.params.submitEditPosting) {
                      route.params.submitEditPosting.current();
                  }
              }}
            >
            <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        );
    }

    const handleEdit = route => {
        return(
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() => {
                  console.log(`Editing ${route.params.id}`);
                  navigation.navigate('EditPosting', {
                      ...route.params
                  });
              }}
            >
              <Text style={styles.headerRightEditText}>Edit</Text>
            </TouchableOpacity>
        );
    };

    return(
        <>
          <Stack.Screen
            name='PostingDetail'
            component={PostingDetailScreen}
            options={
                ({route, navigation}) => ({
                  headerTitle: props => <CustomHeaderTitle request={route.params.request}/>,
                  ...headerOptions,
                  headerBackTitle: 'Back',
                  /* headerRight: () => handleEdit(route), */
                })
            }
          />
          <Stack.Screen
            name='EditPosting'
            component={EditPostingScreen}
            options={
              ({route, navigation}) => ({
                /* headerTitle: `Editing ${route.params.title}`, */
                headerTitle: 'Edit Posting',
                ...headerOptions,
                headerRight: () => handleDone(route),
              })
            }
          />
        </>
    );
}

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 15,
  },
  saveButtonText: {
    color: Colors.contrast1,
    fontSize: 20,
  },
  headerRightEditText: {
    color: Colors.contrast1,
    fontSize: 20,
  },
});
