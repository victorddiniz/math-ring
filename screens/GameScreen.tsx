import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import firebase from "firebase";
import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '../types';


export default function GameScreen(props: StackScreenProps<RootStackParamList, "Game">) {
    const firestore = firebase.firestore();
    const {
        gameId,
        isHost,
        questions
    } = props.route.params;
    const theme = useTheme();
    const playersDoneIncrementer = firebase.firestore.FieldValue.increment(1);
    const [ userAnswer, updateUserAnswer ] = React.useState("");
    const [ currentQuestionIndex, updateQuestionIndex ] = React.useState(0);
    const [ timestampOfLastCorrectAnswer, updateTimestampOfLastCorrectAnswer ] = React.useState(Date.now());
    const [ totalTime, updateTotalTime ] = React.useState(0);
    const gameDocument = firestore.collection("games").doc(gameId);
    
    function validaUserTypedAnswer(userCurrentAnswer: string) {
        if (userCurrentAnswer.match(/^[0-9]*$/) !== null) {
            updateUserAnswer(userCurrentAnswer);
        } 
    }
    
    async function submitAnswer() {
        const submitTimestamp = Date.now();
        const correctAnswer = questions[currentQuestionIndex] + questions[currentQuestionIndex + 1];
        if (userAnswer.length > 0 && parseInt(userAnswer) === correctAnswer) {
            const elapsedTimeToAnswer = submitTimestamp - timestampOfLastCorrectAnswer;
            updateTotalTime(totalTime + elapsedTimeToAnswer);
            updateTimestampOfLastCorrectAnswer(submitTimestamp);
            const newIndex = currentQuestionIndex + 2;
            
            if (newIndex < questions.length) {
                updateQuestionIndex(newIndex);
            } else {
                const playerField = isHost ? "hostTime" : "guestTime";
                await gameDocument.update({
                    "playersDone": playersDoneIncrementer,
                    [playerField]: totalTime
                });
                props.navigation.navigate("Root", { lastMatchId: gameId });
            }
        }
        updateUserAnswer("");
    }

    const styles = StyleSheet.create({
        answerInput: {
            borderBottomColor: theme.colors.text,
            borderBottomWidth: 3,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            color: theme.colors.text,
            height: 120,
            marginLeft: 100,
            marginTop: 10,
            fontSize: 100,
            textAlign: "right"
        },
        container: {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 10,
        },
        numbers: {
            fontSize: 100,
            lineHeight: 110,
            color: theme.colors.text
        },
        numberContainer: {
            alignItems: "flex-end",
            borderBottomColor: theme.colors.text,
            borderBottomWidth: 5,
            height: 220,
            marginLeft: 100
        },
        plusSign: {
            fontSize: 100,
            position: "absolute",
            top: 90,
            color: theme.colors.text
        },
        questionContainer: {
            height: "50%",
            width: "100%"
        }
    });

    return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="position" style={styles.questionContainer}>
                    <Text style={{...styles.plusSign}}>+</Text>
                    <View style={styles.numberContainer}>
                        <Text style={{...styles.numbers}}>{questions[currentQuestionIndex]}</Text>
                        <Text style={{...styles.numbers}}>{questions[currentQuestionIndex + 1]}</Text>
                    </View>
                    <TextInput
                    autoFocus={true}
                    onChangeText={validaUserTypedAnswer}
                    onSubmitEditing={submitAnswer}
                    value={userAnswer}
                    returnKeyType={"done"}
                    keyboardType={"number-pad"}
                    style={{...styles.answerInput}}/>
                </KeyboardAvoidingView>
            </View>
    );
}