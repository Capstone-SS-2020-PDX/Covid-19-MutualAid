import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';

import { AuthContext } from '../providers/AuthProvider';
import Colors from '../config/colors';

const Map = props => {
  const { radius, location } = props;
  const { user } = useContext(AuthContext);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    changeRegion();
  }, [props.truePoint, props.circleCenter]);

  const changeRegion = () => {
    console.log('In changeRegion');
    setRegion({
      ...props.truePoint,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return(
    <View style={{ ...styles.mapContainer, ...props.style }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: 150,
          width: '100%',
        }}
        region={region}
      >
        { props.no_circle ? null
          :
          <Circle
            center={props.circleCenter}
            radius={radius}
            fillColor={Colors.map_circle_fill}
            strokeColor={Colors.map_circle_stroke}
          />
        }
        { props.hide_point ? null
          : <Marker
              coordinate={props.truePoint}
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
