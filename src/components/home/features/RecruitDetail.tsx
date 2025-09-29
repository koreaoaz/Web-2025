"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ExternalLink,
  Github,
  Mail,
  Menu,
  X,
  Calendar,
  Users,
  Rocket,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ---------------------------------------------
// Reusable: RightImageCard (from your snippet)
// ---------------------------------------------
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

// ---------------------------------------------
// RecruitDetail (adapted from your snippet)
// ---------------------------------------------
function RecruitDetail({ formUrl }: { formUrl: string }) {
  return (
    <section className="mx-auto max-w-7xl" id="recruit">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4">하나와영 25-2 학회원 모집 일정</h3>

            <div className="space-y-2">
              <p>고려대학교 전기전자공학부 소프트웨어 학회 하나와영(One and Zero)에서 신입 학회원을 모집합니다!</p>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">모집 기간</span> : 2025.08.29 - 2025.09.11
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">구글 폼 링크</span> :
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
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
                <p>
                  학기 중 최소 1개 이상의 스터디 참여를 권장하며, 원하는 주제로 스터디를 직접 개설할 수도 있습니다.
                </p>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="font-semibold">[지난 학기 운영 스터디]</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>언어 스터디 : Java 기초, C 언어 기초·중급, Python</li>
                      <li>인공지능 스터디 : 자연어처리 입문, AI 논문, 강화학습</li>
                      <li>기타 : flutter, 데이터 분석 기초, 언리얼</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">[지난 학기 주요 활동]</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>하나와영 홈커밍데이</li>
                      <li>여름 MT</li>
                      <li>학회 웹사이트 구축</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold">✨ 이번 학기 예정 스터디</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Python</li>
                  <li>딥러닝 스터디</li>
                  <li>웹사이트 생성 프로젝트 (프론트엔드, 디자인)</li>
                  <li>게임개발 프로젝트</li>
                  <li>* 위 스터디는 추후 사정에 따라 변경, 추가될 수 있습니다.</li>
                </ul>
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
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline break-all"
                >
                  {formUrl} <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div>
                <p className="font-semibold">❓ FAQ</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>신입생, 복학생, 휴학생, 고학번도 지원 가능한가요?</li>
                  <p>: 열심히 참여할 의지와 열정 있는 분들이면 누구나 환영입니다!</p>
                  <li>전공이 전전이 아닌데 괜찮은가요?</li>
                  <p>: 전기전자 전공이 아닌 분들도 참여하실 수 있으니 걱정 말고 지원하세요!</p>
                  <li>코딩을 해본 적이 아예 없는데 참여할 수 있나요?</li>
                  <p>
                    : 경험이 있다면 더 수월하겠지만 새롭게 시작하더라도 괜찮습니다. 본인의 열정만 있다면 함께 공부할 동료들이 있습니다!
                  </p>
                </ul>
              </div>

              <div>
                <p className="font-semibold">📞 기타 궁금한 사항은 편하게 문의주세요 📞</p>
                <p>회장 박지우 (010-2864-0604)</p>
                <p>
                  QnA 오픈 채팅방 :
                  <a
                    href="https://open.kakao.com/o/sQdAzFih"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    https://open.kakao.com/o/sQdAzFih
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
    </section>
  );
}

