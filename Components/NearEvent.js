import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, Pressable} from 'react-native';
import moment from 'moment';
import {supabase} from './Supabase.js';
import { MaterialCommunityIcons } from "@expo/vector-icons";
           
const NearEvent = ({report,confirmReport}) => {
    const [liked, setLiked] = useState(false);
    const [title,setTitle] = useState([]);
    
    const likefunction = async (id) => {
         setLiked((isLiked) => !isLiked);
         confirmReport(id,liked);
    }

    useEffect(() => {
        fetchCategories().catch(console.error);
      },[]);
      
      const fetchCategories = async () => {
          
        let { data: title, error } = await supabase
              .from('EventCategories')
              .select('*')
              // Filters
              .eq('ChildCode', report.CODE)
              if (error) console.log("error", error);
              else setTitle(title);
      };
      

    return (
  
        <View style={styles.suggestions}>
                 <Text style={styles.title}>{title.map(x=> x.Child)[0]}</Text>

       
            <View style={styles.textstyle}>
            <Text>Coordinates {report.LAT} , {report.LON}</Text>
            </View>
            <View style={styles.textstyle}>
                <Text>Reported at {moment(report.TIME).format('HH:MM DD-MM-YYYY')}</Text>
            </View>
            <View style={styles.textstyle}>
            <Text>Confirmed by {report.COUNT} people </Text>
            </View>
             <Pressable 
             style={styles.buttonConfirm}
               onPress={() => likefunction(report.id)}>
                 <Text style={styles.buttonTextStyle}>Re-port</Text>
                  <MaterialCommunityIcons
        name={liked ? "star-circle" : "star-circle-outline"}
        size={32}
        color={liked ? "green" : "black"}
      />
               </Pressable>     
</View>
    
    );
    };
    
    const styles = StyleSheet.create({
        buttonConfirm:{
            marginTop: 10,
            alignSelf: "flex-end",
            flexDirection: "row"
          },
          confirmText:{
            fontSize: 16,
            color: "#fff",
            textAlign: "center",
          },
     title: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 5,
        flex: 1
     },
     suggestions:{
        padding: 15,
        backgroundColor: "#FFF",
        marginBottom:5,
     },
     textstyle:{
         marginBottom: 5
     },
     buttonTextStyle: {
      color: "#555555",
      fontWeight: "bold",
      textAlign: "center",
      alignSelf: "center",
      fontSize: 16,
      marginEnd: 5
    },
    });
    
    export default NearEvent;
    