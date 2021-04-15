import React, { useRef, useState } from "react";
import {View, Text,TextInput, Button, StyleSheet, ScrollView, Alert, Modal, Pressable} from 'react-native';
import {supabase} from './Supabase.js';

const Login = () => {
    const [helperText, setHelperText] = useState({ error: null, text: null });
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLogin = async (type) => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const { user, error } =
            type === "LOGIN"
                ? await supabase.auth.signIn({ email, password })
                : await supabase.auth.signUp({ email, password });

        if (error) {
            setHelperText({ error: true, text: error.message });
        } else if (!user && !error) {
            setHelperText({
                error: false,
                text: "An email has been sent to you for verification!",
            });
        }
    };

    const handleOAuthLogin = async (provider) => {
        // You need to enable the third party auth you want in Authentication > Settings
        // Read more on: https://supabase.io/docs/guides/auth#third-party-logins
        let { error } = await supabase.auth.signIn({ provider });
        if (error) console.log("Error: ", error.message);
    };

    const forgotPassword = async (e) => {
        // Read more on https://supabase.io/docs/client/reset-password-email#notes
        e.preventDefault();
        const email = prompt("Please enter your email:");

        if (email === null || email === "") {
            setHelperText({ error: true, text: "You must enter your email." });
        } else {
            let { error } = await supabase.auth.api.resetPasswordForEmail(
                email
            );
            if (error) {
                console.error("Error: ", error.message);
            } else {
                setHelperText({
                    error: false,
                    text: "Password recovery email has been sent.",
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Login
            </Text>
          <View>
          <Text>*Email:</Text>
          <TextInput
          style={styles.input}
                type={"email"}
                ref={emailRef}
      ></TextInput>
          </View>
           <View>
           <Text>*Password:</Text>
            <TextInput
             style={styles.input}
                type={"password"}
                ref={passwordRef}
        ></TextInput>
           </View>
         
            {!!helperText.text && (
                <Text>
                    {helperText.text}
                </Text>
            )}
            <View>
                    <Pressable
                    style={styles.button}
                        type="submit"
                        onPress={() =>
                            handleLogin("REGISTER").catch(console.error)
                        }>
                        Sign Up
                    </Pressable>
                
                    <Pressable
                     style={styles.button}
                     onPress={() => handleLogin("LOGIN")}
                        type="button">
                        Sign In
                    </Pressable>
             
            </View>
            {/* <View>
             <Text>Or continue with</Text>
          

                <View>
                    
                            <Pressable
                             style={styles.button}
                             onPress={() => handleOAuthLogin("github")}
                                type="button">
                             <Text>GitHub</Text>   
                            </Pressable>
                 
                
                            <Pressable
                             style={styles.button}
                             onPress={() => handleOAuthLogin("google")}
                                type="button" >
                                <Text>Google</Text>
                            </Pressable>
                     
                </View>
            </View> */}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D1D1D1',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center"
      },
    input: {
      marginBottom: 20,
      fontSize: 16,
      height: 30,
      paddingHorizontal: 5,
      backgroundColor: '#EDEDED'
    },
  
    button: {
      padding: 5,
      elevation: 2,
      backgroundColor: "#fff",
      textAlign: 'center',
      marginVertical: 10
    },
   
    textStyle: {
      color: "#000",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18
    },
  
    });

export default Login;