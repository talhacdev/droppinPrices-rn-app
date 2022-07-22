import React, {useState, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Keyboard} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import HeaderText from '../components/HeaderText';
import Footer from '../components/Footer';

import routes from '../navigation/routes';

import colors from '../config/colors';

function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  // const onPressSkipToHome = () => {
  //   auth()
  //     .signInAnonymously()
  //     .then(() => {
  //       console.log('User signed in anonymously');
  //     })
  //     .catch(error => {
  //       alert(error);
  //     });
  // };

  const onPressSignUp = () => {
    if (email || password || confirmPassword) {
      if (password == confirmPassword) {
        axios
          .post('https://droppin-prices.herokuapp.com/signup', {
            email,
            password,
          })
          .then(function (response) {
            if (!response?.data?.message) {
              createUser(response.data);
            } else {
              alert(response.data.message);
            }
          });
      } else {
        alert('The passwords mismatch.');
      }
    }
  };

  const createUser = res => {
    let userObject = {
      isAdmin: false,
      displayName: null,
      email: res.email,
      location: null,
      phoneNumber: null,
      photoURL: null,
      uid: res.uid,
      analytics: [],
    };

    firestore()
      .collection('users')
      .doc(userObject.uid)
      .set(userObject)
      .then(() => {
        console.log('User Created!');
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      <View style={styles.container}>
        <HeaderText
          headerText={'Sign up & get started'}
          // subHeaderText={
          //   'We’ll text you a verification code. Message and data rates may apply.'
          // }
          subHeaderText={'Let’s get acquainted.'}
        />
        <View style={styles.middleContainer}>
          <TextInput
            onChangeText={text => setEmail(text)}
            defaultValue={email}
            placeholder={'Email'}
          />
          <TextInput
            secureTextEntry
            onChangeText={text => setPassword(text)}
            defaultValue={password}
            placeholder={'Password'}
          />
          <TextInput
            secureTextEntry
            onChangeText={text => setConfirmPassword(text)}
            defaultValue={confirmPassword}
            placeholder={'Confirm Password'}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            disabled={!email || !password || !confirmPassword}
            onPress={() => onPressSignUp()}
            title={'Sign up'}
          />
          {/* <Button
            onPress={() => onPressSkipToHome()}
            backgroundColor={colors.secondary}
            title={'Skip to Home'}
          /> */}
        </View>
      </View>
      {!isKeyboardVisible && (
        <Footer
          leftText={'Already have an accout? '}
          hyperlinkText={'Sign in'}
          onPress={() => props.navigation.navigate(routes.LOGIN)}
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

export default RegisterScreen;
