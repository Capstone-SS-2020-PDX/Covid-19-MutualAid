import React, { useEffect, useContext, useState, useRef, useLayoutEffect } from 'react';
import { View,
         TextInput,
         StyleSheet,
         ActivityIndicator,
         TouchableOpacity,
       } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import CommunityList from '../components/CommunityList';
import Colors from '../config/colors';
import { windowWidth, windowHeight } from '../config/dimensions';

import { AuthContext } from '../providers/AuthProvider';

const CommunityListScreen = props => {
    const { user, communities } = useContext(AuthContext);
    const { navigation } = props;

    console.log(user.profile.member_of);
    // const myCommunities = communities.filter(community => {
    //     return user.profile.member_of.includes(community.id);
    // });
    let myCommunities;

    const [isLoading, setIsLoading] = useState(false);
    const [searchCommunities, setSearchCommunities] = useState(myCommunities);
    const [searchText, setSearchText] = useState('');
    const searchInputRef = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                  style={styles.joinHeaderIcon}
                  onPress={() => goToJoinCommunitiesScreen() }
                >
                  <Feather
                    name='user-plus'
                    size={25}
                    color={Colors.light_shade4}
                  />

                </TouchableOpacity>
            ),
        });

    }, [navigation]);

    useEffect(() => {
        myCommunities = communities.filter(community => {
            return user.profile.member_of.includes(community.id);
        });
        setSearchCommunities(myCommunities);
    }, [user]);

    const goToJoinCommunitiesScreen = () => {
        navigation.navigate('Join Communities');
    };

    const handleSearch = text => {
        setSearchText(text);

        let filteredCommunities = communities.filter(community =>
            community.name.toLowerCase().includes(text.toLowerCase())
        );

        setSearchCommunities(filteredCommunities);
    };

    const handleClearSearchInput = () => {
        setSearchText('');
        setSearchCommunities(communities);
        searchInputRef.current.clear();
    };

    const CommunityListSection = isLoading
          ? <ActivityIndicator size='large'/>
          : <CommunityList
              navigation={navigation}
              isLoading={isLoading}
              communities={searchCommunities}
            />

    return(
        <View style={styles.screen}>
          <View style={styles.searchContainer}>
            <View style={styles.inputView}>
              <Ionicons
                name={'ios-search'}
                size={23}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputText}
                placeholder='Search for a community...'
                placeholderTextColor={Colors.placeholder_text}
                autoCapitalize='none'
                onChangeText={text => handleSearch(text)}
                returnKeyType='done'
                ref={searchInputRef}
              />
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={() => handleClearSearchInput()}
              >
                <Feather
                  name={'x-circle'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          {CommunityListSection}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        backgroundColor: Colors.light_shade4,
        alignItems: 'center',
    },
    searchContainer: {
        width: '90%',
        marginVertical: windowHeight / 80,
    },
    inputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: Colors.light_shade4,
        borderRadius: 25,
        borderColor: Colors.placeholder_text,
        borderWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 10,
        shadowColor: Colors.dark_shade1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputText: {
        height: 50,
        width: '80%',
        color: Colors.dark_shade1,
    },
    inputIcon: {
        width: '10%',
    },
    joinHeaderIcon: {
        paddingRight: 15,
    },
    joinHeaderIconText: {
        color: Colors.contrast1,
        fontSize: 16,
    },
});

export default CommunityListScreen;
