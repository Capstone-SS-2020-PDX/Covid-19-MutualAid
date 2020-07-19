import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NavTabs from './NavTabs';
import AboutStack from './AboutStack';
import UserPostingStack from './UserPostingStack';
import DrawerContent from '../components/DrawerContent';

import { AuthContext } from '../providers/AuthProvider';

const Drawer = createDrawerNavigator();

// Add screens to Drawer
const DrawerNav = props => {
  const { isLoading } = useContext(AuthContext);
  if (isLoading) {
    return(
      <ActivityIndicator size='large'/>
    );
  } else {

    return(
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props}/>}
      >
        <Drawer.Screen
          name='Main'
          component={NavTabs}
        />
        <Drawer.Screen
          name='About'
          component={AboutStack}
        />
        <Drawer.Screen
          name='User Postings'
          component={UserPostingStack}
        />
      </Drawer.Navigator>
    );
  }
}

export default DrawerNav;
