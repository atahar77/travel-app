import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Signin from '../Signin';
import { useNavigation } from '@react-navigation/native';
import App from '../../../App';
import Signup from '../Signup';

const Profile = ({navigation}) => {
  // const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      console.log('Current Navigation State:', navigation.getState());
      await AsyncStorage.removeItem('loggedInUser'); // Remove logged-in user
      Toast.show({ type: 'success', text1: 'Logged out successfully!' });
      // setIsLoggedIn(null);
      // setIsLoggedIn(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Signin' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Toast.show({ type: 'error', text1: 'An error occurred during logout.' });
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Profile</Text>

      <View style={{marginTop:50,backgroundColor:'black',width:'50%',borderRadius:99}}>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center',padding:10}}
      onPress={handleLogout}
      >
        <Text style={{color:'white',fontFamily:'Outfit-Medium',fontSize:20}}>Logout</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({

  
  container:{
    height:'100%',
    width:'100%',
    alignItems:'center',
    // justifyContent:'center'
  },
  head:{
    fontSize:30,
    fontFamily:'Outfit-Bold',
    marginTop:'25%'
  },
})