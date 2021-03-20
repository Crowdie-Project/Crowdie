//By the CrowdChain Team, 2021

//IMPORTS
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Report from './Components/Report';

//ENVIRONMENT
//import env from './config/env';
//console.log(env);
//console.log("__DEV__ ?",__DEV__);
//env contains env.SUPABASE_URL, env.SUPABASE_KEY

//MAIN

export default function App() {


  return (
    <View style={styles.container}>
        
       <Report/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1D1D1',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
