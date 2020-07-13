import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WModal } from 'react-native-smart-tip';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../config/colors';

const defaultOptions = {
    data: 'Loading...',
    textColor: '#fff',
    backgroundColor: '#444444',
    position: WModal.position.CENTER,
    icon: <ActivityIndicator color='#fff' size={'large'}/>
};

const loadingOptions = {
    ...defaultOptions,
};

const createPostingOptions = {
    ...defaultOptions,
    data: 'Creating Your Posting...',
};

const sendingEmailOptions = {
    ...defaultOptions,
    data: 'Sending Message...',
};

const validationErrorOptions = {
    ...defaultOptions,
    data: 'Fill out all details',
    icon: <MaterialIcons name='error-outline' size={50} color='red'/>
};

const creatingProfileOptions = {
    ...defaultOptions,
    data: 'Creating Profile...',
};

export function showModal(type) {
    let options;

    switch(type) {
        case 'LOADING':
            options = loadingOptions;
            break;
        case 'CREATING_POSTING':
            options = createPostingOptions;
            break;
        case 'SENDING_EMAIL':
            options = sendingEmailOptions;
            break;
        case 'VALIDATION_ERROR':
            options = validationErrorOptions;
            break;
        case 'CREATING_PROFILE':
            options = creatingProfileOptions;
            break;
        default:
            options = defaultOptions;
    }
    WModal.show(options);
};

export function hideModal() {
    WModal.hide();
};
