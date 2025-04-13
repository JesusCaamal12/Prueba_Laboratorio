import { View, Text, StyleSheet, Image, Pressable, Alert, BackHandler } from 'react-native';
import { Link } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as SQLite from 'expo-sqlite';

export default function Home() {
  const exportarBaseDeDatos = async () => {
    try {
      const dbName = 'labdata.db';
      const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
      const exportPath = `${FileSystem.documentDirectory}${dbName}`;

      const fileInfo = await FileSystem.getInfoAsync(dbPath);
      if (!fileInfo.exists) {
        Alert.alert('Error', 'La base de datos no existe');
        return;
      }

      await FileSystem.copyAsync({
        from: dbPath,
        to: exportPath,
      });

      await Sharing.shareAsync(exportPath, {
        mimeType: 'application/octet-stream',
        dialogTitle: 'Exportar base de datos',
      });
    } catch (error) {
      Alert.alert('Error al exportar', String(error));
    }
  };

  const salirApp = () => {
    Alert.alert('Salir', '¿Estás seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sí', onPress: () => BackHandler.exitApp() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Monitoreo de Laboratorio</Text>

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3022/3022768.png' }}
        style={styles.labImage}
      />

      <Text style={styles.subtitle}>Seleccióna una sala para verificar: </Text>

      <Link href="/sala1" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sala 1 - Muestras Químicas</Text>
        </Pressable>
      </Link>

      <Link href="/sala2" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sala 2 - Experimentación</Text>
        </Pressable>
      </Link>

      <Pressable style={[styles.button, { backgroundColor: '#4177c2' }]} onPress={exportarBaseDeDatos}>
        <Text style={styles.buttonText}>Exportar base de datos</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={salirApp}>
        <Text style={styles.buttonText}>Salir de la app</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0f0f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#045d56',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  labImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3fb984',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
