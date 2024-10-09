import React from 'react';

import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthHomeScreen from './src/screens/AuthHomeScreen.tsx';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AuthHomeScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
  },
});

export default App;
