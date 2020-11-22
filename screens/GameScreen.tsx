import { StackScreenProps } from '@react-navigation/stack';
import firebase from "firebase";
import * as React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '../types';


export default function GameScreen(props: StackScreenProps<RootStackParamList, "Game">) {
    const firestore = firebase.firestore();
    const {
        gameId,
        isHost,
        questions
    } = props.route.params;
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
                props.navigation.navigate("EndGame", { gameId, isHost, totalTime });
            }
        }
        updateUserAnswer("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.plusSign}>+</Text>
                <View style={styles.numberContainer}>
                    <Text style={styles.numbers}>{questions[currentQuestionIndex]}</Text>
                    <Text style={styles.numbers}>{questions[currentQuestionIndex + 1]}</Text>
                </View>
                <TextInput
                onChangeText={validaUserTypedAnswer}
                onSubmitEditing={submitAnswer}
                value={userAnswer}
                keyboardType={"number-pad"}
                style={styles.answerInput}/>
            </View>
        </View>
        );
    }
    
    const textStyle: TextStyle = {
        fontSize: 100
    };
    
    const styles = StyleSheet.create({
        answerInput: {
            borderBottomColor: "black",
            borderBottomWidth: 3,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            height: 120,
            marginLeft: 100,
            marginTop: 10,
            fontSize: 100,
            textAlign: "right",
        },
        container: {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 10
        },
        numbers: {
            ...textStyle,
            lineHeight: 110
        },
        numberContainer: {
            alignItems: "flex-end",
            borderBottomColor: "black",
            borderBottomWidth: 5,
            height: 220,
            marginLeft: 100
        },
        plusSign: {
            ...textStyle,
            position: "absolute",
            top: 90
        },
        questionContainer: {
            height: "50%",
            width: "100%"
        }
    });
    