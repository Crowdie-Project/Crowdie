//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet,FlatList, requireNativeComponent, TouchableNativeFeedback, Dimensions} from 'react-native';
import MapView from "react-native-map-clustering";
import { Marker, Callout}from 'react-native-maps';
import Navig from "./Nav";
import MarkerDescription from "./MarkerDescription";
//Navig instance for geolocation
const navig = new Navig();
//Geolocation array => [longitude, latitude, timestamp]
const geoLoc = navig.getLocation();                                        //Location doesn't update until user clicks to allow location services button
           
const MapEditor = ({points,colors,filter}) => {
        
return (
 
  <MapView
    style = {styles.mapEditor}
    loadingEnabled = {true}
    initialRegion={{
      latitude: geoLoc[1],
      longitude: geoLoc[0],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
     {points.map((point) => (
    <Marker
      key={point.id}
      coordinate={{latitude: point.LAT,longitude: point.LON}}
    //  description={<MarkerDescription report={point}/>}
     // pinColor={colors.filter(color => color.CategoryCode == point.CategoryCode).map(color => color.HexCode)[0]}
    />     
    
  ))}
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