// ---------------------------------------------
// Main Home Page
// ---------------------------------------------
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const formUrl = "https://forms.gle/example-apply"; // ← 실제 폼 링크로 교체

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2">
            <Image src="/oaz_logo.png" alt="One&Zero" width={32} height={32} className="rounded" />
            <span className="font-semibold">하나와영 One&Zero</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#about" className="hover:text-gray-900 text-gray-600">소개</Link>
            <Link href="#studies" className="hover:text-gray-900 text-gray-600">스터디</Link>
            <Link href="#recruit" className="hover:text-gray-900 text-gray-600">모집</Link>
            <Link href="#faq" className="hover:text-gray-900 text-gray-600">FAQ</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild>
              <a href={formUrl} target="_blank" rel="noreferrer" className="inline-flex items-center">
                지원하기
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
            <Button variant="outline" className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-1 gap-2 text-sm">
              <Link href="#about" onClick={() => setMenuOpen(false)} className="py-1">소개</Link>
              <Link href="#studies" onClick={() => setMenuOpen(false)} className="py-1">스터디</Link>
              <Link href="#recruit" onClick={() => setMenuOpen(false)} className="py-1">모집</Link>
              <Link href="#faq" onClick={() => setMenuOpen(false)} className="py-1">FAQ</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-10 md:pt-20 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div>
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold tracking-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              함께 배우고 만들며 성장하는
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">소프트웨어 학회</span>
            </motion.h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              하나와영(One & Zero)은 스터디와 프로젝트, 네트워킹을 통해 구성원 모두가 성장하는 것을 목표로 합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={formUrl} target="_blank" rel="noreferrer" className="inline-flex items-center">
                  지금 지원하기
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="#about">더 알아보기</a>
              </Button>
            </div>
            {/* quick stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
              {[
                { icon: Users, label: "누적 참여", value: "200+" },
                { icon: BookOpen, label: "누적 스터디", value: "40+" },
                { icon: Calendar, label: "정기 행사", value: "연 6회" },
              ].map((s, i) => (
                <Card key={i} className="border-gray-200">
                  <CardContent className="p-4 flex items-center gap-3">
                    <s.icon className="w-5 h-5" />
                    <div>
                      <div className="text-xs text-gray-500">{s.label}</div>
                      <div className="font-semibold">{s.value}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative h-72 md:h-[420px]">
            <Image
              src="/oaz_hero.jpg"
              alt="One&Zero 활동 이미지"
              fill
              className="object-cover rounded-2xl shadow-sm border"
              priority
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Rocket,
              title: "프로젝트 중심",
              desc: "실전 프로젝트로 기술을 익히고 결과물을 포트폴리오로 연결합니다.",
            },
            {
              icon: BookOpen,
              title: "스터디 커뮤니티",
              desc: "자율 스터디와 커리큘럼을 통해 함께 공부하는 문화를 만듭니다.",
            },
            {
              icon: Users,
              title: "네트워킹",
              desc: "선후배 교류, 홈커밍데이, 해커톤 등 다양한 교류 자리 제공.",
            },
          ].map((f, i) => (
            <Card key={i} className="border-gray-200">
              <CardContent className="p-6">
                <f.icon className="w-6 h-6 mb-3" />
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Studies highlight */}
      <section id="studies" className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">지난 학기 하이라이트</h2>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/studies/overview" className="inline-flex items-center">
              전체 보기 <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RightImageCard href="/studies/overview" src="/oaz_logo.png" alt="스터디 이미지" label="<지난 학기 스터디 보기>" />
          <RightImageCard href="/events/archive" src="/oaz_homecomming.jpg" alt="행사 이미지" label="<지난 학기 활동 보기>" />
          <RightImageCard href="/projects" src="/oaz_projects.jpg" alt="프로젝트 이미지" label="<프로젝트 살펴보기>" />
        </div>
      </section>

      {/* Recruit detail (from your code) */}
      <RecruitDetail formUrl={formUrl} />

      {/* FAQ (compact) */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold mb-6">자주 묻는 질문</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqItems.map((item, idx) => (
            <FaqItem key={idx} q={item.q} a={item.a} />
          ))}
        </div>
        <div className="mt-6">
          <Button asChild size="lg">
            <a href={formUrl} target="_blank" rel="noreferrer" className="inline-flex items-center">
              지원 폼으로 이동
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-10">
        <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/oaz_logo.png" alt="One&Zero" width={24} height={24} className="rounded" />
              <span className="font-semibold">하나와영 One&Zero</span>
            </div>
            <p className="text-gray-600 mt-2">© {new Date().getFullYear()} One&Zero. All rights reserved.</p>
          </div>
          <div>
            <div className="font-semibold mb-2">바로가기</div>
            <ul className="space-y-1">
              <li><Link href="#about" className="text-gray-600 hover:text-gray-900">소개</Link></li>
              <li><Link href="#studies" className="text-gray-600 hover:text-gray-900">스터디</Link></li>
              <li><Link href="#recruit" className="text-gray-600 hover:text-gray-900">모집</Link></li>
              <li><Link href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">연락처</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /><span>contact@oneandzero.org</span></li>
              <li className="flex items-center gap-2"><Github className="w-4 h-4" /><a className="hover:underline" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a></li>
              <li>
                QnA 오픈채팅:
                <a className="hover:underline ml-1" href="https://open.kakao.com/o/sQdAzFih" target="_blank" rel="noreferrer">바로가기</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------
// FAQ helpers
// ---------------------------------------------
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-4 flex items-center justify-between"
        aria-expanded={open}
      >
        <span className="font-medium pr-4">{q}</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="px-4"
      >
        <div className="pb-4 text-sm text-gray-600">{a}</div>
      </motion.div>
    </Card>
  );
}

const faqItems = [
  {
    q: "전공이 전전이 아니어도 지원 가능한가요?",
    a: "네, 학부/전공 상관없이 열정과 의지만 있다면 환영합니다!",
  },
  {
    q: "프로그래밍을 처음 시작해도 괜찮나요?",
    a: "기초 스터디가 준비되어 있고, 팀 프로젝트로 빠르게 성장할 수 있어요.",
  },
  {
    q: "스터디는 어떻게 운영되나요?",
    a: "학회원이 직접 개설하거나 운영진이 마련한 커리큘럼으로 진행되며, 주 1회 이상 권장합니다.",
  },
  {
    q: "행사나 네트워킹 기회가 있나요?",
    a: "홈커밍데이, 해커톤, MT 등 다양한 교류 자리가 있습니다.",
  },
];
