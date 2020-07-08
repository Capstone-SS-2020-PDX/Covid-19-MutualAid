import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';
import { AuthContext } from '../providers/AuthProvider';
import { UserContext } from '../providers/UserProvider';
import CustomButton from '../components/CustomButton';

const ProfileScreen = props => {
    const { navigation } = props;
    //const { user, updateUser } = useContext(UserContext);


    const getDate = (user) => {
        console.log("in getDate");
        console.log(user);
        var date = user.date_joined.slice(0,10)
        var date = date.split("-").reverse().join("-");

        var month = date.slice(0,2);
        var day = date.slice(3,5);
        var year = date.slice(6,10);

        switch(month) {
            case '01':
                date = "Jan. " + day + ", " + year;
                break;
            case '02':
                date = "Feb. " + day + ", " + year;
                break;
            case '03':
                date = "Mar. " + day + ", " + year;
                break;
            case '04':
                date = "Apr. " + day + ", " + year;
                break;
            case '05':
                date = "May " + day + ", " + year;
                break;
            case '06':
                date = "June " + day + ", " + year;
                break;
            case '07':
                date = "July " + day + ", " + year;
                break;
            case '08':
                date = "Aug. " + day + ", " + year;
                break;
            case '09':
                date = "Sept. " + day + ", " + year;
                break;
            case '10':
                date = "Oct. " + day + ", " + year;
                break;
            case '11':
                date = "Nov. " + day + ", " + year;
                break;
            case '12':
                date = "Dec. " + day + ", " + year;
                break;
        }

        return date;
    }

    const date = "July 8, 2020";
    const first_name = "Michael";
    const last_name = "Jenkins";
    const username = "michael";
    const email = "michaeltj11@gmail.com";
    const is_active = true;
    const id = 42069;

    return(
        <View style={styles.screen}>
            <View style={styles.textView}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.text}>{first_name + " " + last_name}</Text>
                <Text style={styles.label}>email: </Text>
                <Text style={styles.text}>{email}</Text>
                <Text style={styles.label}>Member Since: </Text>
                <Text style={styles.text}>{date}</Text>
                <Text style={styles.label}>ID: </Text>
                <Text style={styles.text}>{id}</Text>
                <Text style={styles.text}>{is_active ? 'Active User' : 'Inactive User'}</Text>
            </View>
            <CustomButton
                style={styles.profileCreationButton}
                onPress={() => navigation.navigate('CreateProfile')}
            >
                <Text style={styles.buttonText}>Profile Creation</Text>
            </CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light_shade4,

    },
    textView: {
        alignItems: 'flex-start',
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: windowWidth/8
    },
    label: {
        marginTop: 5
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    username: {
        fontSize: 25,
        alignSelf: 'center'
    },
    profileCreationButton: {
        backgroundColor: Colors.primary,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        elevation: 5,
    },
    buttonText: {
        color: Colors.light_shade4,
        fontSize: 18,
    }
});

export default ProfileScreen;
