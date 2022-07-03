import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Slider from 'rn-range-slider';

import Thumb from './Slider/Thumb';
import Rail from './Slider/Rail';
import RailSelected from './Slider/RailSelected';

import fonts from '../config/fonts';
import colors from '../config/colors';

function SliderComponent(props) {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.text}>Discount Range</Text>
        </View>
        <Slider
          style={styles.slider}
          low={props.low}
          high={props.high}
          min={props.min}
          max={props.max}
          step={1}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          onValueChanged={props.handleValueChange}
        />
        <View style={styles.horizontalContainer}>
          <Text style={styles.valueText}>{props.min + '%'}</Text>
          <Text style={styles.valueText}>{props.max + '%'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: wp(40),
    alignItems: 'stretch',
    padding: wp(1),
    backgroundColor: colors.background,
  },
  sliderContainer: {
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp(0.1),
    borderColor: colors.search,
    paddingVertical: hp(1),
    marginVertical: hp(1),
    borderRadius: hp(3),
  },
  slider: {
    paddingTop: hp(1),
    paddingBottom: hp(0.5),
  },
  header: {
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  text: {
    color: colors.primary,
    fontFamily: fonts.GilroyExtraBold,
    fontSize: wp(3),
  },
  valueText: {
    color: colors.textColor,
    fontFamily: fonts.GilroyExtraBold,
    fontSize: wp(3),
  },
});

export default SliderComponent;
