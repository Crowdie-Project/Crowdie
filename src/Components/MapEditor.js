//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, requireNativeComponent, TouchableNativeFeedback} from 'react-native';
import MapView from 'react-native-maps';
import Navig from "./Nav";

const MapEditor = () => {
const position = [41.191557499999995, 29.0488561]

//Navig instance for geolocation
const navig = new Navig();
//Geolocation array => [longitude, latitude, timestamp]
const geoLoc = navig.getLocation();                                        //Location doesn't update until user clicks to allow location services button
           

return (
<View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>

);
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 180,
    width: 180,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

export default MapEditor;
