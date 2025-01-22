import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Search from './Search';
import Discover from './Discover';
import Profile from './Profile';




const Tabs = createBottomTabNavigator();

const layout = () => {

  return (
    <Tabs.Navigator options={{headerShown:false}}>
        <Tabs.Screen name="Search" component={Search} options={{headerShown:false}}/>
        <Tabs.Screen name="Discover" component={Discover} options={{headerShown:false}}/>
        <Tabs.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
       
    </Tabs.Navigator>
  )
}

export default layout

const styles = StyleSheet.create({})