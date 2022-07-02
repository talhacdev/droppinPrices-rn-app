import React, {useEffect} from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import routes from '../navigation/routes';

import images from '../config/images';
import colors from '../config/colors';

function SplashScreen(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate(routes.ON_BOARDING_ONE);
    }, 1000);
  }, []);

  const navigate = () => {
    props.navigation.navigate(routes.ON_BOARDING_ONE);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigate} style={styles.imageContainer}>
        <Image style={styles.logo} source={images.logo} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: wp(50),
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
    shadowOffset: wp(1),
    shadowOpacity: 0.1,
    backgroundColor: colors.background,
  },
  logo: {
    width: wp(45),
    height: hp(25),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
