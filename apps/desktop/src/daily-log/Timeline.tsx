interface TimelineEntry {
  id: string;
  content: string;
  happenedAt: string;
  mood: number | null;
}

interface TimelineProps {
  entries: TimelineEntry[];
  onSelect: (id: string) => void;
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((today.getTime() - d.getTime()) / 86400000);

  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = WEEKDAYS[d.getDay()];

  let prefix = "";
  if (diffDays === 0) prefix = "今天";
  else if (diffDays === 1) prefix = "昨天";
  else if (diffDays === 2) prefix = "前天";
  else prefix = `${month}月${day}日`;

  return `${prefix} · 周${weekday}`;
}

function preview(text: string, max = 80) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

function moodEmoji(m: number | null): string {
  if (m === null) return "";
  return ["☹", "🙁", "😐", "🙂", "😊"][m - 1] ?? "";
}

export function Timeline({ entries, onSelect }: TimelineProps) {
  if (entries.length === 0) return null;

  return (
    <div className="mx-auto mt-16 max-w-2xl border-t border-border pt-8">
      <h2 className="mb-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        最近记录
      </h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry.id)}
            className="group flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-accent/30"
          >
            <time className="mt-0.5 min-w-24 text-xs text-muted-foreground">
              {formatDate(entry.happenedAt)}
            </time>
            <p className="flex-1 text-sm leading-relaxed text-foreground/80 group-hover:text-foreground">
              {preview(entry.content)}
            </p>
            {entry.mood && (
              <span className="mt-0.5 text-sm">{moodEmoji(entry.mood)}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
