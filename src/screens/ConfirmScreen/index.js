import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import {styles} from './styles';

const ConfirmScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Image
          style={styles.mainLogo}
          source={require('../../assets/confirm.jpg')}></Image>
        <View>
          <Text style={styles.emptyText}>Your order is comfirmed!</Text>
          <Text style={styles.addemptyText}>Thank You</Text>
          <TouchableOpacity
            style={styles.shopNowBtn}
            onPress={() =>
              props.navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              })
            }>
            <Text style={styles.shopText}>Done</Text>
          </TouchableOpacity>
          <Text style={styles.messageText}>
            we've emailed you a confirmation and we'll notify you when your
            order has shipped.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmScreen;
