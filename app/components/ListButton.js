import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';

function ListButton(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={{
        backgroundColor: props.selected ? colors.selected : colors.unSelected,
        paddingHorizontal: wp(6),
        height: hp(5),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: fonts.RobotoRegular,
          fontWeight: 'bold',
          color: colors.textColor,
          opacity: props.selected ? 1 : 0.5,
          fontSize: wp(3),
        }}>
        {props?.item?.title}
      </Text>
    </TouchableOpacity>
  );
}

export default ListButton;
