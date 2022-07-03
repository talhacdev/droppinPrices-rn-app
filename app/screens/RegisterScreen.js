import React from 'react';
import {View, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import HeaderText from '../components/HeaderText';
import Footer from '../components/Footer';

import routes from '../navigation/routes';

import colors from '../config/colors';

function RegisterScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <HeaderText
          headerText={'Sign up & get started'}
          subHeaderText={
            'We’ll text you a verification code. Message and data rates may apply.'
          }
        />
        <View style={styles.middleContainer}>
          <TextInput
            placeholder={'Email'}
            // defaultValue={'hello@droppinprices.com'}
          />
          <TextInput
            placeholder={'Password'}
            secureTextEntry
            // defaultValue={'123456'}
          />
          <TextInput
            placeholder={'Confirm Password'}
            secureTextEntry // defaultValue={'123456'}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => props.navigation.navigate(routes.LOGIN)}
            title={'Sign up'}
          />
          <Button
            onPress={() => props.navigation.navigate(routes.ON_BOARDING_ONE)}
            backgroundColor={colors.secondary}
            title={'Skip to Home'}
          />
        </View>
      </View>
      <Footer
        leftText={'Already have an accout? '}
        hyperlinkText={'Sign in'}
        onPress={() => props.navigation.navigate(routes.LOGIN)}
      />
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
  middleContainer: {
    paddingVertical: hp(1),
  },
  buttonContainer: {
    paddingVertical: hp(0.5),
  },
});

export default RegisterScreen;
