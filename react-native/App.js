"use strict";

import React, { Component } from "react";
import {
     StyleSheet,
     View,
     TextInput,
     Button,
} from "react-native";

export default class App extends Component {
  constructor(props) {
  super(props);

 this.state = {
     title: ""
    };
  }

  onPressSubmitButton() {
    this.onFetchLoginRecords();
  }
 
  render() {
    return (
      <View>
      <TextInput
        ref="title"
        style={this.loginStyles.textInput}
        placeholder="What do you need?"
        keyboardType="email-address"
        onChangeText={text => this.setState({ emailAddress: text })}
      />
      <Button
        title="Submit"
        color="#841584"
        onPress={this.onPressSubmitButton.bind(this)}
      />
    </View>
    );
}

  loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: "#F5FCFF"
    },
    textInput: {
      height: 40,
      textAlign: "center",
      borderWidth: 1,
      width: "80%"
      },
      buttonSubmit: {
      color: "#841584"
    }
  });

  async onFetchLoginRecords() {
    var data = {
    email: this.state.title
    };
    try {
    let response = await fetch(
      "http://localhost:80/api/ask/",
      {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
      body: JSON.stringify(data)
    }
    );
    if (response.status >= 200 && response.status < 300) {
        alert("authenticated successfully!!!");
    }
  } catch (errors) {

    alert(errors);
    } 
  }
}