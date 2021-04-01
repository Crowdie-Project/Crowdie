import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


class Navig extends Component {

  constructor() {
    super();
    this.locArr = [-1, -1, -1];
  }
  //need to check it again before submitting report to ensure user is where they tell they are
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
      this.locArr[0] = position.coords.longitude;
      this.locArr[1] = position.coords.latitude;
      this.locArr[2] = position.timestamp;
      //console.log("Whole geolocation data:", position);
      this.showLocs();  
    });
    return this.locArr;
  }

  showLocs() {
    console.log("Longitude is :", this.locArr[0]);
    console.log("Latitude is :", this.locArr[1]);
    console.log("Timestamp is :", this.locArr[2]);
  }
}

export default Navig;
    
    //navigator.permissions.query({name:'geolocation'}).then(function(result) {
    //Will return ['granted', 'prompt', 'denied']
    // console.log(result.state);
    //});
    