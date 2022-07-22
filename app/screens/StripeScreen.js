//App.js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Button,
  Text,
  View,
} from 'react-native';
import stripe from 'tipsi-stripe';

const StripeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  stripe.setOptions({
    publishableKey:
      'pk_test_51IjevCI8Q9YBwmn9SjPwKVo394wLHmSoLyoxGTHPkhhGWMPm8vFY6V8mzLzYr2gFjpczu9VaPHFWW3Oo3xukDTdx00EIzk6Tff',
  });

  useEffect(() => {
    const data = JSON.stringify({items: [{id: 'xl-tshirt'}]});
    const requestOptions = {
      method: 'POST',
      body: data,
    };
    fetch('http://localhost:8000/create-payment-intent', requestOptions)
      .then(response => response.text())
      .then(result => console.log('useEffect result: ', result))
      .catch(error => console.log('useEffect error', error));
  }, []);

  const confirmPaymentIntent = async () => {
    const options = {};
    // let client_secret =
    //   'pi_3LOHMSI8Q9YBwmn91w4htWta_secret_3CVIXEqCe0zJZ3Txd1PTctQQm';
    // let id = 'pi_3LOHMSI8Q9YBwmn91w4htWta';
    try {
      const result = await stripe.confirmPaymentIntent({
        clientSecret: client_secret,
        paymentMethodId: id,
      });
      console.log('Result', result);
      if (result.status == 'succeeded') {
        Alert.alert('Payment Sucessfull');
      }
    } catch (error) {
      console.log('confirmPaymentIntent Error', error);
    }
  };

  const handleCardPayPress = async () => {
    // const options = {}
    try {
      setLoading(true);
      const token = await stripe.paymentRequestWithCardForm();
      console.log('Token from Card ', token);
      setToken(token);
      setLoading(false);
      confirmPaymentIntent();
    } catch (error) {
      console.log('handleCardPayPress Error ', error);
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Card Form Example</Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button title="Enter you card and pay" onPress={handleCardPayPress} />
        <View style={styles.token}>
          {token && <Text style={styles.instruction}>Token: {token.id}</Text>}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});

export default StripeScreen;
