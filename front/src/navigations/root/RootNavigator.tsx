import React from 'react';
import AuthStackNavigator from '../stack/AuthStackNavigator.tsx';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator.tsx';

function RootNavigator() {
  const isLoggedIn = true;
  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
