import React from 'react';
import { Button, TouchableOpacity, StyleSheet } from 'react-native';

import PostingDetailScreen from '../screens/PostingDetailScreen';
import EditPostingScreen from '../screens/EditPostingScreen';

import Colors from '../config/colors';
import headerOptions  from '../config/headerOptions';

// Combine multiple screen routes that can be shown on different...
// Navigation stacks.
export const addPostingsRoutes = Stack => {

    const handleDone = route => {
        return(
            <TouchableOpacity style={styles.headerRight}>
              <Button
                title='Done'
                onPress={() => {
                    console.log(`Finish Editing ${route.params.name}`);
                    if (route.params.submit) {
                        route.params.submit.current();
                    }
                }}
              />
            </TouchableOpacity>
        );
    }

    return(
        <>
          <Stack.Screen
            name='PostingDetail'
            component={PostingDetailScreen}
            options={
                ({route, navigation}) => ({
                    headerTitle: route.params.name,
                    ...headerOptions,
                })
            }
          />
          <Stack.Screen
            name='EditPosting'
            component={EditPostingScreen}
            options={
                ({route, navigation}) => ({
                    headerTitle: `Edit your ${route.params.name}`,
                    ...headerOptions,
                    headerRight: () => handleDone(route)
                })
            }
          />
        </>
    );
}

const styles = StyleSheet.create({
    headerRight: {
        paddingRight: 10,
    }
});
