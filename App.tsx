// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StatusBar, Text, View } from 'react-native';

import {styles} from './styles'

import { Home } from './src/pages/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='#000065'
        translucent
      />
      <Home/>
    </View>
  );
}
