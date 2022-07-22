import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CartScreen from '../screens/CartScreen';
import StripeScreen from '../screens/StripeScreen';

const Stack = createStackNavigator();

const CartNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Stripe" component={StripeScreen} />
  </Stack.Navigator>
);

export default CartNavigator;
