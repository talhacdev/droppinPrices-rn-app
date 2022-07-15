import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';

import images from '../config/images';

function CartCard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.coffee} />
        </View>
        <View style={styles.leftTextContainer}>
          <Text
            style={{
              fontSize: wp(3.5),
              color: colors.textColor,
            }}>
            {props.productName}
          </Text>
          <Text
            style={{
              fontSize: wp(3),
              color: colors.textColor,
              opacity: 0.35,
            }}>
            Category: {props.category}
          </Text>
        </View>
      </View>
      <View style={styles.rigthContainer}>
        <Text
          style={{
            fontSize: wp(4),
            color: colors.textColor,
            fontFamily: fonts.RobotoBold,
          }}>
          {'$' + props.price}
        </Text>
        <TouchableOpacity onPress={props?.onPressRemove}>
          <Text
            style={{
              fontSize: wp(3),
              fontFamily: fonts.RobotoBold,
              color: colors.error,
              textDecorationLine: 'underline',
            }}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(10),
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    justifyContent: 'space-between',
  },
  leftContainer: {justifyContent: 'center', flexDirection: 'row'},
  rigthContainer: {justifyContent: 'center', alignItems: 'flex-end'},
  imageContainer: {
    width: wp(14),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: hp(8),
    resizeMode: 'contain',
  },
  leftTextContainer: {
    justifyContent: 'center',
    marginLeft: wp(2),
  },
});

export default CartCard;
