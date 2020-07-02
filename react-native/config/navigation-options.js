import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from './colors';

export const headerOptions = {
    headerTintColor: Colors.light_shade1,
    headerStyle: {
        backgroundColor: Colors.primary,
    },
};

export const drawerMenuIcon = navigation => {
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
};

const styles = StyleSheet.create({
  drawerIcon: {
    paddingLeft: 15,
  },
});
