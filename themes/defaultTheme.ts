import { DefaultTheme, Theme } from "@react-navigation/native";

export const defaultTheme: Theme = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: "#C6934B",
        background: "#2e3546",
        text: "#C7944D"
    }
}