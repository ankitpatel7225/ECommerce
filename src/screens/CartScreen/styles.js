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
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  productImage: {
    width: screenWidth / 3,
    height: screenHeight / 6,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  rowContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },

  productNameText: {
    fontSize: screenWidth * 0.04,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: screenWidth * 0.04,
    marginHorizontal: 10,
    alignSelf: 'flex-start',
  },
  emptyImage: {
    alignSelf: 'center',
    width: screenWidth / 2,
    height: screenHeight / 3,
    resizeMode: 'contain',
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
  footerContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  priceDetailText: {
    fontSize: screenWidth * 0.04,
    color: placeholderColor,
    borderBottomColor: placeholderColor,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
  },
  footerRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  footerPriceText: {
    fontSize: screenWidth * 0.04,
    color: placeholderColor,
  },
  footerTotalRowView: {
    borderBottomColor: placeholderColor,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  footerTotalText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: black,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  contineBtn: {
    width: screenWidth / 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: white,
  },
  checkOutBtn: {
    width: screenWidth / 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: buttonColor,
  },
  continueText: {
    fontSize: screenWidth * 0.03,
    color: placeholderColor,
    textAlign: 'center',
  },
  checkOutText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: buttonTextColor,
    textAlign: 'center',
  },
  skeletonContainer: {
    width: screenWidth,
    height: screenHeight,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  skeltonImage: {
    width: screenWidth / 3,
    height: screenHeight / 6,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  SkeletonMainText: {
    width: screenWidth / 2,
    height: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  SkeletonSemiText: {
    width: screenWidth / 3,
    height: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  SkeletonRowView: {
    flexDirection: 'row',
  },
});
