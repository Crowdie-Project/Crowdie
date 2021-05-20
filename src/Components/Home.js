//LIBRARY IMPORTS
import React, {useEffect, useState} from 'react';
import { StyleSheet, View,ScrollView,Text,Pressable, Button } from 'react-native';
import timeSeriesClustering from 'time-series-clustering';
import moment from 'moment';
import AnomalyDetection from './AnomalyDetection';

import {readString} from 'react-papaparse';


//LOCAL IMPORTS
import {supabase} from './Supabase.js';
import {RECHandler} from './RECHandler.js';

import Report from './Report';
import MapEditor from './MapEditor';

//import Timeline from './Timeline';
import Filtering from './Filtering';
import NearEvent from './NearEvent';


//ADDITIONAL DATA
import cats from '../reportCodes/categories.csv';
import ccolors from '../reportCodes/code-colors.csv';

const Home = () => {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [EventCategories, setEventCategories] = useState([]);
  const [Colors, setColors] = useState([]);
  const [selectedFilter, setFilter] = useState([]);
//date
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [selectedCategories,setSelectedCategories] = useState([]);

const [suggestions, setSuggestions] = useState([]);
const [currLoc,setCurrLoc] = useState([]);




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
      setFilter(selectedCategories);
     
      fetchReports().catch(console.error);
      fetchSuggestions().catch(console.error);

  }, [selectedFilter,selectedCategories,startDate,endDate]);
  
    const fetchReports = async () => {
      var filterStart = startDate;
      var filterEnd = moment(endDate).add(1,'days');
      if (startDate == null && endDate == null){
        filterStart = moment(new Date()).subtract(1,'days');
        filterEnd = new Date();
      }
     var filterCategory = selectedFilter;
       if (selectedCategories.length == 0){
     
         filterCategory = Colors.map((color) => color.CategoryCode) 
     }
      
      let { data: reports, error } = await supabase
          .from("TestReports")
          //.from("TestReports2")
          .select("*")
          .in('CategoryCode',filterCategory)
          .gt('TIME',moment(filterStart).format('YYYY-MM-DDTHH:MM:SS') )
          .lt('TIME',moment(filterEnd).format('YYYY-MM-DDTHH:MM:SS'))
          .order("id", { ascending: false });
      if (error) console.log("error", error);
      else{
        console.log("Using TestReports instead of TestReports2!");
        console.log("Remember to later switch to the new database for accomodating the new table!");
        //console.log("Using TestReports2 instead of TestReports!");
        console.log(reports)
        setReports(reports);
      }
  };
  
  //TODO MIGRATE
  useEffect(() => {
    fetchMainCategories().catch(console.error);
    //fetchSomeMore().catch(console.error);
  },[]);
  
  //2nd Version
  /*const fetchMainCategories = async () => {
    let { data: EventCategories, error } = await fetch(cats)
    .then(r => r.text())
    .then(csv => readString(csv,{header:true}))
      if (error)console.log("error", error);
      else{
        console.log("HMMM");
        console.log(EventCategories);
        setEventCategories(EventCategories);
        //console.log("CATS!");
        //console.log(EventCategories);
      }
  }*/

  //1st Version
  const fetchMainCategories = async () => {
      
    let { data: EventCategories, error } = await supabase
          .from('EventCategories')
          .select("*")
          // Filters
          .eq('ParentCode', '0')
          if (error)console.log("error", error);
          else{
            setEventCategories(EventCategories);
            console.log("CATS!");
            console.log(EventCategories);
          }
  };

  /*const fetchSomeMore = async () => {
    fetch(cats)
    .then(r => r.text())
    .then(csv => readString(csv,{header:true}))
    .then(c => {
      console.log('csv decoded:', c);
  },[]);
  }*/

  console.log("SPECIAL DELIVERY!");
  console.log(RECHandler.listAllCategories());
  
  useEffect(() => {
    fetchCategoryColors().catch(console.error);
  },[]);

  /*LEGACY
  */

  //2nd Version
  /*const fetchCategoryColors = async () => {
    let { data: Colors, error } = await fetch(ccolors)
    .then(r => r.text())
    .then(csv => readString(csv,{header:true}))
      if (error)console.log("error", error);
      else setColors(Colors);
      let defaultFilter = Colors.map((color) => color.CategoryCode);  
      setFilter(defaultFilter);
  }*/
  
  //1st Version
  const fetchCategoryColors = async () => {
      
    let { data: Colors, error } = await supabase
          .from('ColorCodes')
          .select("*")
          if (error) console.log("error", error);
          else setColors(Colors);
        let defaultFilter = Colors.map((color) => color.CategoryCode)  
        setFilter(defaultFilter)
  };


  //LEGACY END

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


