import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { API_KEY } from '../utils/OpenWeatherMapApiKey'
import { WeatherConditions } from '../utils/WeatherConditions'

const Weather = (props) => {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let day = date.getDate();
  let month = date.toLocaleString('en-us', { month: 'short' });
  
  let weatherBackgroundColor = '#2899b7'; 
  let view =  <ActivityIndicator size="large" color="#0000ff" /> ; 
 
  if(props.forecast.city !== undefined) {
      let uri = 'http://openweathermap.org/img/w/'+ props.forecast.list[0].weather[0].icon + '.png?appid=' + API_KEY;
      weatherDescriptionShort = props.forecast.list[0].weather[0].main;
      weatherBackgroundColor = weatherDescriptionShort ? WeatherConditions[weatherDescriptionShort].color : weatherBackgroundColor;
      view = 
        <View style={[styles.weatherContainer, { backgroundColor: weatherBackgroundColor }]}>
            <View style={[styles.container, styles.header]}>
                <Text style={styles.dateTime}>{hour}:{minutes}</Text>
                <Text style={styles.dateTime}>{day} {month}</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Image 
                    source={{ uri: uri }} 
                    style={{ width: 150, height: 150, alignSelf: "center", marginBottom: 75 }}/>
                <Text style={styles.temperature}>{Math.round(props.forecast.list[0].main.temp)}°</Text>
                <Text style={styles.weatherCondition}>{props.forecast.list[0].weather[0].description.toUpperCase()}</Text>
            </View>
            <View style={[styles.container, styles.footer]}>
                <Text style={styles.location}>{props.forecast.city.name}</Text>
                <Text style={styles.location}>{props.forecast.city.country}</Text>   
            </View>
        </View>;
  }
  
  return (
    <ScrollView style={[styles.weatherContainer, { backgroundColor: weatherBackgroundColor }]}>
        {view}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    alignSelf: 'stretch',
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    margin: 25,
    padding: 5,
    alignItems: 'flex-end', 
    height: '15%'
  },
  footer: {
    marginBottom: 10,
    marginTop: 15,
    alignItems: 'flex-end',
    bottom: 0,
    marginBottom: 20,
    height: '5%'
  },
  dateTime: {
    fontSize: 36,
    color: '#fff',
    margin: 10
  },
  bodyContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 25,
    marginBottom: 5,
    paddingBottom: 40,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    height: '90%'
  },
  temperature: {
    fontSize: 48,
    color: '#fff',
    alignSelf: 'center',
    margin: 5
  },
  weatherCondition: {
    fontSize: 24,
    color: '#fff',
    alignSelf: 'center',
    margin: 10
  },
  location: {
    fontSize: 28,
    color: '#fff',
    marginLeft: 25,
    marginRight: 25  
  }
});

export default Weather;