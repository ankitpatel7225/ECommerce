import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginSignupStack from './stacknavigation/LoginSignupStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyDrawer from './DrawerStack/DrawerStack';
import SplashScreen from '../screens/SplashScreen';
import {navigationRef} from '../services/NavigationService';

const Route = () => {
  const [IsUser, setIsUser] = useState(false);
  const [IsSplashScreen, setIsSplashScreen] = useState(true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('LoginData');
      if (jsonValue != null) {
        setIsUser(true);
        setIsSplashScreen(false);
      } else {
        setIsUser(false);
        setIsSplashScreen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {IsSplashScreen ? (
        <SplashScreen />
      ) : IsUser ? (
        <MyDrawer />
      ) : (
        <LoginSignupStack />
      )}
    </NavigationContainer>
  );
};
export default Route;
