import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import CartNavigator from './CartNavigator';
import AnalyticsNavigator from './AnalyticsNavigator';
import LikedNavigator from './LikedNavigator';

import images from '../config/images';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.buttonText,
        tabBarInactiveTintColor: colors.buttonText,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="HomeNavigator"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.image}
              source={focused ? images.homeActive : images.homeInActive}
            />
          ),
        }}
        component={HomeNavigator}
      />
      <Tab.Screen
        name="SearchNavigator"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.image}
              source={focused ? images.searchActive : images.searchInActive}
            />
          ),
        }}
        component={SearchNavigator}
      />
      <Tab.Screen
        name="CartNavigator"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.image}
              source={focused ? images.cartActive : images.cartInActive}
            />
          ),
        }}
        component={CartNavigator}
      />
      <Tab.Screen
        name="AnalyticsNavigator"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.image}
              source={
                focused ? images.analyticsActive : images.analyticsInActive
              }
            />
          ),
        }}
        component={AnalyticsNavigator}
      />
      <Tab.Screen
        name="LikedNavigator"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.image}
              source={focused ? images.likedActive : images.likedInActive}
            />
          ),
        }}
        component={LikedNavigator}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    width: wp(5),
    height: hp(5),
    resizeMode: 'contain',
  },
  tabBar: {
    position: 'absolute',
    width: wp(90),
    bottom: hp(2),
    left: wp(5),
    right: wp(5),
    zIndex: 9000,
    elevation: 1,
    borderRadius: wp(50),
    backgroundColor: colors.secondary,
  },
});

export default AppNavigator;
