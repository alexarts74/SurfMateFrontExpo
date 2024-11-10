import { Stack } from "expo-router";
import React from "react";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="session/[id]"
        options={{
          title: "Détails de la session",
        }}
      />
    </Stack>
  );
}
