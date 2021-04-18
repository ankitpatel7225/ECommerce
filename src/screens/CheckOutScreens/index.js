import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RazorpayCheckout from 'react-native-razorpay';
import {placeholderColor, buttonColor, white} from '../../utils/color';
import {styles} from './styles';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import Input from '../../components/Input';
import Snackbar from 'react-native-snackbar';

const radio_props = [
  {label: 'UPI', value: 'UPI'},
  {label: 'Credit / Debit / ATM Card', value: 'Cards'},
  {label: 'Net Banking', value: 'Net Banking'},
  {label: 'Cash On delivery', value: 'Cash On delivery'},
];

const CheckOutScreen = (props) => {
  const [paymetMode, setpaymetMode] = useState(null);
  const {AllCartdata} = props.route.params;
  const [UserData, setUserData] = useState(null);
  const [user, setuser] = useState(null);
  const [Mobile, setMobile] = useState(null);
  const [houseNo, sethouseNo] = useState(null);
  const [roadAdd, setRoadAdd] = useState(null);
  const [city, setcity] = useState(null);
  const [state, setstate] = useState(null);
  const [pincode, setpincod] = useState(null);
  const [onPay, setonPay] = useState(false);
  const [isaddressValidate, setisaddressValidate] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  const validate = () => {
    if (paymetMode == null || paymetMode == '') {
      Snackbar.show({
        text: 'Please Select Payment Method First !',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (paymetMode != 'Cash On delivery') {
      let value = AllCartdata.grand_total + 50;

      var options = {
        description: 'Credits towards consultation',
        currency: 'INR',
        key: 'rzp_test_NJJq2KlkGeqUn2',
        amount: value.toString().concat('00'),
        name: 'Akash Technolabs',
        prefill: {
          email: UserData.user_email,
          contact: UserData.user_mobile,
          name: UserData.user_name,
        },
        theme: {color: '#0288d1'},
      };
      RazorpayCheckout.open(options)
        .then(async (data) => {
          // handle success
          if (data.razorpay_payment_id != null) {
            setonPay(true);
            await DoOrder();
          }
        })
        .catch(async (error) => {
          // handle failure
          setonPay(false);
          Alert.alert(error.error.reason, error.error.description);
        });
    } else {
      console.log(paymetMode);
      DoOrder();
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserAllData');
      jsonValue != null ? setUserData(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const AddressValidation = () => {
    const pinCodereg = /^[1-9][0-9]{5}$/;
    const regMobile = /^[0]?[6789]\d{9}$/;
    if (user == null || user == '') {
      Snackbar.show({
        text: 'User name not be a Empty!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (houseNo == null || houseNo == '') {
      Snackbar.show({
        text: 'Please Enter a House , Building Name',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (roadAdd == null || roadAdd == '') {
      Snackbar.show({
        text: 'Please Enter a road , area',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (city == null || city == '') {
      Snackbar.show({
        text: 'Please Enter a your city name',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (state == null || state == '') {
      Snackbar.show({
        text: 'Please Enter a state',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (
      pincode == null ||
      pincode == '' ||
      pinCodereg.test(pincode) === false
    ) {
      Snackbar.show({
        text: 'Please Enter a pincode or Enter valid pincode',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (Mobile == null || Mobile == '') {
      Snackbar.show({
        text: 'Mobile number not be a Empty!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (regMobile.test(Mobile) === false) {
      Snackbar.show({
        text: 'Mobile number is Invaild!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else {
      setisaddressValidate(false);
    }
  };
  const BillingPage = () => {
    return (
      <View style={{flex: 1}}>
        <Input
          name={'account-outline'}
          value={user}
          placeholder={'Full Name (required)*'}
          onChangeText={(user) => {
            setuser(user), console.log(user);
          }}></Input>
        <Input
          name={'home-outline'}
          placeholder={'House No,Building Name (required)*'}
          maxLength={20}
          value={houseNo}
          onChangeText={(house) => sethouseNo(house)}></Input>
        <Input
          name={'road-variant'}
          placeholder={'Road name, Area, Colony (required)*'}
          value={roadAdd}
          onChangeText={(road) => setRoadAdd(road)}></Input>
        <Input
          name={'home-city-outline'}
          placeholder={'City (required)*'}
          value={city}
          onChangeText={(city) => setcity(city)}></Input>
        <Input
          name={'city-variant-outline'}
          placeholder={'State (required)*'}
          value={state}
          onChangeText={(stateadd) => setstate(stateadd)}></Input>
        <Input
          name={'pin-outline'}
          placeholder={'Pincode (required)*'}
          value={pincode}
          keyboardType="phone-pad"
          maxLength={6}
          onChangeText={(pin) => setpincod(pin)}></Input>
        <Input
          name={'phone-outline'}
          placeholder={'Mobile Number (required)*'}
          maxLength={10}
          value={Mobile}
          onChangeText={(mobile) => setMobile(mobile)}
          keyboardType="phone-pad"></Input>
      </View>
    );
  };

  const Orderpage = () => {
    const [cartData, setCartData] = useState(AllCartdata);
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
          </View>
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

          <View
            style={{
              flex: 1,
              marginTop: 20,
              marginBottom: 30,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              name={'verified-user'}
              color={placeholderColor}
              size={35}
              style={{alignSelf: 'center'}}
            />
            <View style={{marginHorizontal: 10}}>
              <Text>Safe and Secure Payments.Easy returns.</Text>
              <Text>100% Authentic products.</Text>
            </View>
          </View>
        </View>
      );
    };

    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{marginTop: 10}}
          data={cartData.cart}
          scrollEnabled={false}
          renderItem={productRender}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={Footer}
          keyExtractor={(item) => item.product_id}
        />
      </View>
    );
  };
  const DoOrder = () => {
    let order = AllCartdata.cart.map((obj) => {
      let rObj = {};
      {
        rObj['product_id'] = obj.product_id;
        rObj['product_qty'] = obj.product_qty;
        rObj['grand_total'] = AllCartdata.grand_total;
      }
      return rObj;
    });
    let oderdetail = {details: order};
    const formData1 = new FormData();
    formData1.append('user_id', UserData.user_id);
    formData1.append('order_details', JSON.stringify(oderdetail));
    formData1.append('shipping_name', user);
    formData1.append('shipping_mobile', Mobile);
    formData1.append(
      'shipping_address',
      `${houseNo},${roadAdd},${city},${state},${pincode}`,
    );
    formData1.append('total_amount', AllCartdata.grand_total);
    formData1.append('payment_method', paymetMode);
    doPost(constant.ORDER_URL, formData1).then((res) => {
      if (res.flag == 1) {
        RemoveCartItems();
      } else if (res.flag == 0) {
        Snackbar.show({
          text: res.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    });
  };

  const RemoveCartItems = () => {
    const formData = new FormData();
    formData.append('user_id', UserData.user_id);
    doPost(constant.REMOVEAFTERPLACE_URL, formData).then((res) => {
      console.log(res);
      if (res.flag == 1) {
        setonPay(false);
        props.navigation.navigate('ConfirmScreen');
      } else if (res.flag == 0) {
        Snackbar.show({
          text: res.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    });
  };

  const PaymentPage = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{marginBottom: 20}}>
          <Text style={styles.addressText}>Shipping Address</Text>
          <View style={styles.bestSellerView}>
            <Text style={styles.addressText}>{user}</Text>
            <Text
              style={
                styles.semiText
              }>{`${houseNo},${roadAdd},${city},${state},${pincode}`}</Text>
          </View>
        </View>
        <Text style={styles.PaymentOptions}>Payments Options</Text>
        <RadioForm
          radio_props={radio_props}
          initial={false}
          animation={true}
          formHorizontal={false}
          buttonColor={buttonColor}
          onPress={(value) => {
            setpaymetMode(value);
          }}
          style={styles.redioContainer}
        />
        <View style={styles.footerContainer}>
          <Text style={styles.priceDetailText}>PRICE DETAILS</Text>
          <View style={styles.footerRowView}>
            <Text style={styles.footerPriceText}>Price</Text>
            <Text style={styles.footerPriceText}>
              ₹{AllCartdata.grand_total}
            </Text>
          </View>
          <View style={styles.footerRowView}>
            <Text style={styles.footerPriceText}>Delivery Charges</Text>
            <Text style={styles.footerPriceText}>₹50</Text>
          </View>
          <View style={styles.footerTotalRowView}>
            <Text style={styles.footerTotalText}>Total</Text>
            <Text style={styles.footerTotalText}>
              ₹{AllCartdata.grand_total + 50}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 20,
              marginBottom: 30,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              name={'verified-user'}
              color={placeholderColor}
              size={35}
              style={{alignSelf: 'center'}}
            />
            <View style={{marginHorizontal: 10}}>
              <Text>Safe and Secure Payments.Easy returns.</Text>
              <Text>100% Authentic products.</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={[styles.container, {opacity: onPay ? 0.2 : 1}]}>
      <ProgressSteps
        activeStepIconBorderColor={buttonColor}
        completedProgressBarColor={buttonColor}
        completedStepIconColor={buttonColor}
        activeLabelColor={buttonColor}>
        <ProgressStep
          label="Shipping Address"
          nextBtnStyle={styles.nextBtn}
          onNext={() => AddressValidation()}
          errors={isaddressValidate}
          nextBtnTextStyle={styles.nextBtnText}>
          {BillingPage()}
        </ProgressStep>
        <ProgressStep
          label="order Summary"
          nextBtnStyle={styles.orderNextBtn}
          nextBtnTextStyle={styles.nextBtnText}
          previousBtnTextStyle={styles.orderPreBtnText}>
          <Orderpage />
        </ProgressStep>
        <ProgressStep
          label="Payment"
          finishBtnText="Payment"
          nextBtnTextStyle={styles.nextBtnText}
          previousBtnTextStyle={styles.orderPreBtnText}
          nextBtnStyle={styles.orderNextBtn}
          onSubmit={() => validate()}>
          {PaymentPage()}
        </ProgressStep>
      </ProgressSteps>
    </SafeAreaView>
  );
};

export default CheckOutScreen;
