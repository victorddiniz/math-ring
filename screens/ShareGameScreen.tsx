import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import firebase from "firebase";
import * as React from 'react';
import { Alert, Clipboard, NativeSyntheticEvent, Pressable, StyleSheet, Text, TextInputSubmitEditingEventData, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '../types';


type ShareGameProps = StackScreenProps<
RootStackParamList,
"ShareGame"
>;

export default function ShareGameScreen(props: ShareGameProps) {
    const firestore = firebase.firestore();
    const theme = useTheme();
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        darkButton: {
            backgroundColor: "#2499FF",
            borderColor: "#000000"
        },
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
            opacity: gameId.length === 0 ? 0.25 : 1,
            fontSize: 30,
            fontWeight: "700",
            textAlign: "center"
        },
        textBox: {
            borderRadius: 10,
            width: "90%",
            height: 70,
            borderWidth: 1,
            borderColor: "gray",
            marginBottom: 20,
            justifyContent: "center"
        },
        text: {
            color: theme.colors.text,
            fontSize: 27,
            fontWeight: "500",
            textAlign: "center"
        }
    });
    
    return (
        <View style={styles.container}>
            <View style={{...styles.textBox, display: !gameId ? "none" : "flex" }}>
                <Text style={{...styles.text}} onPress={copyGameIdToClipboard}>
                {gameId}
                </Text>
            </View>
            <View style={{...styles.textBox, display: gameId ? "none" : "flex" }}>
                <TextInput onSubmitEditing={validateGameId} autoFocus={!gameId} style={{...styles.text}}/>
            </View>
            <Pressable disabled={gameId.length === 0} onPress={startGame} style={{...styles.button}}>
                <Text style={styles.buttonText}>Start game</Text>
            </Pressable>
        </View>
    );
}