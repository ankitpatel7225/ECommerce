import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/Input';
import {styles} from './styles';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import Snackbar from 'react-native-snackbar';
import {buttonColor} from '../../utils/color';
const ChangePasswordScreen = (props) => {
  const [UserAllData, setUserAllData] = useState([]);
  const [oldPassword, setoldPassword] = useState(null);
  const [NewPassword, setNewPassword] = useState(null);
  const [ConPassword, setConPassword] = useState(null);
  const getUserAllData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserAllData');
      if (jsonValue != null) {
        setUserAllData(JSON.parse(jsonValue));
        console.log(jso);
      } else {
        console.log(jsonValue);
        setUserAllData(null);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserAllData();
  }, []);

  const Validation = () => {
    let regPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;
    if (
      oldPassword == null ||
      oldPassword == '' ||
      regPassword.test(oldPassword) == false
    ) {
      Snackbar.show({
        text:
          'old Pasword must have eight characters,at least a symbol , letters and number',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (
      NewPassword == null ||
      NewPassword == '' ||
      regPassword.test(NewPassword) == false
    ) {
      Snackbar.show({
        text:
          'New Pasword must have eight characters,at least a symbol , letters and number',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (
      ConPassword == null ||
      ConPassword == '' ||
      regPassword.test(ConPassword) == false
    ) {
      Snackbar.show({
        text:
          'Confirm Pasword must have eight characters,at least a symbol , letters and number',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (NewPassword != ConPassword) {
      Snackbar.show({
        text: 'New and Confirm Password Does Not Match !',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else {
      ChangePassword();
    }
  };

  const ChangePassword = () => {
    const formdata = new FormData();
    formdata.append('user_id', UserAllData.user_id);
    formdata.append('opass', oldPassword);
    formdata.append('npass', NewPassword);
    formdata.append('cpass', ConPassword);
    doPost(constant.CHANGEPASSWORD_URL, formdata).then((res) => {
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
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.MainTextMessage}>Create new password</Text>
      <Text style={styles.semiTextMessage}>
        Your new password must be different from previous used passwords.{' '}
      </Text>
      <View style={styles.topView}>
        <Input
          name={'key-minus'}
          placeholder="Old password"
          value={oldPassword}
          onChangeText={(old) => setoldPassword(old)}></Input>
        <Input
          name={'key-plus'}
          placeholder="New password"
          value={NewPassword}
          onChangeText={(newpass) => setNewPassword(newpass)}></Input>
        <Input
          name={'key-plus'}
          placeholder="Confirm new password"
          value={ConPassword}
          onChangeText={(con) => setConPassword(con)}></Input>
      </View>
      <TouchableOpacity style={styles.signInBtn} onPress={() => Validation()}>
        <Text style={styles.signInText}>Reset password ?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
