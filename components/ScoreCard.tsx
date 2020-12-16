import { useTheme } from "@react-navigation/native";
import { FunctionComponent } from "react";
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import * as React from "react";

export interface ScoreCardProps {
    visible: boolean;
    spinnerOn: boolean;
    ownScore?: number;
    friendsScore?: number;
}

export const ScoreCard: FunctionComponent<ScoreCardProps> = (props): JSX.Element => {
    const theme = useTheme();
    const [modalVisible, setModalVisibility] = React.useState(props.visible)

    const styles = StyleSheet.create({
        closeButtonBackground: {
            alignItems: "center",
            borderColor: theme.colors.card,
            backgroundColor: theme.colors.notification,
            borderRadius: 15,
            borderWidth: 3,
            height: 30,
            justifyContent: "center",
            position: "absolute",
            right: -10,
            top: -10,
            width: 30
        },
        closeButtonText: {
            color: theme.colors.card,
            fontSize: 20
        },
        container: {
            alignItems: "center",
            flex: 1,
            justifyContent: "center"
        },
        modalCanvas: {
            alignItems: "center",
            backgroundColor: theme.colors.card,
            borderRadius: 10,
            height: "70%",
            justifyContent: "center",
            width: "80%"
        },
        spinner: {
            display: props.spinnerOn ? "flex" : "none",
            margin: 10
        },
        text: {
            color: theme.colors.notification,
            display: props.spinnerOn ? "none" : "flex",
            fontWeight: "700",
            fontSize: 30
        },
        title: {
            display: props.spinnerOn ? "flex" : "none",
            fontSize: 20
        }
    });

    return (
        <Modal onRequestClose={() =>{}} animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.container}>
                <View style={styles.modalCanvas}>
                    <Pressable onPress={() => {setModalVisibility(false)}} style={styles.closeButtonBackground}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </Pressable>
                    <ActivityIndicator style={styles.spinner} animating={props.spinnerOn} size={"large"} color={theme.colors.notification}/>
                    <Text style={[styles.text, styles.title]}>Waiting for friend to finish</Text>
                    {props.ownScore && <Text style={styles.text}>Your score = {Math.ceil(props.ownScore/1000)}s</Text>}
                    {props.friendsScore && <Text style={styles.text}>Friend's score = {Math.ceil(props.friendsScore/1000)}s</Text>}
                </View>
            </View>
        </Modal>
    )
}