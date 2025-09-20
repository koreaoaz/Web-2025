'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ExternalLink, Github, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types/project";

const categoryColors: Record<string, string> = {
  "AI/ML": "bg-blue-100 text-blue-800 border-blue-200",
  "해커톤": "bg-purple-100 text-purple-800 border-purple-200",
  "HW": "bg-green-100 text-green-800 border-green-200",
  "Web/App": "bg-orange-100 text-orange-800 border-orange-200",
  "BigData": "bg-pink-100 text-pink-800 border-pink-200",
};


interface ProjectGridProps {
  Projects: Project[];
  isLoading: boolean;
  onProjectClick: (project: Project) => void;
}

export default function ProjectGrid({ Projects, isLoading, onProjectClick } : ProjectGridProps) {
// export default function ProjectGrid({ projects, isLoading} : ProjectGridProps) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video">
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (Projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
          <ChevronRight className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          검색된 프로젝트가 없습니다
        </h3>
        <p className="text-slate-600">
          다른 검색어나 카테고리를 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      <AnimatePresence>
        {Projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => onProjectClick(project)}
          >
            <Card className="overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 h-full">
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-white to-slate-100 relative overflow-hidden">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-4xl font-bold text-slate-400 opacity-50">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${categoryColors[project.category]} border font-medium`}>
                    {project.category}
                  </Badge>
                </div>

                {/* Achievement Badge */}
                {project.achievements && project.achievements.length > 0 && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      수상작
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.slice(0, 3).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium text-slate-500 bg-slate-50 rounded-md">
                        +{project.tech_stack.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Project Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                  {project.duration && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.duration}
                    </div>
                  )}
                  {project.team_size && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.team_size}명
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-slate-300 hover:bg-slate-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProjectClick(project);
                    }}
                  >
                    자세히 보기
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  
                  {project.github_url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github_url, '_blank');
                      }}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}