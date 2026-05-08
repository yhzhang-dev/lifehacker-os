use crate::db::connection::Database;
use tauri::State;

#[tauri::command]
pub async fn get_config(
    db: State<'_, Database>,
    key: String,
) -> Result<Option<String>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT value FROM core_config WHERE key = ?1")
        .map_err(|e| e.to_string())?;

    let result: Option<String> = stmt
        .query_row([&key], |row| row.get(0))
        .ok();
    Ok(result)
}

#[tauri::command]
pub async fn set_config(
    db: State<'_, Database>,
    key: String,
    value: String,
) -> Result<(), String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO core_config (key, value, updated_at) VALUES (?1, ?2, datetime('now'))
         ON CONFLICT(key) DO UPDATE SET value = ?2, updated_at = datetime('now')",
        rusqlite::params![key, value],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}
