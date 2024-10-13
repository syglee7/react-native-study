import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen.tsx';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen.tsx';
import MapStackNavigator, {
  MapStackParamList,
} from '@/navigations/stack/MapStackNavigator.tsx';
import {mainNavigations} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{drawerType: 'front', headerShown: false}}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedHomeScreen}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
