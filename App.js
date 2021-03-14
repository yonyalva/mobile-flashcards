import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/reducers";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AddEntry from "./src/components/AddEntry";
import Decks from "./src/components/Decks";
import EntryDetail from "./src/components/EntryDetail";
import AddCard from "./src/components/AddCard";
import Quiz from "./src/components/Quiz";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
function FlashCards() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="Add Deck" component={AddEntry} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="FlashCards" component={FlashCards} />
          <Stack.Screen
            name="EntryDetail"
            component={EntryDetail}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen
            name="Add a new card"
            component={AddCard}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={({ route }) => ({ title: route.params.title })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
