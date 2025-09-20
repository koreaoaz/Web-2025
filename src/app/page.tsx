// app/page.tsx
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import VisitorBlock from "@/components/home/VisitorBlock";
export default function Home() {
  return (
    
    <>
      <HeroSection />
      <FeaturesSection />
    <div className="text-center mb-20">
      <h1 className="text-2xl font-bold mt-10"></h1>
      {/* <VisitorBlock /> */}
    </div>  
    </>
    
  );
}
