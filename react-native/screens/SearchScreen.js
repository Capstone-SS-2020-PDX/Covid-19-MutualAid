import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import faker from 'faker';

import Center from '../components/Center';

const Search = props => {
  const { navigation } = props;
  const [show, setShow] = useState(false);

  return(
    <Center>
      <Button
        title='Search Products'
        onPress={() => {
          setShow(!show);
        }}
      />
      { show
        ? <FlatList
            style={ styles.list }
            renderItem={({item}) => {
              return(
                <Button
                  title={item}
                  onPress={() =>
                    navigation.navigate('PostingDetail', {
                      name: item
                    })
                  }
                />
              );
            }}
            keyExtractor={(product, i) => product + i}
            data={Array.from(Array(50), () => faker.commerce.product())}
          />
        : null }
    </Center>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    margin: 10,
    padding: 10,
  },
});

export default Search;
