//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, requireNativeComponent, TouchableNativeFeedback, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import Navig from "../Nav";

//Navig instance for geolocation
const navig = new Navig();
//Geolocation array => [longitude, latitude, timestamp]
const geoLoc = navig.getLocation();                                        //Location doesn't update until user clicks to allow location services button
           
const MapEditor = () => {
        
return (
  
  <MapView
    style = {styles.mapEditor}
    loadingEnabled = {true}
    region={{
      latitude: geoLoc[1],
      longitude: geoLoc[0],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />

);
};

const styles = StyleSheet.create({
  mapEditor: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: "relative"
  }
});

export default MapEditor;
