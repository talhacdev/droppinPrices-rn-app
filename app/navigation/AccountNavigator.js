import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import UploadProductScreen from '../screens/UploadProductScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Analytics" component={AnalyticsScreen} />
    <Stack.Screen name="UploadProduct" component={UploadProductScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
