export type RootStackParamList = {
  Root: undefined;
  ShareGame: { gameId: string };
  Game: { gameId: string; questions: number[], isHost: boolean };
  EndGame: { gameId: string, isHost: boolean, totalTime: number };
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
