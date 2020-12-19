export interface Game {
    scoreBoard: {
        userId: string;
        time: number;
    }[];
    id: string;
    questions: number[];
}