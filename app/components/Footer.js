import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';

function Footer(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom: 10,
      }}>
      <Text
        style={{
          fontSize: wp(3),
          fontFamily: fonts.RobotoRegular,
          color: colors.textColor,
        }}>
        {props.leftText}
      </Text>
      <TouchableOpacity onPress={props.onPress}>
        <Text
          style={{
            fontSize: wp(3),
            fontFamily: fonts.RobotoRegular,
            color: colors.textColor,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}>
          {props.hyperlinkText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Footer;
