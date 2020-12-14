import { RouteProp } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Clipboard, Text, ActivityIndicator, View, useColorScheme } from "react-native";

import { RootStackParamList } from "../types";
import firebase from "firebase";

type EndGameScreenRouteProp = RouteProp<
RootStackParamList,
"EndGame"
>;

type EndGameProps = {
    route: EndGameScreenRouteProp
};

export default function EndGameScreen(props: EndGameProps) {
    const firestore = firebase.firestore();
    const {
        gameId,
        isHost,
        totalTime
    } = props.route.params;
    const [ partnersTime, updatePartnersTime ] = React.useState(0);
    const colorSchema = useColorScheme();
    const gameDocument = firestore.collection("games").doc(gameId);
    gameDocument.get().then(documentInstance => {
        const isGameOver = documentInstance.get("playersDone") === 2;
        if (!isGameOver) {
            const unsubscribeFunction = gameDocument.onSnapshot(documentInstance => {
                const isGameOver = documentInstance.get("playersDone") === 2;
                if (isGameOver) {
                    const partnersField = !isHost ? "hostTime" : "guestTime";
                    updatePartnersTime(documentInstance.get(partnersField));
                    unsubscribeFunction();
                }
            });
        } else {
            const partnersField = !isHost ? "hostTime" : "guestTime";
            updatePartnersTime(documentInstance.get(partnersField));
        }
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator animating={!partnersTime} size={"large"} color={"blue"}/>
            <View style={{display: !partnersTime ? "none" : "flex"}}>
                <Text style={{...styles.text, ...(colorSchema === "dark" && styles.textDark)}}>Your score = {Math.ceil(totalTime/1000)}s</Text>
                <Text style={{...styles.text, ...(colorSchema === "dark" && styles.textDark)}}>Friend's score = {Math.ceil(partnersTime/1000)}s</Text>
            </View>
        </View>
    );
}
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            fontSize: 30
        },
        textDark: {
            color: "white"
        }
    });
