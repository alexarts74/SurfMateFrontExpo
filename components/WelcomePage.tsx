import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Animated, ActivityIndicator } from "react-native";
import { router } from "expo-router";

export default function WelcomePage() {
  const titleScale = useRef(new Animated.Value(1)).current;
  const titlePosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const loaderOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(loaderOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.parallel([
        Animated.timing(titleScale, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(titlePosition, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);
  }, []);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <View className="flex-1 bg-white p-6 justify-between">
      <Animated.View
        className="flex-1 justify-center items-center"
        style={{
          transform: [
            { scale: titleScale },
            {
              translateY: titlePosition.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -200],
              }),
            },
          ],
        }}
      >
        <Text className="text-5xl font-bold text-blue-500 mb-2.5">
          SurfMate
        </Text>
        <Text className="text-lg text-gray-600 text-center px-5">
          Trouvez votre partenaire de surf idéal
        </Text>
      </Animated.View>

      <Animated.View
        className="absolute left-0 right-0 bottom-32 items-center"
        style={{ opacity: loaderOpacity }}
      >
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-blue-500 mt-4 text-base">
          Chargement...
        </Text>
      </Animated.View>

      <Animated.View
        className="space-y-3 mb-12 px-8"
        style={{
          opacity: contentOpacity,
        }}
      >
        <AnimatedPressable
          className="bg-blue-500 py-3 rounded-full items-center"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-sm font-semibold text-white">
            Se connecter
          </Text>
        </AnimatedPressable>

        <AnimatedPressable
          className="bg-white py-3 rounded-full items-center border border-blue-500"
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text className="text-sm font-semibold text-blue-500">
            Créer un compte
          </Text>
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
}
