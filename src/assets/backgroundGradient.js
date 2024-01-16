import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function BackgroundGradient(props) {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 1, y: 1}}
      locations={[0.1, 0.5, 0.75, 1]}
      colors={['#0057B7', '#fff', '#FFDD00', '#fff']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default BackgroundGradient;
