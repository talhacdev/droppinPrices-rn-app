import React from 'react';
import {Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';

import Button from './Button';

import fonts from '../config/fonts';
import colors from '../config/colors';

function CarouselComponent(props) {
  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          height: hp(30),
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View>
          <Image
            style={{
              width: wp(40),
              height: hp(25),
              borderRadius: wp(2),
              resizeMode: 'cover',
            }}
            source={item.image}
          />
        </View>
        {props.activeIndex == item.id && (
          <View
            style={{
              position: 'absolute',
              bottom: hp(0.5),
              backgroundColor: colors.buttonText,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp(30),
              height: hp(10),
              borderRadius: wp(2),
              elevation: hp(1),
              zIndex: 9000,
            }}>
            <Text
              style={{
                color: colors.secondary,
                fontFamily: fonts.PoppinsRegular,
                fontSize: wp(3),
                fontWeight: '700',
              }}>
              {item.time}
            </Text>
            <Button
              width={wp(25)}
              fontSize={wp(2.5)}
              height={hp(4)}
              borderRadius={wp(2)}
              title={'Place a bid'}
              onPress={props.onPress}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: hp(2),
      }}>
      <Carousel
        autoplay={true}
        loop={true}
        layout={'stack'}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        autoplayDelay={100}
        autoplayInterval={3000}
        inactiveSlideOpacity={0.1}
        inactiveSlideScale={0.1}
        layoutCardOffset={9}
        data={props.carouselItems}
        sliderWidth={wp(75)}
        itemWidth={wp(60)}
        renderItem={_renderItem}
        onSnapToItem={props.onSnapToItem}
      />
    </View>
  );
}

export default CarouselComponent;
