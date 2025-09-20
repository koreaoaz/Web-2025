// src/app/about/notice/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60;

export default async function NoticeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const noticeId = Number.isNaN(Number(id)) ? id : Number(id);

  const { data, error } = await supabase
    .from("editor_0_noti")
    .select("id, text, description, created_at")
    .eq("id", noticeId)
    .maybeSingle();

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          오류: {error.message}
        </div>
      </div>
    );
  }
  if (!data) return notFound();

  const date = new Date(data.created_at as string).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
  <article className="max-w-3xl mx-auto p-6 min-h-[600px] flex flex-col">
    {/* 브레드크럼 / 뒤로가기 */}
    <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/about/notice" className="hover:underline">
        공지사항
      </Link>
      <span aria-hidden>›</span>
      <span className="truncate max-w-[60%]">{data.text}</span>
    </div>

    {/* 제목 & 메타 */}
    <h1 className="text-2xl font-bold tracking-tight">{data.text}</h1>
    <div className="mt-1 text-sm text-muted-foreground tabular-nums">
      게시일 {date}
    </div>

    <hr className="my-6" />

    {/* 본문 */}
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <div className="whitespace-pre-wrap">{data.description}</div>
    </div>

    {/* 하단 액션 */}
    <div className="mt-auto pt-10">
      <Link
        href="/about/notice"
        className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-muted/50"
      >
        ← 목록으로
      </Link>
    </div>
  </article>
);
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const noticeId = Number.isNaN(Number(id)) ? id : Number(id);

  const { data } = await supabase
    .from("editor_0_noti")
    .select("text")
    .eq("id", noticeId)
    .maybeSingle();

  return { title: data?.text ?? "공지사항" };
}
