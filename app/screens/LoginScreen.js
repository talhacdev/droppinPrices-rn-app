import React from 'react';
import {View, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import routes from '../navigation/routes';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import HeaderText from '../components/HeaderText';
import Footer from '../components/Footer';

import colors from '../config/colors';

function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <HeaderText
          headerText={'Log in & continue'}
          subHeaderText={'Let’s get acquainted.'}
        />
        <View style={styles.middleContainer}>
          <TextInput placeholder={'Email'} />
          <TextInput placeholder={'Password'} />
          <TextInput placeholder={'Confirm Password'} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title={'Login'} />
          <Button
            onPress={() => props.navigation.navigate(routes.ON_BOARDING_ONE)}
            backgroundColor={colors.secondary}
            title={'Skip to Home'}
          />
        </View>
      </View>
      <Footer
        leftText={'New to DroppinPrices? '}
        hyperlinkText={'Sign up'}
        onPress={() => props.navigation.navigate(routes.REGISTER)}
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

export default LoginScreen;
