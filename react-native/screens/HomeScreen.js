import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Center from '../components/Center';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { AuthContext } from '../providers/AuthProvider';

const HomeScreen = props => {
  const radius = 4000;
  const { logout } = useContext(AuthContext);
  var Latlng = {
    latitude: 45.435170,
    longitude:-122.640020
  };

  console.log(Latlng);

  /*
    This adds a value in the range of +/- 0.0247 degrees to the longitude and latitude of the point
    0.0247 degrees is equivalent to 2757.7 meters. So the maximum distance this could put between the actual
    location and the shifted location is 3,899.9m according to Pythagoras. With a radius of 4000m, the true
    point will always be within the shifted points radius
  */
  const rando = (latlng) => {
      let num = Math.random() * (0.0247 - (-0.0247)) - 0.0247;
      console.log(num);
      latlng.latitude = latlng.latitude + num;
      latlng.longitude = latlng.longitude + num;
  }

  rando(Latlng);

  console.log(Latlng);

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
        center={Latlng}
        radius={4000}
        fillColor='rgba(50,10,10,0.2)'
        />
        <Marker
        coordinate={{
          latitude: 45.420170,
          longitude:-122.540020
        }}
        />
      </MapView>
      </View>
    </Center>
  );
};

export default HomeScreen;