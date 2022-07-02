import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';

function AppButton(props) {
  return (
    <TouchableOpacity
      disabled={!props.onPress}
      onPress={props.onPress}
      style={{
        width: wp(80),
        height: hp(8),
        borderRadius: wp(5),
        marginBottom: hp(1),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : colors.primary,
      }}>
      <Text
        style={{
          fontSize: wp(4),
          fontFamily: fonts.RobotoBold,
          color: colors.buttonText,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

export default AppButton;
