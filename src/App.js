//By the CrowdChain Team, 2021

//IMPORTS
import React, {useEffect, useState} from 'react';
import { StyleSheet, View,ScrollView,Text } from 'react-native';
import Report from './Components/Report';
import {supabase} from './Components/Supabase.js';
import MapEditor from './Components/MapEditor';


//ENVIRONMENT
//import env from './config/env';
//console.log(env);
//console.log("__DEV__ ?",__DEV__);
//env contains env.SUPABASE_URL, env.SUPABASE_KEY

//MAIN

export default function App() {
  const [reports, setReports] = useState([]);
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

  return (


    <View style={styles.container}>
      <Report
           reports={reports}
           setReports={setReports}
         />
       <View style={styles.reportWrapper}>
                 <Text style={styles.header}>Reported Events</Text>
                   <ScrollView style={styles.scrollview}>
               
                    
                    {reports.length ? (
                        reports.map((report) => (
                            <Text key={report.id} style={styles.reports}>
                              code: {report.CODE} lat: {report.LAT} lon: {report.LON}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.reports}>
                            You do have any reported events yet!
                        </Text>
                    )}
                

                </ScrollView>

          </View>  
           <MapEditor></MapEditor>    
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1D1D1',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  reportWrapper: {
    padding: 20
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
  mapEditor: {
    height: 180,
    width: 180,
  }
});
