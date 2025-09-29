"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

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
    <Link
      href={href}
      className="block group hover:-translate-y-1 hover:shadow-xl transition rounded-2xl"
      aria-label={label}
    >
      <div className="relative h-48 rounded-2xl overflow-hidden border bg-gray-100 shadow-md">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width:1024px) 384px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <span className="inline-flex items-center rounded-full bg-blue-600/90 px-3 py-1.5 text-sm font-medium text-white shadow-sm group-hover:bg-blue-700">
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
    <section className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200 rounded-2xl shadow-lg">
          <CardContent className="p-8 space-y-6">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              하나와영 25-2 학회원 모집 일정
            </h3>

            <div className="space-y-2">
              <p className="text-gray-700">
                고려대학교 전기전자공학부 소프트웨어 학회{" "}
                <span className="font-semibold">하나와영(One and Zero)</span>
                에서 신입 학회원을 모집합니다!
              </p>
            </div>
            <div className="space-y-2 text-gray-700"></div>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">모집 기간</span> : 2025.08.29 -
                2025.09.11
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">구글 폼 링크</span> :
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {formUrl}
                </a>
              </p>
            </div>

            <div className="mt-6 space-y-2 text-gray-800">
              <p className="font-semibold border-l-4 border-blue-500 pl-2">
                🧑‍💻 이런 분들께 추천 드립니다
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-blue-600">
                <li>
                  코딩과 소프트웨어에 관심이 있고 함께 배우며 성장하고 싶은 분
                </li>
                <li>새로운 아이디어를 함께 실현할 팀원을 찾는 분</li>
                <li>코딩을 이제 시작하지만 열정적으로 배우고 싶은 분</li>
                <li>소프트웨어 관련 프로젝트와 대회에 도전하고 싶은 분</li>
              </ul>
            </div>

            <div className="pt-6 text-gray-800 leading-relaxed space-y-4">
              <div>
                <p className="font-semibold border-l-4 border-purple-500 pl-2">
                  ✨ 하나와영 활동 소개
                </p>
                <p>
                  학기 중 최소 1개 이상의 스터디 참여를 권장하며, 원하는 주제로
                  스터디를 직접 개설할 수도 있습니다.
                </p>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="font-semibold">[지난 학기 운영 스터디]</p>
                    <ul className="list-disc pl-5 space-y-1 marker:text-purple-500">
                      <li>언어 스터디 : Java 기초, C 언어 기초·중급, Python</li>
                      <li>
                        인공지능 스터디 : 자연어처리 입문, AI 논문, 강화학습
                      </li>
                      <li>기타 : flutter, 데이터 분석 기초, 언리얼</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">[지난 학기 주요 활동]</p>
                    <ul className="list-disc pl-5 space-y-1 marker:text-purple-500">
                      <li>하나와영 홈커밍데이</li>
                      <li>여름 MT</li>
                      <li>학회 웹사이트 구축</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold border-l-4 border-green-500 pl-2">
                  ✨ 이번 학기 예정 스터디
                </p>
                <ul className="list-disc pl-5 space-y-1 marker:text-green-600">
                  <li>Python</li>
                  <li>딥러닝 스터디</li>
                  <li>웹사이트 생성 프로젝트 (프론트엔드, 디자인)</li>
                  <li>게임개발 프로젝트</li>
                  <li>* 위 스터디는 추후 사정에 따라 변경, 추가될 수 있습니다.</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold border-l-4 border-red-500 pl-2">
                  📅 모집 일정
                </p>
                <ul className="list-disc pl-5 space-y-1 marker:text-red-500">
                  <li>2025.09.11(목) 11:59pm : 지원서 제출 마감</li>
                  <li>2025.09.13(토) : 합격자 발표</li>
                  <li>2025.09.15(월) : 개강 총회</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold border-l-4 border-indigo-500 pl-2">
                  📝 신청 링크
                </p>
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                >
                  {formUrl} <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div>
                <p className="font-semibold border-l-4 border-yellow-500 pl-2">
                  ❓ FAQ
                </p>
                <ul className="list-disc pl-5 space-y-3 marker:text-yellow-500">
                  <li>
                    신입생, 복학생, 휴학생, 고학번도 지원 가능한가요?
                    <p className="text-gray-600 ml-2">
                      : 열심히 참여할 의지와 열정 있는 분들이면 누구나 환영입니다!
                    </p>
                  </li>
                  <li>
                    전공이 전전이 아닌데 괜찮은가요?
                    <p className="text-gray-600 ml-2">
                      : 전기전자 전공이 아닌 분들도 참여하실 수 있으니 걱정 말고
                      지원하세요!
                    </p>
                  </li>
                  <li>
                    코딩을 해본 적이 아예 없는데 참여할 수 있나요?
                    <p className="text-gray-600 ml-2">
                      : 경험이 있다면 더 수월하겠지만 새롭게 시작하더라도
                      괜찮습니다. 본인의 열정만 있다면 함께 공부할 동료들이
                      있습니다!
                    </p>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold border-l-4 border-pink-500 pl-2">
                  📞 기타 궁금한 사항은 편하게 문의주세요 📞
                </p>
                <p>회장 박지우 (010-2864-0604)</p>
                <p>
                  QnA 오픈 채팅방 :{" "}
                  <a
                    href="https://open.kakao.com/o/sQdAzFih"
                    className="text-blue-600 hover:underline"
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
