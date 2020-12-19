import firebase from "firebase";
import { Game } from "./models";

type UnsubscribeFunction = () => void;

export class GameStore {
    private readonly firestore: firebase.firestore.Firestore ;
    public readonly currentUser: firebase.User;

    constructor(firebaseApp: firebase.app.App, firebaseUser: firebase.User) {
        this.firestore = firebaseApp.firestore();
        this.currentUser = firebaseUser;
    }

    public listenToGameUpdates(gameId: string, callback: (game: Game | undefined) => void): UnsubscribeFunction {
        const gameReference = this.firestore.collection("games").doc(gameId);
        return gameReference.onSnapshot(snapshot => {
            callback({
                ...snapshot.data() as any,
                id: snapshot.id
            });
        });
    }
}