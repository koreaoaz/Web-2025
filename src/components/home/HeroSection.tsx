'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Copy, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const copyCommand = "npx shadcn-ui@latest init";

  const handleCopy = () => {
    navigator.clipboard.writeText(copyCommand);
  };

  return (
    <section className="pt-20 pb-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <video
              src="/oaz.webm"
              autoPlay
              muted
              playsInline
              className="mx-auto w-[360px] sm:w-[480px] lg:w-[560px]"
            />
            <p className="text-base sm:text-lg lg:text-xl mt-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent font-bold">
              - Korea University E.E. Software Society -
            </p>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}