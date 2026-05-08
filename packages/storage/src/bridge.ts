import type { StorageAPI } from "@lifehacker/core";

let _invoke: typeof import("@tauri-apps/api/core").invoke | null = null;

async function ensureInvoke() {
  if (!_invoke) {
    try {
      _invoke = (await import("@tauri-apps/api/core")).invoke;
    } catch {
      return null;
    }
  }
  return _invoke;
}

export function createStorageBridge(): StorageAPI {
  let mock: ReturnType<typeof createMockStorage> | null = null;

  return {
    async query(sql, params) {
      const invoke = await ensureInvoke();
      if (!invoke) {
        if (!mock) mock = createMockStorage();
        return mock.query(sql, params);
      }
      return invoke("query_db", { sql, params: params ?? [] });
    },
    async execute(sql, params) {
      const invoke = await ensureInvoke();
      if (!invoke) {
        if (!mock) mock = createMockStorage();
        return mock.execute(sql, params);
      }
      await invoke("execute_db", { sql, params: params ?? [] });
    },
  };
}

// ── Mock for dev/build without Tauri ───────────────────────

function createMockStorage(): StorageAPI {
  const tables: Record<string, Record<string, unknown>[]> = {};

  return {
    async query(sql: string) {
      console.warn("[storage mock] query:", sql);
      if (sql.toLowerCase().includes("core_config")) {
        return (tables["core_config"] ?? []) as any[];
      }
      return [];
    },
    async execute(sql: string) {
      console.warn("[storage mock] execute:", sql);
      if (sql.toLowerCase().includes("create table")) {
        const nameMatch = sql.match(/create table if not exists (\w+)/i);
        if (nameMatch) tables[nameMatch[1]] = [];
      }
    },
  };
}
