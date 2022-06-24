import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import OnBoardingOneScreen from '../screens/OnBoardingOneScreen';
import OnBoardingTwoScreen from '../screens/OnBoardingTwoScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="OnBoardingOne" component={OnBoardingOneScreen} />
    <Stack.Screen name="OnBoardingTwo" component={OnBoardingTwoScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
