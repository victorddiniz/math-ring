import { useTheme } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import firebase from "firebase";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Game, GameStore } from "../apis";
import { ScoreCard } from "../components";
import { RootStackParamList } from "../types";

type RootScreenProps = StackScreenProps<RootStackParamList, "Root">;

export default function RootScreen(props: RootScreenProps) {
  const firestore = firebase.firestore();
  const gameStore = new GameStore();
  const theme = useTheme();
  const lastMatchId = props.route.params && props.route.params.lastMatchId;
  const [ lastGame, updateLastGame ] = React.useState<Game>();
  const [ hasSubscribed, setSubscriptionStatus ] = React.useState(false);

  if (lastMatchId && !hasSubscribed) {
    setSubscriptionStatus(true);
    const unsubscribeFunctionPromise = gameStore.listenToGameUpdates(lastMatchId, game => {
      if (game?.playersDone === 2) {
        updateLastGame(game);
        unsubscribeFunctionPromise.then(unsubscribe => {
          unsubscribe();
        });
      }
    });
  }

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

    const styles = StyleSheet.create({
        button: {
            borderRadius: 10,
            width: 210,
            height: 70,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.background
        },
        buttonText: {
            color: theme.colors.text,
            fontSize: 30,
            fontWeight: "700",
            textAlign: "center"
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
            backgroundColor: theme.colors.text
        }
    });

  return (
    <View style={styles.container}>
        {
            lastMatchId &&
            <ScoreCard spinnerOn={!lastGame} visible={true} ownScore={lastGame?.guestTime} friendsScore={lastGame?.hostTime}/>
        }
      <Pressable onPress={newGameClick} style={{...styles.button}}>
        <Text style={styles.buttonText}>Create a game</Text>
      </Pressable>
      <View style={styles.separator} />
      <Pressable onPress={joinGame} style={{...styles.button}}>
        <Text style={styles.buttonText}>Join game</Text>
      </Pressable>
    </View>
  );
}


