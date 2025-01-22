import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const API_KEY = 'AIzaSyBytYxNvID5K7YZ_NRgkHRhVJz3tBfnutQ';

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where You Going?</Text>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search Destination"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log("Place Selected:", data);
            console.log("Place Details:", details);
          }}
          query={{
            key: API_KEY,
            language: 'en',
          }}
          debounce={300}
          styles={{
            container: {
              flex: 1,
              width: '100%',
              marginTop: 10,
            },
            textInputContainer: {
              width: '100%',
            },
            textInput: {
              height: 40,
              fontSize: 16,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#ccc',
              paddingLeft: 10,
              borderRadius:99,
            },
            poweredContainer: {
              display: 'none', // Hides the Powered by Google logo
            },
          }}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
    fontFamily:'Outfit-Bold'
  },
  searchContainer: {
    marginTop: 30,
    width: '100%',
    padding: 10,
  },
});
