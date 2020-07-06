import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WModal } from 'react-native-smart-tip';

import Colors from '../config/colors';

const modalOptions = {
    data: 'Loading',
    textColor: '#fff',
    backgroundColor: '#444444',
    position: WModal.position.CENTER,
    icon: <ActivityIndicator color='#fff' size={'large'}/>
};

export function showModal() {
    WModal.show(modalOptions)
};

export function hideModal() {
    WModal.hide();
};
