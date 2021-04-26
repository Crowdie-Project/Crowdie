import React, { useEffect, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, ScrollView, Alert, Modal, Pressable} from 'react-native';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import moment from 'moment';

const Timeline = ({startDate,endDate,onChange}) => {

    const [modalVisible, setModalVisible] = useState(false);
   
   
 
      
  

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
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
                
           </Pressable> 
        
              <View style={styles.filterWrapper}>
                  
                  <Text style={styles.header}>Timeline filter</Text>
                  <DatePicker
                         dateFormat="YYYY/MM/DD"
                         selected={startDate}
                         onChange={onChange}
                         startDate={startDate}
                         endDate={endDate}
                         selectsRange
                         inline
                 />
       
                
                  <Button title="filter" style={styles.button}  onPress={() => setModalVisible(false)} color="#662EDD"></Button>
              </View>
                 
        </View> 
        </View>
  
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Timeline</Text>
        </Pressable>
      </View>
       
      );
  };
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      zIndex: 199999,
      top: 20,
      right: 20
    },
    modalContainer:{
      flexDirection: "column",
      backgroundColor: "#DEDEDE",
      width: 400,
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
      width: "100%"
    },
    filterWrapper: {
      paddingHorizontal: 50,
      paddingBottom: 50
    },
    scrollview: {
      height: 250
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: "center"
    },
    button: {
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#fff",
      padding: 20,
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.5,
      shadowRadius: 10
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
      color: "#000",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
    });
  
  export default Timeline;













