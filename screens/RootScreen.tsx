import * as React from "react";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";

import firebase from "firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type RootScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Root"
>;

type RootScreenProps = {
  navigation: RootScreenNavigationProps
};

export default function RootScreen(props: RootScreenProps) {
  const firestore = firebase.firestore();
  const colorScheme = useColorScheme();

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateGameQuestions(): number[] {
    const questions: number[] = [];
    for(let i = 0; i < 10; i++) {
      const term1 = getRandomIntInclusive(0, 500);
      const term2 = getRandomIntInclusive(0, 500);
      questions.push(term1, term2);
    }
    return questions;
  }

  async function newGameClick() {
    const documentReference = await firestore.collection("games").add({
      playersDone: 0,
      guestTime: 0,
      hostTime: 0,
      questions: generateGameQuestions()
    });

    props.navigation.navigate(
      "ShareGame",
      { gameId: documentReference.id }
    );
  };

  async function joinGame() {
    props.navigation.navigate(
      "ShareGame",
      { gameId: "" }
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={newGameClick} style={{...styles.button, ...(colorScheme === "dark" && styles.darkButton)}}>
        <Text style={{fontSize: 15, textAlign: "center"}}>Create a game</Text>
      </Pressable>
      <View style={styles.separator} />
      <Pressable onPress={joinGame} style={{...styles.button, ...(colorScheme === "dark" && styles.darkButton)}}>
        <Text style={{fontSize: 15}}>Join game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  darkButton: {
    backgroundColor: "#2499FF",
    borderColor: "#000000"
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    width: 150,
    height: 50,
    backgroundColor: "#00549E",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFFFFF"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
