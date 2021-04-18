import React, {useRef} from 'react';
import {View, TextInput, Text, Dimensions} from 'react-native';
import {IconColor, placeholderColor, inputBorder, white} from '../utils/color';

const screeenWidth = Dimensions.get('window').width;

const OtpInput = (props) => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignContent: 'center',
        shadowColor: 'white',
        elevation: 1,
      }}>
      <TextInput
        underlineColorAndroid={placeholderColor}
        placeholderTextColor={placeholderColor}
        blurOnSubmit={false}
        {...props}
      />
    </View>
  );
};

export default OtpInput;
