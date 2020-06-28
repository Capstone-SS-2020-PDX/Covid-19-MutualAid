import React from 'react';
import { Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

import PostingDetailScreen from '../screens/PostingDetailScreen';
import EditPostingScreen from '../screens/EditPostingScreen';

import Colors from '../config/colors';
import headerOptions  from '../config/headerOptions';

// Combine multiple screen routes that can be shown on different...
// Navigation stacks.
export const addPostingsRoutes = (Stack, navigation) => {

    const handleDone = route => {
        return(
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() => {
                  console.log(`Finish Editing ${route.params.id}`);
                  if (route.params.submit) {
                      route.params.submit.current();
                  }
              }}
            >
            <Text style={styles.doneButtonText}>Done</Text>
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
                  headerTitle: route.params.title,
                    ...headerOptions,
                    headerRight: () => handleEdit(route),
                })
            }
          />
          <Stack.Screen
            name='EditPosting'
            component={EditPostingScreen}
            options={
                ({route, navigation}) => ({
                    headerTitle: `Editing ${route.params.id}`,
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
    doneButtonText: {
        color: Colors.contrast1,
        fontSize: 20,
    },
    headerRightEditText: {
        color: Colors.contrast1,
        fontSize: 20,
    },
});
