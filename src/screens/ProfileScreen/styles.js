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
  scrollView: {
    flexGrow: 1,
  },

  avtarImage: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 50,
    backgroundColor: '#00000000',
    borderWidth: 0.2,
  },
  bottomText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
  },
  signInBtn: {
    width: screenWidth / 2,
    alignSelf: 'flex-end',
    paddingVertical: 10,
    borderRadius: 5,
  },
  signInText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: buttonColor,
    textAlign: 'center',
  },
  updateBtn: {
    width: screenWidth - 80,
    backgroundColor: buttonColor,
    alignSelf: 'center',
    paddingVertical: 10,
    elevation: 4,
    borderRadius: 5,
    marginTop: 50,
  },
  updateText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: buttonTextColor,
    textAlign: 'center',
  },
  btnSection: {
    width: screenWidth - 50,
    height: 50,
    backgroundColor: buttonColor,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  bottomText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
  },
  bottomTextsemi: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
