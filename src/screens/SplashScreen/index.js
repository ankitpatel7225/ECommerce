import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.MainLogoText}>E Commerce</Text>
    </View>
  );
};
export default SplashScreen;
