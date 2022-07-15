import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';

function ProductCardHeader(props) {
  return (
    <View style={{width: wp(90), paddingBottom: hp(2)}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.GilroyExtraBold,
            fontSize: wp(5),
            color: colors.textColor,
          }}>
          {props.textLeft}
          <Text
            style={{
              color: colors.secondary,
            }}>
            {props.textRight}
          </Text>
        </Text>
        {!props.noViewAll && (
          <TouchableOpacity onPress={props.onPress}>
            <Text
              style={{
                fontFamily: fonts.PoppinsRegular,
                fontSize: wp(3),
                textDecorationLine: 'underline',
                color: colors.textColor,
                fontWeight: '700',
              }}>
              VIEW ALL
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {props.subText && (
        <Text
          style={{
            fontFamily: fonts.RobotoRegular,
            fontSize: wp(3),
            color: colors.textColor,
          }}>
          {props.subText}
        </Text>
      )}
    </View>
  );
}

export default ProductCardHeader;
