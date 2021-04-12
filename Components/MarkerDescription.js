//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, requireNativeComponent, TouchableNativeFeedback, Dimensions} from 'react-native';

           
const MarkerDescription = ({report}) => {
        
return (
<View>    
    <View style = {bubble}>
        <Text style = {title}>
            Report Sheet
        </Text>
        <Text>
            Report Code: {report.CODE}
            Report Coordinates: {report.LAT} , {report.LONG}
        </Text>
    </View>
    <View style = {arrowBorder}/>
    <View style = {arrow}/>
</View>
);
};

const styles = StyleSheet.create({
 bubble: {
     flexDirection: 'row',
     alignSelf: 'flex-start',
     backgroundColor: '#fff',
     borderRadius: 6,
     borderColor: '#ccc',
     borderWidth: 0.5,
     padding: 15,
     width: 150,
 },
 title: {
    fontSize: 16,
    marginBottom: 5,
 },
 arrow: {
     backgroundColor: 'transparent',
     borderColor: 'transparent',
     borderTopColor: '#fff',
     borderWidth: 16,
     alignSelf: 'center',
     marginTop: 32,
 },
 arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
}
});

export default MarkerDescription;
