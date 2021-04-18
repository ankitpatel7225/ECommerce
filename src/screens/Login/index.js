import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import Input from '../../components/Input';
import SocialMediaButton from '../../components/SocialMediaButton';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import {useFocusEffect} from '@react-navigation/native';
import {
  tranforant,
  socialPhoneIconBack,
  black,
  buttonColor,
} from '../../utils/color';
import {styles} from './styles';
import Auth from '../../firebase/Auth';
import {fetchUser} from '../../redux/User/action';
import {useDispatch, useSelector} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Login = (props) => {
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [exit, setexit] = useState(0);
  const [isLogin, setisLogin] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Snackbar.show({
          text: 'Press Again to exit from app !',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'Yes',
            textColor: buttonColor,
            onPress: () => BackHandler.exitApp(),
          },
        });

        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);

  const Validation = () => {
    let regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;
    if (Email == null || Email == '' || regemail.test(Email) == false) {
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
    } else {
      Login();
    }
  };
  const StoreUserAllData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value.userdata);
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
      await AsyncStorage.setItem('LoginData', value.userdata.user_id).then(
        () => {
          StoreUserAllData(value);
        },
      );
    } catch (e) {
      console.log(e);
    }
  };
  const Login = () => {
    const formdata = new FormData();
    formdata.append('user_email', Email);
    formdata.append('user_password', Password);

    dispatch(fetchUser(formdata));
  };

  const LoginWithSocialIcon = (user, additionalUserInfo) => {
    const formdata = new FormData();
    formdata.append('user_email', additionalUserInfo.profile.email);
    formdata.append('user_name', user.displayName);
    formdata.append('user_mobile', user.phoneNumber);
    //formdata.append('user_providerId', additionalUserInfo.providerId);
    if (user.photoURL != null) {
      const file = {
        uri:
          Platform.OS == 'android' ? user.photoURL : `file://${user.photoURL}`,
        name: 'image.jpg',
        type: 'image/jpg', // e.g. 'image/jpg'
      };
      formdata.append('user_photo', file);
    }

    doPost(constant.LOGINWITHSOCIALICON_URL, formdata).then((res) => {
      setisLogin(false);
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

  return (
    <SafeAreaView style={[styles.container, {opacity: isLogin ? 0.4 : 1.0}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.topView}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('HomeScreen')}>
            <Text style={styles.skipText}>Skip </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.mainLogo}>Sign In</Text>
        <Text style={styles.welcomeText}>
          Welcome we care for your Outdoor wear
        </Text>
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
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        {state?.loading && <Text>Loading ....</Text>}
        <TouchableOpacity
          style={styles.signInBtn}
          disabled={state?.loading}
          onPress={() => Validation()}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>___________or___________</Text>
        <View style={styles.socialMedioView}>
          <SocialMediaButton
            backgroundColor={tranforant}
            name={'phone'}
            size={screenWidth / 10}
            color={socialPhoneIconBack}
            onPress={() => props.navigation.navigate('OtpScreen')}
          />
          <SocialMediaButton
            backgroundColor={tranforant}
            name={'google'}
            size={screenWidth / 10}
            color={black}
            onPress={() => {
              setisLogin(true);
              Auth.login()
                .then((user) => {
                  //console.log(user);
                  LoginWithSocialIcon(user.user, user.additionalUserInfo);
                })
                .catch((e) => {
                  console.log('eeror', e), setisLogin(false);
                });
            }}
          />
          <SocialMediaButton
            backgroundColor={tranforant}
            name={'facebook'}
            onPress={() => {
              setisLogin(true);
              Auth.LoginWithFacebook()
                .then((facebook) => {
                  //console.log(facebook);
                  LoginWithSocialIcon(
                    facebook.user,
                    facebook.additionalUserInfo,
                  );
                })
                .catch((e) => {
                  setisLogin(false);
                  console.log('facebook error', e);
                });
            }}
            size={screenWidth / 10}
            color={'#4267B2'}
          />
        </View>
        <View style={styles.registerView}>
          <Text style={styles.regiMessage}>Don't have a account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={styles.registerText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
