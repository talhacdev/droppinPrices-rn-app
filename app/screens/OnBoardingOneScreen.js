import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import routes from '../navigation/routes';

import Button from '../components/Button';

import images from '../config/images';
import fonts from '../config/fonts';
import colors from '../config/colors';

function OnBoardingOneScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to</Text>
        <View style={styles.rowContainer}>
          <Text style={[styles.headerText, styles.primaryText]}>Droppin</Text>
          <Text style={[styles.headerText, styles.secondaryText]}>Prices</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={images.onBoardingOne} />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Largest auction marketplace for any listing largest auction
          marketplace for any listing......
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => props.navigation.navigate(routes.ON_BOARDING_TWO)}
          title={'Get Started'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerContainer: {
    width: wp(70),
    paddingVertical: 10,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: wp(8),
    fontFamily: fonts.GilroyExtraBold,
    color: colors.textColor,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  primaryText: {
    color: colors.primary,
  },
  secondaryText: {
    color: colors.secondary,
  },
  imageContainer: {
    paddingVertical: 5,
  },
  image: {
    width: wp(50),
    height: hp(30),
    resizeMode: 'contain',
  },
  footerContainer: {
    width: wp(70),
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: wp(4),
    fontFamily: fonts.PoppinsRegular,
    color: colors.textColor,
  },
  buttonContainer: {
    paddingVertical: 15,
  },
});

export default OnBoardingOneScreen;
