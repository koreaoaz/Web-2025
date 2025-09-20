"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Loader2, AlertCircle } from "lucide-react"

interface Study {
  id: string
  name: string
  leader: string
  color: string
  day: string
  startTime: string
  endTime: string
  startSlot: number
  endSlot: number
}

// Supabase client setup
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

// Utility functions
const timeToSlot = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number)
  return (hours - 9) * 2 + (minutes >= 30 ? 1 : 0)
}

export const TimetableDemo = () => {
  const [studies, setStudies] = useState<Study[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadStudies()
  }, [])

  const loadStudies = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // console.log("[v0] Loading studies from time_table...")

      const { data, error } = await supabase.from("editor_3_study_timetable").select("*").order("start_time")

      // console.log("[v0] Database query result:", { data, error })

      if (error) {
        console.error("[v0] Database error:", error)
        setError(`Database error: ${error.message}`)
        setStudies([])
        return
      }

      if (data && data.length > 0) {
        // console.log("[v0] Raw data from database:", data)

        const validStudies: Study[] = []
        const seenStudies = new Set<string>()

        data.forEach((item: any, index: number) => {
          // console.log("[v0] Processing item:", item)

          // Check for required fields
          if (!item.start_time || !item.end_time || !item.study_name) {
            console.warn("[v0] Missing required data for item:", item)
            return
          }

          const startParts = item.start_time.split(" ")
          const endParts = item.end_time.split(" ")

          if (startParts.length < 2 || endParts.length < 2) {
            console.warn("[v0] Invalid time format for item:", item)
            return
          }

          const day = startParts[0]
          const startTime = startParts[1]
          const endTime = endParts[1]

          // Create unique identifier to prevent duplicates
          const studyKey = `${item.study_name}-${item.leader}-${day}-${startTime}-${endTime}`
          if (seenStudies.has(studyKey)) {
            console.warn("[v0] Duplicate study detected, skipping:", studyKey)
            return
          }
          seenStudies.add(studyKey)

          const converted = {
            id: item.id?.toString() || `temp-${index}-${Date.now()}`,
            name: item.study_name,
            leader: item.leader || "Unknown",
            color: item.color || "#6b7280",
            day,
            startTime,
            endTime,
            startSlot: timeToSlot(startTime),
            endSlot: timeToSlot(endTime),
          }

          // console.log("[v0] Converted study:", converted)
          validStudies.push(converted)
        })

        // console.log("[v0] Final converted studies:", validStudies)
        setStudies(validStudies)
        setError(null)
      } else {
        // console.log("[v0] No data in database")
        setStudies([])
      }
    } catch (error) {
      console.error("[v0] Error loading studies:", error)
      setError(`Failed to load studies: ${error instanceof Error ? error.message : "Unknown error"}`)
      setStudies([])
    } finally {
      setIsLoading(false)
    }
  }

  // const generateTimeSlots = () => {
  //   const slots = []
  //   const occupiedHours = new Set<number>()

  //   studies.forEach((study) => {
  //     for (let slot = study.startSlot; slot < study.endSlot; slot++) {
  //       occupiedHours.add(Math.floor(slot / 2))
  //     }
  //   })

  //   const sortedHours = Array.from(occupiedHours).sort((a, b) => a - b)

  //   if (sortedHours.length === 0) {
  //     for (let hour = 0; hour <= 7; hour++) {
  //       slots.push({ type: "hour", hour: hour + 9 })
  //     }
  //   } else {
  //     for (let i = 0; i < sortedHours.length; i++) {
  //       const currentHour = sortedHours[i]
  //       const prevHour = i > 0 ? sortedHours[i - 1] : null

  //       if (prevHour !== null && currentHour - prevHour > 1) {
  //         slots.push({ type: "gap" })
  //       }

  //       slots.push({ type: "hour", hour: currentHour + 9 })
  //     }
  //   }

  //   return slots
  // }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 11; hour <= 22; hour++) {
      slots.push({ type: "hour", hour })
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
        </div>
      )}

      {studies.length === 0 && !isLoading && (
        <div className="text-center p-8 text-muted-foreground">
          <p>No studies found in the database.</p>
        </div>
      )}

      {studies.length > 0 && (
        <div className="w-full">
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <div className="w-full min-w-[300px]">
                {/* Header */}
                <div className="grid grid-cols-[0.3fr_repeat(5,1fr)] border-b bg-white">
                  <div className="p-2 text-center font-medium text-xs sm:text-sm"></div>
                  {["월", "화", "수", "목", "금"].map((day) => (
                    <div key={day} className="p-0.3 text-center font-medium text-[10px] border-l">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                {timeSlots.map((slot, index) => {
                  if (slot.type === "gap") {
                    return (
                      <div key={`gap-${index}`} className="grid grid-cols-6 border-b">
                        <div className="p-1 text-center text-xs text-muted-foreground">⋯</div>
                        {Array.from({ length: 5 }, (_, i) => (
                          <div key={i} className="border-l p-1 text-center text-xs text-muted-foreground">
                            ⋯
                          </div>
                        ))}
                      </div>
                    )
                  }

                  const hour = slot.hour!
                  return (
                    <div
                      key={`hour-${hour}`}
                      className="grid grid-cols-[0.3fr_repeat(5,1fr)] border-b relative "
                      style={{ minHeight: "45px" }}
                    >
                      <div className="px-0.5 py-0.2 text-right text-[9px] font-medium bg-white">
                        {hour % 12 === 0 ? 12 : hour % 12}
                      </div>

                      {["월요일","화요일","수요일","목요일","금요일"].map((day) => {
                        const dayStudies = studies.filter(
                          (study) =>
                            study.day === day && study.startSlot < (hour - 9 + 1) * 2 && study.endSlot > (hour - 9) * 2,
                        )

                        return (
                          <div key={day} className="border-l relative">
                            {dayStudies.map((study) => {
                              const startHour = Math.floor(study.startSlot / 2) + 9

                              if (startHour === hour) {
                                const height = (study.endSlot - study.startSlot) * 22
                                return (
                                  <div
                                    key={study.id}
                                    className="absolute inset-x-0 p-1 text-xs text-white rounded-sm overflow-hidden shadow-sm z-10"
                                    style={{
                                      backgroundColor: study.color,
                                      height: `${height}px`,
                                      top: `${(study.startSlot % 2) * 25}px`,
                                    }}
                                  >
                                    <div className="font-medium text-[11px] leading-tight break-words">
                                      {study.name}
                                    </div>
                                    <div className="opacity-90 text-[10px] leading-tight break-words">
                                      {study.leader}
                                    </div>
                                  </div>
                                )
                              }
                              return null
                            })}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimetableDemo