import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../../screens/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {black} from '../../utils/color';
import SubCategoryScreen from '../../screens/SubCategoeyScreen';
import ProductScreen from '../../screens/ProductScreen';
import CartScreen from '../../screens/CartScreen';
import CheckOutScreen from '../../screens/CheckOutScreens';
import ConfirmScreen from '../../screens/ConfirmScreen';
import LoginSignupStack from './LoginSignupStack';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => (
            <MaterialCommunityIcons
              name={'menu'}
              color={black}
              size={30}
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <Icon
              name={'shopping-cart'}
              color={black}
              size={30}
              onPress={() => {
                navigation.navigate('CartScreen');
              }}
              style={{marginRight: 10}}
            />
          ),
        }}
      />
      <Stack.Screen
        name="subCategory"
        component={SubCategoryScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'GRID PRODUCT',
          headerRight: () => (
            <Icon
              name={'shopping-cart'}
              color={black}
              size={30}
              onPress={() => {
                navigation.navigate('CartScreen');
              }}
              style={{marginRight: 10}}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'PRODUCT',
          headerRight: () => (
            <Icon
              name={'shopping-cart'}
              color={black}
              size={30}
              onPress={() => {
                navigation.navigate('CartScreen');
              }}
              style={{marginRight: 10}}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'My Bag',
        }}
      />
      <Stack.Screen
        name="CheckOutScreen"
        component={CheckOutScreen}
        options={{
          title: 'Check Out',
        }}
      />
      <Stack.Screen
        name="ConfirmScreen"
        component={ConfirmScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginStatck"
        component={LoginSignupStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
