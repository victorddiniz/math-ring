import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Clipboard, Text, Alert, Button, NativeSyntheticEvent, TextInputSubmitEditingEventData, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from "firebase";

import { RootStackParamList } from '../types';

type ShareGameProps = StackScreenProps<
RootStackParamList,
"ShareGame"
>;

export default function ShareGameScreen(props: ShareGameProps) {
    const firestore = firebase.firestore();
    const [ gameId, updateGameId ] = React.useState(props.route.params.gameId);
    const isHost = props.route.params.gameId.length > 0;
    function copyGameIdToClipboard(): void {
        Clipboard.setString(gameId);
        Alert.alert("Game ID copied to clipboard");
    }
    
    async function startGame() {
        const documentReference = firestore.collection("games").doc(gameId);
        const gameQuestions = (await documentReference.get()).get("questions");
        props.navigation.navigate("Game", { gameId, isHost: isHost, questions: gameQuestions })
    }

    async function validateGameId(submitEditingEvent: NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
        const submittedGameId = submitEditingEvent.nativeEvent.text;
        const documentReference = firestore.collection("games").doc(submittedGameId)
        if (documentReference.id === submittedGameId) {
            updateGameId(submittedGameId);
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={{...styles.textBox, display: !gameId ? "none" : "flex" }}>
                <Text style={{fontSize: 25, textAlign: "center"}} onPress={copyGameIdToClipboard}>
                {gameId}
                </Text>
            </View>
            <View style={{...styles.textBox, display: gameId ? "none" : "flex" }}>
                <TextInput onSubmitEditing={validateGameId} autoFocus={!gameId} style={{ fontSize: 25, textAlign: "center" }}/>
            </View>
            <Button disabled={gameId.length == 0} onPress={startGame} title={"Start game"}/>
        </View>
        );
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        textBox: {
            width: "75%",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 1,
            marginBottom: 20
        }
    });
    