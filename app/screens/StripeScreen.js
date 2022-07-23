import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CardField, useStripe} from '@stripe/stripe-react-native';

import Button from '../components/Button';

import colors from '../config/colors';

function StripeScreen(props) {
  const {confirmPayment} = useStripe();
  const [key, setKey] = useState();

  useEffect(() => {
    const data = JSON.stringify({items: [{id: 'xl-tshirt'}]});
    const requestOptions = {
      method: 'POST',
      body: data,
    };
    fetch(
      'https://droppin-prices.herokuapp.com/create-payment-intent',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setKey(result.clientSecret);
      })
      .catch(error => console.log('useEffect error', error));
  }, []);

  const handlePayment = async () => {
    const {error} = await confirmPayment(key, {
      paymentMethodType: 'Card',
      billingDetails: {
        email: 'JohnDoe@gmail.com',
      },
    });

    if (error) {
      alert(error);
    } else {
      alert('Payment successful');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp(4),
      }}>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: colors.search,
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: hp(4),
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      {key && (
        <Button
          backgroundColor={colors.secondary}
          onPress={() => handlePayment()}
          title={'Pay now'}
        />
      )}
    </View>
  );
}

export default StripeScreen;
