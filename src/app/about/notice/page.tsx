// src/app/about/notice/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60; // ISR

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const ROW_H = "h-14";
const PAGE_SIZE = 10;
const PAGE_WINDOW = 5; // 페이지 버튼 최대 개수 (예: 1 2 3 4 5)

function ArrowButton({
  href,
  disabled,
  direction, // "<" | ">"
}: {
  href: string;
  disabled?: boolean;
  direction: "<" | ">";
}) {
  const base =
    "inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm";
  if (disabled) {
    // 연한 회색 + 클릭 방지 (pointer-events-none)
    return (
      <span
        aria-disabled="true"
        className={`${base} text-gray-300 bg-transparent pointer-events-none`}
      >
        {direction}
      </span>
    );
  }
  // 진한 회색 + 활성/호버
  return (
    <Link
      href={href}
      aria-label={direction === "<" ? "이전 페이지" : "다음 페이지"}
      className={`${base} text-gray-700 hover:bg-muted`}
    >
      {direction}
    </Link>
  );
}

export default async function Page({ searchParams }: PageProps) {
  // 현재 페이지 (1부터 시작)
  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams?.page[0]
    : searchParams?.page;
  const page = Math.max(1, Number(pageParam) || 1);

  // Supabase range 계산
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // 데이터 + 전체 개수(count) 함께 조회
  const { data, error, count } = await supabase
    .from("editor_0_noti")
    .select("id, text, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          오류: {error.message}
        </div>
      </div>
    );
  }

  const notices = data ?? [];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // 페이지 버튼 범위 계산 (슬라이딩 윈도우)
  let start = Math.max(1, page - Math.floor(PAGE_WINDOW / 2));
  let end = Math.min(totalPages, start + PAGE_WINDOW - 1);
  start = Math.max(1, end - PAGE_WINDOW + 1);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 헤더 */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">공지사항</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            총 {total}건 · 페이지 {page}/{totalPages}
          </p>
        </div>
      </div>

      {/* 비어있는 경우 */}
      {notices.length === 0 ? (
        <div className="rounded-lg border bg-card p-10 text-center text-sm text-muted-foreground">
          등록된 공지가 없습니다.
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border bg-card">
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-12 items-center border-b bg-muted/50 px-4 py-3 text-xs font-medium text-muted-foreground">
              <div className="col-span-2 sm:col-span-1">NO</div>
              <div className="col-span-7 sm:col-span-8">제목</div>
              <div className="col-span-3 sm:col-span-3 text-right sm:text-left">
                게시일
              </div>
            </div>

            {/* 테이블 바디 */}
            <ul className="divide-y">
              {notices.map((n, idx) => {
                const globalIndex = from + idx;
                const no = total - globalIndex;
                const date = new Date(n.created_at as string).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });

                return (
                  <li key={n.id} className="relative">
                    {/* 행 전체 클릭 */}
                    <Link
                      href={`/about/notice/${n.id}`}
                      className="absolute inset-0"
                      aria-label={`${n.text} 상세보기`}
                    />
                    <div
                      className={[
                        "grid grid-cols-12 items-center px-4 transition-colors hover:bg-muted/40",
                        ROW_H, // ✅ py-4 대신 고정 높이
                      ].join(" ")}
                    >
                      <div className="col-span-2 sm:col-span-1 text-sm tabular-nums text-muted-foreground">
                        {no}
                      </div>
                      <div className="col-span-7 sm:col-span-8 pr-2">
                        <div className="line-clamp-1 font-medium">{n.text}</div>
                      </div>
                      <div className="col-span-3 sm:col-span-3 text-right sm:text-left text-sm text-muted-foreground tabular-nums">
                        {date}
                      </div>
                    </div>
                  </li>
                );
              })}

              {/* ✅ 빈 자리 채우기: 현재 페이지에 표시된 공지 수가 PAGE_SIZE보다 적으면, 남는 만큼 빈 행을 렌더 */}
              {Array.from({ length: Math.max(0, PAGE_SIZE - notices.length) }).map(
                (_, i) => (
                  <li key={`placeholder-${i}`}>
                    <div
                      className={[
                        "grid grid-cols-12 items-center px-4 text-transparent", // 텍스트 안 보이게
                        ROW_H, // 고정 높이
                      ].join(" ")}
                    >
                      <div className="col-span-2 sm:col-span-1">—</div>
                      <div className="col-span-7 sm:col-span-8 pr-2">—</div>
                      <div className="col-span-3 sm:col-span-3 text-right sm:text-left">—</div>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 페이지네이션 */}
            <nav className="mt-6 flex items-center justify-center gap-1">
              {/* < */}
              <ArrowButton
                href={`/about/notice?page=${page - 1}`}
                disabled={page <= 1}
                direction="<"
              />

              {/* 숫자들 */}
              {Array.from({ length: end - start + 1 }).map((_, i) => {
                const p = start + i;
                const active = p === page;
                return (
                  <Link
                    key={p}
                    href={`/about/notice?page=${p}`}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm transition",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "border text-gray-700 hover:bg-muted",
                    ].join(" ")}
                  >
                    {p}
                  </Link>
                );
              })}

              {/* > */}
              <ArrowButton
                href={`/about/notice?page=${page + 1}`}
                disabled={page >= totalPages}
                direction=">"
              />
            </nav>
        </>
      )}
    </div>
  );
}

function PaginationLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="inline-flex h-9 min-w-9 cursor-not-allowed items-center justify-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm hover:bg-muted"
    >
      {children}
    </Link>
  );
}
