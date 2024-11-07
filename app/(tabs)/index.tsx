import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { apiClient } from "@/services/api/client";

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/users");
        console.log("Liste des utilisateurs:", response);
        setData(response);
      } catch (err) {
        console.error("Erreur:", err);
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {error ? (
        <Text style={{ color: "red" }}>Erreur: {error}</Text>
      ) : (
        <Text>Données: {JSON.stringify(data, null, 2)}</Text>
      )}
    </View>
  );
}
