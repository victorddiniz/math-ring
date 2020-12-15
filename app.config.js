export default {
  expo: {
    name: "math-ring",
    slug: "math-ring",
    version: "2.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#2e3546"
    },
    updates: {
      fallbackToCacheTimeout: 1000
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      buildNumber: "2.0.0",
      bundleIdentifier: "com.vddm.math-ring",
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#2e3546"
      },
      package: "com.vddm.math_ring",
      permissions: [],
      versionCode: 3
    }
  }
}