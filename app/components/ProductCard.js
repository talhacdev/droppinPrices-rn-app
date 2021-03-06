import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import images from '../config/images';
import fonts from '../config/fonts';
import colors from '../config/colors';

function ProductCard(props) {
  if (!props?.bid) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            borderWidth: wp(0.1),
            borderColor: colors.textColor,
            alignItems: 'center',
            borderRadius: wp(2),
          }}>
          <View
            style={{
              position: 'absolute',
              elevation: 1,
              zIndex: 9000,
              padding: wp(2),
              paddingHorizontal: wp(3),
              borderRadius: wp(5),
              backgroundColor: colors.textColor,
              top: wp(1),
              left: wp(1),
            }}>
            <Text
              style={{
                color: colors.buttonText,
                fontFamily: fonts.GilroyExtraBold,
                fontSize: wp(3),
              }}>
              {props.discount + '%'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={props.onPressLike}
            style={{
              position: 'absolute',
              zIndex: 9000,
              padding: wp(1),
              top: wp(1),
              right: wp(1),
            }}>
            <Image
              style={{
                width: wp(5),
                height: hp(4),
                resizeMode: 'contain',
              }}
              source={props.liked ? images.heartRed : images.heart}
            />
          </TouchableOpacity>
          <Image
            style={{
              width: wp(43),
              height: 145,
              resizeMode: 'cover',
              borderTopLeftRadius: wp(2),
              borderTopRightRadius: wp(2),
            }}
            source={{
              uri: props.image,
            }}
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
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
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

  if (props?.bid) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            borderWidth: wp(0.1),
            borderColor: colors.textColor,
            alignItems: 'center',
            borderRadius: wp(2),
          }}>
          <TouchableOpacity
            onPress={props.onPressLike}
            style={{
              position: 'absolute',
              zIndex: 9000,
              padding: wp(1),
              top: wp(1),
              left: wp(1),
            }}>
            <Image
              style={{
                width: wp(5),
                height: hp(4),
                resizeMode: 'contain',
              }}
              source={props.liked ? images.heartRed : images.heart}
            />
          </TouchableOpacity>

          <Image
            style={{
              width: wp(43),
              height: 175,
              resizeMode: 'cover',
              borderTopLeftRadius: wp(2),
              borderTopRightRadius: wp(2),
            }}
            source={{uri: props.image}}
          />

          <View
            style={{
              height: hp(4),
              paddingVertical: hp(0.5),
              justifyContent: 'space-between',
              alignItems: 'space-between',
            }}>
            <View
              style={{
                width: wp(40),
                flex: 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: fonts.RobotoBold,
                  color: colors.primary,
                  width: wp(20),
                  fontSize: wp(3),
                }}>
                {props.productName}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: fonts.RobotoBold,
                  color: colors.secondary,
                  fontSize: wp(3),
                  width: wp(19),
                }}>
                {'Auc#' + props.auctionId}
              </Text>
            </View>
          </View>

          <View
            style={{
              height: hp(4),
              paddingVertical: hp(0.5),
            }}>
            <View
              style={{
                width: wp(40),
                flex: 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: fonts.RobotoRegular,
                  fontSize: wp(2.5),
                }}>
                {'Current '}
                <Text
                  style={{
                    fontFamily: fonts.RobotoBold,
                    fontSize: wp(3),
                  }}>
                  {'$' + props.price}
                </Text>
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: fonts.RobotoRegular,
                  fontSize: wp(2.5),
                }}>
                {'Min '}
                <Text
                  style={{
                    fontFamily: fonts.RobotoBold,
                    fontSize: wp(3),
                  }}>
                  {'$' + props.minimumPrice}
                </Text>
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: wp(0.1),
              borderColor: colors.textColor,
              height: hp(4),
              paddingVertical: hp(0.5),
            }}>
            <View
              style={{
                width: wp(40),
                flex: 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={props.onPressQuickBid}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: fonts.RobotoBold,
                    color: colors.quickBid,
                    fontSize: wp(3),
                  }}>
                  {'QUICK BID'}
                </Text>
              </TouchableOpacity>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: fonts.RobotoBold,
                  color: colors.secondary,
                  fontSize: wp(3),
                }}>
                {props.time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductCard;
