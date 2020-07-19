import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Routes from './navigation/Routes';
import { AuthProvider } from './providers/AuthProvider';

const App = () =>  {
  // disable the yellow warning in-app, though they still appear in the console
  console.disableYellowBox = true;

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  // Load fonts and other assets before launching app
  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
  };

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={ fetchFonts }
        onFinish={ () => setIsFontLoaded(true) }
      />
    );
  } else {
    return (
        <AuthProvider>
          <Routes />
        </AuthProvider>
    );
  }
}

export default App;
