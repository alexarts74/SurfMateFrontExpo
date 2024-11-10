import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { sessionService } from "@/services/api/SurfingSession";
import Session from "@/interfaces/SurfSession";
import SessionSurfCard from "@/components/session/SessionSurfCard";

export default function SessionsScreen() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessions = async () => {
    try {
      const data = await sessionService.getAllSessions();
      setSessions(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des sessions:", error);
      setError("Impossible de charger les sessions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4">Chargement des sessions...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-3xl font-bold text-gray-800">
              Sessions
            </Text>
            <View className="bg-blue-500 rounded-full p-2">
              {/* Vous pouvez ajouter un icône ici */}
            </View>
          </View>

          {error ? (
            <View className="bg-red-100 p-4 rounded-xl">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          ) : sessions.length === 0 ? (
            <View className="bg-gray-100 p-8 rounded-xl">
              <Text className="text-gray-600 text-center text-lg">
                Aucune session pour le moment.
              </Text>
            </View>
          ) : (
            <View>
              {sessions.map((session) => (
                <SessionSurfCard
                  key={session.id}
                  session={session}
                  onPress={() => {
                    console.log("Session sélectionnée:", session.id);
                  }}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
