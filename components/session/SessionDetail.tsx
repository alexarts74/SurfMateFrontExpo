import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { sessionService } from "@/services/api/SurfingSession";
import Session from "@/interfaces/SurfSession";

type RouteParams = {
  SessionDetail: {
    id: number;
  };
};

export default function SessionDetail() {
  const route = useRoute<RouteProp<RouteParams, "SessionDetail">>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchSessionDetail = async () => {
        setLoading(true);
        try {
          const response = await sessionService.getSessionById(route.params.id);
          const sessionData = response.data || response;
          setSession(sessionData);
        } catch (error) {
          console.error("Erreur lors de la récupération de la session:", error);
          setSession(null);
        } finally {
          setLoading(false);
        }
      };

      fetchSessionDetail();
    }, [route.params.id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!session) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Session non trouvée</Text>
      </View>
    );
  }

  console.log("Rendu: Affichage de la session");
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* En-tête */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">
            {session.title}
          </Text>
          <Text className="text-gray-500">
            {new Date(session.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>

        {/* Statut */}
        <View
          className={`px-4 py-2 rounded-full self-start mb-6 ${
            session.status === "open" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <Text
            className={`${
              session.status === "open" ? "text-green-800" : "text-red-800"
            } font-medium`}
          >
            {session.status === "open" ? "Session ouverte" : "Session fermée"}
          </Text>
        </View>

        {/* Description */}
        <View className="bg-gray-50 p-4 rounded-xl mb-6">
          <Text className="text-gray-700 leading-6">{session.description}</Text>
        </View>

        {/* Détails */}
        <View className="space-y-4">
          <View className="flex-row items-center">
            <Text className="font-medium text-gray-800 w-32">
              Localisation:
            </Text>
            <Text className="text-gray-600">{session.location}</Text>
          </View>

          <View className="flex-row items-center">
            <Text className="font-medium text-gray-800 w-32">
              Niveau requis:
            </Text>
            <Text className="text-gray-600">{session.level_required}</Text>
          </View>

          <View className="flex-row items-center">
            <Text className="font-medium text-gray-800 w-32">
              Hauteur vagues:
            </Text>
            <Text className="text-gray-600">{session.wave_height}m</Text>
          </View>

          <View className="flex-row items-center">
            <Text className="font-medium text-gray-800 w-32">
              Participants:
            </Text>
            <Text className="text-gray-600">
              Max {session.max_participants}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="font-medium text-gray-800 w-32">Point RDV:</Text>
            <Text className="text-gray-600">{session.meeting_point}</Text>
          </View>
        </View>

        {/* Organisateur */}
        <View className="mt-8 pt-4 border-t border-gray-200">
          <Text className="text-gray-500 mb-2">Organisé par</Text>
          <View className="flex-row items-center">
            <Image
              source={{
                uri: session.user?.image || "https://via.placeholder.com/40",
              }}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-3">
              <Text className="font-medium text-gray-800">
                {session.user?.name || "Utilisateur"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
