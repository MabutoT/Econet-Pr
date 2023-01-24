import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TextInput, Button,ScrollView} from 'react-native';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const baseUrl = "http://localhost:8080";

export default function App() {

  const [firstName, setFirstName] = useState("");
  
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [createAt, setCreateAt] = useState("");

  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeFirstHandler = (firstName) => {
    setFirstName(firstName);
  };

  const onChangeLastNameHandler = (lastName) => {
    setLastName(lastName);
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onChangeCreatAtHandler = (createAt) => {
    setCreateAt(createAt);
  };

  const onChangePhotoHandler = (photo) => {
    setPhoto(photo);
  };

  
  
  const onSubmitFormHandler = async (event) => {
    if (!firstName.trim() || !email.trim())  {
      alert(" invalid Information");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/clients`, {
        firstName,
        lastName,
        email,
        createAt,
        photo
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setCreateAt('');
        setPhoto('');
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred ");
      setIsLoading(false);
    }
  };

  return (

    <View style={styles.container}>
      <Text  style={styles.formHeading}>Create Client Account</Text>
      <View>

      <TextInput style={styles.input}
          placeholder="First Name" 
          autoCapitalize="none"
          placeholderTextColor='white'
          editable={!isLoading}
          onChangeText ={onChangeFirstHandler}
          />

          <TextInput  style={styles.input}
          placeholder="Last Name" 
          autoCapitalize="none"
          placeholderTextColor='white'
          editable={!isLoading}
          onChangeText ={onChangeLastNameHandler}
         />
        <TextInput  style={styles.input}
          placeholder="Email" 
          autoCapitalize="none"
          placeholderTextColor='white'
          editable={!isLoading}
          onChangeText={onChangeEmailHandler}
          />
    
    <TextInput  style={styles.input}
          placeholder="dateCreated YYYY-MM-DD" 
          autoCapitalize="none"
          placeholderTextColor='white'
          editable={!isLoading}
          onChangeText ={onChangeCreatAtHandler}
          />
          <TextInput  style={styles.input}
          placeholder="Photo Type" 
          autoCapitalize="none"
          placeholderTextColor='white'
          editable={!isLoading}
          onChangeText ={onChangePhotoHandler}
          />
        </View>

        
        <Button title="Create" 
        onPress={onSubmitFormHandler}
        style={styles.submitButton}
        disabled={isLoading} />
        
        
      

    </View>
   
  );
}

const styles = StyleSheet.create({

  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  submitButton: {
    backgroundColor: "gray",
    padding: 100,},

    formHeading: {
      color: "red",
      fontWeight: 'bold',
      fontSize: 18,
      },
});
