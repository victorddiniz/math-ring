import firebase from "firebase";
import { Game } from "./models";

type UnsubscribeFunction = () => void;

export class GameStore {
    private readonly firestore: firebase.firestore.Firestore ;

    constructor() {
        this.firestore = firebase.firestore();
    }

    public async listenToGameUpdates(gameId: string, callback: (game: Game | undefined) => void): Promise<UnsubscribeFunction> {
        const gameReference = this.firestore.collection("games").doc(gameId);
        return gameReference.onSnapshot(snapshot => {
            callback({
                ...snapshot.data() as any,
                id: snapshot.id
            });
        });
    }
}