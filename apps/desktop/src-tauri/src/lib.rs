mod commands;
mod db;

use db::connection::Database;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            // Initialize database
            let db_path = resolve_data_dir(app);
            let database =
                Database::new(db_path).expect("failed to initialize database");
            app.manage(database);

            // Logging in debug mode
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::storage::query_db,
            commands::storage::execute_db,
            commands::config::get_config,
            commands::config::set_config,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/// In development, walk up from CWD to find the project-root `data/` directory.
/// In release, fall back to the platform-standard app data directory.
fn resolve_data_dir(app: &tauri::App) -> std::path::PathBuf {
    #[cfg(debug_assertions)]
    {
        if let Ok(cwd) = std::env::current_dir() {
            let mut dir: Option<&std::path::Path> = Some(cwd.as_ref());
            while let Some(d) = dir {
                if d.join(".git").exists() {
                    let data_dir = d.join("data");
                    std::fs::create_dir_all(&data_dir).ok();
                    return data_dir;
                }
                dir = d.parent();
            }
        }
    }
    app.path()
        .app_data_dir()
        .expect("failed to resolve app data dir")
}
