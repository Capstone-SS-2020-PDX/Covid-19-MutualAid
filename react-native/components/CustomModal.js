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
    data: 'Creating your Posting...',
};

const updatePostingOptions = {
    ...defaultOptions,
    data: 'Updating your Posting...',
};

const loginFailedOptions = {
    ...defaultOptions,
    data: 'Login Failed!',
    icon: <MaterialIcons name='error-outline' size={50} color='red'/>,
};

const registerFailedOptions = {
    ...defaultOptions,
    data: 'Register Failed!',
    icon: <MaterialIcons name='error-outline' size={50} color='red'/>,
 };

const deletePostingOptions = {
    ...defaultOptions,
    data: 'Deleting your Posting...',
};

const flaggingPostingOptions = {
    ...defaultOptions,
    data: 'Flagging Posting...',
};

const sendingEmailOptions = {
    ...defaultOptions,
    data: 'Sending Message...',
};

const validationErrorOptions = {
    ...defaultOptions,
    data: 'Fill out all details',
    icon: <MaterialIcons name='error-outline' size={50} color='red'/>,
};

const noImageErrorOptions = {
    ...defaultOptions,
    data: 'You must include an image',
    icon: <MaterialIcons name='error-outline' size={50} color='red'/>,
};

const invalidUsernameOptions = {
    ...defaultOptions,
    data: 'That username is not available',
    icon: <MaterialIcons name='error-outline' size={50} color='red'/>,
};

const creatingProfileOptions = {
    ...defaultOptions,
    data: 'Creating Profile...',
};

const updateProfileOptions = {
    ...defaultOptions,
    data: 'Updating Profile...',
};

export function showModal(type) {
    let options;

    switch(type) {
        case 'LOADING':
            options = loadingOptions;
            break;
        case 'LOGIN_FAILED':
            options = loginFailedOptions;
            break;
        case 'REGISTER_FAILED':
            options = registerFailedOptions;
            break;
        case 'CREATING_POSTING':
            options = createPostingOptions;
            break;
        case 'UPDATING_POSTING':
            options = updatePostingOptions;
            break;
        case 'DELETE_POSTING':
            options = deletePostingOptions;
            break;
        case 'FLAGGING_POSTING':
            options = flaggingPostingOptions;
            break;
        case 'SENDING_EMAIL':
            options = sendingEmailOptions;
            break;
        case 'VALIDATION_ERROR':
            options = validationErrorOptions;
            break;
        case 'NO_IMAGE_ERROR':
            options = noImageErrorOptions;
            break;
        case 'INVALID_USERNAME' :
            options = invalidUsernameOptions;
            break;
        case 'CREATING_PROFILE':
            options = creatingProfileOptions;
            break;
        case 'UPDATING_PROFILE':
            options = updateProfileOptions;
            break;
        default:
            options = defaultOptions;
    }
    WModal.show(options);
};

export function hideModal() {
    WModal.hide();
};
