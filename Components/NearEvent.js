import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, requireNativeComponent, TouchableNativeFeedback, Dimensions} from 'react-native';
import moment from 'moment';
           
const NearEvent = ({report}) => {
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
                <Text style = {styles.descr}>{report.CODE}</Text>
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
     }
    });
    
    export default NearEvent;
    