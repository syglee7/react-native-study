import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth.ts';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  return (
    <View>
      <Text>맵스크린</Text>
      <Button title={'로그아웃'} onPress={() => logoutMutation.mutate(null)} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
