import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import constant from '../config/constant';
import {doPost} from '../config/request';

export function login(payload) {
  return doPost(constant.LOGIN_URL, payload).then((res) => {
    if (res.flag == 1) {
      return res.userdata;
    } else if (res.flag == 0) {
      Snackbar.show({
        text: res.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return null;
    }
  });
}

export const StoreUserAllData = async (userdata) => {
  try {
    const jsonValue = JSON.stringify(userdata);
    await AsyncStorage.setItem('UserAllData', jsonValue);
  } catch (e) {
    console.log(e);
  }
};
export const storeData = async (userdata) => {
  try {
    await AsyncStorage.setItem('LoginData', userdata.user_id);
  } catch (e) {
    console.log(e);
  }
};
