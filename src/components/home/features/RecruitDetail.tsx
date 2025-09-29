"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RecruitDetail from "./RecruitDetail";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            하나와영 학회
          </h1>
          <p className="text-lg md:text-xl mb-6">
            고려대학교 전기전자공학부 소프트웨어 학회 <br />
            함께 배우고 성장하는 개발자 커뮤니티
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link href="#recruit">지원하기</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              <Link href="#activities">지난 활동 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">🚀 우리는 이런 학회입니다</h2>
        <p className="text-gray-700 mb-8">
          하나와영은 코딩에 관심 있는 학우들이 모여 함께 배우고,
          프로젝트를 만들고, 대회에 도전하며 성장하는 학회입니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">스터디 중심</h3>
              <p className="text-gray-600">다양한 프로그래밍 언어, AI, 웹, 게임개발 스터디 운영</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">프로젝트</h3>
              <p className="text-gray-600">팀을 꾸려 함께 웹, 앱, 게임 등 창의적인 결과물 제작</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">커뮤니티</h3>
              <p className="text-gray-600">MT, 홈커밍데이, 세미나 등 다양한 네트워킹 활동</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recruitment Section */}
      <section id="recruit" className="py-16 bg-gray-100 px-6">
        <RecruitDetail formUrl="https://forms.gle/your-form-url" />
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">📸 지난 활동과 스터디</h2>
        <p className="text-gray-700 text-center mb-10">
          다양한 활동으로 학회원들이 함께 성장하고 교류합니다.
        </p>
        {/* RecruitDetail 안에 있는 RightImageCard 두 개가 이미 활동/스터디 소개 카드 */}
      </section>

      {/* Contact Section */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">📞 문의하기</h2>
          <p>회장 박지우 (010-2864-0604)</p>
          <p>
            QnA 오픈 채팅방:{" "}
            <a
              href="https://open.kakao.com/o/sQdAzFih"
              target="_blank"
              rel="noreferrer"
              className="underline font-semibold"
            >
              바로가기
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
