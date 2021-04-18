import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import Snackbar from 'react-native-snackbar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProductScreen = (props) => {
  const {product} = props.route.params;
  const [UserData, setUserData] = useState(null);
  const [qty, setqty] = useState(1);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('LoginData');
      jsonValue != null ? setUserData(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const addToCart = () => {
    if (UserData != null) {
      const formdata = new FormData();
      formdata.append('user_id', UserData);
      formdata.append('product_id', product.product_id);
      formdata.append('product_name', product.product_name);
      formdata.append('product_details', product.product_details);
      formdata.append('product_image', product.product_image);
      formdata.append('product_price', product.product_price);
      formdata.append('product_unit_price', product.product_price);
      formdata.append('product_qty', qty);

      doPost(constant.ADDTOCART_URL, formdata).then((res) => {
        if (res.flag == 1) {
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
    } else {
      Snackbar.show({
        text: 'You need to login first!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  const BuyNow = () => {
    if (UserData != null) {
      const formdata = new FormData();
      formdata.append('user_id', UserData);
      formdata.append('product_id', product.product_id);
      formdata.append('product_name', product.product_name);
      formdata.append('product_details', product.product_details);
      formdata.append('product_image', product.product_image);
      formdata.append('product_price', product.product_price);
      formdata.append('product_unit_price', product.product_price);
      formdata.append('product_qty', qty);

      doPost(constant.ADDTOCART_URL, formdata).then((res) => {
        if (res.flag == 1) {
          Snackbar.show({
            text: res.message,
            duration: Snackbar.LENGTH_SHORT,
          });
          props.navigation.navigate('CartScreen');
        } else if (res.flag == 0) {
          Snackbar.show({
            text: res.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      });
    } else {
      Snackbar.show({
        text: 'You need to login first!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  const Instock = () => {
    if (product.product_quantity == 0) {
      return (
        <Text style={[styles.StackText, {color: '#b71c1c'}]}>Out Of Stock</Text>
      );
    } else {
      return (
        <View>
          <Text style={[styles.StackText, {color: '#4caf50'}]}>
            Stock Available
          </Text>
          <View style={styles.quanitityContainer}>
            <TouchableOpacity
              style={styles.qutBtn}
              onPress={() => {
                qty > 1
                  ? setqty(qty - 1)
                  : Snackbar.show({
                      text: `Product Quantity can't less then 1`,
                      duration: Snackbar.LENGTH_SHORT,
                    });
              }}>
              <Text style={styles.qtyFont}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyFont}>{qty}</Text>
            <TouchableOpacity
              style={styles.qutBtn}
              onPress={() => setqty(qty + 1)}>
              <Text style={styles.qtyFont}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.image}
          source={{uri: product.product_image}}></Image>
        <Text style={styles.productName}>{product.product_name}</Text>
        <Text style={styles.priceText}>
          ₹{product.product_price.substring(0, 15)}
        </Text>
        <Text style={styles.productDetails}>{product.product_details}</Text>
        <Instock />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.AddtocartBtn}
          onPress={() => addToCart()}>
          <Text style={styles.addText}>Add To Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowBtn} onPress={() => BuyNow()}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;
