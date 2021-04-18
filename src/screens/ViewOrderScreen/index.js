import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {buttonColor, placeholderColor, white} from '../../utils/color';
import {styles} from './styles';
import Snackbar from 'react-native-snackbar';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import RBSheet from 'react-native-raw-bottom-sheet';
import Input from '../../components/Input';
import {useFocusEffect} from '@react-navigation/native';
const ViewOrderScreen = (props) => {
  const [orderData, setOrderData] = useState(null);
  const [isOrderItem, setisOrderItem] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [UserData, setUserData] = useState(null);
  const [orderId, setorderId] = useState(null);
  const [cancleReason, setcancleReason] = useState(null);
  const refRBSheet = useRef();
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
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const OrderList = (jsonValue) => {
    const formdata = new FormData();
    formdata.append('user_id', jsonValue);
    doPost(constant.VIEWORDER_URL, formdata)
      .then((res) => {
        if (res.flag == 1) {
          let cart = res.product;
          if (cart != null) {
            setOrderData(res.product);
            setisOrderItem(false);
            setisLoaded(true);
            console.log('dada');
          } else {
            setisOrderItem(true);
            setisLoaded(false);
          }
        } else if (res.flag == 0) {
          console.log('fail');
        }
      })
      .catch((e) => console.log(e));
  };
  const Validation = () => {
    if (cancleReason == null || cancleReason == '') {
      Snackbar.show({
        text: 'Please write cancle reason!',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      cancleOrder();
    }
  };
  const cancleOrder = () => {
    const formdata = new FormData();
    formdata.append('user_id', UserData);
    formdata.append('order_id', orderId);
    formdata.append('cancel_reason', cancleReason);
    doPost(constant.CANCLEORDER_URL, formdata)
      .then((res) => {
        if (res.flag == 1) {
          console.log(res);
          OrderList(UserData);

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
      })
      .catch((e) => console.log(e));
  };
  const productRender = ({item}) => {
    return (
      <View style={styles.CardContainer}>
        <View style={styles.rowView}>
          <MaterialCommunityIcons
            name={'shopping'}
            size={24}
            style={[
              item.order_status == 'Cancelled'
                ? {color: 'rgba(255, 99, 71,1)'}
                : item.order_status == 'Completed'
                ? {color: 'rgba(0,128,0,1)'}
                : {color: 'rgba(255,165,0,1.0)'},
            ]}
          />
          <Text style={styles.mainTopText}>Shirt, Shoes, Dress</Text>
          <MaterialCommunityIcons
            name={'dots-horizontal'}
            size={24}
            color={placeholderColor}
            onPress={() => {
              refRBSheet.current.open(), setorderId(item.order_id);
            }}
            style={styles.dotsIcon}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('OrderDetailScreen', {order: item})
          }>
          <View style={styles.rowContainerForsemiText}>
            <View style={styles.rowView}>
              <Text style={styles.semiText}>Address</Text>
              <Text style={styles.semiText}>{item.shipping_address}</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.semiText}>Payment</Text>
              <Text style={styles.semiText}>{item.payment_method}</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.semiText}>Order Date</Text>
              <Text style={styles.semiText}>{item.order_date}</Text>
            </View>
          </View>
          <View style={styles.buttonView}>
            <View
              style={[
                item.order_status == 'Cancelled'
                  ? styles.statusOrangeBtn
                  : item.order_status == 'Completed'
                  ? styles.statusGreenBtn
                  : styles.statusYellowBtn,
              ]}
              onPress={() => props.navigation.replace('Home')}>
              <Text
                style={[
                  item.order_status == 'Cancelled'
                    ? styles.statusOrangeText
                    : item.order_status == 'Completed'
                    ? styles.statusGreenText
                    : styles.statusYellowText,
                ]}>
                Order {item.order_status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isOrderItem ? (
        <View>
          <Image
            style={styles.emptyImage}
            source={require('../../assets/emtycart.jpg')}></Image>
          <Text style={styles.emptyText}>
            You have not placed any order yet
          </Text>
          <Text style={styles.addemptyText}>Order items to it now</Text>
          <TouchableOpacity
            style={[styles.shopNowBtn, {backgroundColor: buttonColor}]}
            onPress={() => props.navigation.replace('Home')}>
            <Text style={styles.shopText}>Shop now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            style={{marginTop: 10}}
            data={orderData}
            renderItem={productRender}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.order_id}
          />
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={300}
            customStyles={{
              container: {
                backgroundColor: white,
              },
            }}>
            <View style={{flex: 1}}>
              <View>
                <Text style={styles.cancleMessage}>
                  Are your sure to cancel This order!
                </Text>
                <Input
                  placeholder="Cancle reacson"
                  multiline={true}
                  value={cancleReason}
                  onChangeText={(reacson) => setcancleReason(reacson)}
                />
              </View>
              <View style={styles.bottomSheetButtonRow}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => refRBSheet.current.close()}>
                  <Text style={styles.cancelText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ordercancleBtn}
                  onPress={() => {
                    refRBSheet.current.close();
                    Validation();
                  }}>
                  <Text style={styles.statusOrangeText}>Cancel Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          </RBSheet>
        </>
      )}
    </SafeAreaView>
  );
};

export default ViewOrderScreen;
