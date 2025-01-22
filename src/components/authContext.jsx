// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userEmail = await AsyncStorage.getItem('loggedInUser');
      setIsLoggedIn(userEmail ? true : false);
    };

    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    // Mock the login logic
    await AsyncStorage.setItem('loggedInUser', email);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
