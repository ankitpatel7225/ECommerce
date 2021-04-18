import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import profileScreen from '../../screens/ProfileScreen';
import {black} from '../../utils/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChangePasswordScreen from '../../screens/ChangePassword';
const Stack = createStackNavigator();

const ProfileStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={profileScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'Profile',
          headerLeft: () => (
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              color={black}
              size={30}
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: 'Change Password',
        }}
      />
    </Stack.Navigator>
  );
};
export default ProfileStack;
