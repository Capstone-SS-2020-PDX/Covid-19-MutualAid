import React, { useRef } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButton } from '@react-navigation/stack';


import PostingDetailScreen from '../screens/PostingDetailScreen';
import EditPostingScreen from '../screens/EditPostingScreen';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Entypo } from '@expo/vector-icons';
import Colors from '../config/colors';
import { headerOptions }  from '../config/navigation-options';
import CustomHeaderTitle from '../components/CustomHeaderTitle';

//edit code:
//
// console.log(`Editing ${route.params.id}`);
//  navigation.navigate('EditPosting', {
//    ...route.params
//  });

// Combine multiple screen routes that can be shown on different...
// Navigation stacks.
export const addPostingsRoutes = (Stack, navigation) => {
    const handleDone = route => {

        return(
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() => {
                  console.log(`Finish Editing ${route.params.id}`);
                  if (route.params.submit) {
                      route.params.submit.current();
                  }
              }}
            >
            <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        );
    }


    const handleMenu = route => {

        const menu = useRef();      
        const showMenu = () => menu.current.show();

        return(
            <View>
            <Menu
                ref={menu}
                button={ 
                    <Entypo name="dots-three-horizontal" 
                        size={24} 
                        onPress={showMenu}>
                    </Entypo>
            }>
                <MenuItem onPress={
                    navigation.navigate('EditPosting', {...route.params})
                    }>
                    Edit Post</MenuItem>
               <MenuItem onPress={console.log('Report Button')}>Report Post</MenuItem> 
            </Menu>
            </View>
        );
    };

    return(
        <>
          <Stack.Screen
            name='PostingDetail'
            component={PostingDetailScreen}
            options={
                ({route, navigation}) => ({
                  headerTitle: props => <CustomHeaderTitle request={route.params.request}/>,
                  ...headerOptions,
                  headerBackTitle: 'Back',
                  headerRight: () => handleMenu(route)
                })
            }
          />
          <Stack.Screen
            name='EditPosting'
            component={EditPostingScreen}
            options={
              ({route, navigation}) => ({
                headerTitle: `Editing ${route.params.id}`,
                ...headerOptions,
                headerRight: () => handleDone(route),
              })
            }
          />
        </>
    );
}

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 15,
  },
  doneButtonText: {
    color: Colors.contrast1,
    fontSize: 20,
  },
  headerRightEditText: {
    color: Colors.contrast1,
    fontSize: 20,
  },
});
