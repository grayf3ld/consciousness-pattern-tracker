// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri_plugin_sql::TauriSql;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(TauriSql::default())
        .setup(|app| {
            #[cfg(desktop)]
            app.create_window(
                "main",
                tauri::WindowUrl::App("index.html".into()),
                |win_builder| win_builder
            )?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}