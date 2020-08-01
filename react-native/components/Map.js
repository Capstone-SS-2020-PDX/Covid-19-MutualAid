import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from '../config/colors';

const Map = props => {
  const { radius, point } = props;

  const parseCoordinates = () => {
    let longitude = parseFloat(point.slice(0, point.indexOf(' ')));
    let latitude = parseFloat(point.slice(point.indexOf(' ') + 1));
    let coordinates = {latitude, longitude};
    // let truePoint = {latitude, longitude};

    return coordinates;
  };


  const coordinates = parseCoordinates();

  return(
    <View style={{ ...styles.mapContainer, ...props.style }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: 250,
          width: 250,
        }}
        initialRegion={{
          ...coordinates,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* <Circle */}
        {/*   center={circleCenter} */}
        {/*   radius={radius} */}
        {/*   fillColor='rgba(50,10,10,0.2)' */}
        {/* /> */}
        <Marker
          coordinate={coordinates}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.light_shade4,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10
  },

});

export default Map;
