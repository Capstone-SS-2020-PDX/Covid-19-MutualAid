import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NavTabs from './NavTabs';
import AboutStack from './AboutStack';
import DrawerContent from '../components/DrawerContent';
import UserPostingListScreen from '../screens/UserPostingListScreen';

const Drawer = createDrawerNavigator();

// Add screens to Drawer
const DrawerNav = props => {
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
        component={UserPostingListScreen}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
