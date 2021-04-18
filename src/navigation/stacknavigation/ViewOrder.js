import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {black} from '../../utils/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewOrderScreen from '../../screens/ViewOrderScreen';
import OrderDetailsScreen from '../../screens/OrderDetailsScreen';
const Stack = createStackNavigator();

const OrderStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewOrderScreen"
        component={ViewOrderScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'My Orders',
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
        name="OrderDetailScreen"
        component={OrderDetailsScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'Order Details',
        }}
      />
    </Stack.Navigator>
  );
};
export default OrderStack;
