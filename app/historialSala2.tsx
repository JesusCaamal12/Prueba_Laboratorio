import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getSensoresPorSala } from '../database/db';
import { styles } from './styles';

export default function HistorialSala2() {
  const [datos, setDatos] = useState<any[]>([]);

  useEffect(() => {
    getSensoresPorSala('Sala 2').then(setDatos);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial - Sala de Experimentación</Text>
      <FlatList
        data={datos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.sensorCard}>
            <Text style={styles.sensorText}>{item.tipo}: {item.valor}</Text>
          </View>
        )}
      />
    </View>
  );
}
