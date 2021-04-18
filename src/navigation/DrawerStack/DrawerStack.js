import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerScreen from '../../screens/DrawerScreen';
import HomeStack from '../stacknavigation/homeStack';

import ProfileStack from '../stacknavigation/profileStack';
import OrderStack from '../stacknavigation/ViewOrder';
import LoginSignupStack from '../stacknavigation/LoginSignupStack';
import AboutStack from '../stacknavigation/AboutUs';

const Drawer = createDrawerNavigator();

const MyDrawer = ({navigation}) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerScreen {...props} />}
      initialRouteName={'Home'}>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="LoginStack" component={LoginSignupStack} />
      <Drawer.Screen name="About Us" component={AboutStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="ViewOrder" component={OrderStack} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
