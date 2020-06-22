import React from 'react';

export const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf')
    });
};
