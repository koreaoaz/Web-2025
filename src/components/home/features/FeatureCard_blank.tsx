"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  children: React.ReactNode
  className?: string
  hoverLift?: boolean
}


export default function FeatureCard_blank({
  children,
  className = "",
  hoverLift = true,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={hoverLift ? { y: -5 } : undefined}
      className={cn("group min-w-0 p-0", className)}
    >
      {children}
    </motion.div>
  )
}
