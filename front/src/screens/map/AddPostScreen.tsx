import React from 'react';
import {Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator.tsx';
import {mapNavigations} from '@/constants';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params;
  return (
    <View>
      <Text>{location.latitude}</Text>
      <Text>{location.longitude}</Text>
    </View>
  );
}

export default AddPostScreen;
