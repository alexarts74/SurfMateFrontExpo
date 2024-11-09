import { View, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import WelcomePage from "@/components/WelcomePage";
import React from "react";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <WelcomePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
