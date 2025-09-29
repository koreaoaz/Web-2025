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

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CalendarCheck2, Clock8, Copy, MessageCircle, GraduationCap, ArrowRight } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export type RecruitDetailProps = { formUrl: string };

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border bg-white px-3 py-2">
      <span className="text-xs text-muted-foreground">{k}</span>
      <span className="text-sm font-medium">{v}</span>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs bg-white">{children}</span>;
}

function RailItem({ date, title, last = false }: { date: string; title: string; last?: boolean }) {
  return (
    <div className="relative pl-6">
      <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
      {!last && <span className="absolute left-0 top-4 ml-[3px] h-8 w-px bg-blue-100" />}
      <div className="text-xs text-muted-foreground">{date}</div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  );
}

export default function RecruitDetail({ formUrl }: RecruitDetailProps) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section className="relative">
      {/* ribbon header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border shadow-sm">
          <div className="absolute inset-0 -z-10 bg-[conic-gradient(at_10%_10%,rgba(59,130,246,.12),transparent_30%,rgba(236,72,153,.12))]" />
          <div className="grid md:grid-cols-[360px_1fr]">
            <div className="p-6 md:p-8 bg-white/70 backdrop-blur">
              <Badge className="rounded-full">모집 공고</Badge>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight">하나와영 25-2 학회원 모집</h1>
              <p className="mt-2 text-sm text-muted-foreground">고려대 전기전자 소프트웨어 학회 One and Zero</p>
              <div className="mt-4 grid gap-2">
                <Fact k="모집 기간" v="2025.08.29 – 2025.09.11" />
                <Fact k="지원 마감" v="9/11(목) 11:59pm" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild className="rounded-2xl">
                  <a href={formUrl} target="_blank" rel="noreferrer">
                    신청하기 <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="rounded-2xl" onClick={onCopy}>
                  {copied ? '복사됨!' : '링크 복사'} <Copy className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>스터디 중심</Pill>
                <Pill>프로젝트/대회</Pill>
                <Pill>신입 환영</Pill>
              </div>
            </div>

            <div className="relative min-h-[200px]">
              <Image
                src="/oaz_homecomming.jpg"
                alt="하나와영 활동 이미지"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* left rail */}
        <aside className="lg:sticky lg:top-6 h-max">
          <Card className="bg-white/80 backdrop-blur border-gray-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CalendarCheck2 className="h-4 w-4" />
                일정 한눈에 보기
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <RailItem date="2025.08.29 – 09.11" title="지원 접수" />
                <RailItem date="2025.09.13(토)" title="합격자 발표" />
                <RailItem date="2025.09.15(월)" title="개강 총회" last />
              </div>
              <div className="mt-5">
                <Button asChild className="w-full rounded-2xl">
                  <a href={formUrl} target="_blank" rel="noreferrer" aria-label="신청 폼 열기">
                    지금 신청하기 <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                  <Clock8 className="h-3.5 w-3.5" /> 마감: 9/11(목) 11:59pm
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* main */}
        <main className="space-y-6">
          <Card className="bg-white/70 backdrop-blur border-gray-200">
            <CardContent className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold">이런 분들께 추천</h2>
                  <ul className="mt-3 space-y-2 text-gray-800">
                    <li>코딩과 소프트웨어에 관심이 있고 함께 배우며 성장하고 싶은 분</li>
                    <li>새로운 아이디어를 함께 실현할 팀원을 찾는 분</li>
                    <li>이제 시작하지만 열정적으로 배우고 싶은 분</li>
                    <li>프로젝트/대회에 도전하고 싶은 분</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">지난 학기 활동</h2>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {[['홈커밍데이','/oaz_logo.png'],['여름 MT','/oaz_homecomming.jpg'],['학회 웹사이트 구축','/oaz_logo.png'],['스터디 10+ 운영','/oaz_homecomming.jpg']].map(([t, s]) => (
                      <div key={t as string} className="relative h-24 rounded-xl overflow-hidden border">
                        <Image src={s as string} alt={t as string} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-1 left-2 text-xs font-medium text-white">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <Tabs defaultValue="studies" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                  <TabsTrigger value="studies">예정 스터디</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                  <TabsTrigger value="apply">신청/문의</TabsTrigger>
                </TabsList>

                <TabsContent value="studies" className="mt-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { t: 'Python', d: '언어 기초부터 실습까지' },
                      { t: '딥러닝', d: 'PyTorch/논문 스터디' },
                      { t: '웹사이트 프로젝트', d: '프론트엔드/디자인' },
                      { t: '게임개발', d: '엔진 선택부터 구현' },
                    ].map((x) => (
                      <div key={x.t} className="rounded-2xl border bg-white p-4">
                        <div className="font-medium">{x.t}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">* 사정에 따라 변경/추가될 수 있습니다.</p>
                </TabsContent>

                <TabsContent value="faq" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">신입/복학/휴학/고학번도 가능한가요?</div>
                      <p className="text-sm text-muted-foreground">열심히 참여할 의지와 열정 있는 분이면 누구나 환영!</p>
                    </div>
                    <div>
                      <div className="font-medium">전기전자 전공이 아니어도 되나요?</div>
                      <p className="text-sm text-muted-foreground">네, 비전공자도 참여 가능합니다.</p>
                    </div>
                    <div>
                      <div className="font-medium">코딩이 처음인데 괜찮을까요?</div>
                      <p className="text-sm text-muted-foreground">처음이어도 함께 배우는 스터디가 준비되어 있어요.</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="apply" className="mt-6">
                  <div className="rounded-2xl border bg-white p-5">
                    <div className="flex items-center gap-2 font-semibold">
                      <GraduationCap className="h-4 w-4" /> 신청 링크
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Button asChild className="rounded-2xl">
                        <a href={formUrl} target="_blank" rel="noreferrer">
                          폼 열기 <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <code className="rounded-xl bg-muted px-3 py-2 text-sm break-all">{formUrl}</code>
                      <Button variant="outline" className="rounded-2xl" onClick={onCopy}>
                        {copied ? '복사됨!' : '링크 복사'}
                      </Button>
                    </div>
                    <Separator className="my-5" />
                    <div className="flex items-center gap-2 font-semibold">
                      <MessageCircle className="h-4 w-4" /> 문의
                    </div>
                    <div className="mt-2 text-sm text-gray-800 space-y-1">
                      <p>회장 박지우 (010-2864-0604)</p>
                      <p>
                        QnA 오픈 채팅방 :{' '}
                        <a className="text-blue-600 hover:underline" href="https://open.kakao.com/o/sQdAzFih" target="_blank" rel="noreferrer">
                          https://open.kakao.com/o/sQdAzFih
                        </a>
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* quick links */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/studies/overview" className="group">
              <Card className="overflow-hidden">
                <div className="relative h-40">
                  <Image src="/oaz_logo.png" alt="지난 학기 스터디" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <div className="text-xs opacity-80">지난 학기</div>
                    <div className="text-lg font-semibold">스터디 모아보기</div>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/events/archive" className="group">
              <Card className="overflow-hidden">
                <div className="relative h-40">
                  <Image src="/oaz_homecomming.jpg" alt="지난 학기 활동" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <div className="text-xs opacity-80">지난 학기</div>
                    <div className="text-lg font-semibold">행사 · 활동 보기</div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </main>
      </div>

      {/* mobile sticky bar */}
      <div className="lg:hidden sticky bottom-4 inset-x-0 mx-4">
        <div className="rounded-2xl border bg-white/95 backdrop-blur p-3 shadow-xl flex items-center justify-between gap-3">
          <div className="text-sm">
            <div className="font-semibold">하나와영 25-2 모집</div>
            <div className="text-muted-foreground">9/11(목) 11:59pm 마감</div>
          </div>
          <Button asChild className="rounded-2xl">
            <a href={formUrl} target="_blank" rel="noreferrer">
              신청하기
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
