import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LikedScreen from '../screens/LikedScreen';

const Stack = createStackNavigator();

const LikedNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Liked" component={LikedScreen} />
  </Stack.Navigator>
);

export default LikedNavigator;
