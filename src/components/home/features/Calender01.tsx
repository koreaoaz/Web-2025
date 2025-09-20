"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { supabase } from "@/lib/supabaseClient"

interface Schedule {
  id: number
  description: string
  start_date: string // "YYYY-MM-DD"
  end_date: string   // "YYYY-MM-DD"
}

function toDateOnly(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function parseYMD(s: string) {
  const [y, m, d] = s.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function expandDates(start: Date, end: Date): Date[] {
  const out: Date[] = []
  const cur = new Date(start)
  while (cur <= end) {
    out.push(new Date(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return out
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

export default function Calendar01() {
  // 출력용이므로 '보여줄 기준 월'만 관리 (기본: 오늘의 달)
  const [currentMonth, setCurrentMonth] = React.useState<Date>(startOfMonth(new Date()))
  // Supabase 이벤트
  const [schedules, setSchedules] = React.useState<Schedule[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from("editor_4_schedule")
        .select("id, description, start_date, end_date")
        .order("start_date", { ascending: true })
      if (error) setError(error.message)
      setSchedules(data || [])
      setLoading(false)
    }
    fetchSchedules()
  }, [])

  // --- 이벤트를 달력에 칠하기 위한 modifier용 날짜 집합 생성 ---
  const { evStart, evMiddle, evEnd } = React.useMemo(() => {
    const starts: Date[] = []
    const middles: Date[] = []
    const ends: Date[] = []

    for (const s of schedules) {
      const sd = toDateOnly(parseYMD(s.start_date))
      const ed = toDateOnly(parseYMD(s.end_date))
      const days = expandDates(sd, ed)

      if (days.length === 1) {
        starts.push(days[0])
        ends.push(days[0])
      } else {
        starts.push(days[0])
        ends.push(days[days.length - 1])
        if (days.length > 2) {
          middles.push(...days.slice(1, -1))
        }
      }
    }
    const uniq = (arr: Date[]) =>
      Array.from(new Set(arr.map(d => +toDateOnly(d)))).map(t => new Date(t))

    return {
      evStart: uniq(starts),
      evMiddle: uniq(middles),
      evEnd: uniq(ends),
    }
  }, [schedules])

  // --- 오른쪽 리스트: "현재 보이는 달"의 모든 이벤트 ---
  const eventsForMonth = React.useMemo(() => {
    const mStart = +startOfMonth(currentMonth)
    const mEnd = +endOfMonth(currentMonth)
    // (이벤트가 월 범위와 '겹치면' 포함: sd <= mEnd && ed >= mStart)
    return schedules
      .filter(s => {
        const sd = +toDateOnly(parseYMD(s.start_date))
        const ed = +toDateOnly(parseYMD(s.end_date))
        return sd <= mEnd && ed >= mStart
      })
      // 보기 좋게 시작일 → 종료일 → 설명 순서로 정렬
      .sort((a, b) => {
        const as = a.start_date.localeCompare(b.start_date)
        if (as !== 0) return as
        const ae = a.end_date.localeCompare(b.end_date)
        if (ae !== 0) return ae
        return a.description.localeCompare(b.description)
      })
  }, [schedules, currentMonth])

  function DateBadge({ date }: { date: string }) {
    const d = new Date(date)
    const day = d.getDate()
    const ym = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`

    return (
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-2xl font-bold">{day}</span>
        <span className="text-xs text-muted-foreground">{ym}</span>
      </div>
    )
  }

  return (
    // ✅ 공통 래퍼로 감싸기 (좌/우 2칼럼)
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 px-2 py-2">
      {/* 왼쪽: 달력 */}
      <div className="min-w-0 flex justify-center items-center">
        <Calendar
          mode="single"
          numberOfMonths={1}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          modifiers={{ evStart, evMiddle, evEnd }}
          className="w-full max-w-full md:max-w-md lg:max-w-lg [--cell-size:28px]"
        />
      </div>

      {/* 오른쪽: 투명 박스 + 세로 중앙 정렬 */}
      <div className="min-w-0 flex justify-center items-center">
        <div className="w-full h-full bg-transparent rounded-xl flex items-center justify-center">
          <div className="w-full max-w-full">
            {!loading && !error && eventsForMonth.length > 0 && (
              <ul className="space-y-1">
                {eventsForMonth.map((ev) => {
                  const sameDay = ev.start_date === ev.end_date
                  return (
                    <li key={ev.id} className="flex items-center p-1 rounded-xl">
                      <div className="flex items-center gap-4 w-full">
                        {/* 왼쪽: 날짜 */}
                        <div className="flex items-center gap-2 shrink-0">
                          {sameDay ? (
                            <DateBadge date={ev.start_date} />
                          ) : (
                            <>
                              <DateBadge date={ev.start_date} />
                              <span className="text-muted-foreground" aria-hidden>
                                ~
                              </span>
                              <DateBadge date={ev.end_date} />
                            </>
                          )}
                        </div>
                        {/* 오른쪽: 행사명 */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{ev.description}</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}