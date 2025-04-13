import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');

  const login = () => {
    if (email.trim() !== '') {
      router.replace('/login'); // Ir a la pantalla principal
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2913/2913465.png' }}
        style={styles.image}
      />

      <Text style={styles.title}>Ingreso al Laboratorio</Text>
      <Text style={styles.subtitle}>Por favor ingresa tu correo para continuar</Text>

      <TextInput
        placeholder="ejemplo@correo.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f4f1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#05595b',
    marginTop: 10,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#aacfcf',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#3fb984',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
