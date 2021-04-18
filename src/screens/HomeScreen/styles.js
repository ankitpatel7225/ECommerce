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
  image: {
    width: screenWidth - 20,
    height: screenHeight / 4,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'stretch',
  },
  categoryView: {
    width: screenWidth - 20,
    height: screenHeight / 4 + 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  categoryImage: {
    width: screenWidth / 2.3,
    height: screenHeight / 4,
    position: 'absolute',
    right: 10,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: screenWidth * 0.06,
    alignSelf: 'center',
    textAlign: 'center',

    marginHorizontal: 30,
    fontWeight: 'bold',
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#595959',
    margin: 8,
    borderRadius: 5,
  },
  productImage: {
    width: screenWidth / 2.7,
    height: screenHeight / 4,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'stretch',
  },
  bestSellerView: {
    flexDirection: 'row',
  },
  bestSellerText: {
    fontWeight: 'bold',
    fontSize: screenWidth / 20,
    margin: 10,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    color: placeholderColor,
    fontSize: screenWidth * 0.04,
    margin: 10,
    position: 'absolute',
    right: 10,
  },
  productNameText: {
    fontWeight: 'bold',
    fontSize: screenWidth * 0.03,
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
  skeImage: {
    width: screenWidth - 20,
    height: screenHeight / 4,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'stretch',
  },
  skeletonContainer: {
    width: screenWidth,
    height: screenHeight,
    marginVertical: 10,
  },
  skeletoncategoryView: {
    width: screenWidth - 20,
    height: screenHeight / 4 + 10,

    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
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
});
