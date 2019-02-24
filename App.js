import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, Button } from 'react-native';
import Weather from './components/Weather';
import { API_KEY } from './utils/OpenWeatherMapApiKey';

export default class App extends React.Component {
  state = {
    isLoading: true,
    date: null,
    latitude: 0,
    longitude: 0,
    forecast: [],
    chosenCity: null,
    error:''
  };
  
  componentDidMount() {
    this.getLocation();
  }
  
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      			(position) => {
				this.setState(
					(prevState) => ({
					latitude: position.coords.latitude, 
					longitude: position.coords.longitude
					}), () => { this.getWeather(); }
				);
			},
      { enableHighAccuracy: true, timeout: 20000 }
    );
  }

  getWeather() {
    let url;
    url = this.state.chosenCity !== null ?
     'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.chosenCity + '&units=metric&appid=' + API_KEY :
     'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=' + API_KEY;

		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.setState(
        (prevState) => ({
				  forecast: data,
          isLoading: false
        })
			);
		});
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : 
         (<Weather
            forecast={this.state.forecast}/>)
        } 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2899b7',
    alignItems: 'center',
    justifyContent: 'center',
  },
    loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  }
});
