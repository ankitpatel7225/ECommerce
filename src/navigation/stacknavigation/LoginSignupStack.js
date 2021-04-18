import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Login';
import SignUp from '../../screens/signUp';
import OtpScreen from '../../screens/OtpScreen';
import OtpVerifyScreen from '../../screens/OtpVerifyScreen';
import MyDrawer from '../DrawerStack/DrawerStack';
const Stack = createStackNavigator();

const LoginSignupStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />
      <Stack.Screen name="HomeScreen" component={MyDrawer} />
    </Stack.Navigator>
  );
};
export default LoginSignupStack;
