import React, { useEffect, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, ScrollView, Alert, Modal, Pressable, CheckBox} from 'react-native';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectMultiple from 'react-native-select-multiple'
import moment from 'moment';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Filtering = ({startDate,endDate,onChange,eventCategories,selectedCategories,setSelectedCategories}) => {

    const [modalVisible, setModalVisible] = useState(false);
    
    
 
   const categories =  eventCategories.map(category => {var container = {};
    container["label"] = category.Child; container["value"] = category.ChildCode.toString(); return container;});
   //[{label:"event1", value: "event1v"},{label:"event2", value:"event2v"}];
  
      
   const onSelectionsChange = (selected) => {
    // selectedCategories is array of { label, value }
      if (selected == []){
        setSelectedCategories([]);
      }else{
      setSelectedCategories(selected.map( ({label,value}) => value));
      }
  };

  
   const clearFilters = () => {
      setSelectedCategories([]);
      onChange([null,null]);
      setModalVisible(false);
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
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
                
           </Pressable>
           <View style={styles.filterWrapper}>
           <View >
             <Text style={styles.header}>Select a date range</Text>
                  <DatePicker
                         dateFormat="YYYY/MM/DD"
                         selected={startDate}
                         onChange={onChange}
                         startDate={startDate}
                         endDate={endDate}
                         selectsRange
                         inline
                 />
       
            
              </View>
              
              <View style={styles.filterContainer}>
   <Text style={styles.header}>Select event categories</Text>
           <SelectMultiple
         items={categories}
         selectedItems={selectedCategories}
         onSelectionsChange={onSelectionsChange}
        />
          
         </View>
       
           </View>
           <Pressable
          style={[styles.buttonFilter]}
          onPress={clearFilters}
        >
          <Text style={styles.filtertextStyle}>Clear filters</Text>
        </Pressable>

        </View> 
        </View>
  
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
           <MaterialCommunityIcons
        name={"filter"}
        size={28}
        color={"black"}
      />
          <Text style={styles.textStyle}>Filter</Text>
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
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "rgba(100,100,100,0.75)",
      width: "100%"
    },
    filterWrapper: {
      paddingHorizontal: 50,
      paddingBottom: 20,
      flexDirection: 'row'
    },
    filterContainer: {
      marginLeft: 20,
      height: 300,
      justifyContent: "center"
    },
    filtertextStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    buttonFilter: {
      padding: 10,
      elevation: 2,
      borderRadius: 5,
      margin: 20,
      backgroundColor: "#3781D2"
    },
    scrollview: {
      height: 300
    },
    header: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: "center"
    },
    button: {
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#fff",
      padding: 10,
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      flexDirection: "row"
    },
    buttonClose: {
      alignSelf: "flex-end",
      right: 10,
      top: 10
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
      alignSelf: "center",
      fontSize: 18
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
    });
  
  export default Filtering;













