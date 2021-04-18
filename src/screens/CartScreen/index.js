import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {placeholderColor} from '../../utils/color';
import {styles} from './styles';
import {doPost} from '../../config/request';
import Snackbar from 'react-native-snackbar';
import constant from '../../config/constant';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CartScreen = (props) => {
  const [cartData, setCartData] = useState(null);
  const [isCartItem, setisCartItem] = useState(null);
  const [UserData, setUserData] = useState(null);
  const [isloading, setisloading] = useState(true);
  const [IsLoged, setIsLoged] = useState(null);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('LoginData');
      if (jsonValue != null) {
        setUserData(JSON.parse(jsonValue));
        getCart(JSON.parse(jsonValue));
        setIsLoged(true);
      } else {
        setIsLoged(false);
        console.log('Login');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const getCart = (jsonValue) => {
    const formdata = new FormData();
    formdata.append('user_id', jsonValue);

    doPost(constant.VIEWCART_URL, formdata).then((res) => {
      if (res.flag == 1) {
        let cart = res.cart;
        if (cart != null) {
          setCartData(res);
          setisCartItem(true);
          setisloading(false);
        } else {
          setisCartItem(false);
          setisloading(false);
        }
      } else if (res.flag == 0) {
        console.log('fail');
        setisCartItem(false);
      }
    });
  };
  const RemoveCartItem = (cartId) => {
    const formdata = new FormData();
    formdata.append('cart_id', cartId);

    doPost(constant.REMOVECARTITEM_URL, formdata).then((res) => {
      if (res.flag == 1) {
        getCart(UserData);
        Snackbar.show({
          text: res.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else if (res.flag == 0) {
        Snackbar.show({
          text: res.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    });
  };
  const productRender = ({item}) => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity>
          <Image
            style={styles.productImage}
            source={{uri: item.product_image}}></Image>
        </TouchableOpacity>
        <View style={{flex: 1, marginRight: 18}}>
          <Text style={styles.productNameText}>{item.product_name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.priceText}>
              ₹{item.product_price.substring(0, 15)}
            </Text>
          </View>
          <Text style={styles.productNameText}>QTY : {item.product_qty}</Text>
        </View>
        <MaterialCommunityIcons
          name={'delete-outline'}
          color={placeholderColor}
          size={35}
          onPress={() => RemoveCartItem(item.cart_id)}
          style={{position: 'absolute', right: 0}}
        />
      </View>
    );
  };

  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.priceDetailText}>PRICE DETAILS</Text>
        <View style={styles.footerRowView}>
          <Text style={styles.footerPriceText}>Price</Text>
          <Text style={styles.footerPriceText}>₹{cartData.grand_total}</Text>
        </View>
        <View style={styles.footerRowView}>
          <Text style={styles.footerPriceText}>Delivery Charges</Text>
          <Text style={styles.footerPriceText}>₹50</Text>
        </View>
        <View style={styles.footerTotalRowView}>
          <Text style={styles.footerTotalText}>Total</Text>
          <Text style={styles.footerTotalText}>
            ₹{cartData.grand_total + 50}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {IsLoged ? (
        isloading ? (
          <SkeletonPlaceholder>
            <View style={styles.skeletonContainer}>
              <View style={styles.SkeletonRowView}>
                <View style={styles.skeltonImage}></View>
                <View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
              </View>
              <View style={styles.SkeletonRowView}>
                <View style={styles.skeltonImage}></View>
                <View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
              </View>
              <View style={styles.SkeletonRowView}>
                <View style={styles.skeltonImage}></View>
                <View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
              </View>
              <View style={styles.SkeletonRowView}>
                <View style={styles.skeltonImage}></View>
                <View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
              </View>
              <View style={styles.SkeletonRowView}>
                <View style={styles.skeltonImage}></View>
                <View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
              </View>
              <View style={styles.SkeletonRowView}>
                <View style={styles.skeltonImage}></View>
                <View>
                  <View style={styles.SkeletonMainText}></View>
                  <View style={styles.SkeletonSemiText}></View>
                </View>
              </View>
            </View>
          </SkeletonPlaceholder>
        ) : isCartItem ? (
          <>
            <FlatList
              style={{marginTop: 10}}
              data={cartData.cart}
              renderItem={productRender}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={Footer}
              keyExtractor={(item) => item.product_id}
            />
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.contineBtn}
                onPress={() => props.navigation.replace('Home')}>
                <Text style={styles.continueText}>{'<'} Continue Shopping</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkOutBtn}
                onPress={() =>
                  props.navigation.navigate('CheckOutScreen', {
                    AllCartdata: cartData,
                  })
                }>
                <Text style={styles.checkOutText}>CHECK OUT</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View>
            <Image
              style={styles.emptyImage}
              source={require('../../assets/emtycart.jpg')}></Image>
            <Text style={styles.emptyText}>Your Cart Is Empty!</Text>
            <Text style={styles.addemptyText}>Add Items To It Now</Text>
            <TouchableOpacity
              style={styles.shopNowBtn}
              onPress={() => props.navigation.replace('Home')}>
              <Text style={styles.shopText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <View>
          <Image
            style={styles.emptyImage}
            source={require('../../assets/userLogin.jpg')}></Image>
          <Text style={styles.emptyText}>
            Oops! Seem Like You Are Not Logged In
          </Text>
          <Text style={styles.addemptyText}>
            For See What You Buy Please Sign In First.
          </Text>
          <TouchableOpacity
            style={styles.shopNowBtn}
            onPress={() => props.navigation.replace('LoginStatck')}>
            <Text style={styles.shopText}>Sign In Now </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
