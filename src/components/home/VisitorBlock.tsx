"use client";
import { useEffect, useState } from "react";

export default function VisitorBlock() {
  const [count, setCount] = useState<number | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    // KST(Asia/Seoul) 기준 YYYY-MM-DD
    const kstToday = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Seoul",
    });
    setToday(kstToday);

    const hit = async () => {
      const lastVisited = localStorage.getItem("lastVisitDate");

      const safeSet = (n: unknown) => {
        if (typeof n === "number" && Number.isFinite(n)) {
          setCount(n);
          return true;
        }
        return false;
      };

      if (lastVisited !== kstToday) {
        // 오늘 첫 방문 → POST
        try {
          const res = await fetch("/api/visitor", { method: "POST" });
          if (!res.ok) throw new Error(`POST /api/visitor ${res.status}`);
          const data = await res.json();
          // 서버가 { count: number }로 응답한다고 가정
          if (safeSet(data?.count)) {
            localStorage.setItem("lastVisitDate", kstToday);
            return;
          }
          // 응답 형태가 달라진 경우 방어
          if (safeSet(data?.visitor)) {
            localStorage.setItem("lastVisitDate", kstToday);
            return;
          }
          throw new Error("Invalid POST payload");
        } catch {
          // POST 실패 시 localStorage 찍지 말고 GET으로 폴백
        }
      }

      // 오늘 이미 방문 기록 있음 → GET (또는 POST 실패 폴백)
      try {
        const res = await fetch("/api/visitor");
        if (!res.ok) throw new Error(`GET /api/visitor ${res.status}`);
        const data = await res.json();
        safeSet(data?.count) || safeSet(data?.visitor);
      } catch {
        setCount(0); // 마지막 안전망
      }
    };

    hit();
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-xl p-6 text-center border border-gray-200 mt-10">
      {/* <img
        src="/block title/daily-visitors-title.png"
        alt="오늘 방문자 수"
        className="mb-2 mx-auto"
      /> */}
      <p className="text-5xl font-bold text-blue-600 mb-2">
        {typeof count === "number" ? count : "..."}
      </p>
      <p className="text-sm text-gray-500">{today}</p>
    </div>
  );
}
