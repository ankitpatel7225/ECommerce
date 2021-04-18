import React, {useRef, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import Snackbar from 'react-native-snackbar';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import {buttonColor} from '../../utils/color';
const {width, screenHeight} = Dimensions.get('window');
const OtpVerifyScreen = (props) => {
  const [OTP, setOTP] = useState(null);
  const {otp} = props.route.params;
  const otpRef = useRef(null);

  useEffect(() => {
    Alert.alert('Your Otp!', 'Your Otp is ' + otp.mobile_otp, [
      {
        text: 'Ok',
      },
    ]);
  }, []);
  const StoreUserAllData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value.user_array);
      await AsyncStorage.setItem('UserAllData', jsonValue).then(() => {
        Snackbar.show({
          text: value.message,
          duration: Snackbar.LENGTH_SHORT,
        });
        props.navigation.replace('HomeScreen');
      });
    } catch (e) {
      console.log(e);
    }
  };
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('LoginData', value.user_id).then(() => {
        StoreUserAllData(value);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const OTPVerify = () => {
    const formdata = new FormData();
    formdata.append('user_mobile', otp.user_mobile);
    formdata.append('mobile_otp', OTP);
    console.log(formdata);
    doPost(constant.LOGINVERIFYOTP, formdata).then((res) => {
      if (res.flag == 1) {
        storeData(res);
      } else if (res.flag == 0) {
        Snackbar.show({
          text: res.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    });
  };
  const resendCode = () => {
    const formdata = new FormData();
    formdata.append('user_mobile', otp.user_mobile);

    console.log(formdata);
    doPost(constant.RESENDOTP_URL, formdata).then((res) => {
      if (res.flag == 1) {
        Alert.alert('Your Otp!', 'Your Otp is ' + res.mobile_otp, [
          {
            text: 'Ok',
          },
        ]);
      } else if (res.flag == 0) {
        Snackbar.show({
          text: res.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.backView}
          onPress={() => props.navigation.goBack()}>
          <MaterialIcons
            name={'keyboard-arrow-left'}
            size={width / 15}
            style={styles.BackIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.mainLogo}>Enter OTP</Text>
        <Text style={styles.welcomeText}>
          We have sent you access code via SMS for Mobile Verification
        </Text>
        <View style={styles.otpView}>
          <OTPTextInput
            inputCount={6}
            tintColor={buttonColor}
            handleTextChange={(o) => setOTP(o)}
            textInputStyle={styles.OTPText}></OTPTextInput>
        </View>

        <TouchableOpacity style={styles.signInBtn} onPress={() => OTPVerify()}>
          <Text style={styles.signInText}>VERIFY</Text>
        </TouchableOpacity>
        <View style={styles.reSendOtpView}>
          <Text style={styles.reMessage}>Didn't Receive the OTP?</Text>
          <TouchableOpacity onPress={() => resendCode()}>
            <Text style={styles.reSendOtpText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpVerifyScreen;
