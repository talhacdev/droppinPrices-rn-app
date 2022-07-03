import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function LikedScreen(props) {
  return (
    <View style={styles.container}>
      <Text>LikedScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LikedScreen;
