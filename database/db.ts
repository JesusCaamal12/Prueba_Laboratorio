import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('labdata.db');

//Función para crear tablas usando await
export const createTables = async () => {
  const db = await dbPromise;
  await db.execAsync(`CREATE TABLE IF NOT EXISTS sensores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sala TEXT,
    tipo TEXT,
    valor TEXT
  );`);
};




//Insertar sensor usando await
export const insertSensor = async (sala: string, tipo: string, valor: string) => {
  const db = await dbPromise;
  await db.runAsync(
    'INSERT INTO sensores (sala, tipo, valor) VALUES (?, ?, ?);',
    sala, tipo, valor
  );
};

//btener sensores por sala
export const getSensoresPorSala = async (sala: string): Promise<any[]> => {
  const db = await dbPromise;
  const result = await db.getAllAsync('SELECT * FROM sensores WHERE sala = ?', sala);
  return result;
};

//Exportar JSON
export const exportarJSON = async (): Promise<string> => {
  const db = await dbPromise;
  const result = await db.getAllAsync('SELECT * FROM sensores;');
  return JSON.stringify(result, null, 2);
};
