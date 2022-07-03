import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import images from '../config/images';
import fonts from '../config/fonts';
import colors from '../config/colors';

function ProductCard(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          borderWidth: wp(0.1),
          borderColor: colors.textColor,
          alignItems: 'center',
          borderRadius: wp(2),
        }}>
        <Image
          style={{
            width: wp(43),
            height: 145,
            resizeMode: 'cover',
            borderTopLeftRadius: wp(2),
            borderTopRightRadius: wp(2),
          }}
          source={props.image}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            height: hp(7),
            paddingVertical: hp(0.5),
          }}>
          <View style={{flex: 0.9}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: fonts.RobotoBold,
                color: colors.textColor,
                fontSize: wp(3),
              }}>
              {props.productName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: wp(15),
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: fonts.GilroyExtraBold,
                  color: colors.secondary,
                  fontSize: wp(3),
                }}>
                {'$' + props.price}
              </Text>
              <View
                style={{
                  marginHorizontal: wp(1),
                  width: wp(15),
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: fonts.GilroyLight,
                    color: colors.textColor,
                    fontSize: wp(3),
                  }}>
                  {'$' + props.originalPrice}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={props.onPressAdd}>
            <Image
              style={{
                width: wp(7),
                height: hp(5),
                resizeMode: 'contain',
              }}
              source={images.plus}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;
