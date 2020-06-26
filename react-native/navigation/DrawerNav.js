import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NavTabs from './NavTabs';
import AboutStack from './AboutStack';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

// Any screen you want the Drawer to be aware of you need to add as a Screen
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
    </Drawer.Navigator>
  );
}

export default DrawerNav;
