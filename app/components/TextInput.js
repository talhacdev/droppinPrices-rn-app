import React from 'react';
import {View, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';

function AppTextInput(props) {
  return (
    <View
      style={{
        width: wp(80),
        height: hp(7),
        borderRadius: wp(5),
        marginVertical: hp(1),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.textInput,
      }}>
      <TextInput
        placeholder={props.placeholder ? props.placeholder : 'Placeholder'}
        placeholderTextColor={colors.black}
        defaultValue={props.defaultValue}
        style={{
          width: '90%',
          fontFamily: fonts.RobotoRegular,
          fontSize: wp(4),
        }}
      />
    </View>
  );
}

export default AppTextInput;
