"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const mockProjects = Array(2).fill({ title: "Text", price: "$0" });

export default function ProjectList() {
  return (
        <div className="grid grid-cols-1 gap-3 px-6 py-4">
            {mockProjects.map((project, idx) => (
                <div
                key={idx}
                className="flex flex-col p-2 w-full h-[180px] bg-white border border-gray-300 rounded-lg shadow-sm"
                >
                {/* 이미지 영역 */}
                <div className="w-full h-[150px] bg-gray-200 rounded-md flex items-center justify-center">
                    <img src="/placeholder.svg" alt="project" className="w-16 h-16 opacity-40" />
                </div>

                {/* 텍스트 영역 */}
                <div className="flex-1 flex items-center pt-0.5">
                    <div className="text-sm text-gray-800">{project.title}</div>
                </div>
                </div>
            ))}
              
            </div>
  
    
  );
}
