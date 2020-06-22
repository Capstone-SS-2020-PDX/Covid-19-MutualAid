import React, { useContext } from 'react';
import { Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';
import { AuthContext } from '../providers/AuthProvider';
import { addPostingsRoutes } from './addPostingsRoutes';


const Stack = createStackNavigator();

const SearchStack = props => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Search'
        component={SearchScreen}
      />
      {addPostingsRoutes(Stack)}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
});

export default SearchStack;
