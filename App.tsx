// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StatusBar, Text, View } from 'react-native';

import {styles} from './styles'

import { Routes } from './src/routes';

import { MainProvider } from './src/hooks/main';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='#000065'
        translucent
      />
      <MainProvider>
        <Routes/>
      </MainProvider>
    </View>
  );
}
