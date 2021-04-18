import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {} from 'react-native-gesture-handler';
import Input from '../../components/Input';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
import {buttonColor} from '../../utils/color';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SignUp = (props) => {
  const [user, setuser] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [Mobile, setMobile] = useState(null);
  const [address, setAddress] = useState(null);
  const [Gender, setGender] = useState(null);

  const Validation = () => {
    let regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;
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
    } else if (Email == null || Email == '' || regemail.test(Email) == false) {
      Snackbar.show({
        text: 'Please Enter a Valid Email',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (
      Password == null ||
      Password == '' ||
      regPassword.test(Password) == false
    ) {
      Snackbar.show({
        text:
          'Pasword must have eight characters,at least a symbol , letters and number',
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
    } else if (address == null || address == '') {
      Snackbar.show({
        text: 'Address not be a Empty!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (Gender == null || Gender == '') {
      Snackbar.show({
        text: 'Please select your gender!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else {
      SignUp();
    }
  };
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
      await AsyncStorage.setItem('LoginData', JSON.stringify(value.uid)).then(
        () => {
          StoreUserAllData(value);
        },
      );
    } catch (e) {
      console.log(e);
    }
  };
  const SignUp = () => {
    const formdata = new FormData();
    formdata.append('user_name', user);
    formdata.append('user_email', Email);
    formdata.append('user_password', Password);
    formdata.append('user_gender', Gender);
    formdata.append('user_mobile', Mobile);
    formdata.append('user_address', address);

    doPost(constant.SIGNUP_URL, formdata).then((res) => {
      if (res.flag == 1) {
        console.log(res);
        storeData(res);
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
        <View style={styles.topView}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('HomeScreen')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.mainLogo}>Sign Up</Text>
        <Text style={styles.welcomeText}>
          Welcome we care for your Outdoor wear
        </Text>
        <Input
          name={'account-outline'}
          placeholder="user"
          value={user}
          onSubmitEditing={() => Validation()}
          onChangeText={(user) => setuser(user)}
          keyboardType="default"></Input>
        <Input
          name={'email-outline'}
          placeholder="Email"
          value={Email}
          onSubmitEditing={() => Validation()}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"></Input>
        <Input
          name={'key-outline'}
          placeholder="Password"
          value={Password}
          onSubmitEditing={() => Validation()}
          onChangeText={(password) => setPassword(password)}></Input>

        <Input
          name={'phone-outline'}
          placeholder="Mobile"
          maxLength={10}
          value={Mobile}
          onSubmitEditing={() => Validation()}
          onChangeText={(mobile) => setMobile(mobile)}
          keyboardType="phone-pad"></Input>
        <Input
          name={'pin-outline'}
          placeholder="Address"
          value={address}
          onSubmitEditing={() => Validation()}
          onChangeText={(add) => setAddress(add)}></Input>

        <View style={styles.genderView}>
          {/* <Text style={styles.genderText}>Gender:- </Text> */}

          <TouchableOpacity
            style={[
              Gender == 'Male' ? styles.seletedGenderTouch : styles.genderTouch,
            ]}
            onPress={() => {
              Gender == 'Male' ? setGender('') : setGender('Male');
            }}>
            <Icon
              name={'man-outline'}
              size={screenWidth / 13}
              style={[
                Gender == 'Male' ? styles.seletedGenderIcon : styles.genderIcon,
              ]}
            />
            <Text
              style={[
                Gender == 'Male'
                  ? styles.selectedGenderText
                  : styles.genderText,
              ]}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Gender == 'Female'
                ? styles.seletedGenderTouch
                : styles.genderTouch,
            ]}
            onPress={() => {
              Gender == 'Female' ? setGender('') : setGender('Female');
            }}>
            <Icon
              name={'woman-outline'}
              size={screenWidth / 13}
              style={[
                Gender == 'Female'
                  ? styles.seletedGenderIcon
                  : styles.genderIcon,
              ]}
            />
            <Text
              style={[
                Gender == 'Female'
                  ? styles.selectedGenderText
                  : styles.genderText,
              ]}>
              Female
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signInBtn} onPress={() => Validation()}>
          <Text style={styles.signInText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginView}>
          <TouchableOpacity>
            <Text style={styles.loginMessage}>Allready have a account? </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
