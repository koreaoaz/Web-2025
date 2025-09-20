"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, BookOpen, Github, Users } from "lucide-react";

/**
 * WhoWeArePage
 * - 대학교 소프트웨어 학회 소개 페이지
 * - 시안 기반으로 시멘틱 구조/타이포/여백을 정리하고, 이미지 자리(“이미지 첨부”)를 명시적으로 비워둡니다.
 * - Tailwind + shadcn/ui + framer-motion. 다크 모드 친화적.
 */
export default function WhoWeArePage() {
  return (
    <main className="bg-[#2D2D2D] text-zinc-100">
      {/* HERO */}
      <section className="relative isolate">
        {/* 배경 이미지 영역 (이미지 첨부) */}
        <div className="relative h-[44vh] min-h-[320px] w-full overflow-hidden">
          {
            <Image
              src="/images/campus.png"
              alt="Campus"
              fill
              className="object-cover"
              priority
            />
          }

          <div className="absolute inset-0 flex items-center justify-center bg-[#2D2D2D]/60">
            <span className="rounded-full border border-zinc-700/70 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
              이미지 첨부
            </span>
          </div>

          {/* 예시: 배경 이미지 사용 시 */}
          {/* <Image src="/images/campus.jpg" alt="Campus" fill className="object-cover" priority /> */}

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D2D2D]/30 to-[#2D2D2D]"></div>
        </div>

        <div className="container relative mx-auto -mt-20 px-4 pb-10 sm:-mt-24 sm:pb-14 lg:-mt-28">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-fit rounded-2xl border border-zinc-800/60 bg-[#2D2D2D] px-5 py-2 text-center text-sm font-medium tracking-wide text-zinc-200 shadow/50 backdrop-blur sm:text-base"
          >
            Who we are
          </motion.h1>
        </div>
      </section>

      {/* 인사말 */}
      <section className="container mx-auto px-4 py-14 sm:py-18 lg:py-22">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              인사말
            </h2>
          </header>

          <div className="space-y-6 rounded-2xl border border-zinc-800/60 bg-[#2D2D2D] p-6 leading-relaxed text-zinc-300 sm:p-8">
            <p>
              <b className="font-semibold text-zinc-100">
                고려대학교 소프트웨어 학회 하나와영(One and Zero)
              </b>
              은 전기전자공학부 내 유일한 소프트웨어 중심 학회입니다.
            </p>
            <p>
              코딩과 소프트웨어에 대한 열정을 가진 학우들이 모여 함께 성장하고
              도전하는 공간을 만들어가고 있습니다. 학과, 학년의 제약 없이
              소프트웨어에 관심을 가지고, 배우려는 열정이 있는 고려대학교
              학생이라면 누구나 참여할 수 있습니다.
            </p>
            <p>
              우리는 이진수의 0과 1을 우리만의 문장으로 풀어낸 이름처럼, 작은
              차이로도 무한한 가능성을 창조할 수 있다는 믿음 아래 함께 나아가는
              공동체입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 방향성 */}
      <section className="container mx-auto px-4 pb-6 sm:pb-10">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              방향성
            </h2>
          </header>

          <div className="space-y-6 rounded-2xl border border-zinc-800/60 bg-[#2D2D2D] p-6 leading-relaxed text-zinc-300 sm:p-8">
            <p className="text-center text-sm text-zinc-400">1992년 창립</p>
            <p>하나와영은 단순한 스터디를 넘어, 자유롭고 진취적인 배움의 장을 지향합니다.</p>
            <p>
              학기 중에는 다채로운 스터디와 세미나가, 방학 중에는 팀 프로젝트와
              대회 준비 등이 활발히 이뤄지며, 학회원들은 각자의 관심 분야에 맞춰
              새로운 스터디를 직접 기획하고 이끌어갈 수 있습니다.
            </p>
            <p>책이나 강의 등 필요한 자원도 적극적으로 지원하고 있습니다.</p>

            {/* 활동 사진 자리 (이미지 첨부) */}
            <div className="mt-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-800/60">
                {/* 활동 사진을 여기에 첨부하세요 */}
                <div className="absolute inset-0 grid place-items-center bg-[#2D2D2D]">
                  <span className="rounded-full border border-zinc-700/70 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
                    이미지 첨부
                  </span>
                </div>
                {/* <Image src="/images/hanawayoung-2025.jpg" alt="2025 하나와영 홈커밍데이" fill className="object-cover" /> */}
              </div>
              <p className="mt-2 text-center text-xs text-zinc-500">
                (활동 사진을 첨부하면 자동으로 반응형으로 표시됩니다)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 학회의 활동 */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              학회의 활동
            </h2>
            {/* <p className="mt-3 text-sm text-zinc-400">
              스터디 기록과 프로젝트 기록으로 바로 이동할 수 있는 빠른 액션 영역
            </p> */}
          </header>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* 스터디 기록 카드 */}
            <Card className="border-zinc-800/60 bg-[#2D2D2D]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-zinc-100">
                  <BookOpen className="size-5" />
                  학회 스터디 기록
                </CardTitle>
                <ArrowUpRight className="size-5 text-zinc-400" />
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-300">
                <p>
                  학회원들이 자율적으로 기획하고 운영한 스터디/세미나 기록을
                  확인하세요. 학회원들의 모든 스터디가 기수별로 정리되어 있습니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  {/* ✅ Navigation 기준: /studies/overview */}
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="border border-zinc-700/70 bg-zinc-800 text-zinc-100"
                  >
                    <Link href="/studies/records">바로가기</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 프로젝트 기록 카드 */}
            <Card className="border-zinc-800/60 bg-[#2D2D2D]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-zinc-100">
                  <Users className="size-5" />
                  프로젝트 기록
                </CardTitle>
                <ArrowUpRight className="size-5 text-zinc-400" />
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-300">
                <p>
                  팀 프로젝트 결과물과 회고, 대회/해커톤 참여기 등을 모았습니다.
                  기술 스택, 레포지토리, 데모 링크를 통해 활동을 한눈에 볼 수
                  있습니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  {/* ✅ Navigation 기준: /projects/overview */}
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="border border-zinc-700/70 bg-zinc-800 text-zinc-100"
                  >
                    <Link href="/projects/archives">바로가기</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 보조 링크 라인 */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400">
            <Link
              href="https://github.com/"
              className="inline-flex items-center gap-2 hover:text-zinc-200"
              aria-label="학회 GitHub로 이동"
            >
              <Github className="size-4" /> 학회 GitHub
            </Link>
            <span className="text-zinc-700">|</span>
            {/* ✅ Navigation 기준: /recruit/recruitment */}
            <Link href="/recruit/recruitment" className="hover:text-zinc-200">
              리크루팅 안내
            </Link>
            <span className="text-zinc-700">|</span>
            {/* ✅ Navigation 기준: /events/archive */}
            <Link href="/events/archive" className="hover:text-zinc-200">
              행사 / 세미나
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
