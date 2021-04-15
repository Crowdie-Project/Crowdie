//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, requireNativeComponent, TouchableNativeFeedback, Dimensions} from 'react-native';

           
const MarkerDescription = ({report}) => {
    
var reportCat="";
var reportCode="";

switch(report.CODE) {
    case 1201:
        reportCat = "Generic Infrastructure Problem";
        reportCode = "Water Outage";
    break;
    case 1202:
        reportCat = "Generic Infrastructure Problem";
        reportCode = "Natural Gas Outage";
    break;
    case 1203:
        reportCat = "Generic Infrastructure Problem";
        reportCode = "Electricity Outage";
    break;
    case 1204:
        reportCat = "Generic Infrastructure Problem";
        reportCode = "Internet Outage";
    break;
    case 1301:
        reportCat = "Generic Traffic and Transportation Problem";
        reportCode = "Roadwork";
    break;
    case 1302:
        reportCat = "Generic Traffic and Transportation Problem";
        reportCode = "Traffic Accident";
    break;
    case 1303:
        reportCat = "Generic Traffic and Transportation Problem";
        reportCode = "Lights are broken";
    break;
    case 1304:
        reportCat = "Generic Traffic and Transportation Problem";
        reportCode = "Traffic Lights are broken";
    break;
    case 1401:
        reportCat = "Natural Disaster";
        reportCode = "Flood";
    break;
    case 1402:
        reportCat = "Generic Infrastructure Problem";
        reportCode = "Storm";
    break;
    case 1403:
        reportCat = "Generic Infrastructure Problem";
        reportCode = "Earthquake";
    case 1501:
        reportCat = "Generic Urban Problem";
        reportCode = "Sudden Bang";
    break;
    case 1502:
        reportCat = "Generic Urban Problem";
        reportCode = "Noise Polution";
    break;
    case 1503:
        reportCat = "Generic Urban Problem";
        reportCode = "Environmental Odors";
    break;
    case 1504:
        reportCat = "Generic Urban Problem";
        reportCode = "Celebratory Gunfire";
    break;
    case 1601:
        reportCat = "Generic Environmental Problem";
        reportCode = "Litter";
    break;
    case 1602:
        reportCat = "Generic Environmental Problem";
        reportCode = "Clean-water Pollution";
    break;
    case 1603:
        reportCat = "Generic Environmental Problem";
        reportCode = "Air Pollution";
    break;
    case 1701:
        reportCat = "Generic Health Problem";
        reportCode = "Unable to receive medical services";
    break;
    case 1702:
        reportCat = "Generic Health Problem";
        reportCode = "Unable to receive vaccination";
    break;
    case 1703:
        reportCat = "Generic Health Problem";
        reportCode = "Unable to receive treatment";
    break;
    case 1801:
        reportCat = "Extraordinary Circumstances";
        reportCode = "Unable to receive Covid-19 testing";
    break;
    case 1802:
        reportCat = "Extraordinary Circumstances";
        reportCode = "Unable to receive Covid-19 vaccination";
    break;
    case 1803:
        reportCat = "Extraordinary Circumstances";
        reportCode = "Covid-19 Health Regulation Violation";
    break;
    case 3101:
        reportCat = "Spontaneous Social Events";
        reportCode = "Flash Mob";
    break;
    case 3201:
        reportCat = "One-day Social Events ";
        reportCode = "Concert";
    break;
    case 3202:
        reportCat = "One-day Social Events ";
        reportCode = "Play";
    break;
    case 3203:
        reportCat = "One-day Social Events ";
        reportCode = "Bazaar";
    break;
    case 3301:
        reportCat = "Daily Social Events";
        reportCode = "Fair";
    break;
    case 3302:
        reportCat = "Daily Social Events";
        reportCode = "Festival";
    break;
    case 3303:
        reportCat = "Daily Social Events";
        reportCode = "Art Gallery";
    break;
    default:
}

return (
  
    <View style = {styles.bubble}>
       <View style ={styles.row}> 
       <Text style = {styles.title}>
            Report Sheet
        </Text>
       </View>
       <View style ={styles.row}> 
        <Text style ={styles.subTitle}>
            Category: 
            <Text style = {styles.descr}>{reportCat}</Text>
        </Text>
        <Text style ={styles.subTitle}>
            Code: 
            <Text style = {styles.descr}>{reportCode}</Text>
        </Text>
        <Text style ={styles.subTitle}>
            Coordinates: 
            <Text style = {styles.descr}>{report.LAT} , {report.LON}</Text>
        </Text>
        <Text style ={styles.subTitle}>
            Time: 
            <Text style = {styles.descr}>{report.TIME}</Text>
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
    color: '#84131f',
    fontWeight: 'bold',
    marginBottom: 5,
    flex: 1
 },
 subTitle: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 5,
    flex: 1
 },
 descr: {
    fontSize: 14,
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
