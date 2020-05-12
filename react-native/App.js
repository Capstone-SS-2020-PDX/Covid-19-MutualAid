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
    return fetch('https://reactnative.dev/movies.json', {
			method: 'GET',
      headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
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
          <Text>Content Loaded</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>This is some text</Text>
      </View>
    )  
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
