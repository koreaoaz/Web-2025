/*"use client";*/

/*import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";*/

/*function RightImageCard({
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
      <div className="relative h-48 rounded-xl overflow-hidden border bg-gray-100">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width:1024px) 384px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <span className="inline-flex items-center rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium shadow-sm group-hover:bg-white">
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}

type Props = { formUrl: string };

export default function RecruitDetail({ formUrl }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
          <CardContent className="p-6">

            <h3 className="text-2xl font-bold mb-4">하나와영 25-2 학회원 모집 일정</h3>

            <div className="space-y-2">
                <p>고려대학교 전기전자공학부 소프트웨어 학회 하나와영(One and Zero)에서 신입 학회원을 모집합니다!</p>
            </div>
            <div className="space-y-2 text-gray-700"></div>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">모집 기간</span> : 2025.08.29 - 2025.09.11</p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">구글 폼 링크</span> :
                <a href={formUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {formUrl}
                </a>
              </p>
            </div>

            <div className="mt-6 space-y-2 text-gray-800">
              <p className="font-semibold">🧑‍💻 이런 분들께 추천 드립니다</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>코딩과 소프트웨어에 관심이 있고 함께 배우며 성장하고 싶은 분</li>
                <li>새로운 아이디어를 함께 실현할 팀원을 찾는 분</li>
                <li>코딩을 이제 시작하지만 열정적으로 배우고 싶은 분</li>
                <li>소프트웨어 관련 프로젝트와 대회에 도전하고 싶은 분</li>
              </ul>
            </div>
    
            <div className="pt-6 text-gray-800 leading-relaxed space-y-4">
                <div>
                    <p className="font-semibold">✨ 하나와영 활동 소개</p>
                    <p>학기 중 최소 1개 이상의 스터디 참여를 권장하며, 원하는 주제로 스터디를 직접 개설할 수도 있습니다.</p>
                        <ul className="list-disc pl-5 space-y-2">
                        <p className="font-semibold">[지난 학기 운영 스터디]</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>언어 스터디 : Java 기초, C 언어 기초·중급, Python</li>
                            <li>인공지능 스터디 : 자연어처리 입문, AI 논문, 강화학습</li>
                            <li>기타 : flutter, 데이터 분석 기초, 언리얼</li>
                        </ul>
                        <p className="font-semibold">[지난 학기 주요 활동]</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>하나와영 홈커밍데이</li>
                          <li>여름 MT</li>
                          <li>학회 웹사이트 구축</li>
                        </ul>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">✨ 이번 학기 예정 스터디</p>
                    <li>Python</li>
                    <li>딥러닝 스터디</li>
                    <li>웹사이트 생성 프로젝트 (프론트엔드, 디자인)</li>
                    <li>게임개발 프로젝트</li>
                    <li>* 위 스터디는 추후 사정에 따라 변경, 추가될 수 있습니다.</li>
                </div>

                <div>
                    <p className="font-semibold">📅 모집 일정</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>2025.09.11(목) 11:59pm : 지원서 제출 마감</li>
                        <li>2025.09.13(토) : 합격자 발표</li>
                        <li>2025.09.15(월) : 개강 총회</li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">📝 신청 링크</p>
                    <a href={formUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                        {formUrl} <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                <div>
                    <p className="font-semibold">❓ FAQ</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>신입생, 복학생, 휴학생, 고학번도 지원 가능한가요?</li>
                        <p>   : 열심히 참여할 의지와 열정 있는 분들이면 누구나 환영입니다!</p>
                        <li>전공이 전전이 아닌데 괜찮은가요?</li>
                        <p>   : 전기전자 전공이 아닌 분들도 참여하실 수 있으니 걱정 말고 지원하세요!</p>
                        <li>코딩을 해본 적이 아예 없는데 참여할 수 있나요?</li>
                        <p>   : 경험이 있다면 더 수월하겠지만 새롭게 시작하더라도 괜찮습니다. 본인의 열정만 있다면 함께 공부할 동료들이 있습니다!</p>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold">📞 기타 궁금한 사항은 편하게 문의주세요 📞</p>
                    <p>회장 박지우 (010-2864-0604)</p>
                    <p>QnA 오픈 채팅방 : https://open.kakao.com/o/sQdAzFih</p>
                </div>
            </div>

            {/* <div className="mt-4">
              <Button variant="outline" onClick={() => setOpen(v => !v)} className="w-full justify-center">
                {open ? <>전문 접기 <ChevronUp className="ml-1 w-4 h-4" /></> : <>전문 보기 <ChevronDown className="ml-1 w-4 h-4" /></>}
              </Button>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                </motion.div>
              )}
            </AnimatePresence> }
          </CardContent>
        </Card>

        <div className="space-y-6">
        <RightImageCard
            href="/studies/overview"
            src="/oaz_logo.png"
            alt="지난 학기 스터디 활동 이미지"
            label="&lt;지난 학기 스터디 보기&gt;"
        />
        <RightImageCard
            href="/events/archive"
            src="/oaz_homecomming.jpg"
            alt="지난 학기 행사/활동 이미지"
            label="&lt;지난 학기 활동 보기&gt;"
        />
        </div>
      </div>
    </section>
  );
}*/


