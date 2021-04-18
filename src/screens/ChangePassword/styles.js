import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const screen = Dimensions.get('window');
import {
  MainLogoColor,
  buttonColor,
  buttonTextColor,
  white,
  placeholderColor,
  IconColor,
} from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  topView: {
    marginVertical: 50,
  },
  MainTextMessage: {
    marginTop: 40,
    marginHorizontal: 20,
    fontSize: screenWidth * 0.07,
    fontWeight: 'bold',
  },
  semiTextMessage: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: screenWidth * 0.04,
    color: placeholderColor,
  },
  signInBtn: {
    width: screenWidth - 40,
    alignSelf: 'flex-end',
    backgroundColor: buttonColor,
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  signInText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: buttonTextColor,
    textAlign: 'center',
  },
});
