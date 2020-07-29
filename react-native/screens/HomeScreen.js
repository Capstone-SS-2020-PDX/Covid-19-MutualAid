import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Center from '../components/Center';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { AuthContext } from '../providers/AuthProvider';

const HomeScreen = props => {
  const radius = 4000;
  const { logout } = useContext(AuthContext);
  var latlng = {
    latitude: 45.435170,
    longitude:-122.640020
  };
  const truePoint = {
    latitude: 45.435170,
    longitude:-122.640020
  };

  console.log(latlng);

  /*
    This dynamically calculates a safe value to shift the true location while still ensuring
    that the radius will encompass the point
  */
  const rando = (radius, latlng) => {
    radius = radius - 50; // give us some breathing room

    // get degree shift based on radius
    // this guarantees the shifted point will be within radius
    let deg = Math.sqrt((radius * radius) / 2 ) / 111320; 
    console.log("Degree shift: " + deg);
    let lat = Math.random() * (deg - (-deg)) - deg;
    let lng = Math.random() * (deg - (-deg)) - deg;

    console.log(lat + ', ' + lng);

    latlng.latitude = latlng.latitude + lat;
    latlng.longitude = latlng.longitude + lng;
  }

  rando(radius, latlng);

  console.log(latlng);

  return(
    <Center>
      <Text>
        Home Screen
      </Text>
      <View>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={{
          height: 300,
          width: 300,
        }}
        initialRegion={{
          latitude: 45.3051,
          longitude: -122.4750,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Circle
        center={latlng}
        radius={radius}
        fillColor='rgba(50,10,10,0.2)'
        />
        <Marker
        coordinate={truePoint}
        />
      </MapView>
      </View>
    </Center>
  );
};

export default HomeScreen;