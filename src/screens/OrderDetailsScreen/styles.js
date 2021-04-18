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
    height: screenHeight / 4,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'stretch',
  },

  orderDetailText: {
    marginHorizontal: 20,
    color: placeholderColor,
    fontSize: screenWidth * 0.04,
    marginTop: 20,
    fontWeight: 'bold',
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
  bestSellerView: {
    borderWidth: 1,
    borderColor: placeholderColor,
    marginHorizontal: 20,
    marginVertical: 10,
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

  rowContainerForsemiText: {
    marginVertical: 10,
  },
  semiText: {
    fontSize: screenWidth * 0.04,
    flex: 1,
    color: placeholderColor,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  rowView: {
    flexDirection: 'row',
  },
  statusOrangeText: {
    flex: 1,
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: 'rgba(255, 99, 71,1)',
  },
  statusYellowText: {
    flex: 1,
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: 'rgba(255,165,0,1.0)',
  },
  statusGreenText: {
    flex: 1,
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: 'rgba(0,128,0,1)',
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
    height: 20,
    marginHorizontal: 10,

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
  skeletonOrderDetail: {
    width: screenWidth - 20,
    height: screenHeight / 5,
    marginVertical: 5,
    borderRadius: 10,
  },
});
