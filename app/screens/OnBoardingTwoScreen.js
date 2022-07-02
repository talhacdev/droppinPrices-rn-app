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

function OnBoardingTwoScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Buy it before the</Text>
        <View style={styles.rowContainer}>
          <Text style={[styles.headerText, styles.droppinText]}>product</Text>
          <Text style={styles.headerText}> gets live</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.headerText}>into</Text>
          <Text style={[styles.headerText, styles.pricesText]}> auction</Text>
          <Text style={styles.headerText}>...</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={images.onBoardingTwo} />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Buy it before the product gets live into auction. Buy it before the
          product gets live into auction...
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => props.navigation.navigate(routes.REGISTER)}
          title={'Next'}
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
  droppinText: {
    color: colors.primary,
  },
  pricesText: {
    color: colors.secondary,
  },
  imageContainer: {
    paddingVertical: 5,
  },
  image: {
    width: wp(70),
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

export default OnBoardingTwoScreen;