var normalReports = [];

// var reportlist = reports.map((report) => {
//   var container = {};
//   container["id"] = report.id;
//   container["value"] = convertTime(report.TIME);
//   return container;
// });


// var convertedData = {};
// convertedData["data"] = reportlist;

useEffect(() => {
 
  fetchSuggestions().catch(console.error);
}, [EventCategories]);

const fetchSuggestions = async () => {

  navigator.geolocation.getCurrentPosition(
    position => {
       setCurrLoc([position.coords.latitude,position.coords.longitude]);
    });
  
  const { data: suggestions, error } = await supabase
      .from("TestReports")
      .select("*")
      .gt('LON', currLoc[1]-0.1)
      .lt('LON',currLoc[1]+0.1)
      .gt('LAT', currLoc[0]-0.1)
      .lt('LAT', currLoc[0]+0.1)
      .gt('TIME',moment(new Date()).subtract(1,'days').format('YYYY-MM-DDTHH:MM:SS') )
//      .lt('TIME',moment(new Date()).format('YYYY-MM-DDTHH:MM:SS'))
      .order("id", { ascending: false });
  if (error) console.log("error", error);
  else setSuggestions(suggestions);
};

const confirmReport = async (id, liked) => {
  
   var value = 0;
   if(liked){
     value = -1;
   }else{
     value = 1;
   }

  const { data, error } = await supabase
  .rpc('updatecount', { value_to_add: value, row_id: id})

fetchReports()
fetchSuggestions()

};
normalReports = AnomalyDetection(reports);
    return (
        <View style={styles.container}>
     
      <Report
           reports={reports}
           setReports={setReports}
           EventCategories={EventCategories}
           setEventCategories={setEventCategories}
           user={user}
           setUser={setUser}
           suggestions={suggestions}
         />
  
       <Filtering 
       startDate={startDate}
       endDate={endDate}
       onChange={onChange}
       eventCategories={EventCategories}
       selectedCategories={selectedCategories}
       setSelectedCategories={setSelectedCategories}
       />
      {console.log(endDate)}
      <View style={styles.reportWrapper}>
      <View style={styles.nearHeaderContainer}>
          <Text style={styles.nearHeader}>Events Around You</Text>
</View>
        <ScrollView style={styles.scrollView}>
      {suggestions.length ? (suggestions.map((suggestion) => ( 
     <NearEvent report={suggestion}
     confirmReport={confirmReport}/>
          /*{reports.length ? (
              reports.map((report) => (
                  <Text key={report.id} style={styles.reports}>
                    code: {report.CODE} lat: {report.LAT} lon: {report.LON}
                  </Text>
              ))
          ) : (
              <Text style={styles.reports}>
                  No news yet!
              </Text>
          )}*/
         ))) :( 
    <View style={styles.empty}>
                    {/* {reports.length ? (
                        reports.map((report) => (
                            <Text key={report.id} style={styles.reports}>
                              code: {report.CODE} lat: {report.LAT} lon: {report.LON}
                            </Text>
                        ))
                    ) : (  */}

           <Text style={styles.reports}>
            There are no new events around you.
       
        </Text> 
    
</View>
          )}
          </ScrollView>
          </View>
       {/* <MapEditor points={normalReports} colors={Colors} filter={selectedFilter}/>   */}
        <MapEditor points={normalReports} colors={Colors} filter={selectedFilter}/>   
      
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
      padding: 15,
      position: "absolute",
      zIndex: 9999,
      left: 15
    },
    filterContainer: {
      padding: 10,
      position: "absolute",
      zIndex: 9999,
      right: 10
    },
    suggestions:{
       padding: 10,
       backgroundColor: "#FFF",
       marginBottom:5,
    },
    empty: {
      backgroundColor: "#fff",
      padding: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.3,
      shadowRadius: 10
    },
    scrollView:{
      height: 300,
      padding: 5
    },
    nearHeaderContainer:{
      padding: 5,
      backgroundColor: "purple"
    },
    nearHeader:{
      fontSize: 20,
      fontWeight: 'bold',
      color: "#fff",
      textAlign: "center"
    },
    header: {
      fontSize: 20,
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
      },
      buttonConfirm:{
        backgroundColor: "#000",
        padding: 5,
        justifyContent: 'center',
        width: 80,
        marginTop: 10,
        alignSelf: "flex-end"
      },
      confirmText:{
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
      }
  });

export default Home;
