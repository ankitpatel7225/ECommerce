import React, {useState, useEffect} from 'react';
import {View, Linking, TouchableOpacity, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {styles} from './styles';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
const Gmail = () => {
  Linking.canOpenURL('mailto:info@akashtechnolabs.com').then((supported) => {
    if (supported) {
      return Linking.openURL('mailto:info@akashtechnolabs.com?subject=&body=');
    } else {
      return Linking.openURL('https://www.facebook.com/AkashTechnoLabs/');
    }
  });
};
const DrawerScreen = (props) => {
  const [IsLogged, setIsLogged] = useState(false);
  const [UserAllData, setUserAllData] = useState([]);

  const isDrawerOpen = useIsDrawerOpen();
  const getUserAllData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserAllData');
      if (jsonValue != null) {
        await setUserAllData(JSON.parse(jsonValue));
        await setIsLogged(true);
      } else {
        await setUserAllData(null);
        await setIsLogged(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const RemoveData = async () => {
    try {
      await setIsLogged(false);
      await AsyncStorage.clear();
      props.navigation.jumpTo('LoginStack');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserAllData();
  }, [isDrawerOpen]);

  return (
    <>
      {IsLogged ? (
        <View style={{flex: 1}}>
          <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
              <View style={styles.userInfoSection}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Profile')}
                  style={{flexDirection: 'row', marginTop: 15}}>
                  <Avatar.Image
                    source={{
                      uri:
                        UserAllData.user_photo != null
                          ? UserAllData.user_photo
                          : 'https://i.pinimg.com/originals/d9/18/32/d9183215e2f749d908f645d102eda28f.jpg',
                    }}
                    size={50}
                    style={{
                      alignSelf: 'center',
                      marginTop: 10,
                      backgroundColor: '#00000000',
                      borderWidth: 0.2,
                    }}
                  />
                  <View style={{marginLeft: 15, flexDirection: 'column'}}>
                    <Title style={styles.title}>
                      {UserAllData != null ? UserAllData.user_name : ''}
                    </Title>
                    <Text style={styles.caption}>
                      {UserAllData != null ? UserAllData.user_email : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="home-outline" color={color} size={size} />
                  )}
                  label="Home"
                  onPress={() => {
                    props.navigation.navigate('Home');
                  }}
                />
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="account-outline" color={color} size={size} />
                  )}
                  label="Profile"
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}
                />
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon
                      name="order-bool-ascending-variant"
                      color={color}
                      size={size}
                    />
                  )}
                  label="My Order"
                  onPress={() => {
                    props.navigation.navigate('ViewOrder');
                  }}
                />
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon
                      name="card-account-details-outline"
                      color={color}
                      size={size}
                    />
                  )}
                  label="About Us"
                  onPress={() => {
                    props.navigation.navigate('About Us');
                  }}
                />

                <DrawerItem
                  icon={({color, size}) => (
                    <Icon
                      name="account-check-outline"
                      color={color}
                      size={size}
                    />
                  )}
                  label="Support"
                  onPress={() => {
                    Gmail();
                  }}
                />
              </Drawer.Section>
              {/* <Drawer.Section title="Preferences">
                <TouchableRipple
                  onPress={() => {
                    // toggleTheme();
                  }}>
                  <View style={styles.preference}>
                    <Text>Dark Theme</Text>
                    <View pointerEvents="none">
                      <Switch value={paperTheme.dark} />
                    </View>
                  </View>
                </TouchableRipple>
              </Drawer.Section> */}
            </View>
          </DrawerContentScrollView>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Sign Out"
              onPress={() => {
                props.navigation.closeDrawer();
                auth()
                  .signOut()
                  .then(() => RemoveData())
                  .catch((e) => console.log(e), RemoveData());
              }}
            />
          </Drawer.Section>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
              <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Avatar.Image
                    source={{
                      uri:
                        'https://i.pinimg.com/originals/d9/18/32/d9183215e2f749d908f645d102eda28f.jpg',
                    }}
                    size={50}
                    style={{alignSelf: 'center', marginTop: 10}}
                  />
                  <View style={{marginLeft: 15, flexDirection: 'column'}}>
                    <TouchableOpacity
                      onPress={() => props.navigation.jumpTo('LoginStack')}>
                      <Title style={styles.title}>Sign In</Title>
                    </TouchableOpacity>
                    <Caption style={styles.caption}>
                      please sign in first
                    </Caption>
                  </View>
                </View>
              </View>
              <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="home-outline" color={color} size={size} />
                  )}
                  label="Home"
                  onPress={() => {
                    props.navigation.navigate('Home');
                  }}
                />

                <DrawerItem
                  icon={({color, size}) => (
                    <Icon
                      name="card-account-details-outline"
                      color={color}
                      size={size}
                    />
                  )}
                  label="About Us"
                  onPress={() => {
                    props.navigation.navigate('About Us');
                  }}
                />

                <DrawerItem
                  icon={({color, size}) => (
                    <Icon
                      name="account-check-outline"
                      color={color}
                      size={size}
                    />
                  )}
                  label="Support"
                  onPress={() => {
                    Gmail();
                  }}
                />
              </Drawer.Section>
              {/* <Drawer.Section title="Preferences">
                <TouchableRipple
                  onPress={() => {
                    // toggleTheme();
                  }}>
                  <View style={styles.preference}>
                    <Text>Dark Theme</Text>
                    <View pointerEvents="none">
                      <Switch value={paperTheme.dark} />
                    </View>
                  </View>
                </TouchableRipple>
              </Drawer.Section> */}
            </View>
          </DrawerContentScrollView>
        </View>
      )}
    </>
  );
};

export default DrawerScreen;
