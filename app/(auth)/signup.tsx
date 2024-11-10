import { View } from "react-native";
import SignUpForm from "@/components/account/SignupForm";
import React from "react";

export default function SignUpScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SignUpForm />
    </View>
  );
}
