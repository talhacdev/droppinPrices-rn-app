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
      disabled={props.disabled}
      onPress={props.onPress}
      style={{
        width: props.width ? props.width : wp(80),
        height: props.height ? props.height : hp(8),
        borderRadius: props.borderRadius ? props.borderRadius : wp(5),
        marginBottom: hp(1),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : colors.primary,
      }}>
      <Text
        style={{
          fontSize: props.fontSize ? props.fontSize : wp(4),
          fontFamily: fonts.RobotoBold,
          color: colors.buttonText,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

export default AppButton;
