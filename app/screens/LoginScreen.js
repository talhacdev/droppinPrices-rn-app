import React, {useState, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Keyboard} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import HeaderText from '../components/HeaderText';
import Footer from '../components/Footer';

import routes from '../navigation/routes';

import colors from '../config/colors';

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onPressSkipToHome = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        alert(error);
      });
  };

  const onPressLogin = () => {
    if (email || password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      <View style={styles.container}>
        <HeaderText
          headerText={'Log in & continue'}
          // subHeaderText={'Let’s get acquainted.'}
        />
        <View style={styles.middleContainer}>
          <TextInput
            defaultValue={email}
            onChangeText={text => setEmail(text)}
            placeholder={'Email'}
          />
          <TextInput
            secureTextEntry
            defaultValue={password}
            onChangeText={text => setPassword(text)}
            placeholder={'Password'}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => onPressLogin()}
            disabled={!email || !password}
            title={'Login'}
          />
          <Button
            onPress={() => onPressSkipToHome()}
            backgroundColor={colors.secondary}
            title={'Skip to Home'}
          />
        </View>
      </View>
      {!isKeyboardVisible && (
        <Footer
          leftText={'New to DroppinPrices? '}
          hyperlinkText={'Sign up'}
          onPress={() => props.navigation.navigate(routes.REGISTER)}
        />
      )}
    </KeyboardAvoidingView>
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
