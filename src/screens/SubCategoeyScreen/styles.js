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
  rightView: {
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 10,
    right: 10,
  },
  productImage: {
    width: screenWidth / 2 - 20,
    height: screenHeight / 4,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'stretch',
  },
  productListImage: {
    width: screenWidth / 3,
    height: screenHeight / 5,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'stretch',
  },
  productNameText: {
    fontWeight: 'bold',
    fontSize: screenWidth * 0.04,
    marginHorizontal: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: screenWidth * 0.03,
    marginHorizontal: 10,
    alignSelf: 'flex-start',
  },
  bestSellerView: {
    flexDirection: 'row',
  },
  itemText: {
    color: placeholderColor,
    fontSize: screenWidth * 0.04,
    marginTop: 10,
    marginLeft: 20,
    alignSelf: 'center',
  },
  filterText: {
    fontWeight: 'bold',
    color: placeholderColor,
    fontSize: screenWidth * 0.04,
    margin: 10,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  skeletonContainer: {
    width: screenWidth,
    height: screenHeight,
    marginVertical: 10,
  },
  skeltonImage: {
    width: screenWidth / 2 - 20,
    height: screenHeight / 4,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  SkeletonMainText: {
    width: screenWidth / 4,
    height: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  SkeletonSemiText: {
    width: screenWidth / 5,
    height: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuOption: {
    borderBottomColor: placeholderColor,
    borderBottomWidth: 0.5,
  },
  menuText: {
    fontWeight: 'bold',
    color: placeholderColor,
    fontSize: screenWidth * 0.04,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
