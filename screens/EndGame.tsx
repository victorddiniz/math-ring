import { RouteProp, useTheme } from "@react-navigation/native";
import firebase from "firebase";
import * as React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../types";


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
    const theme = useTheme();
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            color: theme.colors.text,
            fontWeight: "700",
            fontSize: 30
        }
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator animating={!partnersTime} size={"large"} color={theme.colors.text}/>
            <View style={{display: !partnersTime ? "none" : "flex"}}>
                <Text style={{...styles.text}}>Your score = {Math.ceil(totalTime/1000)}s</Text>
                <Text style={{...styles.text}}>Friend's score = {Math.ceil(partnersTime/1000)}s</Text>
            </View>
        </View>
    );
}
