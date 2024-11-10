import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { authService } from "@/services/api/auth";
import { router } from "expo-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log("je suis dans cette fonction de login")
    try {
      setError("");
      setMessage("");
      setLoading(true);

      await authService.login({
        email,
        password,
      });
      setMessage("Connexion réussie !");
      router.replace("/(tabs)/homepage");
    } catch (err) {
      console.error("Erreur connexion:", err);
      setError("Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-between">
      <View className="flex-1 justify-center items-center">
        <Text className="text-5xl font-bold text-blue-500 mb-2.5">
          SurfMate
        </Text>
        <Text className="text-lg text-gray-600 text-center px-5 mb-12">
          Connectez-vous à votre compte
        </Text>

        <View className="w-full space-y-4">
          <TextInput
            className="w-full border border-gray-300 rounded-full p-4 bg-white"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            className="w-full border border-gray-300 rounded-full p-4 bg-white"
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? (
            <Text className="text-red-500 text-center">{error}</Text>
          ) : null}
        </View>
      </View>

      <View className="space-y-3 mb-12 px-8">
        <Pressable
          className={`bg-blue-500 py-3 rounded-full items-center ${
            loading ? "opacity-70" : ""
          }`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-sm font-semibold text-white">
              Se connecter
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
