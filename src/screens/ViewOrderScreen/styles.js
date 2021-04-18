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
  CardContainer: {
    flex: 1,
    marginHorizontal: 20,

    marginVertical: 20,
    borderRadius: 10,
    padding: 10,
  },
  rowView: {
    flexDirection: 'row',
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
  mainTopText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: placeholderColor,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  rowContainerForsemiText: {
    marginVertical: 10,
  },
  semiText: {
    fontSize: screenWidth * 0.04,
    flex: 1,
    color: placeholderColor,
    marginHorizontal: 10,
  },
  dotsIcon: {
    position: 'absolute',
    right: 10,
  },
  buttonView: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  statusOrangeBtn: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 99, 71,0.2)',
  },
  statusYellowBtn: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,165,0,0.2)',
  },
  statusOrangeText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: 'rgba(255, 99, 71,1)',
    textAlign: 'center',
  },
  statusYellowText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: 'rgba(255,165,0,1.0)',
    textAlign: 'center',
  },
  statusGreenBtn: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,128,0,0.2)',
  },
  statusGreenText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: 'rgba(0,128,0,1)',
    textAlign: 'center',
  },
  arrowContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    elevation: 4,
  },
  bottomSheetButtonRow: {
    position: 'absolute',
    bottom: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    width: screenWidth - 80,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    width: screenWidth / 3,
    backgroundColor: buttonColor,
    paddingVertical: 10,

    borderRadius: 5,
    marginTop: 50,
  },
  cancelText: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: buttonTextColor,
    textAlign: 'center',
  },
  cancleMessage: {
    alignSelf: 'center',
    fontSize: screenWidth * 0.04,
    color: placeholderColor,
    fontWeight: 'bold',
  },
  canclereason: {
    marginVertical: 20,
  },
  ordercancleBtn: {
    width: screenWidth / 3,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 50,
    backgroundColor: 'rgba(255, 99, 71,0.2)',
  },
});
