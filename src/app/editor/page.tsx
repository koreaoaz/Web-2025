"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRef } from "react";
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"

type BoardType = "공지" | "프로젝트" | "스터디" | "학회실 사용 시간표" | "명예의 전당" | "일정"

const getTableName = (board: BoardType): string | null => {
  switch (board) {
    case "공지":
      return "editor_0_noti"
    case "프로젝트":
      return "editor_1_projects"
    case "스터디":
      return "editor_2_studies"
    case "학회실 사용 시간표":
      return "editor_3_study_timetable"
    case "일정":
      return "editor_4_schedule"
    case "명예의 전당":
      return "editor_5_donator"
    default:
      return null
  }
}

function CategorySelect({ value, onChange, label = "카테고리 *" }: {
  value: string;
  onChange: (v: CategoryKey) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = value as CategoryKey | "";

  return (
    <div ref={wrapRef} className="relative">
      {/* 라벨 숨기기: 높이 영향 X, 접근성 O */}
      {label && <span className="sr-only">{label}</span>}

      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-10 px-3 border border-gray-300 rounded-md text-left bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center relative"
      >
        <span className="truncate">{selected || "카테고리 선택"}</span>
        <span className="absolute right-2">▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="프로젝트 카테고리"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg"
        >
          {CATEGORY_OPTIONS.map(opt => {
            const isActive = selected === opt;
            return (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${isActive ? "bg-gray-100" : ""}`}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const categoryColors: Record<string, string> = {
  "AI/ML": "bg-blue-100 text-blue-800 border-blue-200",
  "해커톤": "bg-purple-100 text-purple-800 border-purple-200",
  "HW": "bg-green-100 text-green-800 border-green-200",
  "Web/App": "bg-orange-100 text-orange-800 border-orange-200",
  "BigData": "bg-pink-100 text-pink-800 border-pink-200",
};

type CategoryKey = keyof typeof categoryColors;
const CATEGORY_OPTIONS: CategoryKey[] = ["AI/ML", "해커톤", "HW", "Web/App", "BigData"];

// 유틸(선택)
const cx = (...cls: (string | false | null | undefined)[]) => cls.filter(Boolean).join(" ");

const sanitizeFileName = (fileName: string): string => {
  // Get file extension
  const lastDotIndex = fileName.lastIndexOf(".")
  const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName
  const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : ""

  // Remove or replace problematic characters
  const sanitized = name
    .replace(/[^\w\-_.]/g, "_") // Replace non-alphanumeric chars with underscore
    .replace(/\s+/g, "_") // Replace spaces with underscore
    .replace(/_{2,}/g, "_") // Replace multiple underscores with single
    .replace(/^_+|_+$/g, "") // Remove leading/trailing underscores
    .toLowerCase() // Convert to lowercase

  // Generate unique prefix to avoid conflicts
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 8)

  return `${timestamp}_${randomStr}_${sanitized}${extension}`
}

const useDragAndDrop = (posts: any[], setPosts: any, board: BoardType) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [dropPosition, setDropPosition] = useState<"top" | "bottom" | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()

    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const height = rect.height

    const position = y < height / 2 ? "top" : "bottom"

    setDragOverIndex(index)
    setDropPosition(position)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
    setDropPosition(null)
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedIndex === null) return

    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const height = rect.height

    let newIndex = dropIndex
    if (y >= height / 2) {
      newIndex = dropIndex + 1
    }

    if (draggedIndex < newIndex) {
      newIndex -= 1
    }

    if (draggedIndex === newIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      setDropPosition(null)
      return
    }

    const newPosts = [...posts]
    const [draggedItem] = newPosts.splice(draggedIndex, 1)
    newPosts.splice(newIndex, 0, draggedItem)

    const table = getTableName(board)
    if (table) {
      try {
        for (let i = 0; i < newPosts.length; i++) {
          const { error } = await supabase
            .from(table)
            .update({ id: i + 1 })
            .eq("id", newPosts[i].id)

          if (error) {
            console.error("Error updating order:", error)
            return
          }
        }

        const updatedPosts = newPosts.map((post, index) => ({
          ...post,
          id: index + 1,
        }))

        setPosts(updatedPosts)
      } catch (error) {
        console.error("Error reordering posts:", error)
      }
    }

    setDraggedIndex(null)
    setDragOverIndex(null)
    setDropPosition(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
    setDropPosition(null)
  }

  return {
    draggedIndex,
    dragOverIndex,
    dropPosition,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  }
}

const useImageUpload = () => {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImage(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const resetImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const clearImage = () => {
    setImage(null)
    setImagePreview(null)
    // Reset the file input
    const fileInput = document.getElementById("project-image") as HTMLInputElement
    if (fileInput) fileInput.value = ""
    const studyFileInput = document.getElementById("study-image") as HTMLInputElement
    if (studyFileInput) studyFileInput.value = ""
  }

  return {
    image,
    imagePreview,
    handleImageChange,
    resetImage,
    clearImage,
  }
}



const fetchPosts = async (board: BoardType, setPosts: any) => {
  const table = getTableName(board)
  if (!table) return

  const { data, error } = await supabase.from(table).select("*")
  if (error) {
    console.error("Error fetching posts:", error)
  } else {
    setPosts(data)
  }
}

const handleDeletePost = async (post: any, board: BoardType, setPosts: any) => {
  const confirmed = window.confirm("정말로 삭제하십니까?")
  if (!confirmed) {
    return
  }

  const table = getTableName(board as BoardType)
  if (!table) return

  try {
    if (post.filename) {
      let bucketName = ""

      if (board === "프로젝트") {
        bucketName = "project_img"
      } else if (board === "스터디") {
        bucketName = "study-images"
      }

      if (bucketName) {
        console.log("[v0] Attempting to delete image from bucket:", bucketName, "file:", post.filename)

        // First check if the file exists
        const { data: fileExists, error: listError } = await supabase.storage
          .from(bucketName)
          .list("", { search: post.filename })

        if (listError) {
          console.log("[v0] Error checking file existence:", listError)
        } else {
          console.log("[v0] File existence check result:", fileExists)
        }

        // Attempt to delete the file
        const { data: deleteData, error: storageError } = await supabase.storage
          .from(bucketName)
          .remove([post.filename])

        console.log("[v0] Delete operation result:", { data: deleteData, error: storageError })

        if (storageError) {
          console.error("[v0] Error deleting image from storage:", storageError)
          console.error("[v0] Storage error details:", {
            message: storageError.message,
            bucket: bucketName,
            filename: post.filename,
          })
          // Continue with post deletion even if image deletion fails
        } else {
          console.log("[v0] Successfully deleted image from storage")
          console.log("[v0] Deleted files:", deleteData)
        }
      }
    } else {
      console.log("[v0] No filename found for post, skipping image deletion")
    }

    // Delete post from database table
    console.log("[v0] Deleting post from table:", table, "with ID:", post.id)
    const { error } = await supabase.from(table).delete().eq("id", post.id)
    if (error) {
      console.error("[v0] Error deleting post from database:", error)
    } else {
      console.log("[v0] Successfully deleted post from database")
      fetchPosts(board as BoardType, setPosts)
    }
  } catch (error) {
    console.error("[v0] Unexpected error during post deletion:", error)
  }
}

const generateTimeOptions = (startHour: number, endHour: number) => {
  const times: string[] = []
  for (let hour = startHour; hour <= endHour; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`)
    if (hour !== endHour) {
      times.push(`${hour.toString().padStart(2, "0")}:30`)
    }
  }
  return times
}

const timeOptions = generateTimeOptions(11, 22)

const dayOptions = ["월요일", "화요일", "수요일", "목요일", "금요일"]

const getBucketName = (type: "study" | "project"): string => {
  if (type === "study") {
    return "study-images" // This works based on debug logs
  } else {
    return "project_img" // Try the original name user mentioned
  }
}

const getImageUrl = async (filename: string, board: string): Promise<string> => {
  let bucketName = ""

  if (board === "프로젝트") {
    bucketName = "project_img"
  } else if (board === "스터디") {
    bucketName = "study-images"
  }

  if (bucketName && filename) {
    try {
      // Get public URL from Supabase storage
      const { data } = await supabase.storage.from(bucketName).getPublicUrl(filename)

      console.log("[v0] Generated public URL for:", filename, "URL:", data.publicUrl)
      return data.publicUrl
    } catch (error) {
      console.log("[v0] Error getting public URL:", error)
      return "/---------.jpg"
    }
  }

  return "/---------.jpg"
}

export default function AdminBoardPage() {
  const [session, setSession] = useState<any>(null)
  const [board, setBoard] = useState<BoardType>("공지")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [availableBuckets, setAvailableBuckets] = useState<string[]>([])

  const [duration, setDuration] = useState("")
  const [category, setCategory] = useState("")
  const [semester, setSemester] = useState("")
  const [teamSize, setTeamSize] = useState<number | null>(null)
  const [members, setMembers] = useState("")
  const [techStack, setTechStack] = useState("")
  const [detailedDescription, setDetailedDescription] = useState("")
  const [studyName, setStudyName] = useState("")
  const [studyLeader, setStudyLeader] = useState("")
  const [studyOutline, setStudyOutline] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [dayOfWeek, setDayOfWeek] = useState("")
  const [studyColor, setStudyColor] = useState("#00ff00")

  const [donatorName, setDonatorName] = useState("")
  const [donatorYear, setDonatorYear] = useState("")
  const [donatorMonth, setDonatorMonth] = useState("")
  const [donatorDay, setDonatorDay] = useState("")
  const [scheduleDescription, setScheduleDescription] = useState("")
  const [scheduleStartYear, setScheduleStartYear] = useState("")
  const [scheduleStartMonth, setScheduleStartMonth] = useState("")
  const [scheduleStartDay, setScheduleStartDay] = useState("")
  const [scheduleEndYear, setScheduleEndYear] = useState("")
  const [scheduleEndMonth, setScheduleEndMonth] = useState("")
  const [scheduleEndDay, setScheduleEndDay] = useState("")

  const proj_baseUrl = process.env.NEXT_PUBLIC_PROJECT_STORAGE_URL

  const projectImage = useImageUpload()
  const studyImage = useImageUpload()

  const validateTimetableForm = () => {
    if (!dayOfWeek || !startTime || !endTime || !studyName || !studyLeader) return false;

    // "HH:MM" -> 분 단위로 변환
    const toMin = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    if (toMin(endTime) <= toMin(startTime)) return false; // 종료가 시작보다 커야 함
    return true;
  }

  const discoverBuckets = async () => {
    try {
      console.log("[v0] Discovering available buckets...")
      const { data: buckets, error } = await supabase.storage.listBuckets()

      if (error) {
        console.log("[v0] Error listing buckets:", error)
        return
      }

      const bucketNames = buckets?.map((bucket) => bucket.name) || []
      console.log("[v0] Available buckets:", bucketNames)
      setAvailableBuckets(bucketNames)

      return bucketNames
    } catch (error) {
      console.log("[v0] Error discovering buckets:", error)
      return []
    }
  }

  const resetForm = () => {
    setTitle("")
    setBody("")
    setDuration("")
    setCategory("")
    setSemester("")
    setTeamSize(null)
    setMembers("")
    setTechStack("")
    setDetailedDescription("")
    setStudyName("")
    setStudyLeader("")
    setStudyOutline("")
    setStartTime("")
    setEndTime("")
    setDayOfWeek("")
    setStudyColor("#00ff00")
    setDonatorName("")
    setDonatorYear("")
    setDonatorMonth("")
    setDonatorDay("")
    setScheduleDescription("")
    setScheduleStartYear("")
    setScheduleStartMonth("")
    setScheduleStartDay("")
    setScheduleEndYear("")
    setScheduleEndMonth("")
    setScheduleEndDay("")
    projectImage.resetImage()
    studyImage.resetImage()
    setMessage(null)
  }

  const handleCreatePost = async () => {
    const table = getTableName(board)
    if (!table) return

    setIsUploading(true)
    let imageUrl = null

    try {
      await discoverBuckets()

      if (board === "프로젝트" && projectImage.image) {
        const fileName = sanitizeFileName(projectImage.image.name)
        const bucketName = "project_img"
        console.log("[v0] Using project bucket:", bucketName)
        console.log("[v0] Sanitized project file name:", fileName)

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, projectImage.image, { contentType: projectImage.image.type })

        if (uploadError) {
          console.log("[v0] Project image upload error:", uploadError)
          setMessage("프로젝트 이미지 업로드 실패: " + uploadError.message)
          setIsUploading(false)
          return
        }
        console.log("[v0] Project image uploaded successfully:", fileName)
        imageUrl = fileName
      }

      if (board === "스터디" && studyImage.image) {
        const fileName = sanitizeFileName(studyImage.image.name)
        const bucketName = "study-images"
        console.log("[v0] Using study bucket:", bucketName)
        console.log("[v0] Sanitized study file name:", fileName)

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, studyImage.image, { contentType: studyImage.image.type })

        if (uploadError) {
          console.log("[v0] Study image upload error:", uploadError)
          setMessage("스터디 이미지 업로드 실패: " + uploadError.message)
          setIsUploading(false)
          return
        }
        console.log("[v0] Study image uploaded successfully:", fileName)
        imageUrl = fileName
      }

      if (board === "학회실 사용 시간표") {
        if (!validateTimetableForm()) {
          setIsUploading(false)
          return
        }
      }

      let payload: any = {}
      if (board === "공지") {
        payload = {
          text: title,
          description: body,
        }
      } else if (board === "프로젝트") {
        const { data: maxIdData } = await supabase.from(table).select("id").order("id", { ascending: false }).limit(1)

        const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1

        payload = {
          id: nextId,
          created_at: new Date().toISOString(),
          project_name: title,
          duration,
          category,
          semester,
          team_size: teamSize,
          members,
          description: body,
          detailed_description: detailedDescription,
          tech_stack: JSON.stringify({ stack: techStack.split(",").map((s) => s.trim()) }),
          filename: imageUrl,
        }
      } else if (board === "스터디") {
        const { data: maxIdData } = await supabase.from(table).select("id").order("id", { ascending: false }).limit(1)

        const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1

        payload = {
          id: nextId,
          created_at: new Date().toISOString(),
          study_name: studyName,
          leader: studyLeader,
          outline: studyOutline,
          filename: imageUrl,
        }
      } else if (board === "학회실 사용 시간표") {
        const { data: maxIdData } = await supabase.from(table).select("id").order("id", { ascending: false }).limit(1)

        const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1

        payload = {
          id: nextId,
          study_name: studyName,
          leader: studyLeader,
          color: studyColor,
          start_time: `${dayOfWeek} ${startTime}`,
          end_time: `${dayOfWeek} ${endTime}`,
          created_at: new Date().toISOString(),
        }
      } else if (board === "명예의 전당") {
        const { data: maxIdData } = await supabase.from(table).select("id").order("id", { ascending: false }).limit(1)
        const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1

        const dateString = `${donatorYear}-${donatorMonth.padStart(2, "0")}-${donatorDay.padStart(2, "0")}`

        payload = {
          id: nextId,
          name: donatorName,
          date: dateString,
          created_at: new Date().toISOString(),
        }
      } else if (board === "일정") {
        const { data: maxIdData } = await supabase.from(table).select("id").order("id", { ascending: false }).limit(1)
        const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1

        const startDateString = `${scheduleStartYear}-${scheduleStartMonth.padStart(2, "0")}-${scheduleStartDay.padStart(2, "0")}`
        const endDateString = `${scheduleEndYear}-${scheduleEndMonth.padStart(2, "0")}-${scheduleEndDay.padStart(2, "0")}`

        payload = {
          id: nextId,
          description: scheduleDescription,
          start_date: startDateString,
          end_date: endDateString,
          created_at: new Date().toISOString(),
        }
      }

      console.log("[v0] Inserting payload:", payload)
      console.log("[v0] Target table:", table)

      const { data, error } = await supabase.from(table).insert([payload])

      if (error) {
        console.log("[v0] Database insert error:", error)
        setMessage("게시글 등록 실패: " + error.message)
      } else {
        console.log("[v0] Insert successful:", data)
        setMessage("업로드 되었습니다!")
        resetForm()
        fetchPosts(board, setPosts)

        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    } catch (error) {
      console.error("[v0] Unexpected error:", error)
      setMessage("예상치 못한 오류가 발생했습니다.")
    } finally {
      setIsUploading(false)
    }
  }

  const dragAndDrop = useDragAndDrop(posts, setPosts, board)

  useEffect(() => {
    fetchPosts(board, setPosts)
    discoverBuckets()
  }, [board])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">관리자 게시판</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {(["공지", "프로젝트", "스터디", "학회실 사용 시간표", "명예의 전당", "일정"] as BoardType[]).map(
              (boardType) => (
                <button
                  key={boardType}
                  onClick={() => setBoard(boardType)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    board === boardType ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {boardType}
                </button>
              ),
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleCreatePost()
            }}
            className="space-y-4"
          >
            {board === "공지" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="공지사항 제목을 입력하세요"
                    required
                  />
                </div>

                {/* ✅ 내용(=description) 입력 추가 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                    placeholder="공지 내용을 입력하세요"
                    required
                  />
                </div>
              </div>
            )}


            {board === "명예의 전당" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                  <input
                    type="text"
                    value={donatorName}
                    onChange={(e) => setDonatorName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="기부자 이름을 입력하세요"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={donatorYear}
                      onChange={(e) => setDonatorYear(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">년도</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                          {year}년
                        </option>
                      ))}
                    </select>
                    <select
                      value={donatorMonth}
                      onChange={(e) => setDonatorMonth(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">월</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month}>
                          {month}월
                        </option>
                      ))}
                    </select>
                    <select
                      value={donatorDay}
                      onChange={(e) => setDonatorDay(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">일</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}일
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {board === "일정" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">일정 설명</label>
                  <input
                    type="text"
                    value={scheduleDescription}
                    onChange={(e) => setScheduleDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="일정 설명을 입력하세요"
                    required
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">시작 날짜</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={scheduleStartYear}
                        onChange={(e) => setScheduleStartYear(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">년도</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <option key={year} value={year}>
                            {year}년
                          </option>
                        ))}
                      </select>
                      <select
                        value={scheduleStartMonth}
                        onChange={(e) => setScheduleStartMonth(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">월</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <option key={month} value={month}>
                            {month}월
                          </option>
                        ))}
                      </select>
                      <select
                        value={scheduleStartDay}
                        onChange={(e) => setScheduleStartDay(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">일</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <option key={day} value={day}>
                            {day}일
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">종료 날짜</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={scheduleEndYear}
                        onChange={(e) => setScheduleEndYear(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">년도</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <option key={year} value={year}>
                            {year}년
                          </option>
                        ))}
                      </select>
                      <select
                        value={scheduleEndMonth}
                        onChange={(e) => setScheduleEndMonth(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">월</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <option key={month} value={month}>
                            {month}월
                          </option>
                        ))}
                      </select>
                      <select
                        value={scheduleEndDay}
                        onChange={(e) => setScheduleEndDay(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">일</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <option key={day} value={day}>
                            {day}일
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {board === "프로젝트" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="프로젝트명"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="기간"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <CategorySelect value={category} onChange={(v) => setCategory(v)} label="" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="학기 (예: 2024-2)"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="팀 규모"
                    value={teamSize ?? ""}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="팀원 (쉼표 구분)"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="간단 설명"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full min-h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
                <textarea
                  placeholder="상세 설명"
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
                <input
                  type="text"
                  placeholder="기술스택 (쉼표로 구분)"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <label htmlFor="project-image" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm font-medium">이미지 선택</span>
                      </div>
                    </label>
                    <input
                      id="project-image"
                      type="file"
                      accept="image/*"
                      onChange={projectImage.handleImageChange}
                      className="hidden"
                    />
                    {projectImage.image && <span className="text-sm text-gray-600">{projectImage.image.name}</span>}
                  </div>
                  {projectImage.imagePreview && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">미리보기:</span>
                      <img
                        src={projectImage.imagePreview || "/placeholder.svg"}
                        alt="미리보기"
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={projectImage.clearImage}
                        className="ml-2 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {board === "스터디" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="스터디명 *"
                    value={studyName}
                    onChange={(e) => setStudyName(e.target.value)}
                    required
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="스터디장 *"
                    value={studyLeader}
                    onChange={(e) => setStudyLeader(e.target.value)}
                    required
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <textarea
                  placeholder="스터디 설명 *"
                  value={studyOutline}
                  onChange={(e) => setStudyOutline(e.target.value)}
                  required
                  className="w-full min-h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <label htmlFor="study-image" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm font-medium">이미지 선택</span>
                      </div>
                    </label>
                    <input
                      id="study-image"
                      type="file"
                      accept="image/*"
                      onChange={studyImage.handleImageChange}
                      className="hidden"
                    />
                    {studyImage.image && <span className="text-sm text-gray-600">{studyImage.image.name}</span>}
                  </div>
                  {studyImage.imagePreview && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">미리보기:</span>
                      <img
                        src={studyImage.imagePreview || "/placeholder.svg"}
                        alt="미리보기"
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={studyImage.clearImage}
                        className="ml-2 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {board === "학회실 사용 시간표" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="" disabled>요일 선택</option>
                    {dayOptions.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-4">
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="" disabled>시작 시간</option>
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="" disabled>종료 시간</option>
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="스터디명 *"
                  value={studyName}
                  onChange={(e) => setStudyName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="스터디장 *"
                  value={studyLeader}
                  onChange={(e) => setStudyLeader(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">색상 선택</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={studyColor}
                      onChange={(e) => setStudyColor(e.target.value)}
                      className="w-16 h-10 border border-gray-300 rounded-md cursor-pointer"
                    />
                    <div
                      className="w-20 h-10 rounded-md border border-gray-300 flex items-center justify-center text-xs font-medium"
                      style={{ backgroundColor: studyColor, color: studyColor === "#000000" ? "white" : "black" }}
                    >
                      미리보기
                    </div>
                    <span className="text-sm text-gray-600">{studyColor}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {isUploading ? "업로드 중..." : "게시글 등록"}
            </button>
          </form>

          {message && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">{message}</div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">게시글 목록</h2>
          <ul className="space-y-4">
            {posts.map((post, index) => (
              <li
                key={post.id}
                draggable
                onDragStart={(e) => dragAndDrop.handleDragStart(e, index)}
                onDragOver={(e) => dragAndDrop.handleDragOver(e, index)}
                onDragLeave={dragAndDrop.handleDragLeave}
                onDrop={(e) => dragAndDrop.handleDrop(e, index)}
                onDragEnd={dragAndDrop.handleDragEnd}
                className={`flex items-center justify-between p-4 rounded-md border ${
                  dragAndDrop.draggedIndex === index ? "bg-blue-100" : "bg-gray-50"
                } ${
                  dragAndDrop.dragOverIndex === index && dragAndDrop.dropPosition === "top"
                    ? "border-t-2 border-blue-600"
                    : ""
                } ${
                  dragAndDrop.dragOverIndex === index && dragAndDrop.dropPosition === "bottom"
                    ? "border-b-2 border-blue-600"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  {(board === "프로젝트" || board === "스터디") && (
                    <div className="relative">
                      {post.filename ? (
                        <ImageFromStorage
                          filename={post.filename}
                          board={board}
                          className="w-16 h-16 object-cover rounded-md border border-gray-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center">
                          <span className="text-xs text-gray-400">이미지 없음</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    {board === "공지" && (
                      <>
                        <h3 className="text-lg font-medium text-gray-900">{post.text}</h3>
                        {post.description && (
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">
                            {post.description}
                          </p>
                        )}
                      </>
                    )}
                    {board === "프로젝트" && (
                      <>
                        <h3 className="text-lg font-medium text-gray-900">{post.project_name}</h3>
                        <p className="text-sm text-gray-600">{post.description}</p>
                      </>
                    )}
                    {board === "스터디" && (
                      <>
                        <h3 className="text-lg font-medium text-gray-900">{post.study_name}</h3>
                        <p className="text-sm text-gray-600">{post.outline}</p>
                      </>
                    )}
                    {board === "학회실 사용 시간표" && (
                      <>
                        <h3 className="text-lg font-medium text-gray-900">{post.study_name}</h3>
                        <p className="text-sm text-gray-600">
                          {post.leader} - {post.start_time} ~ {post.end_time}
                        </p>
                      </>
                    )}
                    {board === "명예의 전당" && (
                      <>
                        <h3 className="text-lg font-medium text-gray-900">{post.name}</h3>
                        <p className="text-sm text-gray-600">{post.date}</p>
                      </>
                    )}
                    {board === "일정" && (
                      <>
                        <h3 className="text-lg font-medium text-gray-900">{post.description}</h3>
                        <p className="text-sm text-gray-600">
                          {post.start_date} ~ {post.end_date}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeletePost(post, board, setPosts)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const ImageFromStorage = ({ filename, board, className }: { filename: string; board: string; className: string }) => {
  const [imageUrl, setImageUrl] = useState<string>("/---------.jpg")

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await getImageUrl(filename, board)
      setImageUrl(url)
    }

    fetchImageUrl()
  }, [filename, board])

  return <Image src={imageUrl || "/placeholder.svg"} alt="게시글 이미지" width={24} height={24} className={className} />
}
