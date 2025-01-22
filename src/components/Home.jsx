
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Home = ({navigation}) => {
  return (
         <View>
         <Image
           style={{height: 580, width: '100%'}}
           source={require('../assets/images/ai.png')}
         />
         <View style={{height: '100%',backgroundColor:'white'}}>
           <Text
             style={{
               fontFamily: 'Outfit-Bold',
               justifyContent: 'center',
               textAlign: 'center',
               alignItems: 'center',
               fontSize: 40,
               marginTop: -20,
               backgroundColor: 'white',
               borderRadius: 99,
             }}>
             Travel App
           </Text>
           <Text
             style={{
               fontSize: 30,
               textAlign: 'center',
               marginTop: '7%',
               fontFamily: 'Outfit-Regular',
             }}>
             Welcome to the App!
           </Text>
           <View
             style={{
               marginTop: 50,
               justifyContent: 'center',
               alignItems: 'center',
             }}>
             <TouchableOpacity
             onPress={()=>navigation.navigate('Signup')}
               style={{
                 backgroundColor: 'black',
                 paddingVertical: 10,
                 paddingHorizontal: 20,
                 borderRadius: 99, // Rounded corners
                 borderWidth: 1,
                 width: '50%',
               }}>
               <Text style={{fontSize:25,fontFamily: 'Outfit-Regular',textAlign: 'center', color: 'white'}}>Login</Text>
             </TouchableOpacity>
           </View>
         </View>
       </View>
  )
}

export default Home

const styles = StyleSheet.create({})