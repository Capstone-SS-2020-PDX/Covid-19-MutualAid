import React from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';

import PostingDetailScreen from '../screens/PostingDetailScreen';
import EditPostingScreen from '../screens/EditPostingScreen';

import Colors from '../config/colors';
import { headerOptions }  from '../config/navigation-options';
import IconDisplay from '../components/IconDisplay';

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
                  // headerTitle: route.params.request
                    /* ? `Request: ${route.params.title}` */
                    /* : `Offer: ${route.params.title}`, */
                    /* ? 'Request Detail' */
                    /* : 'Offer Detail', */
                  headerTitle: () =>
                  <View style={styles.headerContainer}>
                    <Text style={styles.titleText}>
                      {route.params.request ? 'Request Detail' : 'Offer Detail'}
                    </Text>
                    <IconDisplay style={styles.icon} request={route.params.request}/>
                  </View>,
                  ...headerOptions,
                  /* headerRight: () => handleEdit(route), */
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
  },
  titleText: {
    color: Colors.light_shade4,
    fontSize: 20,
    fontWeight: 'bold',
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
