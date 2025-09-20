"use client";

import Timetable from "@/components/home/features/Timetable";
import Calendar01 from "@/components/home/features/Calender01";
import Donators from "@/components/home/features/Donators";
import FeatureCard from "@/components/home/features/FeatureCard";
import FeatureCard_blank from "@/components/home/features/FeatureCard_blank";
import Notification from "@/components/home/features/Notification";
import PersonalTimeTable from "@/components/home/features/PersonalTimeTable";
import ProjectList from "@/components/home/features/ProjectList";
import Link from "next/link";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Accessibility, Zap, Code2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";


export default function FeaturesSection() {
  
 /* 전체 JSX 구조 */
  return (
    <section className="pt-10 pb-80 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* 카드 영역 (grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-x-4">
        {/* 왼쪽 column */}
          <div className="grid grid-cols-[1fr_1.25fr] gap-x-4">
          {/* 왼쪽 column_0 */}
            <div className="flex flex-col">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <h3 className="text-base font-bold mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "20px" }} >스터디 시간표</h3>
              </motion.div>
              <FeatureCard className="break-inside-avoid mb-4" contentClassName="p-0">
                <Timetable />
              </FeatureCard>
            </div>
            {/* 왼쪽 column_1 */}
            <div className="flex flex-col">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <h3 className="text-base font-bold mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "20px" }} >공지</h3>
              </motion.div>
              <FeatureCard  className="break-inside-avoid mb-2" contentClassName="p-0">
                <Link href="/about/notice" className="block w-full h-full">
                  <Notification />
                </Link>
              </FeatureCard>
              <FeatureCard className="break-inside-avoid mb-2" contentClassName="p-0 overflow-hidden rounded-xl">
                <div className="relative w-full aspect-[800/380]">
                  <Image
                    src="/106b.jpg" alt="106b" fill className="object-cover" priority
                  />
                </div>
              </FeatureCard>
            </div>
          </div>

          
           {/* 오른쪽 column */}
          <div className="grid grid-cols-2 py-10 gap-x-4 gap-y-2 content-start items-start self-start h-auto">
            <FeatureCard className="break-inside-avoid col-span-2 min-w-[240px]" contentClassName="p-0">
                <div className="flex flex-col items-center min-h-[285px]">
                  <Calendar01 />
                </div>
              </FeatureCard>

              {/* </FeatureCard> */}
            {/* 오른쪽 column_0 */}
            <div className="flex flex-col">
              <FeatureCard_blank className="flex flex-col items-center col-span-2">
                <div className="w-full p-0 overflow-hidden rounded-xl">
                  <Donators />
                </div>
              </FeatureCard_blank>
            </div>
            {/* 오른쪽 column_1 */}
            {/* <div className="flex flex-col"> */}
              {/* <FeatureCard className="break-inside-avoid mb-2" contentClassName="p-0 overflow-hidden rounded-xl"> */}
                {/* text */}
              {/* </FeatureCard> */}
            {/* </div> */}

            
            {/* <FeatureCard className="break-inside-avoid mb-8 [column-span:all] lg:col-span-2" contentClassName="py-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">누적회원수</h2>
                <p className="text-4xl font-bold text-blue-600 mt-4">12,345</p>
                <p className="text-gray-600 mt-2">총 가입자 수</p>
              </div>
            </FeatureCard> */}
          </div>
          
        </div>
      </div>
    </section>
  );
}