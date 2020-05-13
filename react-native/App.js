"use strict";

import React from "react";
import {StyleSheet, Text, View, ActivityIndicator} from "react-native";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
    // Change IP address below to your machine on your *local* network
    // (e.g., 192.168.1.3, 10.0.0.12, etc)
    return fetch('http://192.168.1.122:8080/post/?format=json', {
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
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <p>{this.state.dataSource[0].title}</p>
        </View>
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
});
