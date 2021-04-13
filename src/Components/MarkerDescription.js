//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, requireNativeComponent, TouchableNativeFeedback, Dimensions} from 'react-native';

           
const MarkerDescription = ({report}) => {
        
return (
  
    <View style = {styles.bubble}>
       <View style ={styles.row}> 
       <Text style = {styles.title}>
            Report Sheet
        </Text>
       </View>
       <View style ={styles.row}> 
        <Text>
            Report Code: {report.CODE}
            Report Coordinates: {report.LAT} , {report.LON}
        </Text>
        </View>
    </View>

);
};

const styles = StyleSheet.create({
 bubble: {
     backgroundColor: '#fff',
     padding: 5,
     width: 200
 },
 row: {
     flex: 1,
 },
 title: {
    fontSize: 16,
    marginBottom: 5,
    flex: 1
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
