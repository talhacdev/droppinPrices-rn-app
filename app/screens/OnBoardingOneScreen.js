import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

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
    width: wp(80),
    paddingVertical: 30,
  },
  headerText: {
    fontSize: wp(12),
    fontFamily: fonts.GilroyExtraBold,
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
  image: {height: wp(80), height: wp(75), resizeMode: 'contain'},
  footerContainer: {
    width: wp(75),
    paddingVertical: 20,
  },
  footerText: {
    fontSize: wp(4.5),
    fontFamily: fonts.PoppinsRegular,
  },
  buttonContainer: {
    paddingVertical: 25,
  },
});

export default OnBoardingOneScreen;
