import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import {styles} from './styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const OrderDetailsScreen = (props) => {
  const {order} = props.route.params;
  const [OrderData, setOrderData] = useState(null);
  const [isLoaded, setisLoaded] = useState(true);
  const [UserData, setUserData] = useState(null);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('LoginData');
      if (jsonValue != null) {
        setUserData(JSON.parse(jsonValue));
        OrderList(JSON.parse(jsonValue));
      } else {
        console.log('Login');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const OrderList = (jsonValue) => {
    const formdata = new FormData();
    formdata.append('user_id', jsonValue);
    formdata.append('order_id', order.order_id);
    doPost(constant.VIEWORDER_URL, formdata)
      .then((res) => {
        if (res.flag == 1) {
          console.log(res.product);
          let cart = res.product;
          if (cart != null) {
            setOrderData(res.product);

            setisLoaded(false);
            console.log('sdsa');
          } else {
            setisLoaded(false);
          }
        } else if (res.flag == 0) {
          console.log('fail');
        }
      })
      .catch((e) => console.log(e));
  };

  const productListRender = ({item}) => {
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 10}}>
        <Image
          style={styles.productListImage}
          source={{uri: item.product_image}}></Image>
        <View style={{flex: 1}}>
          <Text style={styles.productNameText}>
            {item.product_name.substring(0, 30)}..
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.priceText}>
              ₹{item.product_unit_price.substring(0, 15)}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {isLoaded ? (
          <SkeletonPlaceholder>
            <View style={styles.skeletonContainer}>
              <View style={styles.SkeletonMainText}></View>
              <View style={styles.skeletonOrderDetail} />
              <View style={styles.SkeletonMainText}></View>
              <View style={styles.skeletonOrderDetail} />
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
        ) : (
          <>
            <View>
              <Text style={styles.orderDetailText}>Order Details</Text>
              <View style={styles.bestSellerView}>
                <View style={styles.rowContainerForsemiText}>
                  <View style={styles.rowView}>
                    <Text style={styles.semiText}>Total Amount</Text>
                    <Text style={styles.semiText}>
                      {OrderData[0].total_amount}
                    </Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text style={styles.semiText}>Payment</Text>
                    <Text style={styles.semiText}>
                      {OrderData[0].payment_method}
                    </Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text style={styles.semiText}>Order Date</Text>
                    <Text style={styles.semiText}>
                      {OrderData[0].order_date}
                    </Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text style={styles.semiText}>Status</Text>
                    <Text
                      style={[
                        OrderData[0].order_status == 'Cancelled'
                          ? styles.statusOrangeText
                          : OrderData[0].order_status == 'Completed'
                          ? styles.statusGreenText
                          : styles.statusYellowText,
                      ]}>
                      {OrderData[0].order_status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.orderDetailText}>Address Details</Text>
              <View style={styles.bestSellerView}>
                <View style={styles.rowContainerForsemiText}>
                  <View style={styles.rowView}>
                    <Text style={styles.semiText}>Shipping Name</Text>
                    <Text style={styles.semiText}>
                      {OrderData[0].shipping_name}
                    </Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text style={styles.semiText}>Shipping MobileNo</Text>
                    <Text style={styles.semiText}>
                      {OrderData[0].shipping_mobile}
                    </Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text style={styles.semiText}>Shipping Address</Text>
                    <Text style={styles.semiText}>
                      {OrderData[0].shipping_address}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <FlatList
              data={OrderData[0].order_details}
              renderItem={productListRender}
              numColumns={1}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) =>
                item.product_id.toString() +
                new Date().getTime().toString() +
                Math.floor(
                  Math.random() * Math.floor(new Date().getTime()),
                ).toString()
              }
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
