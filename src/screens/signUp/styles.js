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
    marginTop: screenHeight / 14,
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
  forgotContainer: {
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginRight: 10,
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
  loginView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  loginMessage: {
    fontSize: screenWidth * 0.04,
  },
  loginText: {
    fontSize: screenWidth * 0.04,
    color: buttonColor,
  },
  genderView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: screenHeight / 25,
    justifyContent: 'space-evenly',
  },
  genderTouch: {
    width: screenWidth / 3,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    backgroundColor: white,
    flexDirection: 'row',
    borderRadius: 5,
  },
  genderText: {
    color: placeholderColor,
    fontWeight: 'bold',
    marginHorizontal: 10,
    alignSelf: 'center',
    fontSize: screenWidth * 0.04,
    overflow: 'hidden',
  },
  seletedGenderTouch: {
    width: screenWidth / 3,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    backgroundColor: buttonColor,
    flexDirection: 'row',
    borderRadius: 5,
  },
  selectedGenderText: {
    color: white,
    fontWeight: 'bold',
    marginHorizontal: 10,
    alignSelf: 'center',
    fontSize: screenWidth * 0.04,
    overflow: 'hidden',
  },
  genderIcon: {
    alignSelf: 'center',
    color: IconColor,
  },
  seletedGenderIcon: {
    alignSelf: 'center',
    color: white,
  },
});
