import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { authService } from "@/services/api/auth";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { Image } from 'react-native';

export default function SignUpScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bio: "",
    level: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: "",
  });

  const levelOptions = [
    { key: "beginner", value: "Débutant" },
    { key: "intermediate", value: "Intermédiaire" },
    { key: "expert", value: "Expert" },
  ];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        handleChange("image", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      setError("Erreur lors de la sélection de l'image");
    }
  };

  const handleSignUp = async () => {
    console.log("Dans le handleSignUp du composant SignupForm");
    try {
      setError("");
      setLoading(true);
      const response = await authService.signUp(formData);
      await login(response);
      router.replace("/(tabs)");
    } catch (err) {
      console.error("Erreur inscription:", err);
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-5 text-center">Inscription</Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        placeholder="Nom"
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        placeholder="Âge"
        value={formData.age}
        onChangeText={(value) => handleChange("age", value)}
        keyboardType="numeric"
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        placeholder="Bio"
        value={formData.bio}
        onChangeText={(value) => handleChange("bio", value)}
        multiline
        numberOfLines={3}
      />
      <SelectList
        setSelected={(val: string) => handleChange("level", val)}
        data={levelOptions}
        save="key"
        placeholder="Sélectionnez votre niveau"
        boxStyles={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 8,
          padding: 16,
          marginBottom: 4,
        }}
        dropdownStyles={{
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 8,
          marginTop: 4,
        }}
        search={false}
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-4 mb-4 mt-4"
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        placeholder="Mot de passe"
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        placeholder="Confirmation du mot de passe"
        value={formData.password_confirmation}
        onChangeText={(value) => handleChange("password_confirmation", value)}
        secureTextEntry
      />
      <Pressable
        onPress={pickImage}
        className="w-full border border-gray-300 rounded-lg p-4 mb-4 flex-row items-center justify-center"
      >
        {formData.image ? (
          <View className="items-center">
            <Image
              source={{ uri: formData.image }}
              className="w-20 h-20 rounded-full mb-2"
            />
            <Text className="text-blue-500">Changer l'image</Text>
          </View>
        ) : (
          <Text className="text-blue-500">
            Sélectionner une image de profil
          </Text>
        )}
      </Pressable>
      {error ? (
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      ) : null}
      <Pressable
        className={`w-full bg-blue-500 rounded-lg p-4 items-center ${
          loading ? "opacity-70" : ""
        }`}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold text-lg">S'inscrire</Text>
        )}
      </Pressable>
      <View className="flex-row justify-center mt-5">
        <Text>Déjà un compte ? </Text>
        <Pressable onPress={() => router.push("/login")}>
          <Text className="text-blue-500 underline">Se connecter</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
