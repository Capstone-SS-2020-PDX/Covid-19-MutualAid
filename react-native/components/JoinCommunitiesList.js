import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';

import JoinCommunitiesListItem from './JoinCommunitiesListItem';
import { AuthContext } from '../providers/AuthProvider';

import { showModal, hideModal } from '../components/CustomModal';
import { profiles_url } from '../config/urls';
import Colors from '../config/colors';


const JoinCommunitiesList = props => {
    const { navigation, communities } = props;
    const { user, updateProfile } = useContext(AuthContext);

    // console.log("Inside CommunityList, communitySelections: ");
    // console.log(props.communitySelections);
    const renderCommunityListItem = itemData => {
        let isMemberOf = props.communitySelections[itemData.item.id];
        return(
            <View style={styles.list}>
              <JoinCommunitiesListItem
                name={itemData.item.name}
                home_pic={itemData.item.home_pic}
                members={itemData.item.members}
                postings={itemData.item.posts}
                id={itemData.item.id}
                isSelected={isMemberOf}
                onSelectCommunity={() => {
                    updateCommunitySelections(itemData.item.id, isMemberOf);
                }}
              />
            </View>
        );
    };

    const updateCommunitySelections = async (id, value) => {
        let selections = {
            ...props.communitySelections,
            [id]: !value,
        };

        handleJoinCommunities(selections);
        props.sendCommunitySelections(selections);
    };

    const createRequestPayload = selections => {
        let selectedCommunities = [];

        for (const id in selections) {
            if (selections[id] === true) {
                selectedCommunities.push(+id);
            }
        }
        selectedCommunities.push(user.profile.home);
        // console.log(selectedCommunities);

        const newCommunitiesList = { member_of: selectedCommunities };
        const updatedProfile = {
            ...user.profile,
            ...newCommunitiesList,
        };

        updateProfile(updatedProfile);
        return JSON.stringify(newCommunitiesList);
    };

    const handleJoinCommunities = async selections => {
        const url = profiles_url + user.profile.id + '/';

        const payload = createRequestPayload(selections);
        // console.log('outoing payload');
        // console.log(payload);

        await fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: payload,
        })
            .then(response => response.json())
            .then(json => {
                // console.log(json);
            });
    };

    if (props.communitySelections === null) {
        return null;
    } else {

        return(
            <FlatList
              style={styles.list}
              renderItem={renderCommunityListItem}
              keyExtractor={(itemData, i) => i.toString()}
              data={props.communities}
              showsVerticalScrollIndicator={false}
            /* refreshControl={ */
            /*   <RefreshControl */
            /*     refreshing={props.isLoading} */
            /*     onRefresh={props.onRefresh} */
            /*   /> */
            /* } */
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
    },
});

export default JoinCommunitiesList;
