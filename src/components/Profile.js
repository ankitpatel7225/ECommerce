import React from 'react';
import {View, Text, Dimensions, TextInput} from 'react-native';
import {color} from 'react-native-reanimated';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  IconColor,
  placeholderColor,
  inputBorder,
  black,
  buttonColor,
} from '../utils/color';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ProfileInput = (props) => {
  return (
    <View
      style={{
        marginHorizontal: 15,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,

        flexDirection: 'row',
      }}>
      <MaterialCommunityIcons
        name={props.name}
        color={buttonColor}
        style={{alignSelf: 'center', marginRight: 5}}
        size={screenWidth / 16}
      />
      <View
        style={{
          borderBottomColor: placeholderColor,
          borderBottomWidth: 0.5,
          flex: 1,
        }}>
        <TextInput
          style={[{...props.style}, {flex: 1, fontSize: screenWidth / 28}]}
          {...props}></TextInput>
      </View>
    </View>
  );
};

export default ProfileInput;
