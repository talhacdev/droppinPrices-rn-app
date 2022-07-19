import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import CartNavigator from './CartNavigator';
import AccountNavigator from './AccountNavigator';
import LikedNavigator from './LikedNavigator';

import images from '../config/images';
import colors from '../config/colors';

import {connect} from 'react-redux';
import {UpdateCart} from '../redux/actions/AuthActions';

const Tab = createBottomTabNavigator();

const AppNavigator = props => {
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
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.image}
                source={focused ? images.cartActive : images.cartInActive}
              />
              {props.cart.length > 0 ? (
                <View
                  style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: wp(1),
                    height: hp(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: colors.background}}>
                    {props.cart.length}
                  </Text>
                </View>
              ) : null}
            </View>
          ),
        }}
        component={CartNavigator}
      />
      <Tab.Screen
        name="AccountNavigator"
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
        component={AccountNavigator}
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

function mapStateToProps(state) {
  return {
    cart: state.auth.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCart: payload => dispatch(UpdateCart(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
