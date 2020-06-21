#!/bin/bash

echo "$(tput setaf 2)Log: Beginning make install part 2 ...$(tput sgr 0)"

cd "react-native/"
npm install -g yarn
npm install --global expo-cli
yarn add expo
yarn add @react-navigation/native
yarn add --dev jest

expo install react-native-gesture-handler react-native-reanimated \
            react-native-screens react-native-safe-area-context \
            @react-native-community/masked-view



# Could not find yarn option for newman
npm install -g newman
npm install

export PATH=$PATH:~/.npm-global/bin
echo "Finished..."
