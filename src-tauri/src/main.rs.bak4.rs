// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::WindowBuilder;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::initialize())
        .setup(|app| {
            WindowBuilder::new(app, "main", tauri::Window::default_url())
                .title("Consciousness Pattern Tracker")
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}