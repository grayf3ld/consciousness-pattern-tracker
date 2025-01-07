import { invoke } from '@tauri-apps/api'

export async function initDatabase() {
  try {
    console.log('Initializing database...');
    const db = await invoke('plugin:sql|load', {
      dbPath: 'sqlite:concept_tracker.db'
    });
    console.log('Database loaded successfully');
    
    // Create tables if they don't exist
    await invoke('plugin:sql|execute', {
      query: `
        CREATE TABLE IF NOT EXISTS concept_introductions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          concept TEXT NOT NULL,
          intro_method TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          notes TEXT
        );

        CREATE TABLE IF NOT EXISTS responses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          concept_intro_id INTEGER,
          recognition_level TEXT NOT NULL,
          engagement_level TEXT NOT NULL,
          persistence_level TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(concept_intro_id) REFERENCES concept_introductions(id)
        );
      `
    });
    console.log('Tables created successfully');

    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}
