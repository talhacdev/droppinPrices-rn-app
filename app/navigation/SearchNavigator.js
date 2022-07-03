import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const SearchNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Search" component={SearchScreen} />
  </Stack.Navigator>
);

export default SearchNavigator;
