import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { sessionService } from "@/services/api/SurfingSession";
import Session from "@/interfaces/SurfSession";

export default function SessionsScreen() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessions = async () => {
    try {
      const data = await sessionService.getAllSessions();
      console.log("data dans le fetchSessions", data);
      setSessions(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des sessions:", error);
      setError("Impossible de charger les sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  console.log("session dans le renderSession", sessions)
  const renderSession = (session: Session) => (
    <Pressable
      key={session.id}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
    >
      <View className="flex-row items-center mb-3">
        <Image
          source={{
            uri: session.image || "https://via.placeholder.com/40",
          }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <View>
          <Text className="font-semibold">{session.title}</Text>
          <Text className="text-gray-500 text-sm">
            {new Date(session.date).toLocaleDateString("fr-FR")}
          </Text>
        </View>
      </View>

      <Text className="font-bold text-lg mb-2">{session.title}</Text>
      <Text className="text-gray-600 mb-3">{session.description}</Text>

      <View className="flex-row justify-between">
        <View className="bg-blue-100 px-3 py-1 rounded-full">
          <Text className="text-blue-800 text-sm">{session.spot}</Text>
        </View>
        <View className="bg-green-100 px-3 py-1 rounded-full">
          <Text className="text-green-800 text-sm">{session.level}</Text>
        </View>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold mb-6">Mes Sessions de Surf</Text>

          {error ? (
            <Text className="text-red-500 text-center">{error}</Text>
          ) : sessions.length === 0 ? (
            <Text className="text-gray-600 text-center">
              Aucune session pour le moment.
            </Text>
          ) : (
            <View className="space-y-4">{sessions.map(renderSession)}</View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
