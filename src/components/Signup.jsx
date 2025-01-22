import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const Signup = ({navigation}) => {
  const isValidName = fullname => fullname.length >= 1;
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');

  const handleSignup = async () => {
    if (fullname.length === 0 && email.length === 0 && password.length === 0) {
      Toast.show({type: 'error', text1: 'Enter details'});
      return;
    }
    if (!isValidName(fullname)) {
      Toast.show({type: 'error', text1: 'Enter Name', position: 'bottom'});
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({type: 'error', text1: 'Invalid Email', position: 'bottom'});
      return;
    }

    if (!isValidPassword(password)) {
      Toast.show({
        type: 'error',
        text2: '',
        text1: 'Invalid Password',
        position: 'bottom',
      });
      return;
    }

    try {
      // Get existing users from AsyncStorage
      const existingUsers =
        JSON.parse(await AsyncStorage.getItem('users')) || {};

      if (existingUsers[email]) {
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: 'Email already registered.',
          position: 'bottom',
        });
      }

      // Save new user credentials
      existingUsers[email] = password;
      await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
      const user = existingUsers.user;
      console.log(user);

      Alert.alert('Signup Successful', 'You can now log in.', [
        {text: 'OK', onPress: () => navigation.navigate('layout')},
      ]);
    } catch (error) {
      console.error('Error during signup:', error);
      Toast.show({type: 'error', text: 'An error occurred during signup.'});
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.backButton]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.head}>Create New Account</Text>

      <View style={styles.fullanme}>
        <Text style={{fontFamily: 'Outfit-Medium'}}>Full Name</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Enter Full Name"
          onChangeText={value => setFullName(value)}></TextInput>
      </View>

      <View style={styles.Email}>
        <Text style={{fontFamily: 'Outfit-Medium'}}>Email</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Enter Email"
          onChangeText={value => setEmail(value)}></TextInput>
      </View>

      <View style={styles.password}>
        <Text style={{fontFamily: 'Outfit-Medium'}}>Password</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Enter Password"
          onChangeText={value => setPassword(value)}></TextInput>
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.in}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.out}>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={[styles.in, {color: 'black'}]}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: '0%',
    height: '100%',
  },
  backButton: {
    marginTop: '0%',
  },
  backButtonText: {
    fontSize: 50,
  },
  head: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    marginTop: 20,
  },
  fullanme: {
    marginTop: '12%',
  },
  Email: {
    marginTop: 20,
  },
  textinput: {
    fontFamily: 'Outfit-Regular',
    borderRadius: 15,
    borderWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    padding: 10,
    fontSize: 15,
  },
  password: {
    marginTop: 20,
  },
  button: {
    marginTop: '15%',
    backgroundColor: 'black',
    borderRadius: 15,
  },
  in: {
    color: 'white',
    textAlign: 'center',
    padding: 20,
  },
  out: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
  },
});
