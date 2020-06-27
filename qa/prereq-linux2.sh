#!/bin/bash

set -x

echo "$(tput setaf 2)Log: Beginning make install part 2 ...$(tput sgr 0)"

cd "react-native/"
npm install expo-cli --global
npm install @react-navigation/native
npm install
npm install expo --global

expo install react-native-gesture-handler react-native-reanimated \
            react-native-screens react-native-safe-area-context \
            @react-native-community/masked-view

export PATH=$PATH:~/.npm-global/bin

cd ..
npm install expo-cli --global

echo "Finished..."
