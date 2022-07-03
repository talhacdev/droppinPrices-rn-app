import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import images from '../config/images';
import colors from '../config/colors';

function HeaderButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        elevation: hp(0.5),
        zIndex: 9000,
      }}>
      {props.chevronBack && (
        <Image
          style={{
            width: wp(2.5),
            height: hp(5),
            resizeMode: 'contain',
          }}
          source={images.chevronBack}
        />
      )}
      {props.drawer && (
        <Image
          style={{
            width: wp(5),
            height: hp(5),
            resizeMode: 'contain',
          }}
          source={images.drawer}
        />
      )}
    </TouchableOpacity>
  );
}

export default HeaderButton;
