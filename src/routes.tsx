import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import { Status } from './pages/Status';
import { Home } from './pages/Home';

const {Navigator, Screen} = createStackNavigator()


export function Routes(){
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{headerShown: false}}
      >
        <Screen
          name='Home'
          component={Home}
        />

        <Screen
          name='Status'
          component={Status}
        />

      </Navigator>
    </NavigationContainer>
  );
}