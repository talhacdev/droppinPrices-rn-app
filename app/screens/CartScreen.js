import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function CartScreen(props) {
  return (
    <View style={styles.container}>
      <Text>CartScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;
