import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

import routes from '../navigation/routes';

import Header from '../components/Header';
import Button from '../components/Button';

import fonts from '../config/fonts';
import images from '../config/images';
import colors from '../config/colors';

import {connect} from 'react-redux';

function AccountScreen(props) {
  const onPressUploadProducts = () => {
    props.navigation.navigate(routes.UPLOAD_PRODUCT);
  };

  const onPressLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: colors.primary,
            borderBottomLeftRadius: wp(8),
            borderBottomRightRadius: wp(8),
          }}>
          <Header onPressBack={() => props.navigation.goBack()} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {props.userValue.photoURL && (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{uri: props.userValue.photoURL}}
                />
              </View>
            )}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(2),
                marginBottom: hp(4),
              }}>
              <Text
                style={{
                  fontFamily: fonts.RobotoBold,
                  fontSize: wp(4.5),
                  color: colors.buttonText,
                }}>
                {props.userValue.email ? props.userValue.email : 'email'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{marginRight: wp(1)}}>
                  <Image style={styles.location} source={images.location} />
                </View>
                <Text
                  style={{
                    fontFamily: fonts.RobotoRegular,
                    fontSize: wp(3.5),
                    color: colors.buttonText,
                    opacity: 0.5,
                  }}>
                  {props.userValue.location
                    ? props.userValue.location
                    : 'location'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: wp(85), marginVertical: hp(4)}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(routes.ANALYTICS)}
            style={{
              height: hp(6),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.PoppinsRegular,
                fontSize: wp(4),
                color: colors.textColor,
              }}>
              Analytics
            </Text>
          </TouchableOpacity>
          <View style={{backgroundColor: colors.search, height: hp(0.1)}} />
          <TouchableOpacity
            style={{
              height: hp(6),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.PoppinsRegular,
                fontSize: wp(4),
                color: colors.textColor,
              }}>
              Help
            </Text>
          </TouchableOpacity>
          <View style={{backgroundColor: colors.search, height: hp(0.1)}} />
        </View>
        {props.userValue.isAdmin && (
          <Button
            backgroundColor={colors.secondary}
            onPress={() => onPressUploadProducts()}
            title={'Upload Products'}
          />
        )}
        <Button
          backgroundColor={colors.secondary}
          onPress={() => onPressLogout()}
          title={'Log Out'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(10),
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: wp(32),
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp(32),
    height: hp(20),
    borderRadius: wp(25),
    resizeMode: 'contain',
  },
  location: {
    width: wp(3.5),
    height: hp(3.5),
    resizeMode: 'contain',
  },
  buttonContainer: {
    paddingVertical: hp(0.5),
  },
});

function mapStateToProps(state) {
  return {
    userValue: state.auth.user,
  };
}

export default connect(mapStateToProps, null)(AccountScreen);
