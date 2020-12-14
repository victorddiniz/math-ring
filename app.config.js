export default {
  expo: {
    name: "math-ring",
    slug: "math-ring",
    version: "1.1.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      buildNumber: "1.1.0",
      bundleIdentifier: "com.vddm.math-ring",
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.vddm.math_ring",
      permissions: [],
      versionCode: 2
    },
    web: {
      favicon: "./assets/images/favicon.png"
    }
  }
}