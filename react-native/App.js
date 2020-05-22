"use strict";

import React from "react";
import {StyleSheet, Text, View, ActivityIndicator, Button} from "react-native";
import PostingCreationScreen from './screens/PostingCreationScreen';
import PostingListScreen from './screens/PostingListScreen'

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
    return fetch('https://cellular-virtue-277000.uc.r.appspot.com/postings/?format=json', {
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
          <Text>{this.state.dataSource[0].title}</Text>
        
          <Button onPress={load_posting_screenfoobar} title="Posting List Screen"></Button>
          <Button onPress={load_posting_creation_screen} title="Posting creation screen"></Button>
        </View>
      );
    }
  }
}

function load_posting_screenfoobar() {
  // do the thing
  // render(posting_screen please)
}

function load_posting_creation_screen() {
  // do anozer ting
  // render()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
