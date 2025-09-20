import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types/project";
import { 
  Calendar, 
  Users, 
  Trophy, 
  Github, 
  ExternalLink,
  Code2,
  Target
} from "lucide-react";

const categoryColors: Record<string, string> = {
  "AI/ML": "bg-blue-100 text-blue-800 border-blue-200",
  "해커톤": "bg-purple-100 text-purple-800 border-purple-200",
  "HW": "bg-green-100 text-green-800 border-green-200",
  "Web/App": "bg-orange-100 text-orange-800 border-orange-200",
  "BigData": "bg-pink-100 text-pink-800 border-pink-200",
};

interface ProjectModalProps {
  project: Project | null;   // 선택된 프로젝트, 없을 수도 있으니 null 허용
  onClose: () => void;       // 닫기 이벤트
}

export default function ProjectModal({ project, onClose } : ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {project.title}
            </DialogTitle>
            <Badge className={`${categoryColors[project.category]} border font-medium w-fit`}>
              {project.category}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Project Image */}
          {project.image_url && (
            <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-white to-slate-100">
              <img 
                src={project.image_url} 
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Basic Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.duration && (
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Calendar className="w-5 h-5 text-slate-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-slate-900">{project.duration}</div>
                <div className="text-xs text-slate-500">기간</div>
              </div>
            )}
            {project.team_size && (
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Users className="w-5 h-5 text-slate-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-slate-900">{project.team_size}명</div>
                <div className="text-xs text-slate-500">팀 규모</div>
              </div>
            )}
            {project.semester && (
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Target className="w-5 h-5 text-slate-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-slate-900">{project.semester}</div>
                <div className="text-xs text-slate-500">진행 학기</div>
              </div>
            )}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Code2 className="w-5 h-5 text-slate-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-slate-900">{project.tech_stack.length}개</div>
                <div className="text-xs text-slate-500">기술 스택</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">프로젝트 개요</h3>
            <p className="text-slate-700 leading-relaxed">
              {project.detailed_description || project.description}
            </p>
          </div>

          <Separator />

          {/* Tech Stack */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">사용 기술</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {project.achievements && project.achievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                성과 및 수상
              </h3>
              <div className="space-y-2">
                {project.achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <Trophy className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium text-yellow-900">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {project.github_url && (
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.open(project.github_url, '_blank')}
              >
                <Github className="w-4 h-4" />
                GitHub 저장소
              </Button>
            )}
            {/* {project.demo_url && (
              <Button 
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800"
                onClick={() => window.open(project.demo_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                데모 보기
              </Button>
            )} */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}