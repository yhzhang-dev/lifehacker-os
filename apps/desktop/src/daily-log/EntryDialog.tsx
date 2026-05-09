import { useEffect, useRef } from "react";

const MOOD_EMOJI = ["☹", "🙁", "😐", "🙂", "😊"];
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];
const ENERGY_EMOJI = ["⚡", "⚡⚡", "⚡⚡⚡"];

interface EntryDialogProps {
  entry: {
    date: string;
    content: string;
    mood: number | null;
    sleepHours: number | null;
    energy: number | null;
  };
  onClose: () => void;
}

export function EntryDialog({ entry, onClose }: EntryDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const [y, m, d] = entry.date.split("-").map(Number);
  const dateObj = new Date(entry.date + "T00:00:00");
  const weekday = WEEKDAYS[dateObj.getDay()];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-xl border border-border bg-background p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <time className="text-2xl font-light tracking-tight text-foreground">
            {y} 年 {m} 月 {d} 日
          </time>
          <p className="mt-0.5 text-sm text-muted-foreground">星期{weekday}</p>
        </div>

        {/* Content */}
        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {entry.content}
        </p>

        {/* Meta */}
        <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
          {entry.mood !== null && (
            <>
              <span>{MOOD_EMOJI[entry.mood - 1]}</span>
              <span className="text-muted-foreground/30">|</span>
            </>
          )}
          {entry.sleepHours !== null && (
            <>
              <span>睡眠 {entry.sleepHours}h</span>
              <span className="text-muted-foreground/30">|</span>
            </>
          )}
          {entry.energy !== null && (
            <span>{ENERGY_EMOJI[entry.energy - 1]}</span>
          )}
        </div>

        {/* Close */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
