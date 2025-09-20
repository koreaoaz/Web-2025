"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

const BUCKET = "study-images"
const CARD_COUNT = 6

type StudyItem = {
  id?: number
  name: string
  path: string
  signedUrl: string
  created_at?: string | null
  studyName: string
  studyDescription: string
  studyLeader: string
}

export default function StudyArchiveGrid() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const expandedCardRef = useRef<HTMLDivElement>(null)
  const [files, setFiles] = useState<StudyItem[]>([])
  const [supabaseError, setSupabaseError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const totalCount = files.length
  const totalPages = Math.max(1, Math.ceil(totalCount / CARD_COUNT))
  const start = currentPage * CARD_COUNT
  const end = Math.min(start + CARD_COUNT, totalCount)
  const visibleItems = files.slice(start, end)

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedIndex(null)
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (expandedCardRef.current && !expandedCardRef.current.contains(e.target as Node)) {
        setExpandedIndex(null)
      }
    }

    if (expandedIndex !== null) {
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [expandedIndex])

  async function fetchList() {
    if (!supabase) {
      setSupabaseError("Supabase 연결 오류: 환경변수를 확인해주세요.")
      return
    }

    try {
      // Get database records
      const { data: studyData, error: dbError } = await supabase
        .from("editor_2_studies")
        .select("*")
        .order("created_at", { ascending: false })

      if (dbError) {
        setSupabaseError(`데이터베이스 오류: ${dbError.message}`)
        return
      }

      // Get storage files
      const { data: storageData, error: storageError } = await supabase.storage
        .from(BUCKET)
        .list("", { limit: 1000, sortBy: { column: "created_at", order: "desc" } })

      if (storageError) {
        setSupabaseError(`스토리지 오류: ${storageError.message}`)
        return
      }

      const fileObjs = (storageData ?? []).filter((f) => f.name && !f.name.endsWith("/"))
      const signedItems: StudyItem[] = []

      // Create signed URLs and match with database
      for (const f of fileObjs) {
        const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(f.name)

        const dbRecord = studyData?.find(
          (record) => record.filename === f.name || record.file_name === f.name || record.image_url === f.name,
        )

        signedItems.push({
          id: dbRecord?.id,
          name: f.name,
          path: f.name,
          signedUrl: publicUrl.publicUrl,
          created_at: (f as any)?.created_at ?? null,
          studyName: dbRecord?.study_name || dbRecord?.name || dbRecord?.title || "스터디",
          studyDescription:
            dbRecord?.outline || dbRecord?.study_description || dbRecord?.description || "설명이 없습니다.",
          studyLeader: dbRecord?.leader || "미정",
        })
      }

      setFiles(signedItems)
      setCurrentPage(0)
    } catch (err) {
      setSupabaseError("데이터 로딩 중 오류가 발생했습니다.")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const goPrev = () => setCurrentPage((p) => Math.max(0, p - 1))
  const goNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))

  useEffect(() => {
    setExpandedIndex(null)
  }, [currentPage])

  return (
    <div className="w-full px-10 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">2025-2 스터디 목록</h2>
      </div>

      <div className="relative w-full max-w-5xl mx-auto">
        {supabaseError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2 text-red-500">연결 오류</h3>
            <p className="text-muted-foreground">{supabaseError}</p>
          </div>
        ) : files.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">스터디 목록을 불러오는 중...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-6" style={{ minHeight: "600px" }}>
              {visibleItems.map((item, idx) => {
                const globalIdx = start + idx
                const row = Math.floor(idx / 3)
                const isInExpandedRows =
                  expandedIndex !== null &&
                  (Math.floor((expandedIndex - start) / 3) === row ||
                    Math.floor((expandedIndex - start) / 3) === row - 1)

                return (
                  <div
                    key={item.path}
                    className={`relative rounded-lg shadow-md bg-white overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg group ${
                      expandedIndex !== null && isInExpandedRows ? "opacity-0" : "opacity-100"
                    }`}
                    onClick={() => handleCardClick(globalIdx)}
                    style={{ height: "300px" }}
                  >
                    <div className="h-full p-6 flex flex-col items-center justify-center">
                      <div className="w-4/5 aspect-square rounded-md overflow-hidden mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                        <Image
                          src={item.signedUrl || "/placeholder.svg"}
                          alt={item.studyName}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <h3 className="text-base font-semibold text-center px-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-gray-500">
                        {item.studyName}
                      </h3>
                    </div>
                  </div>
                )
              })}
            </div>

            {expandedIndex !== null && files[expandedIndex] && (
              <div
                ref={expandedCardRef}
                className="absolute bg-white rounded-lg shadow-xl transition-all duration-300 z-20"
                style={{
                  top: (() => {
                    const cardRow = Math.floor((expandedIndex - start) / 3)
                    const totalRows = Math.ceil(visibleItems.length / 3)
                    if (cardRow === totalRows - 1 && totalRows > 1) {
                      return `${(cardRow - 1) * 324}px`
                    }
                    return `${cardRow * 324}px`
                  })(),
                  left: "0",
                  right: "0",
                  height: "635px",
                }}
              >
                <div className="h-full flex">
                  <div className="w-1/2 p-8 flex items-center justify-center">
                    <div className="w-full aspect-square rounded-lg overflow-hidden max-w-[320px]">
                      <Image
                        src={files[expandedIndex].signedUrl || "/placeholder.svg"}
                        alt={files[expandedIndex].studyName}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-6">{files[expandedIndex].studyName}</h2>
                    <div className="mb-4">
                      <span className="text-lg font-semibold text-gray-700">스터디장: </span>
                      <span className="text-lg text-gray-600">{files[expandedIndex].studyLeader}</span>
                    </div>
                    <div className="text-gray-600 leading-relaxed overflow-y-auto max-h-[400px]">
                      {files[expandedIndex].studyDescription.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage > 0 && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute bottom-4 -left-14 -translate-x-[10px] h-11 w-11 rounded-full bg-black text-white shadow backdrop-blur flex items-center justify-center transform transition-all duration-300 ease-out hover:scale-110 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Previous page"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 transition-transform duration-200 ease-out">
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            {currentPage < totalPages - 1 && (
              <button
                type="button"
                onClick={goNext}
                className="absolute bottom-4 -right-14 translate-x-[10px] h-11 w-11 rounded-full bg-black text-white shadow backdrop-blur flex items-center justify-center transform transition-all duration-300 ease-out hover:scale-110 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Next page"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 transition-transform duration-200 ease-out">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>{`${currentPage + 1} / ${totalPages} (총 ${totalCount}개 스터디)`}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
