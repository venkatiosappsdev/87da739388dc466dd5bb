/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FetchPosts from './src/FetchPosts';
import DisplayPost from './src/DisplayPost';

const Stack = createStackNavigator();
const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FetchPosts">
        <Stack.Screen
          name="FetchPosts"
          component={FetchPosts}
          options={{ title: 'FetchPosts' }}
          navigation={props.navigation}
        />
        <Stack.Screen
          name="DisplayPost"
          component={DisplayPost}
          options={{ title: 'DisplayPost' }}
          navigation={props.navigation}
          route={props.route}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
