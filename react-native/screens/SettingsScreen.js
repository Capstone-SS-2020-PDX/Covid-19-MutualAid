import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
import { Switch, Card, Paragraph } from 'react-native-paper';

import { AuthContext } from '../providers/AuthProvider';

import Colors from '../config/colors';

const SettingsScreen = props => {
    const { searchMethod, searchRadius, setSearchMethod } = useContext(AuthContext);
    const [isSwitchOn, setIsSwitchOn] = useState(
        searchMethod === 'COMMUNITY' ? false : true
    );
    const [radius, setRadius] = useState(searchRadius);
    const [sliderValue, setSliderValue] = useState(searchRadius);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const communitySearchText = 'Postings will be fetched from your joined communities';
    const radiusSearchText = 'Nearby postings will be fetched from a radius around your current location';

    const updateSliderValue = value => {
        const method = isSwitchOn ? 'RADIUS' : 'COMMUNITY';
        setRadius(value);
        setSearchMethod(method, value);
    };

    const updateSearchMethod = () => {
        onToggleSwitch();
        const method = isSwitchOn ? 'COMMUNITY' : 'RADIUS';

        setSearchMethod(method, radius);
    };

    const sliderSection = () => (
        <View style={styles.sliderSection}>
          <Text>Radius: {sliderValue}</Text>
          <Slider
            style={styles.slider}
            value={sliderValue}
            step={1}
            minimumValue={1}
            maximumValue={50}
            onValueChange={value => setSliderValue(value)}
            onSlidingComplete={value => updateSliderValue(value)}
          />
        </View>
    );

    const searchMethodExplanationText = isSwitchOn ? radiusSearchText : communitySearchText;
    return(
        <View style={styles.screen}>
          <Card style={styles.settingsCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.searchTypeSettingContainer}>
                <Text style={styles.sectionTitleText}>Search Method</Text>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>Community</Text>
                  <Switch
                    value={isSwitchOn}
                    onValueChange={updateSearchMethod}
                    color={Colors.secondary}
                    style={styles.switch}
                  />
                  <Text style={styles.switchLabel}>Location    </Text>
                </View>
                { isSwitchOn ? sliderSection() : null}
                <Paragraph style={styles.paragraphText}>
                  {searchMethodExplanationText}
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    settingsCard: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        width: '100%',
    },
    searchTypeSettingContainer: {
        alignItems: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    switch: {
            marginHorizontal: 20,
    },
    sectionTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    switchLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    paragraphText: {
        textAlign: 'center',
        fontSize: 12,
    },
    sliderSection: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slider: {
        width: '70%',
    },
});

export default SettingsScreen;
