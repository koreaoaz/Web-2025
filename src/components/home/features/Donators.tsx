"use client"

import * as React from "react"
import { supabase } from "@/lib/supabaseClient"

type Donator = {
  id: number
  name: string
}

type Props = {
  /** 스크롤 영역 배경: "transparent" | "white" (기본: transparent) */
  listBg?: "transparent" | "white"
}

export default function Donators({ listBg = "transparent" }: Props) {
  const [donators, setDonators] = React.useState<Donator[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchDonators = async () => {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from("editor_5_donator")
        .select("id, name")
        .order("id", { ascending: true })

      if (error) setError(error.message)
      setDonators(data ?? [])
      setLoading(false)
    }
    fetchDonators()
  }, [])

  const list = React.useMemo<Donator[]>(
    () =>
      donators.length > 0
        ? donators
        : [
            { id: -1, name: "Loading..." },
            { id: -2, name: "Loading..." },
            { id: -3, name: "Loading..." },
          ],
    [donators]
  )

  const VISIBLE_COUNT = 3
  const ITEM_HEIGHT_PX = 40
  const VIEWPORT_HEIGHT = VISIBLE_COUNT * ITEM_HEIGHT_PX

  const doubled = React.useMemo(
    () => [...list, ...list.map((d, i) => ({ ...d, id: Number(`${d.id}0${i}`) }))],
    [list]
  )

  const durationSec = Math.max(list.length * 0.8, 10)
  const shouldAnimate = !loading && !error && list.length > VISIBLE_COUNT

  // 스크롤 영역 배경 클래스
  const listBgClass =
    listBg === "white" ? "bg-white" : "bg-transparent"

  return (
    <div className="w-full">
      {/* 헤더(검정 상자)만 박스 처리 */}
      <div className="w-full bg-black text-white text-xl font-bold tracking-widest text-center py-1 rounded-xl">
        명예의전당
      </div>

      {/* 스크롤 영역: 투명/흰색 + 검정 텍스트 */}
      <div
        className={`w-full ${listBgClass} text-black overflow-hidden`}
        style={{ height: VIEWPORT_HEIGHT }}
      >
        {error ? (
          <div className="flex items-center justify-center h-full text-red-600">
            오류: {error}
          </div>
        ) : (
          <div
            className={`relative ${shouldAnimate ? "group/scroll" : ""}`}
            style={{ height: VIEWPORT_HEIGHT }}
          >
            <div
              className={`${shouldAnimate ? "donator-animate" : ""}`}
              style={shouldAnimate ? { animationDuration: `${durationSec}s` } : undefined}
            >
              {doubled.map((d, idx) => (
                <div
                  key={`${d.id}-${idx}`}
                  className="h-10 flex items-center justify-center text-lg"
                >
                  <span className="truncate">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 컴포넌트 전용 스타일 */}
      <style jsx>{`
        @keyframes donatorScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .donator-animate {
          display: block;
          will-change: transform;
          animation-name: donatorScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .group\\/scroll:hover .donator-animate {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
