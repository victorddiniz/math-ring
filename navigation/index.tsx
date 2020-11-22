import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import EndGameScreen from '../screens/EndGame';

import GameScreen from '../screens/GameScreen';
import RootScreen from '../screens/RootScreen';
import ShareGameScreen from '../screens/ShareGameScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={"Root"} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EndGame" component={EndGameScreen} initialParams={{ gameId: "4XDB14vidPdf4Zdf0tMr", isHost: true, totalTime: 11234}}/>
      <Stack.Screen name="Game" component={GameScreen} initialParams={{ gameId: "4XDB14vidPdf4Zdf0tMr", questions: [] }}/>
      <Stack.Screen name="Root" component={RootScreen} />
      <Stack.Screen name="ShareGame" component={ShareGameScreen} initialParams={{ gameId: "" }} />
    </Stack.Navigator>
  );
}
