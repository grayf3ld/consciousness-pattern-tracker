import { useState, useEffect } from 'react';
import { initDatabase } from './init';

export function useDatabase() {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function setup() {
      try {
        const database = await initDatabase();
        setDb(database);
        setLoading(false);
      } catch (err) {
        console.error('Database setup error:', err);
        setError(err);
        setLoading(false);
      }
    }
    setup();
  }, []);

  return { db, loading, error };
}
