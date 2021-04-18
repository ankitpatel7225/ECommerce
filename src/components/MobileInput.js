import React from 'react';
import {View, TextInput, Text, Dimensions} from 'react-native';
import {IconColor, placeholderColor, inputBorder, black} from '../utils/color';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const MobileInput = (props) => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        borderColor: black,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        alignContent: 'center',
      }}>
      <Text
        style={{
          color: placeholderColor,
          alignSelf: 'center',
          fontSize: screenWidth / 20,
        }}>
        + 91
      </Text>
      <Text
        style={{
          color: placeholderColor,
          alignSelf: 'center',
          marginHorizontal: 5,
          fontSize: screenWidth / 16,
        }}>
        |
      </Text>
      <TextInput
        underlineColorAndroid="#00000000"
        placeholderTextColor={placeholderColor}
        style={[{...props.style}, {flex: 1, fontSize: screenWidth / 22}]}
        blurOnSubmit={false}
        {...props}
      />
    </View>
  );
};

export default MobileInput;
