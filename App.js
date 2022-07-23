import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './app/redux/Store';
import {StripeProvider} from '@stripe/stripe-react-native';

import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from './app/navigation/rootNavigation';

import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  const [publishableKey, setPublishableKey] = useState('');
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const fetchPublishableKey = async () => {
    // const key = await fetchKey(); // fetch key from your server here
    const key =
      'pk_test_51IjevCI8Q9YBwmn9SjPwKVo394wLHmSoLyoxGTHPkhhGWMPm8vFY6V8mzLzYr2gFjpczu9VaPHFWW3Oo3xukDTdx00EIzk6Tff';
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <PaperProvider>
            <NavigationContainer ref={navigationRef}>
              {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
}
