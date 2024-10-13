import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {mapNavigations} from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen.tsx';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
};
const Stack = createStackNavigator<MapStackParamList>();
function MapStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 15},
        headerTintColor: 'black',
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {backgroundColor: 'white', shadowColor: 'gray'},
      }}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{headerTitle: ' ', headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MapStackNavigator;
