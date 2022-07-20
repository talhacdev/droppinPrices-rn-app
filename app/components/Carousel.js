import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';

import Button from './Button';

import fonts from '../config/fonts';
import colors from '../config/colors';

function CarouselComponent(props) {
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
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
            source={{uri: item.image[0]}}
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
              height: hp(5),
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
              {calculateCountdown(item)}
            </Text>
            {/* <Button
              width={wp(25)}
              fontSize={wp(2.5)}
              height={hp(4)}
              borderRadius={wp(2)}
              title={'Place a bid'}
              onPress={props.onPress}
            /> */}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const calculateCountdown = item => {
    let now = moment(new Date());
    let timestamp = moment().toDate(item.timestamp);
    let duration = moment.duration(now.diff(timestamp));
    let seconds = duration.asSeconds();
    let secondsLeft = 604800 - seconds;

    var d = Math.floor(secondsLeft / (3600 * 24));
    var h = Math.floor((secondsLeft % (3600 * 24)) / 3600);
    var m = Math.floor((secondsLeft % 3600) / 60);
    var s = Math.floor(secondsLeft % 60);

    // var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
    // var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    // var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    // var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';

    var dDisplay = d > 0 ? d + (d == 1 ? 'd, ' : 'd ') : '';
    var hDisplay = h > 0 ? h + (h == 1 ? 'h ' : 'h ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? 'm ' : 'm ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? 's' : 's') : '';

    return dDisplay + hDisplay + mDisplay + sDisplay;
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
