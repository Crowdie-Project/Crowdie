//By the CrowdChain Team, 2021

//IMPORTS AND REQUIRES

//REACT IMPORTS
import React, { useEffect, useState, useRef} from 'react';
import {View, Text,TextInput, Button, StyleSheet, ScrollView, Alert, Modal, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
//SUPABASE IMPORTS
//import { createClient } from '@supabase/supabase-js';

//const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
import {supabase} from './Supabase.js';

//MODULE IMPORTS
import Navig from "../Nav";


//////////////////
//MAIN
//////////////////

const Report = ({reports,setReports}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  //Navig instance for geolocation
  const navig = new Navig();
  //Geolocation array => [longitude, latitude, timestamp]
  const geoLoc = navig.getLocation();                                        //Location doesn't update until user clicks to allow location services button
             


 // const [reports, setReports] = useState([]);
  const latRef = useRef();
  const lonRef = useRef();
  //const reporterRef = useRef();
  const [errorText, setError] = useState("");

  const [selectedEvent, setSelectedEvent] = useState();
  const eventTypes = {"doğal afetler": "101", "yangın": "102", "sosyal anket":"103"};


  const addReport = async () => {
   
    let latText = latRef.current.value;
    let lat = latText.trim();
    let lonText = lonRef.current.value;
    let lon = lonText.trim();
   // let reporterText = reporterRef.current.value;
   // let reporter = reporterText.trim();

   //if selected item is "seçiniz", user cannot submit report.
   if (!selectedEvent){
     return;
   }

    const { data: report, error } = await supabase
    .from('TestReports')
    .insert({ CODE: selectedEvent, LAT: lat, LON: lon})
    .single();
    if (error) setError(error.message);
    else {
        setReports([report, ...reports]);
        setError(null);
  
     //   latRef.current.value = "";
     //   lonRef.current.value = "";
    }
    setSelectedEvent(null)
    setModalVisible(!modalVisible)
  };
  
  

    return (
      <View style={styles.container}> 
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
      <View style={styles.centeredView}>
      <View style={styles.modalContainer}>
    
        <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButtonText}>X</Text>
              
         </Pressable> 
      
            <View style={styles.reportWrapper}>
                
                <Text style={styles.header}>Reporter Applet</Text>
                
                <Picker style={styles.picker}
                    selectedValue={selectedEvent}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedEvent(itemValue)
                    }>
                      <Picker.Item label="Seçiniz" value="" />  
                    {Object.entries(eventTypes).map(([key, value]) => (
                         <Picker.Item label={key} value={value} /> 
                    ))}
                   
                </Picker>
                <TextInput ref={latRef} placeholder="Lat" style={styles.input}></TextInput>
                <TextInput ref={lonRef} placeholder="Lon" style={styles.input}></TextInput>
                <TextInput placeholder="Reporter" style={styles.input}></TextInput>
                
                <Button title="submit" onPress={addReport} style={styles.btn} color="#662EDD"></Button>
            </View>
               
      </View> 
      </View>

      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Report</Text>
      </Pressable>
    </View>
     
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer:{
    flexDirection: "column",
    backgroundColor: "#DEDEDE",
    width: "fit-content",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(100,100,100,0.75)",
  },
  reportWrapper: {
    padding: 50
  },
  scrollview: {
    height: 250
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  reports: {
    fontSize: 14
  },
  input: {
    marginBottom: 20,
    fontSize: 16,
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: '#EDEDED'
  },
  picker: {
    marginBottom: 20,
    fontSize: 16,
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: '#EDEDED'
  },
  button: {
    padding: 10,
    width: "fit-content",
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#616161",
  },
  buttonClose: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "#616161",
    fontWeight: "bold",
    fontSize: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
  });

export default Report;