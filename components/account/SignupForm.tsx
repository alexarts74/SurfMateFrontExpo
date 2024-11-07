import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

export default function SignUpScreen() {
  const { signUp } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    bio: '',
    age: '',
    level: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async () => {
    try {
      setError('');
      setLoading(true);

      await signUp(formData);
      // La redirection est gérée dans le contexte AuthContext

    } catch (err) {
      console.error('Erreur inscription:', err);
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmation du mot de passe"
        value={formData.password_confirmation}
        onChangeText={(value) => handleChange("password_confirmation", value)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={formData.bio}
        onChangeText={(value) => handleChange("bio", value)}
        multiline
        numberOfLines={3}
      />

      <TextInput
        style={styles.input}
        placeholder="Âge"
        value={formData.age}
        onChangeText={(value) => handleChange("age", value)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Niveau"
        value={formData.level}
        onChangeText={(value) => handleChange("level", value)}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>S'inscrire</Text>
        )}
      </Pressable>

      <View style={styles.linkContainer}>
        <Text>Déjà un compte ? </Text>
        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.link}>Se connecter</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
