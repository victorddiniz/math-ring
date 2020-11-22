import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import firebase from "firebase";
import { LogBox } from 'react-native';

const firebaseConfig = {
  apiKey: "",
  authDomain: "math-ring.firebaseapp.com",
  databaseURL: "https://math-ring.firebaseio.com",
  projectId: "math-ring",
  storageBucket: "math-ring.appspot.com",
  messagingSenderId: "1037326834092",
  appId: "1:1037326834092:web:a6b671e458619405610209"
}
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
LogBox.ignoreLogs([/Setting a timer for a long period of time.*/])

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
