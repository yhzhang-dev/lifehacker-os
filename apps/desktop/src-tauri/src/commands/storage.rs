use crate::db::connection::Database;
use serde_json::Value;
use tauri::State;

#[tauri::command]
pub async fn query_db(
    db: State<'_, Database>,
    sql: String,
    params: Vec<Value>,
) -> Result<Vec<Value>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;

    let params: Vec<rusqlite::types::Value> = params
        .into_iter()
        .map(|v| serde_json_to_rusqlite(v))
        .collect();

    let param_refs: Vec<&dyn rusqlite::types::ToSql> =
        params.iter().map(|p| p as &dyn rusqlite::types::ToSql).collect();

    let rows = stmt
        .query_map(param_refs.as_slice(), |row| {
            let mut map = serde_json::Map::new();
            for (i, col) in row.as_ref().column_names().iter().enumerate() {
                let value: rusqlite::types::Value = row.get_unwrap(i);
                map.insert(col.to_string(), rusqlite_to_serde(value));
            }
            Ok(Value::Object(map))
        })
        .map_err(|e| e.to_string())?;

    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

#[tauri::command]
pub async fn execute_db(
    db: State<'_, Database>,
    sql: String,
    params: Vec<Value>,
) -> Result<(), String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;

    let params: Vec<rusqlite::types::Value> = params
        .into_iter()
        .map(|v| serde_json_to_rusqlite(v))
        .collect();

    let param_refs: Vec<&dyn rusqlite::types::ToSql> =
        params.iter().map(|p| p as &dyn rusqlite::types::ToSql).collect();

    let mut stmt = conn.prepare(&sql).map_err(|e| e.to_string())?;
    stmt.execute(param_refs.as_slice())
        .map_err(|e| e.to_string())?;
    Ok(())
}

fn serde_json_to_rusqlite(v: Value) -> rusqlite::types::Value {
    match v {
        Value::Null => rusqlite::types::Value::Null,
        Value::Bool(b) => rusqlite::types::Value::Integer(b as i64),
        Value::Number(n) => n.as_i64().map_or(
            n.as_f64().map_or(rusqlite::types::Value::Null, |f| {
                rusqlite::types::Value::Real(f)
            }),
            |i| rusqlite::types::Value::Integer(i),
        ),
        Value::String(s) => rusqlite::types::Value::Text(s),
        _ => rusqlite::types::Value::Text(v.to_string()),
    }
}

fn rusqlite_to_serde(v: rusqlite::types::Value) -> Value {
    match v {
        rusqlite::types::Value::Null => Value::Null,
        rusqlite::types::Value::Integer(i) => Value::Number(i.into()),
        rusqlite::types::Value::Real(f) => {
            serde_json::Number::from_f64(f).map_or(Value::Null, Value::Number)
        }
        rusqlite::types::Value::Text(s) => Value::String(s),
        rusqlite::types::Value::Blob(b) => Value::Array(
            b.into_iter().map(|byte| Value::Number(byte.into())).collect(),
        ),
    }
}
