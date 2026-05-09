import { useEffect, useState, useCallback } from "react";
import { createStorageBridge } from "@lifehacker/storage";
import { EntryEditor } from "./EntryEditor";
import { Timeline } from "./Timeline";
import { EntryDialog } from "./EntryDialog";

const storage = createStorageBridge();

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];
const MOOD_EMOJI = ["☹", "🙁", "😐", "🙂", "😊"];

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayWeekday(): string {
  return WEEKDAYS[new Date().getDay()];
}

function generateId(): string {
  return crypto.randomUUID();
}

interface EntryRow {
  id: string;
  content: string;
  happened_at: string;
  mood: number | null;
  sleep_hours: number | null;
  energy: number | null;
  created_at: string;
  updated_at: string;
}

export function DailyLog() {
  const today = todayISO();
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveCount, setSaveCount] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<EntryRow | null>(null);

  const loadData = useCallback(async () => {
    try {
      const rows = await storage.query<EntryRow>(
        "SELECT * FROM entries ORDER BY happened_at DESC, created_at DESC LIMIT 20",
      );
      setEntries(rows);
    } catch (err) {
      console.error("[DailyLog] load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async (data: {
    content: string;
    mood: number | null;
    sleepHours: number | null;
    energy: number | null;
  }) => {
    try {
      const id = generateId();
      await storage.execute(
        `INSERT INTO entries (id, content, happened_at, mood, sleep_hours, energy)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`,
        [id, data.content, today, data.mood, data.sleepHours, data.energy],
      );
      setSaveCount((n) => n + 1);
      loadData();
    } catch (err) {
      console.error("[DailyLog] save error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-8 py-12">
      <EntryEditor
        key={saveCount}
        date={today}
        dayOfWeek={todayWeekday()}
        initial={{ content: "", mood: null, sleepHours: null, energy: null }}
        onSave={handleSave}
      />
      <Timeline
        entries={entries.map((e) => ({
          id: e.id,
          content: e.content,
          happenedAt: e.happened_at,
          mood: e.mood,
        }))}
        onSelect={(id) => {
          const entry = entries.find((e) => e.id === id);
          if (entry) setSelectedEntry(entry);
        }}
      />
      {selectedEntry && (
        <EntryDialog
          entry={{
            date: selectedEntry.happened_at,
            content: selectedEntry.content,
            mood: selectedEntry.mood,
            sleepHours: selectedEntry.sleep_hours,
            energy: selectedEntry.energy,
          }}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  );
}
