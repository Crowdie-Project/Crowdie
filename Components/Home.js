//REACT IMPORTS
import React, {useEffect, useState} from 'react';
import { StyleSheet, View,ScrollView,Text,Pressable } from 'react-native';
import Report from './Report';
import {supabase} from './Supabase.js';
import MapEditor from './MapEditor';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';




const Home = ({user}) => {
    const [reports, setReports] = useState([]);
    const [EventCategories, setEventCategories] = useState([]);
    const [Colors, setColors] = useState([]);
    const [selectedFilter, setFilter] = useState([]);
  
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
  }, [selectedFilter]);
  
    const fetchReports = async () => {
      let { data: reports, error } = await supabase
          .from("TestReports")
          .select("*")
          .in('CategoryCode', selectedFilter)
          .order("id", { ascending: false });
      if (error) console.log("error", error);
      else setReports(reports);
  };
  
  
  useEffect(() => {
    fetchMainCategories().catch(console.error);
  },[]);
  
  const fetchMainCategories = async () => {
      
    let { data: EventCategories, error } = await supabase
          .from('EventCategories')
          .select("*")
          // Filters
          .eq('ParentCode', '0')
          if (error) console.log("error", error);
          else setEventCategories(EventCategories);
  };
  
  useEffect(() => {
    fetchCategoryColors().catch(console.error);
  },[]);
  
  const fetchCategoryColors = async () => {
      
    let { data: Colors, error } = await supabase
          .from('ColorCodes')
          .select("*")
          if (error) console.log("error", error);
          else setColors(Colors);
        let defaultFilter = Colors.map((color) => color.CategoryCode)  
        setFilter(defaultFilter)
  };
  
  const filterSelected = (newFilter) => {
    if (selectedFilter == newFilter){
      setFilter(Colors.map((color) => color.CategoryCode))
    }else{
      setFilter([newFilter])
    }
  }

  const handleLogout = async () => {
    supabase.auth.signOut().catch(console.error);
};

    return (
        <View style={styles.container}>
      <Report
           reports={reports}
           setReports={setReports}
           EventCategories={EventCategories}
           setEventCategories={setEventCategories}
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
        <MapEditor points={reports} colors={Colors} filter={selectedFilter}/>   
        <View style={styles.filterContainer}>
         {Colors.map((color) => (
           <Pressable
           style={[styles.button,{backgroundColor:color.HexCode}]}
           onPress={() => filterSelected(color.CategoryCode)}
         >
           <Text style={styles.textStyle}>{color.CategoryCode}</Text>
         </Pressable>
         ))}
       
        </View>
        <View style={styles.logoutContainer}>
        <Pressable 
               style={styles.buttonLogout}
               onPress={handleLogout}>
                  <Text style={styles.LogoutText}>Log out</Text>
         </Pressable>
        </View>
    </View> 
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D1D1D1',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row'
    },
    reportWrapper: {
      backgroundColor: '#fff',
      padding: 15,
      position: "absolute",
      zIndex: 9999,
      left: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.5,
      shadowRadius: 10
    },
    filterContainer: {
      padding: 10,
      position: "absolute",
      zIndex: 9999,
      right: 10
    },
    scrollview: {
      height: 150,
      padding: 5
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10
    },
    reports: {
      fontSize: 14
    },
    mapEditor: {
      height: 180,
      width: 180,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    button: {
      padding: 10,
      elevation: 2,
      marginVertical: 5,
      borderRadius: 20
    },
    LogoutText: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18
      },
      logoutContainer: {
        padding: 10,
        position: "absolute",
        zIndex: 9999,
        right: 10,
        bottom: 20
      },
    buttonLogout: {
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
      }
  });

export default Home;