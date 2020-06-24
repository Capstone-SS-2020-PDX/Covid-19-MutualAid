import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Center from './Center';

import { AuthContext } from './AuthProvider';

const HomeScreen = props => {
  const { logout } = useContext(AuthContext);

  return(
    <Center>
      <Text>
        Home Screen
      </Text>
      <Button
        title='Logout'
        onPress={() => logout()}
      />
    </Center>
  );
};

export default HomeScreen;
