import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import RNPickerSelect from 'react-native-picker-select';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';

const CommunityPicker = props => {
    const isAndroid = Platform.OS === 'android';
    const [selectedValue, setSelectedValue] = useState(props.defaultItem);

    const pickerItems = props.items.map(item => {
        let obj = {}
        obj['label'] = item.name;
        obj['value'] = item;
        return obj;
    });

    const icon = () => (
        <View style={styles.iconContainer}>
          <AntDesign
            name='caretdown'
            size={10}
          />
        </View>
    );

    const appliedStyles = isAndroid ? styles.androidPicker : styles.iOSPicker;

    return(
        <View style={{ ...appliedStyles, ...props.style }}>
          <RNPickerSelect
            placeholder={{}}
            onValueChange={value => {
                setSelectedValue(value);
                props.selectedItem(value)
            }}
            value={selectedValue}
            items={pickerItems}
          />
          {isAndroid ? null : icon()}
        </View>
    );
};

const styles = StyleSheet.create({
    androidPicker: {
        width: '75%',
        height: 50,
    },
    iOSPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: 50,
        width: '80%',

        backgroundColor: Colors.light_shade4,
        borderRadius: 25,
        borderColor: Colors.placeholder_text,
        borderWidth: 0.5,
        marginBottom: windowHeight / 50,
        paddingHorizontal: 20,
        paddingTop: 15,

        shadowColor: Colors.dark_shade1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconContainer: {
        marginLeft: 10,
        marginTop: -18,
    },
});

export default CommunityPicker;
