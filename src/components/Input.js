import React from 'react';
import {View, TextInput, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconColor, placeholderColor, inputBorder, black} from '../utils/color';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Input = (props) => {
  return (
    <View
      style={{
        marginHorizontal: 15,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderColor: black,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
      }}>
      <MaterialCommunityIcons
        name={props.name}
        color={IconColor}
        style={{alignSelf: 'center', marginRight: 5}}
        size={screenWidth / 16}
      />
      <TextInput
        underlineColorAndroid="#00000000"
        placeholderTextColor={placeholderColor}
        blurOnSubmit={false}
        style={[{...props.style}, {flex: 1, fontSize: screenWidth / 28}]}
        {...props}
      />
    </View>
  );
};

export default Input;
