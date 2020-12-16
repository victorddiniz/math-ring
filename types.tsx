export type RootStackParamList = {
  Root: { lastMatchId: string };
  ShareGame: { gameId: string };
  Game: { gameId: string; questions: number[], isHost: boolean };
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
