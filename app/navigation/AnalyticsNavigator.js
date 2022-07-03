import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AnalyticsScreen from '../screens/AnalyticsScreen';

const Stack = createStackNavigator();

const AnalyticsNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Analytics" component={AnalyticsScreen} />
  </Stack.Navigator>
);

export default AnalyticsNavigator;