'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  CalendarDays,
  Users,
  MessageCircleQuestion,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/components/ui/use-toast';

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
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative h-48 rounded-2xl overflow-hidden border border-gray-200/70 bg-gray-50 shadow-sm"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width:1024px) 384px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-center p-4">
          <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-sm font-medium shadow group-hover:bg-white">
            {label}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export type RecruitDetailProps = { formUrl: string };

export default function RecruitDetail({ formUrl }: RecruitDetailProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast?.() || { toast: () => {} } as any;

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      toast?.({ description: '신청 링크가 클립보드에 복사되었어요.' });
    } catch (_e) {
      // no-op
    }
  };

  return (
    <section className="relative">
      {/* Soft gradient background + subtle grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_20%_10%,rgba(59,130,246,0.10),transparent),radial-gradient(40%_60%_at_80%_0%,rgba(236,72,153,0.10),transparent)]" />
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header / Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge className="rounded-full">모집</Badge>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays className="h-4 w-4" />
              <span>2025.08.29 – 2025.09.11</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">하나와영 25-2 학회원 모집</h1>
          <p className="mt-3 max-w-2xl text-gray-700 leading-relaxed">
            고려대학교 전기전자공학부 소프트웨어 학회 <span className="font-semibold">하나와영(One and Zero)</span>과 함께
            코딩, 프로젝트, 대회를 경험해 보세요.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-2xl">
              <a href={formUrl} target="_blank" rel="noreferrer">
                신청하기
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl" onClick={copyUrl}>
              링크 복사
              <ClipboardCopy className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Main card */}
          <Card className="bg-white/70 backdrop-blur-md border-gray-200 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              {/* Intro */}
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">모집 안내</h2>
                <p className="text-gray-600">신입 학회원을 기다리고 있어요. 열정만 준비하세요!</p>
              </div>

              <Separator className="my-6" />

              {/* Quick facts */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border p-4 bg-white">
                  <div className="text-sm text-gray-500">모집 기간</div>
                  <div className="mt-1 font-semibold">2025.08.29 - 2025.09.11</div>
                </div>
                <div className="rounded-2xl border p-4 bg-white">
                  <div className="text-sm text-gray-500">신청 링크</div>
                  <a
                    href={formUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                  >
                    {formUrl}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Who should apply */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">이런 분들께 추천</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    '코딩과 소프트웨어에 관심이 있고 함께 배우며 성장하고 싶은 분',
                    '새로운 아이디어를 함께 실현할 팀원을 찾는 분',
                    '코딩을 이제 시작하지만 열정적으로 배우고 싶은 분',
                    '소프트웨어 관련 프로젝트와 대회에 도전하고 싶은 분',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-gray-800">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activities */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">하나와영 활동 소개</h3>
                </div>
                <p className="text-gray-700">학기 중 최소 1개 이상의 스터디 참여를 권장하며, 원하는 주제로 스터디를 직접 개설할 수도 있어요.</p>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border p-4 bg-white">
                    <div className="font-semibold mb-2">지난 학기 운영 스터디</div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-800">
                      <li>언어 스터디 : Java 기초, C 언어 기초·중급, Python</li>
                      <li>인공지능 스터디 : 자연어처리 입문, AI 논문, 강화학습</li>
                      <li>기타 : Flutter, 데이터 분석 기초, 언리얼</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border p-4 bg-white">
                    <div className="font-semibold mb-2">지난 학기 주요 활동</div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-800">
                      <li>하나와영 홈커밍데이</li>
                      <li>여름 MT</li>
                      <li>학회 웹사이트 구축</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Planned studies */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold">이번 학기 예정 스터디</h3>
                <ul className="mt-2 grid sm:grid-cols-2 gap-2">
                  {['Python', '딥러닝 스터디', '웹사이트 생성 프로젝트 (프론트엔드, 디자인)', '게임개발 프로젝트'].map(
                    (i) => (
                      <li key={i} className="rounded-xl border bg-white px-3 py-2 text-gray-800">
                        {i}
                      </li>
                    )
                  )}
                </ul>
                <p className="mt-2 text-sm text-gray-500">* 위 스터디는 추후 사정에 따라 변경 또는 추가될 수 있습니다.</p>
              </div>

              {/* Timeline */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold">모집 일정</h3>
                <ol className="mt-3 space-y-3 relative">
                  {[
                    { date: '2025.09.11(목) 11:59pm', text: '지원서 제출 마감' },
                    { date: '2025.09.13(토)', text: '합격자 발표' },
                    { date: '2025.09.15(월)', text: '개강 총회' },
                  ].map((item, idx) => (
                    <li key={item.date} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="relative z-10 mt-1 h-3 w-3 rounded-full bg-blue-600" />
                        {idx < 2 && <span className="-mt-1 mb-1 h-8 w-px bg-blue-100" />}
                      </div>
                      <div className="rounded-xl border bg-white p-4 flex-1">
                        <div className="text-sm text-gray-500">{item.date}</div>
                        <div className="font-medium">{item.text}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Apply CTA */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold">신청 링크</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <Button asChild className="rounded-2xl">
                    <a href={formUrl} target="_blank" rel="noreferrer">
                      폼 열기 <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <code className="rounded-xl bg-muted px-3 py-2 text-sm break-all">{formUrl}</code>
                  <Button variant="outline" className="rounded-2xl" onClick={copyUrl}>
                    링크 복사
                  </Button>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircleQuestion className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">FAQ</h3>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="q1">
                    <AccordionTrigger>신입생, 복학생, 휴학생, 고학번도 지원 가능한가요?</AccordionTrigger>
                    <AccordionContent>열심히 참여할 의지와 열정 있는 분들이면 누구나 환영입니다!</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q2">
                    <AccordionTrigger>전공이 전전이 아닌데 괜찮은가요?</AccordionTrigger>
                    <AccordionContent>전기전자 전공이 아닌 분들도 참여하실 수 있으니 걱정 말고 지원하세요!</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q3">
                    <AccordionTrigger>코딩을 해본 적이 없는데 참여할 수 있나요?</AccordionTrigger>
                    <AccordionContent>
                      경험이 있다면 더 수월하겠지만 새롭게 시작하더라도 괜찮습니다. 본인의 열정만 있다면 함께 공부할 동료들이 있습니다!
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Contact */}
              <div className="mt-8 rounded-2xl border bg-white p-4">
                <h3 className="text-lg font-semibold">문의</h3>
                <div className="mt-2 space-y-1 text-gray-800">
                  <p>회장 박지우 (010-2864-0604)</p>
                  <p>
                    QnA 오픈 채팅방 :{' '}
                    <a href="https://open.kakao.com/o/sQdAzFih" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      https://open.kakao.com/o/sQdAzFih
                    </a>
                  </p>
                </div>
              </div>

              {/* Optional expandable section for extra content */}
              <div className="mt-6">
                <Button variant="ghost" className="w-full justify-center" onClick={() => setOpen((v) => !v)}>
                  {open ? (
                    <>
                      전문 접기 <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      전문 보기 <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      {/* Add any long-form details here when needed */}
                      <div className="prose prose-sm max-w-none text-gray-700 px-1 pb-2">
                        <p>추가 안내를 여기에 적을 수 있어요. 운영 규정, 선발 기준, 활동 혜택 등.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
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

        {/* Bottom sticky CTA bar for mobile */}
        <div className="lg:hidden sticky bottom-4 inset-x-0 mx-4">
          <div className="rounded-2xl border bg-white/95 backdrop-blur p-3 shadow-xl flex items-center justify-between gap-3">
            <div className="text-sm">
              <div className="font-semibold">하나와영 25-2 모집</div>
              <div className="text-gray-500">9/11(목) 11:59pm 마감</div>
            </div>
            <Button asChild className="rounded-2xl">
              <a href={formUrl} target="_blank" rel="noreferrer">
                신청하기
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
