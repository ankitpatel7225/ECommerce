import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import {styles} from './styles';
import ProfileInput from '../../components/Profile';
import {doPost} from '../../config/request';
import constant from '../../config/constant';
import {buttonColor, placeholderColor} from '../../utils/color';
import {useFocusEffect} from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;

const profileScreen = (props) => {
  const [UserAllData, setUserAllData] = useState([]);
  const [ImageUri, setImageUri] = useState(null);
  const [userName, setuserName] = useState(null);
  const [userEmail, setuserEmail] = useState(null);
  const [userPhone, setuserPhone] = useState(null);
  const [userAddress, setuserAddress] = useState(null);

  const refRBSheet = useRef();
  const getUserAllData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserAllData');
      if (jsonValue != null) {
        await setUserAllData(JSON.parse(jsonValue));
      } else {
        setUserAllData(null);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getUserAllData();
    }, []),
  );

  useEffect(() => {
    if (UserAllData != null) {
      setuserName(UserAllData.user_name);
      setuserEmail(UserAllData.user_email);
      setuserPhone(UserAllData.user_mobile);
      setuserAddress(UserAllData.user_address);
      setImageUri(null);
    }
  }, [UserAllData]);

  const uploadImageFromCam = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setImageUri(image);
        refRBSheet.current.close();
      })
      .catch((err) => console.log(err));
  };
  const uploadImageFromselect = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        setImageUri(image);
        refRBSheet.current.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const StoreUserAllData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value.user_data);
      await AsyncStorage.setItem('UserAllData', jsonValue).then(() => {
        Snackbar.show({
          text: value.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const validate = () => {
    let regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regMobile = /^[0]?[6789]\d{9}$/;
    if (userName == null || userName == '') {
      Snackbar.show({
        text: 'User name not be a Empty!',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (
      userEmail == null ||
      userEmail == '' ||
      regemail.test(userEmail) == false
    ) {
      Snackbar.show({
        text: 'Please Enter a Valid Email',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (userPhone == null || userPhone == '') {
      Snackbar.show({
        text: 'Mobile number not be a Empty!',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (regMobile.test(userPhone) === false) {
      Snackbar.show({
        text: 'Mobile number is Invaild!',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else if (userAddress == null || userAddress == '') {
      Snackbar.show({
        text: 'Address not be a Empty!',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: buttonColor,
        },
      });
    } else {
      UpdateProfile();
    }
  };
  const UpdateProfile = () => {
    const formdata = new FormData();
    formdata.append('user_id', UserAllData.user_id);
    {
      if (ImageUri != null) {
        const file = {
          uri:
            Platform.OS == 'android'
              ? ImageUri.path
              : `file://${ImageUri.path}`,
          name: 'image.jpg',
          type: ImageUri.mime, // e.g. 'image/jpg'
        };
        formdata.append('user_photo', file);
      }
    }
    formdata.append('user_name', userName);
    formdata.append('user_email', userEmail);
    formdata.append('user_mobile', userPhone);
    formdata.append('user_address', userAddress);
    console.log(formdata);
    doPost(constant.UPDATEPROFILE_URL, formdata)
      .then((res) => {
        if (res.flag == 1) {
          console.log(res);
          StoreUserAllData(res);
        } else {
          Snackbar.show({
            text: res.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <Avatar.Image
            source={{
              uri:
                ImageUri != null
                  ? ImageUri.path
                  : UserAllData.user_photo != null
                  ? UserAllData.user_photo
                  : 'https://i.pinimg.com/originals/d9/18/32/d9183215e2f749d908f645d102eda28f.jpg',
            }}
            size={120}
            style={styles.avtarImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => props.navigation.navigate('ChangePasswordScreen')}>
          <Text style={styles.signInText}>Reset password ?</Text>
        </TouchableOpacity>
        <ProfileInput
          name={'account-outline'}
          placeholder="user"
          value={userName}
          onChangeText={(name) => setuserName(name)}
          keyboardType="default"
        />
        <ProfileInput
          name={'email-outline'}
          placeholder="Email"
          value={userEmail}
          onChangeText={(email) => {
            setuserEmail(email);
          }}
          keyboardType="email-address"
        />

        <ProfileInput
          name={'phone-outline'}
          placeholder="Mobile"
          value={userPhone}
          maxLength={10}
          onChangeText={(phone) => {
            setuserPhone(phone);
          }}
          keyboardType="phone-pad"
        />
        <ProfileInput
          name={'pin-outline'}
          placeholder="Address"
          value={userAddress}
          onChangeText={(add) => {
            setuserAddress(add);
          }}
        />

        <TouchableOpacity style={styles.updateBtn} onPress={() => validate()}>
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          height={350}
          openDuration={250}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderColor: placeholderColor,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderWidth: 0.5,
            },
          }}>
          <View>
            <ScrollView>
              <Text style={styles.bottomText}>Upload Photo</Text>
              <Text style={styles.bottomTextsemi}>
                Choose Your Profile Photo
              </Text>
              <View style={{marginVertical: 20}}>
                <TouchableOpacity
                  style={styles.btnSection}
                  onPress={() => {
                    uploadImageFromselect();
                  }}>
                  <Text style={styles.updateText}>
                    Select Image From Gallary
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnSection}
                  onPress={() => {
                    uploadImageFromCam();
                  }}>
                  <Text style={styles.updateText}>
                    Take A Photo From Camara
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                style={styles.btnSection}
                onPress={() => {
                  refRBSheet.current.close();
                }}>
                <Text style={styles.updateText}>Cancle</Text>
              </TouchableOpacity> */}
              </View>
            </ScrollView>
          </View>
        </RBSheet>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profileScreen;
