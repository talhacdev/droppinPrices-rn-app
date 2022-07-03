import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../config/colors';

const THUMB_RADIUS = wp(2);

const Thumb = props => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: wp(1),
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
});

export default memo(Thumb);
