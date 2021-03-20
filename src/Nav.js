import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


class Navig extends Component {

  constructor() {
    super();
  }
  //need to check it again before submitting report to ensure user is where they tell they are
  getLocation() {
    let locArr = [];
      navigator.geolocation.getCurrentPosition(
         position => {
          locArr.push(position.coords.longitude);
          locArr.push(position.coords.latitude);
          locArr.push(position.timestamp);
          console.log("Longitude is :", locArr[0]);
          console.log("Latitude is :", locArr[1]);
          console.log("Whole geolocation data:", position);
       });  
    return locArr;
  }
}

export default Navig;
    
    //navigator.permissions.query({name:'geolocation'}).then(function(result) {
    //Will return ['granted', 'prompt', 'denied']
    // console.log(result.state);
    //});
    