import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WModal } from 'react-native-smart-tip';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../config/colors';

const loadingOptions = {
    data: 'Loading',
    textColor: '#fff',
    backgroundColor: '#444444',
    position: WModal.position.CENTER,
    icon: <ActivityIndicator color='#fff' size={'large'}/>
};

const validationErrorOptions = {
    data: 'Fill out all details',
    textColor: '#fff',
    backgroundColor: '#444444',
    position: WModal.position.CENTER,
    icon: <MaterialIcons name='error-outline' size={50} color='red'/>
}

export function showModal(type) {
    let options;

    switch(type) {
        case 'LOADING':
            options = loadingOptions;
            break;
        case 'VALIDATION_ERROR':
            options = validationErrorOptions;
            break;
    }
    WModal.show(options);
};

export function hideModal() {
    WModal.hide();
};
