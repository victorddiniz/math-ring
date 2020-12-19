import * as React from 'react';
import firebase from "firebase";
import { GameStore } from '../apis';

const firebaseConfig = {
    apiKey: "",
    authDomain: "math-ring.firebaseapp.com",
    databaseURL: "https://math-ring.firebaseio.com",
    projectId: "math-ring",
    storageBucket: "math-ring.appspot.com",
    messagingSenderId: "1037326834092",
    appId: "1:1037326834092:web:a6b671e458619405610209"
}

export default function useGameStore() {
    const [ firebaseApp, setFirebaseApp ] = React.useState<firebase.app.App>();
    const [ gameStore, setGameStore ] = React.useState<GameStore>();

    React.useEffect(() => {
        if (!gameStore && firebaseApp) {
            const currentUser = firebaseApp.auth().currentUser;
            if (!currentUser) {
                firebaseApp.auth().signInAnonymously().then(signedUser => {
                    if (signedUser.user) {
                        setGameStore(new GameStore(firebaseApp, signedUser.user));
                    }
                });
            } else {
                setGameStore(new GameStore(firebaseApp, currentUser));
            }
        }
    }, [firebaseApp]);


    if (!firebaseApp) {
        if (firebase.apps.length === 0) {
            setFirebaseApp(firebase.initializeApp(firebaseConfig));
        } else {
            setFirebaseApp(firebase.app());
        }
    }

    return gameStore;
}