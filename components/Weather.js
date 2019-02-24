import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
//import { Text, Card, Divider } from 'react-native-elements';

const Weather = (props) => {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let day = date.getDate();
  let month = date.toLocaleString('en-us', { month: 'short' });
  let view =  <ActivityIndicator size="large" color="#0000ff" /> ; 
 
  if(props.forecast.city !== undefined) {
      let uri = 'http://openweathermap.org/img/w/'+ props.forecast.list[0].weather[0].icon + '.png?appid=24397676dee49d7a99746855d1f357ed';
      view = 
        <View style={styles.weatherContainer}>
        <View style={[styles.container, styles.header]}>
            <Text style={styles.dateTime}>{hour}:{minutes}</Text>
            <Text style={styles.dateTime}>{day} {month}</Text>
        </View>
        <View style={styles.bodyContainer}>
            <Image 
                source={{uri: uri}} 
                style={{width: 150, height: 150, alignSelf: "center", marginBottom: 75}}/>
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
     <ScrollView style={styles.weatherContainer}>
        {view}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733',
    alignSelf: 'stretch'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    margin: 25,
    padding: 5,
    alignItems: 'flex-start',
  },
  footer: {
    marginBottom: 10,
    marginTop: 15,
    alignItems: 'flex-end',
    bottom: 0,
    marginBottom: 36
  },
  dateTime: {
    fontSize: 36,
    color: '#fff',
    margin: 10
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 25,
    marginBottom: 5,
    paddingBottom: 40,
    paddingTop: 150,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  temperature: {
    fontSize: 48,
    color: '#fff',
    alignSelf: 'center',
    margin: 15
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
    marginRight: 25,
    marginBottom: 10,
    marginTop: 0      
  }
});

export default Weather;