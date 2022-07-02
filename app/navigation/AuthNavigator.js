import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import SplashScreen from '../screens/SplashScreen';
import OnBoardingOneScreen from '../screens/OnBoardingOneScreen';
import OnBoardingTwoScreen from '../screens/OnBoardingTwoScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
    <Stack.Screen name="OnBoardingOne" component={OnBoardingOneScreen} />
    <Stack.Screen name="OnBoardingTwo" component={OnBoardingTwoScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
