import React, { useContext } from 'react';
import { Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '../screens/FeedScreen';

import { AuthContext } from '../providers/AuthProvider';
import { addPostingsRoutes } from './addPostingsRoutes';

const Stack = createStackNavigator();

const HomeStack = props => {
    const { logout } = useContext(AuthContext);

    const FeedScreenOptions = {
        headerRight: () => {
            return(
                <TouchableOpacity
                  style={styles.headerRight}
                  >
                <Button
                  title="Logout"
                  onPress={() => {
                      logout();
                  }}/>
                </TouchableOpacity>
            );
        },
    };

    const ProductScreenOptions = {
    };

    return(
        <Stack.Navigator
          initialRouteName='Feed'
        >
          <Stack.Screen
            name='Feed'
            component={FeedScreen}
            options={FeedScreenOptions}
          />
          {addPostingsRoutes(Stack)}
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerRight: {
        paddingRight: 10,
    }
});

export default HomeStack;
