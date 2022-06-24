import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

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
        <Button title={'Next'} />
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
    fontSize: wp(10),
    fontFamily: fonts.GilroyExtraBold,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(80),
    height: wp(70),
    paddingVertical: 5,
  },
  image: {height: wp(75), resizeMode: 'contain'},
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

export default OnBoardingTwoScreen;
