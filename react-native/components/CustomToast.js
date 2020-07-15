import React from 'react';
import { WToast } from 'react-native-smart-tip';

import Colors from '../config/colors';


export const notifyMessage = (message, options) => {
    const defaultOptions = {
      data: message,
      textColor: Colors.light_shade4,
      backgroundColor: Colors.dark_shade1,
      position: WToast.position.CENTER,
      duration: WToast.duration.SHORT,
    };

    const toastOptions = {
        ...defaultOptions,
        ...options,
    };

    WToast.show(toastOptions);
}
