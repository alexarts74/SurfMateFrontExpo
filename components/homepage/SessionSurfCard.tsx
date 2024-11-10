import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Session from "@/interfaces/SurfSession";

interface SessionCardDetailProps {
  session: Session;
  onPress?: () => void;
}

export default function SessionSurfCard({
  session,
  onPress,
}: SessionCardDetailProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-5 shadow-lg mb-4 border border-gray-100"
    >
      {/* En-tête avec titre et statut */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center flex-1">
          <View>
            <Text className="font-bold text-lg text-gray-800">
              {session.title}
            </Text>
            <Text className="text-gray-500 text-sm">
              {new Date(session.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>
        {/* Badge de statut */}
        <View
          className={`px-3 py-1 rounded-full ${
            session.status === "open" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <Text
            className={`text-sm font-medium ${
              session.status === "open" ? "text-green-800" : "text-red-800"
            }`}
          >
            {session.status === "open" ? "Ouvert" : "Fermé"}
          </Text>
        </View>
      </View>

      {/* Description */}
      <View className="bg-gray-50 p-4 rounded-xl mb-4">
        <Text className="text-gray-700 leading-6">{session.description}</Text>
      </View>

      {/* Informations sur la session */}
      <View className="flex-row flex-wrap gap-2 mb-4">
        {/* Localisation */}
        <View className="bg-blue-100 px-4 py-2 rounded-full">
          <Text className="text-blue-800 font-medium">{session.location}</Text>
        </View>

        {/* Niveau requis */}
        <View className="bg-purple-100 px-4 py-2 rounded-full">
          <Text className="text-purple-800 font-medium">
            {session.level_required}
          </Text>
        </View>

        {/* Hauteur des vagues */}
        <View className="bg-orange-100 px-4 py-2 rounded-full">
          <Text className="text-orange-800 font-medium">
            {session.wave_height}m
          </Text>
        </View>
      </View>

      {/* Informations pratiques */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-gray-600 text-sm">
            {new Date(session.date).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        {/* Participants */}
        <View className="bg-indigo-100 px-3 py-1 rounded-full">
          <Text className="text-indigo-800 text-sm">
            Max {session.max_participants} participants
          </Text>
        </View>
      </View>

      {/* Point de rendez-vous */}
      <View className="bg-gray-50 p-3 rounded-lg">
        <Text className="text-gray-600 text-sm">
          📍 RDV: {session.meeting_point}
        </Text>
      </View>
    </Pressable>
  );
}
