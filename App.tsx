import { StatusBar } from "react-native";

import OneSignal from "react-native-onesignal";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";
import { tagUserInfoCreate } from "./src/notifications/notificationsTags";

import { CartContextProvider } from "./src/contexts/CartContext";
import { useEffect } from "react";

OneSignal.setAppId("c67236f7-8541-4bec-a51c-fc985662b720");

OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log();
});

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      const { actionId } = response.action as any;
      switch (actionId) {
        case "1":
          return console.log("Ver todas");
        case "2":
          return console.log("Ver pedidos");
        default:
          return console.log("Não foi clicado em nennhum botão de ação");
      }
    });
    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
