import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NavTabs from './NavTabs';
import AboutStack from './AboutStack';
import UserPostingStack from './UserPostingStack';
import SavedPostingStack from './SavedPostingStack';
import CommunityStack from './CommunityStack';
import DrawerContent from '../components/DrawerContent';

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
        component={UserPostingStack}
      />
      <Drawer.Screen
        name='Saved Postings'
        component={SavedPostingStack}
      />
      <Drawer.Screen
        name='Communities'
        component={CommunityStack}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
