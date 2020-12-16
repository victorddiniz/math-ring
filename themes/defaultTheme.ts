import { DefaultTheme, Theme } from "@react-navigation/native";

export const defaultTheme: Theme = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        background: "#2e3546",
        card: "#703529",
        notification: "#E0DDD5",
        primary: "#C6934B",
        text: "#C7944D"
    }
}