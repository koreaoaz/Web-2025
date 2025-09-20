// app/recruit/recruitment/page.tsx
import RecruitCountdownBlock from "@/components/home/features/RecruitCountdownBlock";
import RecruitDetail from "@/components/home/features/RecruitDetail";

export const metadata = { title: "Recruitment | OaZ" };

export default function RecruitmentPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* 스크롤되며 사라지는 카운트다운 블록 */}
      <RecruitCountdownBlock
        // 필요시 커스텀 가능:
        // title="하나와영 25-2 신규 인원 모집 마감까지"
        // deadline="2025-09-12T00:00:00+09:00"
      />

      {/* 모집글 요약 + '전문 보기' 토글 */}
      <RecruitDetail formUrl="https://forms.gle/dAf1FgsShTdYByz677" />
    </div>
  );
}
