import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { createTables, insertarUsuario } from '../database/db'; // Ajusta la ruta si es diferente

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    createTables(); // Crea las tablas al cargar
  }, []);

  const login = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Ingresa correo y contraseña');
      return;
    }

    try {
      await insertarUsuario(email, password);
      router.replace('/login'); // Ajusta la ruta a tu pantalla principal
    } catch (error) {
      Alert.alert('Error al guardar usuario');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2913/2913465.png' }}
        style={styles.image}
      />

      <Text style={styles.title}>Ingreso al Laboratorio</Text>
      <Text style={styles.subtitle}>Por favor ingresa tus datos para continuar</Text>

      <TextInput
        placeholder="ejemplo@correo.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  image: { width: 100, height: 100, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  button: {
    backgroundColor: '#008080',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: { color: 'white', fontWeight: 'bold' }
});
