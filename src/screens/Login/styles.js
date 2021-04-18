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
  skipText: {
    fontSize: screenWidth * 0.04,
    marginRight: 10,
  },
  mainLogo: {
    fontWeight: 'bold',
    color: MainLogoColor,
    fontSize: screenWidth / 10,
    marginLeft: 10,
  },
  welcomeText: {
    color: MainLogoColor,
    fontSize: screenWidth * 0.04,
    marginLeft: 10,
    marginBottom: 50,
  },
  signInBtn: {
    width: screenWidth - 30,
    backgroundColor: buttonColor,
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 50,
  },
  signInText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: buttonTextColor,
    textAlign: 'center',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginRight: 15,
  },
  forgotText: {
    fontSize: screenWidth * 0.04,
  },
  keyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  registerView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  regiMessage: {
    fontSize: screenWidth * 0.04,
  },
  registerText: {
    color: buttonColor,
    fontSize: screenWidth * 0.04,
  },
  orText: {
    fontSize: screenWidth * 0.03,
    marginTop: screenHeight * 0.02,
    color: placeholderColor,
    textAlign: 'center',
  },
  socialMedioView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
