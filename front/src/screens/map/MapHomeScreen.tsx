import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {colors} from '@/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator.tsx';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator.tsx';
import useUserLocation from '@/hooks/useUserLocation.ts';
import usePermission from '@/hooks/usePermission.ts';
import mapStyle from '@/style/mapStyle.ts';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen(/*{navigation}*/) {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const {userLocation, isUserLocationError} = useUserLocation();
  const mapRef = useRef<MapView | null>(null);
  const [selectLocation, setSelectLocation] = useState<LatLng>();
  usePermission('LOCATION');

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };
  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      longitudeDelta: 0.0421,
      latitudeDelta: 0.0922,
    });
  };

  // 1. 나의 위치를 구하고

  // 2. 지도를 그곳으로 이동

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}>
        <Marker
          coordinate={{
            latitude: 37.5516032365118,
            longitude: 126.98989626020192,
          }}
        />
        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>
      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,

    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapHomeScreen;
