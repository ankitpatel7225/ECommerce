import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import {styles} from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {white} from '../../utils/color';

const Gmail = () => {
  Linking.openURL('mailto:info@akashtechnolabs.com?subject=EShop V(1.0)&body=');
  //title="support@example.com"
};
const Instagram = () => {
  Linking.canOpenURL('instagram://user?username=akashtechnolabs').then(
    (supported) => {
      if (supported) {
        return Linking.openURL('instagram://user?username=akashtechnolabs');
      } else {
        return Linking.openURL('https://www.instagram.com/akashtechnolabs/');
      }
    },
  );
};

const openWhatApp = () => {
  Linking.canOpenURL(
    'whatsapp://send?text=EShop V(1.0)&phone=+919978621654',
  ).then((supported) => {
    if (supported) {
      return Linking.openURL(
        'whatsapp://send?text=EShop V(1.0)&phone=+919978621654',
      );
    } else {
      Alert.alert('Hold On ! ', 'Make sure WhatsApp installed on your device');
    }
  });
};
const openFacebook = () => {
  Linking.canOpenURL('fb://page/788482124654757').then((supported) => {
    if (supported) {
      return Linking.openURL('fb://page/788482124654757');
    } else {
      return Linking.openURL('https://www.facebook.com/AkashTechnoLabs/');
    }
  });
};

const Maps = () => {
  const location = `${23.0327731},${72.5652308}`;
  const url = Platform.select({
    ios: `maps:${location}?center=Akash Technolabs&q=Akash+Technolabs`,
    android: `geo:${location}?center=Akash Technolabs&q=Akash+Technolabs&z=16`,
  });
  Linking.openURL(url);
};

const Call = () => {
  const url = Platform.select({
    ios: `tel://9978621654`,
    android: `tel://9978621654`,
  });
  Linking.openURL(url);
};
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.cardView}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={require('../../assets/akashTechlogo.png')}></Image>
          </View>
          <TouchableOpacity style={styles.ViewContainer} onPress={Call}>
            <Icon
              name="phone"
              size={screenWidth * 0.05}
              style={styles.iconColor}
            />
            <View>
              <Text style={styles.text}>Contact Number</Text>
              <Text style={styles.semiText}>+91 9978621654</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ViewContainer} onPress={Gmail}>
            <Icon
              name="email"
              size={screenWidth * 0.05}
              style={styles.iconColor}
            />
            <View>
              <Text style={styles.text}>Email ID</Text>
              <Text style={styles.semiText}>info@akashtechnolabs.com</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ViewContainer} onPress={Maps}>
            <Icon
              name="location-pin"
              size={screenWidth * 0.05}
              style={styles.iconColor}
            />
            <View>
              <Text style={styles.text}>Location</Text>
              <Text style={styles.semiText}>
                K6 Shree Krishna Center Above Crossword Library,Mithakhali Six
                Rd,Navrangpura,Ahmedabad,Gujarat 380009.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ViewContainer}
            onPress={() => Linking.openURL('https://akashtechnolabs.com')}>
            <Icon
              name="web"
              size={screenWidth * 0.05}
              style={styles.iconColor}
            />
            <View>
              <Text style={styles.text}>Website</Text>
              <Text
                style={[styles.semiText, {textDecorationLine: 'underline'}]}>
                www.akashtechnolabs.com
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: 30,
              flexDirection: 'row',
              marginTop: screenHeight * 0.04,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={openFacebook}>
              <Icon
                name="facebook"
                size={screenWidth * 0.1}
                color={'#4267B2'}
                style={{marginRight: screenWidth * 0.02}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={Instagram}>
              <MaterialCommunityIcons
                name="instagram"
                size={screenWidth * 0.1}
                style={{marginRight: screenWidth * 0.02}}
                color={'#E1306C'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openWhatApp}>
              <MaterialCommunityIcons
                name="whatsapp"
                size={screenWidth * 0.1}
                style={{marginRight: screenWidth * 0.02}}
                color={'#128C7E'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>Version | 1.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUsScreen;
