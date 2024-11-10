import { View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import WelcomePage from "@/components/WelcomePage";
import React from "react";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 justify-center items-center">
      <WelcomePage />
    </View>
  );
}

