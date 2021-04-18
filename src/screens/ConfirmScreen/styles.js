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
  mainLogo: {
    width: screenWidth / 2,
    height: screenHeight / 4,
    alignSelf: 'center',
  },
  emptyText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: screenWidth * 0.05,
    color: placeholderColor,
    fontWeight: 'bold',
  },
  addemptyText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: screenWidth * 0.03,
    color: placeholderColor,
    fontWeight: 'bold',
  },
  shopNowBtn: {
    width: screenWidth / 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: buttonColor,
  },
  shopText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: buttonTextColor,
    textAlign: 'center',
  },
  messageText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 50,
    fontSize: screenWidth * 0.03,
    color: placeholderColor,
    marginVertical: 20,
  },
});
