import { useState, type FormEvent } from "react";

interface EntryData {
  content: string;
  mood: number | null;
  sleepHours: number | null;
  energy: number | null;
}

interface EntryEditorProps {
  initial: EntryData;
  onSave: (data: EntryData) => Promise<void>;
  date: string; // ISO date string "2026-05-09"
  dayOfWeek: string;
}

export function EntryEditor({ initial, onSave, date, dayOfWeek }: EntryEditorProps) {
  const [content, setContent] = useState(initial.content);
  const [mood, setMood] = useState<number | null>(initial.mood);
  const [sleepHours, setSleepHours] = useState<number | null>(initial.sleepHours);
  const [energy, setEnergy] = useState<number | null>(initial.energy);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e?: FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    await onSave({ content, mood, sleepHours, energy });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const [y, m, d] = date.split("-").map(Number);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Date header */}
      <div className="mb-8">
        <time
          className="text-4xl font-light tracking-tight text-foreground"
          dateTime={date}
        >
          {y} 年 {m} 月 {d} 日
        </time>
        <p className="mt-1 text-sm text-muted-foreground">星期{dayOfWeek}</p>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="今天值得记的一件事是什么？"
        rows={6}
        className="w-full resize-none border-0 bg-transparent p-0 text-xl leading-relaxed text-foreground placeholder-muted-foreground/40 outline-none"
      />

      {/* Meta row */}
      <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
        {/* Mood */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setMood(mood === n ? null : n)}
              className={`text-lg transition-opacity ${
                mood !== null && mood >= n ? "opacity-100" : "opacity-30 hover:opacity-60"
              }`}
            >
              {["☹", "🙁", "😐", "🙂", "😊"][n - 1]}
            </button>
          ))}
        </div>

        <span className="text-muted-foreground/40">|</span>

        {/* Sleep */}
        <div className="flex items-center gap-1">
          <span className="text-xs">睡眠</span>
          <input
            type="number"
            min={0}
            max={24}
            step={0.5}
            value={sleepHours ?? ""}
            onChange={(e) => setSleepHours(e.target.value ? parseFloat(e.target.value) : null)}
    
            placeholder="--"
            className="w-10 border-0 bg-transparent p-0 text-center text-sm outline-none"
          />
          <span className="text-xs">h</span>
        </div>

        <span className="text-muted-foreground/40">|</span>

        {/* Energy */}
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setEnergy(energy === n ? null : n)}
              className={`transition-opacity ${
                energy !== null && energy >= n ? "opacity-100" : "opacity-30 hover:opacity-60"
              }`}
            >
              {"⚡"}
            </button>
          ))}
        </div>

        {/* Save status */}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-md px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            {saving ? "保存中..." : saved ? "已保存 ✓" : "保存"}
          </button>
        </div>
      </div>
    </div>
  );
}
