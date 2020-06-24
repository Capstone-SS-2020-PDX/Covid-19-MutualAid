import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NavTabs from './NavTabs';
import AboutStack from './AboutStack';

const Drawer = createDrawerNavigator();

const DrawerNav = props => {
    return(
        <Drawer.Navigator>
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
