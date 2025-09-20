"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function FeatureCard({
  children,
  className = "",
  contentClassName = "",
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn("group min-w-0", className)} 
    >
      <Card className=" border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg bg-white/50 backdrop-blur-sm">
        <CardContent className={cn(contentClassName)}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
