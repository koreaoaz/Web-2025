"use client";

import { useEffect, useMemo, useState } from "react";
import { AlarmClock } from "lucide-react";

type Props = {
  deadline?: string; // 기본: 2025-09-12T00:00:00+09:00
  className?: string;
  title?: string;
};

const DEFAULT_DEADLINE = "2025-09-12T00:00:00+09:00";

function format(ms: number) {
  if (ms <= 0) return { done: true, text: "모집이 마감되었습니다" };
  const sec = Math.floor(ms / 1000);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return { done: false, text: `${d}D ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}` };
}

export default function RecruitCountdownBlock({
  deadline = DEFAULT_DEADLINE,
  className = "",
  title = "하나와영 25-2 신규 인원 모집 마감까지",
}: Props) {
  const end = useMemo(() => new Date(deadline).getTime(), [deadline]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const left = Math.max(0, end - now);
  const { done, text } = format(left);

  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} aria-live="polite">
      <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <AlarmClock className="w-5 h-5" />
            <span>{title}</span>
          </div>
          <div
            className={`font-extrabold tabular-nums leading-none ${done ? "text-gray-500" : "text-gray-900"} text-[30pt]`}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
