import React from 'react';
import { Button, TouchableOpacity, StyleSheet } from 'react-native';

import PostingDetailScreen from '../screens/PostingDetailScreen';
import EditPostingScreen from '../screens/EditPostingScreen';

// Combine multiple screen routes that can be shown on different...
// Navigation stacks.
export const addPostingsRoutes = (Stack) => {
    return(
        <>
          <Stack.Screen
            name='PostingDetail'
            component={PostingDetailScreen}
            options={
                ({route, navigation}) => ({
                    headerTitle: route.params.name
                })
            }
          />
          <Stack.Screen
            name='EditPosting'
            component={EditPostingScreen}
            options={
                ({route, navigation}) => ({
                    headerTitle: `Edit your ${route.params.name}`,
                    headerRight: () => {
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
                    },
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
