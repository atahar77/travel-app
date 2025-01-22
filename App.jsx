import 'react-native-get-random-values';
import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Signin from './src/components/Signin';
import Home from './src/components/Home';
import Signup from './src/components/Signup';
import layout from './src/components/Tabs/layout';
import Tabs from './src/components/Tabs/layout';

// const AppContext = createContext();

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userEmail = await AsyncStorage.getItem('loggedInUser'); // Retrieve logged-in user's email
      setIsLoggedIn(userEmail ? true : false); // If email exists, user is logged in
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // Show a loading screen or splash while checking login status
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
          <Stack.Screen
            name='Tabs'
            component={Tabs}
            options={{headerShown: false}}
          />
          </>
          
          
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
