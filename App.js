//By the Crowdie Team, 2021

//IMPORTS
import React, {useEffect, useState} from 'react';
import { StyleSheet, View,ScrollView,Text,Pressable } from 'react-native';
import {supabase} from './Components/Supabase.js';
import Home from './Components/Home';
import Login from './Components/Login';

//MAIN

export default function App() {

  const [user, setUser] = useState(null);
    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );

        return () => {
            authListener?.unsubscribe();
        };
    }, [user]);

  return (
      <View style={styles.container}>
         {!user ? <Login /> : <Home user={user} />}
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
  }
});
