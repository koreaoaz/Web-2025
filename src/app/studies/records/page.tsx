// app/studies/records/page.tsx
"use client";

import StudyArchiveGrid from "@/components/home/features/StudyArchiveGrid"; // StudyArchiveGrid 불러오기
import ComponentShowcase from "@/components/home/ComponentShowcase";

export default function StudyRecordsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


      <StudyArchiveGrid />
      {/* <ComponentShowcase /> */}
    </div>
  );
}