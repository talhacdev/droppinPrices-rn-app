import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';

function Button(props) {
  return (
    <TouchableOpacity
      disabled={!props.onPress}
      onPress={props.onPress}
      style={{
        width: wp(80),
        height: wp(15),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
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

export default Button;
