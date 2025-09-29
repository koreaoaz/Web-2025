"use client";

import { useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, ExternalLink, FileText, Link2, MessageCircle, Phone, Sparkles, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * ================================
 *  One & Zero (하나와영) Recruit Detail — Pro Edition
 *  - Polished layout, a11y, SEO, and subtle motion
 *  - Drop-in replacement for your existing <RecruitDetail />
 *  - Keep the same API: <RecruitDetail formUrl="..." />
 * ================================
 */

function RightImageCard({
  href,
  src,
  alt,
  label,
}: {
  href: string;
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <Link href={href} className="block group" aria-label={label}>
      <div className="relative h-52 rounded-2xl overflow-hidden border bg-gray-100 shadow-sm">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width:1024px) 384px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-4">
          <span className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-medium shadow-sm ring-1 ring-black/5 group-hover:ring-black/10">
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}

function DdayBadge({ end }: { end: string }) {
  const label = useMemo(() => {
    const now = new Date();
    const target = new Date(end);
    const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `D-${diff}`;
    if (diff === 0) return "D-DAY";
    return "마감됨";
  }, [end]);

  const variant = label === "마감됨" ? "bg-rose-100 text-rose-700" : label === "D-DAY" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${variant} px-2.5 py-1 text-xs font-semibold ring-1 ring-black/5`}>
      <Timer className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export type RecruitDetailProps = { formUrl: string };

export default function RecruitDetail({ formUrl }: RecruitDetailProps) {
  return (
    <>
      {/* SEO & Structured Data */}
      <Head>
        <title>하나와영 25-2 학회원 모집 | 고려대학교 전기전자공학부 소프트웨어 학회</title>
        <meta name="description" content="고려대학교 전기전자공학부 소프트웨어 학회 하나와영(One & Zero) 25-2 학회원 모집. 스터디/프로젝트, 행사, 일정과 지원 링크 안내." />
        <meta name="robots" content="index,follow" />
        <script
          type="application/ld+json"
          // Organization + Event schema
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "One & Zero (하나와영)",
              url: typeof window !== "undefined" ? window.location.origin : "",
              logo: "/oaz_logo.png",
              sameAs: [
                "https://open.kakao.com/o/sQdAzFih",
              ],
              event: {
                "@type": "Event",
                name: "하나와영 25-2 학회원 모집",
                startDate: "2025-08-29",
                endDate: "2025-09-11",
                eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                url: formUrl,
                organizer: { "@type": "Organization", name: "One & Zero (하나와영)" },
              },
            }),
          }}
        />
      </Head>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="absolute inset-0 bg-[radial-gradient(80rem_40rem_at_20%_0%,rgba(59,130,246,0.05),transparent_60%),radial-gradient(40rem_20rem_at_80%_120%,rgba(16,185,129,0.08),transparent_60%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 p-8 lg:p-12">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                고려대학교 전기전자공학부 소프트웨어 학회
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                하나와영 25-2 학회원 모집
              </h1>
              <p className="max-w-2xl text-gray-700 leading-relaxed">
                코딩을 이제 시작해도, 이미 프로젝트를 뛰고 있어도 괜찮아요. 함께 배우고 만들고 성장할 동료를 찾습니다.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border bg-white/80 px-3 py-2 text-sm shadow-sm">
                  <CalendarDays className="h-4 w-4 text-gray-600" />
                  <span className="font-semibold">모집 기간</span>
                  <span className="text-gray-700">2025.08.29 – 2025.09.11</span>
                  <DdayBadge end="2025-09-11T23:59:00+09:00" />
                </div>
                <Link href={formUrl} target="_blank" rel="noreferrer" className="inline-flex">
                  <Button className="h-10 px-4 text-[15px]">
                    지원하기
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={formUrl} target="_blank" rel="noreferrer" className="inline-flex">
                  <Button variant="outline" className="h-10 px-4 text-[15px]">
                    공고 PDF
                    <FileText className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-56 lg:h-auto">
              <Image
                src="/oaz_homecomming.jpg"
                alt="하나와영 활동 이미지"
                fill
                className="object-cover rounded-2xl border"
                priority
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Left Column */}
          <Card className="bg-white/70 backdrop-blur border-gray-200">
            <CardContent className="p-6 md:p-8">
              <div className="prose prose-slate max-w-none prose-ul:my-2 prose-li:my-0">
                <h2>모집 안내</h2>
                <p>
                  고려대학교 전기전자공학부 소프트웨어 학회 <strong>하나와영(One and Zero)</strong>에서 신입 학회원을 모집합니다!
                </p>

                <h3>이런 분들께 추천드립니다</h3>
                <ul>
                  <li>코딩과 소프트웨어에 관심이 있고 함께 배우며 성장하고 싶은 분</li>
                  <li>새로운 아이디어를 함께 실현할 팀원을 찾는 분</li>
                  <li>코딩을 이제 시작하지만 열정적으로 배우고 싶은 분</li>
                  <li>소프트웨어 관련 프로젝트와 대회에 도전하고 싶은 분</li>
                </ul>

                <h3>하나와영 활동 소개</h3>
                <p>
                  학기 중 <strong>최소 1개 이상의 스터디 참여</strong>를 권장하며, 원하는 주제로 스터디를 직접 개설할 수도 있습니다.
                </p>
                <details className="rounded-xl border bg-gray-50 px-4 py-3 open:bg-white open:shadow-sm">
                  <summary className="cursor-pointer font-semibold select-none">지난 학기 운영 스터디</summary>
                  <ul>
                    <li>언어 스터디: Java 기초, C 언어 기초·중급, Python</li>
                    <li>인공지능 스터디: 자연어처리 입문, AI 논문, 강화학습</li>
                    <li>기타: Flutter, 데이터 분석 기초, 언리얼</li>
                  </ul>
                </details>
                <details className="mt-3 rounded-xl border bg-gray-50 px-4 py-3 open:bg-white open:shadow-sm">
                  <summary className="cursor-pointer font-semibold select-none">지난 학기 주요 활동</summary>
                  <ul>
                    <li>하나와영 홈커밍데이</li>
                    <li>여름 MT</li>
                    <li>학회 웹사이트 구축</li>
                  </ul>
                </details>

                <h3>이번 학기 예정 스터디</h3>
                <ul>
                  <li>Python</li>
                  <li>딥러닝 스터디</li>
                  <li>웹사이트 생성 프로젝트 (프론트엔드, 디자인)</li>
                  <li>게임개발 프로젝트</li>
                  <li className="text-gray-600">※ 위 스터디는 추후 사정에 따라 변경·추가될 수 있습니다.</li>
                </ul>

                <h3>모집 일정</h3>
                <ul>
                  <li>2025.09.11(목) 11:59pm: 지원서 제출 마감</li>
                  <li>2025.09.13(토): 합격자 발표</li>
                  <li>2025.09.15(월): 개강 총회</li>
                </ul>

                <h3>신청 링크</h3>
                <p>
                  <Link href={formUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    {formUrl} <ExternalLink className="h-4 w-4" />
                  </Link>
                </p>

                <h3>FAQ</h3>
                <ul>
                  <li>
                    <strong>신입생, 복학생, 휴학생, 고학번도 지원 가능한가요?</strong>
                    <br />열심히 참여할 의지와 열정 있는 분들이면 누구나 환영입니다!
                  </li>
                  <li>
                    <strong>전공이 전전이 아닌데 괜찮은가요?</strong>
                    <br />전기전자 전공이 아닌 분들도 참여하실 수 있으니 걱정 말고 지원하세요!
                  </li>
                  <li>
                    <strong>코딩을 해본 적이 아예 없는데 참여할 수 있나요?</strong>
                    <br />경험이 있다면 더 수월하겠지만 새롭게 시작하더라도 괜찮습니다. 본인의 열정만 있다면 함께 공부할 동료들이 있습니다!
                  </li>
                </ul>

                <h3>문의</h3>
                <div className="not-prose mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href="tel:01028640604" className="group inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-black/5">
                    <Phone className="h-4 w-4 text-gray-700" />
                    회장 박지우 <span className="text-gray-600 group-hover:text-gray-800">(010-2864-0604)</span>
                  </a>
                  <a href="https://open.kakao.com/o/sQdAzFih" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-black/5">
                    <MessageCircle className="h-4 w-4 text-gray-700" />
                    QnA 오픈채팅방
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Sticky CTA */}
            <Card className="sticky top-6 bg-white/70 backdrop-blur border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">지원서 바로가기</p>
                    <p className="text-sm text-gray-600 truncate max-w-[18rem]" title={formUrl}>
                      {formUrl}
                    </p>
                  </div>
                  <DdayBadge end="2025-09-11T23:59:00+09:00" />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Link href={formUrl} target="_blank" rel="noreferrer" className="flex-1">
                    <Button className="w-full">지원하기</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="shrink-0"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(formUrl);
                        alert("링크가 복사되었습니다.");
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  >
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <RightImageCard
              href="/studies/overview"
              src="/oaz_logo.png"
              alt="지난 학기 스터디 활동 이미지"
              label="<지난 학기 스터디 보기>"
            />
            <RightImageCard
              href="/events/archive"
              src="/oaz_homecomming.jpg"
              alt="지난 학기 행사/활동 이미지"
              label="<지난 학기 활동 보기>"
            />
          </div>
        </div>

        {/* Footer callout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-2xl border bg-gradient-to-tr from-gray-50 to-white p-6 text-center"
        >
          <p className="text-sm text-gray-600">열정 있는 누구나 환영합니다. 지금 바로 합류하세요!</p>
        </motion.div>
      </section>
    </>
  );
}
