#!/bin/bash

if [ $(id -u) != "0" ]; then
echo "You must be the superuser to run this script" >&2
exit 1
fi
apt-get update

# back end
apt-get -y install postgresql
apt-get -y install docker
apt-get -y install docker-compose

# make sure npm installed?
cd ../react-native
npm install -g yarn
yarn add global expo-cli
yarn add expo
yarn add @react-navigation/native
yarn add --dev jest

expo install react-native-gesture-handler react-native-reanimated \
            react-native-screens react-native-safe-area-context \
            @react-native-community/masked-view


pip install pytest
# Could not find yarn option for newman
npm install -g newman

# Should be using a venv in Python ...
cd ../django/
if [ -f ".venv" ]; then
    echo "Virtual environment already exists in Django dir"
else
    echo "Creating a virtual environment for you in django dir"
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    deactivate
    cd ..
fi

echo "Finished..."
