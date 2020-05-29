"use strict";

import 'react-native-gesture-handler';
import * as React from "react";
import {StyleSheet, FlatList, Text, TextInput, View, ActivityIndicator, Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostingCreationScreen from './components/PostingCreationScreen';
import PostingListScreen from './components/PostingListScreen';

const url = "https://cellular-virtue-277000.uc.r.appspot.com"
const local_url = "http://localhost"
const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
    return fetch(url.concat('/postings/?format=json'), {
			method: 'GET',
      headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
      }
		})
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Loading">
            <Stack.Screen name="Loading" component={ActivityIndicator} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={PostingListScreen}
            initialParams={{renderData: this.state.dataSource}}
          />
          <Stack.Screen 
            name="Create" 
            component={PostingCreationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  default_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
