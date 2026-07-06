import { StyleSheet, Text, View, LogBox, StatusBar as Sb } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./redux/store";


import MainNavigations from "./navigations/MainNavigations";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Sb animated={true} barStyle="dark-content" />
      <MainNavigations />
    </Provider>
  );
}

const styles = StyleSheet.create({});
LogBox.ignoreLogs(['InteractionManager has been deprecated']); 
