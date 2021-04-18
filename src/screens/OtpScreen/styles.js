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
  black,
} from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  mainLogo: {
    fontWeight: 'bold',
    color: buttonColor,
    fontSize: screenWidth / 14,
    marginLeft: 10,
    alignSelf: 'center',
  },
  welcomeText: {
    color: placeholderColor,
    fontSize: screenWidth / 22,
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 50,
    alignSelf: 'center',
    textAlign: 'center',
  },
  signInBtn: {
    width: screenWidth - 30,
    backgroundColor: buttonColor,
    alignSelf: 'center',
    paddingVertical: 10,
    elevation: 4,
    borderRadius: 5,
    marginTop: 50,
  },
  signInText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: buttonTextColor,
    textAlign: 'center',
  },
  mobileIcon: {
    marginTop: 50,
    alignSelf: 'center',
    color: buttonColor,
  },
  OTPContainer: {
    marginHorizontal: 20,
  },
  backView: {
    position: 'absolute',
    top: 20,
    left: 10,
    flexDirection: 'row',
  },
  BackIcon: {
    alignSelf: 'center',
    color: black,
  },
  backText: {
    fontWeight: 'bold',
    fontSize: screenWidth * 0.04,
    marginHorizontal: 5,
  },
});
