import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconColor, placeholderColor, inputBorder} from '../utils/color';

const SocialMediaButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 5,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        elevation: props.elevation,
        backgroundColor: props.backgroundColor,
      }}
      {...props}>
      <MaterialCommunityIcons {...props} />
    </TouchableOpacity>
  );
};

export default SocialMediaButton;
