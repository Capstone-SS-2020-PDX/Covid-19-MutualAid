import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';

import { AuthContext } from '../providers/AuthProvider';
import Colors from '../config/colors';

const Map = props => {
  const { radius, location } = props;
  const { user } = useContext(AuthContext);
  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  useEffect(() => {
    
  }, [user.profile.home_location]);

  if (location) {
    var point = location;
    point = point.slice(point.indexOf('(') + 1, point.indexOf(')'));
    var longitude = parseFloat(point.slice(0, point.indexOf(' ')));
    var latitude = parseFloat(point.slice(point.indexOf(' ') + 1));
    var modifiedPoint = {latitude, longitude};
    var truePoint = {latitude, longitude};
  }
  else {
    console.log("null point");
  }


  // const parseLocation = point => {

  //   let longitude = parseFloat(point.slice(0, point.indexOf(' ')));
  //   let latitude = parseFloat(point.slice(point.indexOf(' ') + 1));
  //   let parsedPoint = {latitude, longitude};

  //   return parsedPoint;
  // };

  // let modifiedPoint = parseLocation(location);
  // let truePoint = modifiedPoint;

   // This dynamically calculates a safe value to shift the true location while still ensuring
   // that the radius will encompass the point
  const generateRandomCircleCenter = (radius, modifiedPoint) => {
    radius = radius - 50; // give us some breathing room

    // get degree shift based on radius
    // this guarantees the shifted point will be within radius
    let deg = Math.sqrt((radius * radius) / 2 ) / 111320;
    // console.log("Degree shift: " + deg);
    let lat = Math.random() * (deg - (-deg)) - deg;
    let lng = Math.random() * (deg - (-deg)) - deg;

    // console.log(lat + ', ' + lng);

    modifiedPoint.latitude = modifiedPoint.latitude + lat;
    modifiedPoint.longitude = modifiedPoint.longitude + lng;
  }

  generateRandomCircleCenter(radius, modifiedPoint);

  const changeRegion = () => {
    setRegion({
      ...region,
      ...modifiedPoint,
    })
  };

  return(
    <View style={{ ...styles.mapContainer, ...props.style }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: 150,
          width: '100%',
        }}
        initialRegion={{
          ...modifiedPoint,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={changeRegion}
      >
        { props.no_circle ? null
          :
          <Circle
            center={modifiedPoint}
            radius={radius}
            fillColor={Colors.map_circle_fill}
            strokeColor={Colors.map_circle_stroke}
          />
        }
        { props.hide_point ? null
          : <Marker
                 coordinate={truePoint}
          />
        }
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.light_shade4,
    marginTop: 10,
    marginBottom: 10,
  },

});

export default Map;
