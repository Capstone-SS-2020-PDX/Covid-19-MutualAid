import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';

const Map = props => {
    const { radius=2000, point } = props;

    const parseCoordinates = () => {
        let longitude = parseFloat(point.slice(0, point.indexOf(' ')));
        let latitude = parseFloat(point.slice(point.indexOf(' ') + 1));
        let coordinates = {latitude, longitude};
        // let truePoint = {latitude, longitude};

        return coordinates;
    };

    return(
        <View style={{ ...styles.mapContainer, ...props.style }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              height: 250,
              width: 250,
            }}
            initialRegion={{
              ...latlng,
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
    );
};

const styles = StyleSheet.create({

});

export default Map;
