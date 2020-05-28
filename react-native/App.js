"use strict";

import 'react-native-gesture-handler';
import * as React from "react";
import {StyleSheet, FlatList, Text, TextInput, View, ActivityIndicator, Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import PostingCreationScreen from './components/PostingCreationScreen';
//import PostingListScreen from './components/PostingListScreen';

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
    // Change IP address below to your machine on your *local* network
    // (e.g., 192.168.1.3, 10.0.0.12, etc)
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

function PostingListScreen({ route, navigation }) {
  const { renderData } = route.params;

  return (
    <View style={styles.default_view}>
      <Text>Posting List</Text>
      <FlatList
        data={renderData}
        renderItem={({item}) => <Text>{item.title}</Text>} 
      />
      <Button
        title="Go to Create Post"
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
}

function PostingCreationScreen({ navigation }) {
  const [value, onChangeText] = React.useState();

  return (
    <View style={styles.default_view}>
      <Text>Create a Post</Text>
      <TextInput
        style={{borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Button
        title="Go to Create Post... again"
        onPress={() => navigation.navigate('Create')}
        // onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
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
  default_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
