import { useEffect, useState, useCallback } from "react";
import { createStorageBridge } from "@lifehacker/storage";
import { EntryEditor } from "./EntryEditor";
import { Timeline } from "./Timeline";

const storage = createStorageBridge();

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

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
  const [todayEntry, setTodayEntry] = useState<EntryRow | null>(null);
  const [recent, setRecent] = useState<EntryRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      // Load today's entry
      const todayRows = await storage.query<EntryRow>(
        "SELECT * FROM entries WHERE happened_at = ?1 ORDER BY created_at DESC LIMIT 1",
        [today],
      );
      setTodayEntry(todayRows[0] ?? null);

      // Load recent entries (excluding today)
      const recentRows = await storage.query<EntryRow>(
        "SELECT * FROM entries WHERE happened_at != ?1 ORDER BY happened_at DESC, created_at DESC LIMIT 20",
        [today],
      );
      setRecent(recentRows);
    } catch (err) {
      console.error("[DailyLog] load error:", err);
    } finally {
      setLoading(false);
    }
  }, [today]);

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
      if (todayEntry) {
        // Update existing
        await storage.execute(
          `UPDATE entries SET content = ?1, mood = ?2, sleep_hours = ?3, energy = ?4, updated_at = datetime('now')
           WHERE id = ?5`,
          [data.content, data.mood, data.sleepHours, data.energy, todayEntry.id],
        );
      } else {
        // Insert new
        const id = generateId();
        await storage.execute(
          `INSERT INTO entries (id, content, happened_at, mood, sleep_hours, energy)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6)`,
          [id, data.content, today, data.mood, data.sleepHours, data.energy],
        );
        setTodayEntry({
          id,
          content: data.content,
          happened_at: today,
          mood: data.mood,
          sleep_hours: data.sleepHours,
          energy: data.energy,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
      // Refresh recent
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
        date={today}
        dayOfWeek={todayWeekday()}
        initial={{
          content: todayEntry?.content ?? "",
          mood: todayEntry?.mood ?? null,
          sleepHours: todayEntry?.sleep_hours ?? null,
          energy: todayEntry?.energy ?? null,
        }}
        onSave={handleSave}
      />
      <Timeline
        entries={recent.map((e) => ({
          id: e.id,
          content: e.content,
          happenedAt: e.happened_at,
          mood: e.mood,
        }))}
        onSelect={(id) => {
          const entry = recent.find((e) => e.id === id);
          if (entry) {
            // Scroll the entry into view — simple approach
            window.alert(
              `${entry.happened_at}\n\n${entry.content}` +
                (entry.mood ? `\n\n心情: ${"☹🙁😐🙂😊"[entry.mood - 1] ?? ""}` : ""),
            );
          }
        }}
      />
    </div>
  );
}
