import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import AboutScreen from '../screens/AboutScreen';
import { headerOptions } from '../config/navigation-options';
import Colors from '../config/colors';

const Stack = createStackNavigator();

const AboutStack = props => {
    const { navigation } = props;

    const AboutScreenOptions = {
        title: 'About Common Goods',
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
    drawerIcon: {
        paddingLeft: 15,
    },
});

export default AboutStack;
