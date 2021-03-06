//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet,FlatList, requireNativeComponent, TouchableNativeFeedback, Dimensions} from 'react-native';
import MapView, { Marker, Callout}from 'react-native-maps';
import Navig from "./Nav";
import MarkerDescription from "./MarkerDescription";
//Navig instance for geolocation
const navig = new Navig();
//Geolocation array => [longitude, latitude, timestamp]
const geoLoc = navig.getLocation();    //Location doesn't update until user clicks to allow location services button
          
const currLoc = [0,0];

navigator.geolocation.getCurrentPosition(
  position => {
    currLoc[0] = position.coords.latitude;
    currLoc[1] = position.coords.longitude;
  });

const MapEditor = ({points,colors,filter}) => {
  

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
    showsUserLocation = {true}
    loadingEnabled = {true}
  >
     {points.map((point) => (
    <Marker
      key={point.id}
      coordinate={[point.LAT,point.LON]}
      description={<MarkerDescription report={point}/>}
      pinColor={colors.filter(color => color.CategoryCode == point.CategoryCode).map(color => color.HexCode)[0]}
      opacity={point.COUNT/5}
    
    />     
    
  ))}
  <Marker 
    coordinate={[currLoc[0],currLoc[1]]}
    />
  </MapView>

);
};

const styles = StyleSheet.create({
  mapEditor: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: "relative"
  },
});

export default MapEditor;
