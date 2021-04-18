import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {buttonColor, placeholderColor, white} from '../../utils/color';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFCFC',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  cardView: {
    width: screenWidth - 50,
    borderRadius: 10,
    borderColor: buttonColor,
    borderWidth: 1,
    alignSelf: 'center',
    elevation: 10,
    backgroundColor: white,
  },
  imageView: {
    elevation: 10,
    backgroundColor: white,
    alignSelf: 'center',
    marginBottom: 30,
    borderColor: placeholderColor,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  image: {
    width: screenWidth / 2,
    height: screenHeight / 9,
  },
  ViewContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
    borderBottomWidth: 0.3,
    borderBottomLeftRadius: 40,
    borderBottomEndRadius: 30,
    borderBottomColor: placeholderColor,
    paddingBottom: 10,
  },
  text: {
    fontSize: screenWidth / 28,
  },
  semiText: {
    flex: 1,
    color: buttonColor,
    flexWrap: 'wrap',
    fontSize: screenWidth / 26,
    fontWeight: 'bold',
  },
  iconColor: {
    marginRight: 10,
    color: buttonColor,
    alignSelf: 'center',
  },
  instaLogo: {
    width: screenWidth * 0.08,
    height: screenHeight * 0.05,
  },
  bottomView: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  bottomText: {
    color: placeholderColor,
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
  },
});
