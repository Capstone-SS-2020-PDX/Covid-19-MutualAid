import React, { useContext, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View,
         Text,
         TextInput,
         StyleSheet,
         ActivityIndicator,
         TouchableOpacity,
       } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import JoinCommunitiesList from '../components/JoinCommunitiesList';
import Colors from '../config/colors';
import { windowWidth, windowHeight } from '../config/dimensions';
import { profiles_url } from '../config/urls';

import { AuthContext } from '../providers/AuthProvider';

const JoinCommunitiesScreen = props => {
    const { user, communities } = useContext(AuthContext);
    const { navigation } = props;

    const communityList = communities.filter(community => {
        return community.id !== user.profile.home;
    });

    const [isLoading, setIsLoading] = useState(false);
    const [searchCommunities, setSearchCommunities] = useState(communityList);
    const [communitySelections, setCommunitySelections] = useState({});
    const [searchText, setSearchText] = useState('');
    const searchInputRef = useRef(null);

    useEffect(() => { initializeCommunitySelections() }, []);

    const initializeCommunitySelections = () => {
        console.log("Initializing community selections");
        let selections = {};

        communityList.map((community, index) => {
            selections[community.id] = community.id === user.profile.member_of.find(id => id === community.id);
        });

        setCommunitySelections(selections);
    };


    const receiveUpdatedCommunitySelections = selections => {
        // console.log('in receive updatecommunitySelections');
        // console.log(selections);
        setCommunitySelections(selections);
    }

    const handleSearch = text => {
        setSearchText(text);

        let filteredCommunities = communityList.filter(community =>
            community.name.toLowerCase().includes(text.toLowerCase())
        );

        setSearchCommunities(filteredCommunities);
    };

    const handleClearSearchInput = () => {
        setSearchText('');
        setSearchCommunities(communityList);
        searchInputRef.current.clear();
    };

    const CommunityListSection = isLoading
          ? <ActivityIndicator size='large'/>
          : <JoinCommunitiesList
               navigation={navigation}
               isLoading={isLoading}
               communities={searchCommunities}
               communitySelections={communitySelections}
               /* updateCommunitySelections={handleUpdateCommunitySelections} */
               sendCommunitySelections={receiveUpdatedCommunitySelections}
    /* onRefresh={fetchCommunities} */
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
    saveButton: {
        paddingRight: 15,
    },
    saveButtonText: {
        color: Colors.contrast1,
        fontSize: 16,
    },
});

export default JoinCommunitiesScreen;
