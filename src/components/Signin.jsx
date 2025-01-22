import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const Signin = ({navigation}) => {
  // const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    try {
      const existingUsers =
        JSON.parse(await AsyncStorage.getItem('users')) || {};

      if (!email || !password) {
        Toast.show({
          type: 'error',
          text1: 'Please fill in all fields.',
          position: 'bottom',
        });
        return;
      }
      if (existingUsers[email] && existingUsers[email] === password) {
        // Successful login
        await AsyncStorage.setItem('loggedInUser', email);
        // setIsLoggedIn(true);
        Alert.alert('Success', 'Login Successful!', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate({
                index: 0,
                routes: [{name: 'Tabs'}],
              }),
          },
        ]);
        const user = existingUsers[email];
        console.log(user);
      } else {
        // Invalid credentials
        Toast.show({type: 'error', text1: 'Invalid email or password.'});
        return;
      }
    } catch (error) {
      console.error('Error during login:', error);
      Toast.show({type: 'error', text1: 'An error occurred during login.'});
      return;
      // Alert.alert('Error', 'An error occurred during login.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} backgroundColor={'black'} />

      <TouchableOpacity
        style={[styles.backButton]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.head}>Let's Sign You In</Text>
      <View style={styles.subhead}>
        <Text style={styles.subhead1}>Welcome Back</Text>
        <Text style={styles.subhead1}>You've been missed!</Text>
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
        <TouchableOpacity onPress={handleSignin}>
          <Text style={styles.in}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.out}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.in, {color: 'black'}]}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;

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
  subhead: {
    marginTop: '5%',
  },
  subhead1: {
    fontSize: 30,
    fontFamily: 'Outfit-Medium',
    marginTop: 10,
    color: 'grey',
  },
  Email: {
    marginTop: '12%',
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
    marginTop: '5%',
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
