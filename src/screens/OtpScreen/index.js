import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import MobileInput from '../../components/MobileInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';
import {styles} from './styles';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import {buttonColor} from '../../utils/color';

const {width, screenHeight} = Dimensions.get('window');
const OtpScreen = (props) => {
  const [Mobile, setMobile] = useState(null);
  const Validation = () => {
    const regMobile = /^[0]?[6789]\d{9}$/;
    if (Mobile == null || Mobile == '') {
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
      LoginWithNumber();
    }
  };
  const LoginWithNumber = () => {
    const formdata = new FormData();
    formdata.append('user_mobile', Mobile);

    doPost(constant.LOGINWITHOTP_URL, formdata).then((res) => {
      if (res.flag == 1) {
        Snackbar.show({
          text: res.message,
          duration: Snackbar.LENGTH_SHORT,
        });
        props.navigation.navigate('OtpVerify', {otp: res});
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
        {/* <Icon name={'ios-phone-portrait'} size={50} style={styles.mobileIcon} /> */}
        <Text style={styles.mainLogo}>Verify your Number</Text>
        <Text style={styles.welcomeText}>
          Please enter your mobile number to receive verification code
        </Text>
        <MobileInput
          name={'phone-outline'}
          placeholder="Mobile Number"
          maxLength={10}
          value={Mobile}
          onSubmitEditing={() => Validation()}
          onChangeText={(mobile) => setMobile(mobile)}
          keyboardType="phone-pad"></MobileInput>
        <TouchableOpacity style={styles.signInBtn} onPress={() => Validation()}>
          <Text style={styles.signInText}>SEND</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpScreen;
