//LIBRARY IMPORTS
import React, {useEffect, useState} from 'react';
import { StyleSheet, View,ScrollView,Text,Pressable, Button } from 'react-native';
import timeSeriesClustering from 'time-series-clustering';
import moment from 'moment';
import {readString} from 'react-papaparse';

//LOCAL IMPORTS
import {supabase} from './Supabase.js';
import Report from './Report';
import MapEditor from './MapEditor';
import Timeline from './Timeline';

//ADDITIONAL DATA
import cats from '../reportCodes/categories.csv';

const Home = () => {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [EventCategories, setEventCategories] = useState([]);
  const [Colors, setColors] = useState([]);
  const [selectedFilter, setFilter] = useState([]);
//date
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);


const onChange = dates => {
  const [start, end] = dates;
  setStartDate(start);
  setEndDate(end);
};


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
  }, [selectedFilter,startDate,endDate]);
  
    const fetchReports = async () => {
      var filterStart = startDate;
      var filterEnd = moment(endDate).add(1,'days');
      if (startDate == null && endDate == null){
        filterStart = moment(new Date()).subtract(24,'hours');
        filterEnd = new Date();
      }
      let { data: reports, error } = await supabase
          .from("TestReports")
          .select("*")
          .in('CategoryCode', selectedFilter)
          .gt('TIME',moment(filterStart).format('YYYY-MM-DDTHH:MM:SS') )
          .lt('TIME',moment(filterEnd).format('YYYY-MM-DDTHH:MM:SS'))
          .order("id", { ascending: false });
      if (error) console.log("error", error);
      else setReports(reports);
  };
  
  //TODO MIGRATE
  useEffect(() => {
    fetchMainCategories().catch(console.error);
    //fetchSomeMore().catch(console.error);
  },[]);
  
  const fetchMainCategories = async () => {
    let { data: EventCategories, error } = await fetch(cats)
    .then(r => r.text())
    .then(csv => readString(csv,{header:true}))
      if (error)console.log("error", error);
      else{
        setEventCategories(EventCategories);
        //console.log("CATS!");
        //console.log(EventCategories);
      }
  }

  /*const fetchMainCategoriesLegacy = async () => {
      
    let { data: EventCategories, error } = await supabase
          .from('EventCategories')
          .select("*")
          // Filters
          .eq('ParentCode', '0')
          if (error)console.log("error", error);
          else{
            setEventCategories(EventCategories);
            //console.log("CATS!");
            //console.log(EventCategories);
          }
  };

  const fetchSomeMore = async () => {
    fetch(cats)
    .then(r => r.text())
    .then(csv => readString(csv,{header:true}))
    .then(c => {
      console.log('csv decoded:', c);
  },[]);
  }*/
  
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
  //TODO END
  
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

var getClusters = require('time-series-clustering');
var clusterConfig = {
  // max time distance for two items to be in the same cluster
  maxDistance: 60 * 60 * 1* 1000 * 1, // 1 hour
  // filter cluster with a time frame smaller than minTimeFrame
  minTimeFrame: 1 * 1 * 1 * 1000 * 1, // 1 second
  // min number of items to get a relevant cluster
  minRelevance: 2
};

function convertTime(timestamptz) {
  //2021-04-24T14:02:44+00:00
  var t = timestamptz.indexOf("T")
  var date = timestamptz.substring(0,t+9)+"Z"
  var d = new Date(date);
  var myEpoch = d.getTime();
  console.log(date)
  console.log(myEpoch)
  return myEpoch;
 
};

// var reportsforevents = EventCategories.map((category) => {
//   var eventList = [];
//   eventList = reports.filter(report => report.CategoryCode == category.ChildCode);
//   return eventList;
// });

// var reportlists = reportsforevents.map((lst) => {
// lst.map((report) => {
//   var container = {};
//   container["id"] = report.id;
//   container["value"] = convertTime(report.TIME);
//   return container;
// })
// });

// var convertedDataList = reportlists.map((reportlist) =>{
//      var convertedData = {};
//      convertedData["data"] = reportlist;
//      return convertedData;
// });



var reportlist = reports.map((report) => {
  var container = {};
  container["id"] = report.id;
  container["value"] = convertTime(report.TIME);
  return container;
});


var convertedData = {};
convertedData["data"] = reportlist;
     



    return (
        <View style={styles.container}>
      <Report
           reports={reports}
           setReports={setReports}
           EventCategories={EventCategories}
           setEventCategories={setEventCategories}
           user={user}
           setUser={setUser}
         />
  
       <Timeline 
       startDate={startDate}
       endDate={endDate}
       onChange={onChange}
       />
      {console.log(endDate)}
       <View style={styles.reportWrapper}>
                 <Text style={styles.header}>Reported Events</Text>
                   <ScrollView style={styles.scrollview}>
  {/* {convertedDataList.map((convertedData) =>
   (getClusters(convertedData, clusterConfig).clusters.map((cluster) => (
    <Text>
   {cluster.ids.map( (id) => (
      <Text>{"\n"}code:{reports.filter( report => report.id == id).map( report => report.CODE)}, time: {reports.filter( report => report.id == id).map( report => report.TIME)}</Text>
   ))} 
    </Text>
   )))
  )}
     */}
      

          
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
     {!user ? <View/> :
      <View style={styles.logoutContainer}>
        <Pressable 
               style={styles.buttonLogout}
               onPress={handleLogout}>
                  <Text style={styles.LogoutText}>Log out</Text>
         </Pressable>
        </View>
        } 
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
      height: 250,
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
        color: "#fff",
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
        backgroundColor: "#000",
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