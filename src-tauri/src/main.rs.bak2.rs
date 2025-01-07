// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{WindowBuilder, WindowUrl};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::init())
        .setup(|app| {
            let _window = WindowBuilder::new(
                app,
                "main",
                WindowUrl::App("index.html".into())
            ).build()?;
            Ok(())
        })
        .run(app::get_application_context())
        .expect("error while running tauri application");
}