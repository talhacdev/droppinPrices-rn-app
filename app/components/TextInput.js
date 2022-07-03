import React from 'react';
import {View, Image, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';
import images from '../config/images';

function AppTextInput(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: props.search ? wp(90) : wp(80),
        height: hp(7),
        borderRadius: wp(5),
        marginVertical: hp(1),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.search ? colors.background : colors.textInput,
        borderWidth: props.search ? wp(0.1) : null,
        borderColor: colors.search,
      }}>
      <TextInput
        placeholder={props.placeholder ? props.placeholder : 'Placeholder'}
        placeholderTextColor={colors.black}
        defaultValue={props.defaultValue}
        secureTextEntry={props.secureTextEntry}
        style={{
          width: props.search ? '85%' : '90%',
          fontFamily: fonts.RobotoRegular,
          fontSize: wp(3.5),
        }}
      />
      {props.search && (
        <Image
          style={{
            width: wp(4),
            height: hp(4),
            resizeMode: 'contain',
          }}
          tintColor={colors.search}
          source={images.searchActive}
        />
      )}
    </View>
  );
}

export default AppTextInput;
