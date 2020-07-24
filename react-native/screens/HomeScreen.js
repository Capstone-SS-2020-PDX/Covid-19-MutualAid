import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Center from '../components/Center';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { AuthContext } from '../providers/AuthProvider';

const HomeScreen = props => {
  const { logout } = useContext(AuthContext);
  var Latlng = {
    latitude: 45.435170,
    longitude:-122.640020
  };

  console.log(Latlng);

  const rando = (latlng) => {
      let num = Math.random() * (0.03 - (-0.03)) - 0.03;
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
        radius={5000}
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
