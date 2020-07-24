import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Center from '../components/Center';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AuthContext } from '../providers/AuthProvider';

const HomeScreen = props => {
  const { logout } = useContext(AuthContext);

  return(
    <Center>
      <Text>
        Home Screen
      </Text>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={{
          height: 300,
          width: 300,
        }}
        initialRegion={{
          latitude: 45.5051,
          longitude: -122.6750,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </Center>
  );
};

export default HomeScreen;
