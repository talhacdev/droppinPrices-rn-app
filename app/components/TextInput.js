import React from 'react';
import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';
import images from '../config/images';

function AppTextInput(props) {
  if (props.promoCode) {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: wp(75),
          height: hp(7),
          borderRadius: wp(5),
          marginVertical: hp(1),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: props.search ? colors.background : colors.textInput,
          borderWidth: props.search ? wp(0.1) : null,
          borderColor: colors.search,
          borderRadius: props.borderRadius ? props.borderRadius : 0,
        }}>
        <TextInput
          placeholder={props.placeholder ? props.placeholder : 'Placeholder'}
          placeholderTextColor={colors.black}
          defaultValue={props.defaultValue}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          style={{
            width: props?.bid ? '58%' : '75%',
            fontFamily: fonts.RobotoRegular,
            fontSize: wp(3.5),
            backgroundColor: colors.background,
            borderTopLeftRadius: props.borderRadius ? props.borderRadius : 0,
            borderBottomLeftRadius: props.borderRadius
              ? props.borderRadius
              : null,
          }}
        />

        <TouchableOpacity
          disabled={props.disabled}
          onPress={props.onPress}
          style={{
            backgroundColor: colors.primary,
            padding: wp(4),
            paddingHorizontal: props?.bid ? wp(4) : wp(6),
            borderTopRightRadius: props.borderRadius ? props.borderRadius : 0,
            borderBottomEndRadius: props.borderRadius ? props.borderRadius : 0,
          }}>
          <Text
            style={{color: colors.background, fontFamily: fonts.RobotoBold}}>
            {props?.bid ? 'SUBMIT YOUR BID' : 'APPLY'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: props.search ? wp(90) : wp(80),
          height: props.multiline ? hp(14) : hp(7),
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
          onChangeText={props.onChangeText}
          multiline={props.multiline}
          keyboardType={props.keyboardType}
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
}

export default AppTextInput;
