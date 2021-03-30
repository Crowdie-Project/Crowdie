//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, requireNativeComponent, TouchableNativeFeedback} from 'react-native';
import MapView from 'react-native-maps';

const MapEditor = () => {
const position = [41.191557499999995, 29.0488561]
        
return (
  <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />

);
};
const styles = StyleSheet.create({
  mapEditor: {
    height: 180,
    width: 180,
  }
});

export default MapEditor;
