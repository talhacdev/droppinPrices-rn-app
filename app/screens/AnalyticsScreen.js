import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function AnalyticsScreen(props) {
  return (
    <View style={styles.container}>
      <Text>AnalyticsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnalyticsScreen;
