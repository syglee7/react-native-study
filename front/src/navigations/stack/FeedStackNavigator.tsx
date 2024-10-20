import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {colors, feedNavigations} from '@/constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen.tsx';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft.tsx';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen.tsx';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
};
const Stack = createStackNavigator<FeedStackParamList>();
function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 15},
        headerTintColor: 'black',
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {backgroundColor: 'white', shadowColor: 'gray'},
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
export default FeedStackNavigator;
