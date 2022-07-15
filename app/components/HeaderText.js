import React from 'react';
import {Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';

function HeaderText(props) {
  return (
    <View
      style={
        props.containerStyle || {
          width: props.width || wp(70),
          paddingVertical: props.paddingVertical || 10,
          justifyContent: 'center',
          alignItems: 'center',
        }
      }>
      <Text
        style={{
          fontSize: wp(7),
          fontFamily: fonts.GilroyExtraBold,
          color: colors.textColor,
        }}>
        {props.headerText}
        {props.likedScreen && (
          <Text
            style={{
              fontSize: wp(7),
              fontFamily: fonts.GilroyExtraBold,
              color: colors.secondary,
            }}>
            {props.likedScreenText}
          </Text>
        )}
      </Text>

      {props.subHeaderText && (
        <Text
          style={{
            fontFamily: fonts.RobotoRegular,
            color: colors.textColor,
            opacity: 0.5,
            margin: hp(1),
          }}>
          {props.subHeaderText}
        </Text>
      )}
    </View>
  );
}

export default HeaderText;
