import React from 'react';
import {View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HeaderButton from './HeaderButton';

function Header(props) {
  return (
    <View
      style={{
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: hp(2),
      }}>
      <HeaderButton chevronBack onPress={props.onPressBack} />
      {/* <HeaderButton drawer onPress={props.onPressDrawer} /> */}
    </View>
  );
}

export default Header;
