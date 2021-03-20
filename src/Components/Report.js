//By the CrowdChain Team, 2021

//IMPORTS AND REQUIRES

//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet} from 'react-native';

//SUPABASE IMPORTS
import { createClient } from '@supabase/supabase-js';

//const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
import {supabase} from './Supabase.js';

//MODULE IMPORTS
import Navig from "../Nav";


//////////////////
//MAIN
//////////////////

const Report = () => {

  
  //Navig instance for geolocation
  const navig = new Navig();
  //Geolocation array => [longitude, latitude, timestamp]
  const geoLoc = navig.getLocation();                                                 //Location doesn't update until user clicks to allow location services button


  const [reports, setReports] = useState([]);
  const codeRef = useRef();
  const latRef = useRef();
  const lonRef = useRef();
  const reporterRef = useRef();
  const [errorText, setError] = useState("");


  useEffect(() => {
  
    // let url = window.location.hash;
    // let query = url.substr(1);
    // let result = {};

    // query.split("&").forEach((part) => {
    //     const item = part.split("=");
    //     result[item[0]] = decodeURIComponent(item[1]);
    // });

    // if (result.type === "recovery") {
    //     setRecoveryToken(result.access_token);
    // }

    fetchReports().catch(console.error);
}, []);

  const fetchReports = async () => {
    let { data: reports, error } = await supabase
        .from("TestReports")
        .select("*")
        .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setReports(reports);
};

  const addReport = async () => {
    let codeText = codeRef.current.value;
    let code = codeText.trim();
    let latText = latRef.current.value;
    let lat = latText.trim();
    let lonText = lonRef.current.value;
    let lon = lonText.trim();
   // let reporterText = reporterRef.current.value;
   // let reporter = reporterText.trim();
   
    const { data: report, error } = await supabase
    .from('TestReports')
    .insert([
      { CODE: code, LAT: lat, LON: lon},
    ])
    if (error) setError(error.message);
    else {
        setReports([report, ...reports]);
        setError(null);
        codeRef.current.value = "";
        latRef.current.value = "";
        lonRef.current.value = "";
    }
  };
  
  

    return (
       <View style={styles.container}>
            <View style={styles.reportWrapper}>
                
                <Text style={styles.header}>Reporter Applet</Text>
                
                <TextInput ref={codeRef} placeholder="Code" style={styles.input}></TextInput>
                <TextInput ref={latRef} placeholder="Lat" style={styles.input}></TextInput>
                <TextInput ref={lonRef} placeholder="Lon" style={styles.input}></TextInput>
                <TextInput  placeholder="Reporter" style={styles.input}></TextInput>
                
                <Button title="submit" onPress={addReport} style={styles.btn} color="#662EDD"></Button>
            </View>
            <View style={styles.reportWrapper}>
                
                <Text style={styles.header}>Reported Events</Text>
                
                {reports.length ? (
                        reports.map((report) => (
                            <Text style={styles.reports}>code: {report.CODE} lat: {report.LAT} lon: {report.LON}</Text>
                        ))
                    ) : (
                        <span
                            className=
                                "h-full flex justify-center items-center"
                        >
                            You do have any reported events yet!
                        </span>
                    )}
              
                
               
            </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
       justifyContent: "space-evenly",
       flexDirection: "row"
  },
  reportWrapper: {
    flex:1,
    padding: 50,
    width: 400
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
    fontSize: 18,
    height: 30,
    paddingHorizontal: 5,
    borderWidth: 1,
  },
    btn: {
      
    }
  });

export default Report;