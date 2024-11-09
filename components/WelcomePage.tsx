import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { router } from "expo-router";

export default function WelcomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SurfMate</Text>
        <Text style={styles.subtitle}>
          Trouvez votre partenaire de surf idéal
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.signupButton]}
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text style={[styles.buttonText, styles.signupButtonText]}>
            Créer un compte
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 50,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#007AFF",
  },
  signupButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  signupButtonText: {
    color: "#007AFF",
  },
});
