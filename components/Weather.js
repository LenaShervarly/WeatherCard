import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { API_KEY } from '../utils/OpenWeatherMapApiKey';
import { WeatherConditions } from '../utils/WeatherConditions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Moment from 'moment';

const Weather = (props) => {
  let weatherBackgroundColor = '#2899b7'; 
  let view =  <ActivityIndicator size="large" color="#0000ff" /> ; 
 
  if(props.forecast.city !== undefined) {
    Moment.locale('en');
    let date = props.date;
    
    weatherDescriptionShort = props.forecast.list[0].weather[0].main;
    weatherBackgroundColor = weatherDescriptionShort ? WeatherConditions[weatherDescriptionShort].color : weatherBackgroundColor;
    
    view = 
        <View style={[styles.weatherContainer, { backgroundColor: weatherBackgroundColor }]}>
            <View style={[styles.container, styles.header]}>
                <Text style={styles.dateTime}>{Moment(date).format('HH:MM')}</Text>
                <Text style={styles.dateTime}>{Moment(date).format('d MMM')}</Text>
            </View>
            <View style={styles.bodyContainer}>
                <MaterialCommunityIcons
                    size={150}
                    name={WeatherConditions[weatherDescriptionShort].icon}
                    style={styles.image} 
                />
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
    display: 'flex',
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
    height: '10%'
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
    margin: 5
  },
  location: {
    fontSize: 28,
    color: '#fff',
    marginLeft: 25,
    marginRight: 25  
  },
  image: {
    alignSelf: "center", 
    marginBottom: 15, 
    color: '#fff'
  }
});

export default Weather;