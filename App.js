import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather';

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
    this.setState({
      isLoading: false
    });
  }

  getWeather() {
    let url;
    url = this.state.chosenCity !== null ?
     'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.chosenCity + '&units=metric&appid=24397676dee49d7a99746855d1f357ed' :
     'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=24397676dee49d7a99746855d1f357ed';

		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.setState(
        (prevState) => ({
				  forecast: data
        })
			);
		});
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
            <Weather
              forecast={this.state.forecast}/>
        )} 
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
});
