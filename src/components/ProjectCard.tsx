import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { Calendar, Users, Cpu, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { cn } from '../lib/utils';

// Import image as ES Module to guarantee correct compilation and packing by Vite
import sakeLunaSecondaryImg from '../assets/images/regenerated_image_1783113546290.png';

interface ProjectCardProps {
  project: Project;
  index?: number;
  key?: string | number;
  onProjectClick?: (projectId: string) => void;
}

const SECONDARY_IMAGES: Record<string, string> = {
  'sake-luna': sakeLunaSecondaryImg,
  'neon-shrine': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=80',
  'skincare-flora': 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600&auto=format&fit=crop&q=80',
  'desert-oasis': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&auto=format&fit=crop&q=80'
};

export default function ProjectCard({ project, index = 0, onProjectClick }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const primaryImg = project.image;
  const secondaryImg = SECONDARY_IMAGES[project.id] || 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=600&auto=format&fit=crop&q=80';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      id={`project-row-${project.id}`}
      layout="position"
      className={cn(
        "group relative border-b border-white/5 py-10 lg:py-14 transition-all duration-500",
        isExpanded ? "bg-black/30 rounded-none px-6 lg:px-10 -mx-6 lg:-mx-10 border-b-transparent" : "hover:px-4"
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glowing indicator */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 -z-10 rounded-none" />

      {/* Main Row Grid */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer select-none"
      >
        {/* Left column: Number + Category + Title */}
        <div className="flex items-start md:items-center gap-6 lg:gap-10 max-w-4xl">
          {/* Index count */}
          <span className="font-mono text-xs sm:text-sm text-cyan-400 font-bold mt-1 md:mt-0 tracking-wider">
            0{index + 1}
          </span>

          <div className="space-y-2">
            {/* Minimal metadata tags */}
            <div className="flex flex-wrap items-center gap-2.5 text-[9px] font-mono tracking-[0.2em] uppercase text-zinc-500">
              <span>{project.year}</span>
              <span>•</span>
              <span className="text-zinc-400">
                {project.category === 'graphic' ? '2D Packaging & Design' : '3D Scenario Level Art'}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-white tracking-tight uppercase group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Right column: Toggle arrow & Interactive indicator */}
        <div className="flex items-center justify-between lg:justify-end gap-6">
          {/* Subtle instructions */}
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase hidden sm:inline group-hover:text-cyan-400 transition-colors">
            [ {isExpanded ? 'Click to Close' : 'Click to Expand Detail'} ]
          </span>

          <div className={cn(
            "w-10 h-10 border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-300 rounded-none",
            isHovered ? "bg-cyan-400 text-black border-cyan-400 scale-105" : "bg-white/5"
          )}>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* SINGLE IMAGE FLOATING REVEAL CARD */}
      <AnimatePresence>
        {isHovered && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            style={{
              position: "absolute",
              left: mousePos.x + 40,
              top: mousePos.y - 120,
              pointerEvents: "none",
            }}
            className="z-40 hidden lg:block w-72 h-44"
          >
            {/* Background shadow / glow */}
            <div className="absolute inset-0 bg-cyan-500/5 blur-xl rounded-none" />

            {/* Single clean floating card */}
            <div className="absolute inset-0 w-full h-full rounded-none overflow-hidden border border-white/10 shadow-xl transition-all duration-500 origin-center -rotate-2 bg-zinc-900">
              <img
                src={primaryImg}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating label in bottom corner */}
            <div className="absolute -bottom-1 -right-4 bg-cyan-400 text-black font-mono text-[8px] uppercase tracking-widest px-2 py-1 rounded-none shadow-md border border-white/10 z-50">
              View Specs
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsible Details Area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {/* Mobile / Tablet image display (Single) */}
            <div className="mt-8 lg:hidden">
              <div 
                onClick={() => onProjectClick?.(project.id)}
                className="aspect-16/10 rounded-none overflow-hidden border border-white/10 shadow-sm bg-zinc-900 relative group/mobimg cursor-pointer"
              >
                <img
                  src={primaryImg}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/mobimg:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/mobimg:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center bg-cyan-400/15 text-cyan-400">
                    <span className="font-mono text-xs font-bold tracking-widest">GO</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-cyan-400">
                    查看详情 / VIEW DETAIL
                  </span>
                </div>
              </div>
            </div>

            {/* Structured Specifications & Craft Description */}
            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (4/12 width): Specs and Tags */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Description */}
                <p className="text-zinc-300 text-sm leading-relaxed font-sans font-light">
                  {project.description}
                </p>

                {/* Meta Panel */}
                <div className="space-y-4 bg-black/40 p-5 border border-white/10 shadow-sm backdrop-blur-md rounded-none">
                  <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.15em] font-bold">
                    项目信息 / Meta Specs
                  </h4>
                  
                  {project.client && (
                    <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Users className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold block text-zinc-500 text-[10px] uppercase tracking-wider">Client</span>
                        {project.client}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Cpu className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block text-zinc-500 text-[10px] uppercase tracking-wider">Stack</span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {project.software?.map((sw) => (
                          <span key={sw} className="px-2 py-0.5 text-[9px] font-mono bg-white/5 border border-white/10 text-zinc-300 rounded-none">
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tag badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] rounded-none bg-white/5 border border-white/10 text-cyan-400 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column (8/12 width): Craft Bullet details & Desktop dual photos side by side */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Design Craft Details */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.15em] font-bold">
                    核心打磨要点 / Design Craft Details
                  </h4>
                  <ul className="space-y-3">
                    {project.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-xs sm:text-sm leading-relaxed text-zinc-300">
                        <span className="font-mono text-cyan-400 font-bold shrink-0">0{idx + 1}.</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Desktop Embedded High Quality Single-View Gallery */}
                <div className="pt-4">
                  <div 
                    onClick={() => onProjectClick?.(project.id)}
                    className="aspect-16/10 rounded-none overflow-hidden border border-white/10 shadow-sm group/img relative bg-zinc-900 cursor-pointer"
                  >
                    <img
                      src={primaryImg}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-full border border-cyan-400 flex items-center justify-center bg-cyan-400/10 text-cyan-400 shadow-[0_0_20px_rgba(204,255,0,0.15)] transition-transform duration-300 group-hover/img:scale-110">
                        <span className="font-mono text-sm font-bold tracking-widest">GO</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold">
                        进入详情 / VIEW DETAIL
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md font-mono text-[8px] uppercase tracking-widest px-2 py-1 text-cyan-400 border border-white/10 rounded-none">
                      作品展示 / Project Showcase
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
