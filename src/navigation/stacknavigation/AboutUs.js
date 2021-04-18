import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AboutUsScreen from '../../screens/AboutUsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {black} from '../../utils/color';
const Stack = createStackNavigator();

const AboutStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName={'AboutUs'}>
      <Stack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'About Us',
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
    </Stack.Navigator>
  );
};
export default AboutStack;
