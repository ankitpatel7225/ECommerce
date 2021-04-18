import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
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
  image: {
    width: screenWidth - 20,
    height: screenHeight / 2,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: 'contain',
  },
  productName: {
    marginHorizontal: 30,
    fontWeight: 'bold',
    fontSize: screenWidth * 0.05,
    textAlign: 'justify',
  },

  priceText: {
    marginTop: 10,
    marginHorizontal: 30,
    fontWeight: '600',
    fontSize: screenWidth * 0.05,
    textAlign: 'justify',
  },
  productDetails: {
    marginVertical: 20,
    marginHorizontal: 30,
    fontWeight: '400',
    fontSize: screenWidth * 0.04,
    textAlign: 'justify',
    color: placeholderColor,
  },
  StackText: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    marginHorizontal: 30,
  },
  quanitityContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginBottom: 20,
    justifyContent: 'space-evenly',
  },
  qutBtn: {
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  qtyFont: {
    fontSize: screenWidth * 0.07,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  AddtocartBtn: {
    borderTopColor: placeholderColor,
    borderTopWidth: 0.5,
    width: screenWidth / 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: white,
  },
  buyNowBtn: {
    width: screenWidth / 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: buttonColor,
  },
  addText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: placeholderColor,
    textAlign: 'center',
  },
  buyText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: buttonTextColor,
    textAlign: 'center',
  },
});
