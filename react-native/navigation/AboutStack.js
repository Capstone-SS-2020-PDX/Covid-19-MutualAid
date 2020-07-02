import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import AboutScreen from '../screens/AboutScreen';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';
import Colors from '../config/colors';

const Stack = createStackNavigator();

const AboutStack = props => {
    const { navigation } = props;

    const AboutScreenOptions = {
        title: 'About Common Goods',
        ...headerOptions,
      headerLeft: drawerMenuIcon.bind(this, navigation),
    };

    return(
        <Stack.Navigator
          initialRouteName='About'
        >
          <Stack.Screen
            name='About'
            component={AboutScreen}
            options={AboutScreenOptions}
          />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default AboutStack;
