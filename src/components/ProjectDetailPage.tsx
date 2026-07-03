import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data';
import { ArrowLeft, Calendar, Users, Cpu, Tag, Sparkles } from 'lucide-react';

interface ProjectDetailPageProps {
  projectId: string;
  onClose: () => void;
}

export default function ProjectDetailPage({ projectId, onClose }: ProjectDetailPageProps) {
  const project = PROJECTS.find((p) => p.id === projectId);

  useEffect(() => {
    // Reset scroll position to top when page opens
    window.scrollTo(0, 0);
    
    // Disable scroll on body while detail is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 150 }}
      className="fixed inset-0 z-50 bg-[#060714] text-zinc-100 overflow-y-auto selection:bg-cyan-400 selection:text-black"
    >
      {/* 1. Futuristic Header Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#060714]/85 backdrop-blur-xl border-b border-white/5 py-4 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-cyan-400/50 text-zinc-400 hover:text-cyan-400 font-mono text-[10px] uppercase tracking-widest transition-all rounded-none cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            返回主页 / Back
          </button>
          
          <div className="hidden md:flex items-center gap-2.5 text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
            <span>{project.year}</span>
            <span>•</span>
            <span className="text-cyan-400">{project.category === 'graphic' ? 'Packaging' : 'Unreal Scene'}</span>
          </div>
        </div>

        <div className="font-mono text-xs font-bold text-white tracking-tight uppercase truncate max-w-[200px] sm:max-w-md">
          {project.title}
        </div>
      </header>

      {/* Main scrollable body */}
      <div className="pt-20">
        
        {/* 2. Panoramic Cover Hero Section */}
        <div className="relative w-full h-[85vh] lg:h-[95vh] bg-black overflow-hidden flex flex-col justify-end">
          {/* Hero cover image with parallax zoom style */}
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic shadows & gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060714] via-[#060714]/40 to-black/30" />
          </div>

          {/* Hero text overlay with absolute breathing room */}
          <div className="relative z-10 container-xl px-6 sm:px-12 lg:px-16 pb-16 lg:pb-24 space-y-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 font-mono text-[9px] uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-white leading-tight uppercase tracking-tight">
                {project.title}
              </h1>

              <p className="text-zinc-400 text-sm sm:text-base max-w-3xl font-sans font-light leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          </div>
          
          {/* Tech decorative coordinate lines at bottom of hero */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20 flex justify-between px-6 text-[8px] font-mono text-zinc-500 uppercase tracking-widest select-none">
            <span>COORD // 31.2304 // 121.4737</span>
            <span>SYSTEM_ONLINE // DEEP_PRESENTATION</span>
          </div>
        </div>

        {/* 3. Detailed Specs Grid (Structured Specifications) */}
        <section className="py-16 sm:py-24 bg-[#060714] border-t border-white/5 relative">
          <div className="container-xl px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Info Column (Left 4/12) */}
              <div className="lg:col-span-4 space-y-8">
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-cyan-400 tracking-[0.2em] font-bold mb-4">
                    项目背景 / Project Context
                  </h4>
                  <div className="space-y-4 bg-white/2 p-6 border border-white/5">
                    {project.client && (
                      <div className="flex items-start gap-3 text-xs text-zinc-300">
                        <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block text-zinc-500 text-[10px] uppercase tracking-wider">客户 / Client</span>
                          {project.client}
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3 text-xs text-zinc-300">
                      <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-zinc-500 text-[10px] uppercase tracking-wider">时间 / Year</span>
                        {project.year}
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-xs text-zinc-300">
                      <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-zinc-500 text-[10px] uppercase tracking-wider">技术 / Software Stack</span>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {project.software?.map((sw) => (
                            <span key={sw} className="px-2 py-0.5 text-[9px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                              {sw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Craft details (Right 8/12) */}
              <div className="lg:col-span-8 space-y-6">
                <h4 className="text-[10px] font-mono uppercase text-cyan-400 tracking-[0.2em] font-bold">
                  打磨要点 / Design Craft Details
                </h4>
                <div className="space-y-4">
                  {project.details.map((detail, idx) => (
                    <div key={idx} className="flex gap-4 p-5 bg-white/2 border border-white/5 relative group hover:border-cyan-400/30 transition-all duration-300">
                      <div className="absolute top-0 left-0 w-0.5 h-full bg-transparent group-hover:bg-cyan-400 transition-all duration-300" />
                      <span className="font-mono text-cyan-400 font-bold shrink-0 text-base">0{idx + 1}.</span>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Full-Width Continuous Long Scroll Showcase */}
        {/* 
          --- 完整长图展示区 / FULL-SCREEN LONG IMAGE SHOWCASE ---
          此处为全宽、全屏流式滚动的长图占位区。
          后续您可以直接替换此处的 src 为您切好的完整作品长图链接。
          This is a full-width, continuous long scroll showcase.
          You can easily swap out the images below with your high-res design roll.
        */}
        <section className="w-full bg-[#03040a] relative">
          <div className="border-t border-b border-white/10 bg-black/60 py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                完整作品长图呈现 / Full Scroll Presentation Roll
              </span>
            </div>
            <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-[0.2em]">
              SCROLL DOWN TO EXPLORE THE ARTWORK IN DETAIL
            </span>
          </div>

          <div className="w-full relative">
            {/* Long Image 1: Main Bleed cover block */}
            <div className="w-full relative">
              <img
                src={project.image}
                alt={`${project.title} Long Scroll Presentation Cover`}
                className="w-full h-auto block object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md px-3.5 py-1.5 border border-cyan-400/30 text-cyan-400 font-mono text-[9px] uppercase tracking-widest pointer-events-none">
                [ 展卷 · 完整封面 / PART 01: COVER HERO ]
              </div>
            </div>

            {/* Middle Block: Beautiful technical spacing mock representation */}
            <div className="w-full relative border-y border-white/5 aspect-[16/10] sm:aspect-[21/9] bg-gradient-to-b from-[#060714] via-[#0c0d24] to-[#060714] flex flex-col justify-center items-center p-8 sm:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(31,63,229,0.3),transparent_70%)]" />
              <div className="absolute top-4 left-4 font-mono text-[7px] text-zinc-600">SYS_RENDER_ENGINE // PBR_LUMEN_ACTIVE</div>
              <div className="absolute bottom-4 right-4 font-mono text-[7px] text-zinc-600">SHADE_SYSTEM_PRO // TRUE_BLUE</div>

              <div className="max-w-2xl space-y-4 sm:space-y-6 z-10">
                <span className="text-[9px] font-mono tracking-[0.3em] text-cyan-400 font-bold uppercase block px-3 py-1 bg-cyan-400/5 border border-cyan-400/25 inline-block">
                  工艺细节与材质展示 / CRAFT SPECS
                </span>
                <h3 className="text-xl sm:text-3xl font-mono text-white font-bold uppercase tracking-wider">
                  细节放大与工艺拆解图
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
                  提示：后续您可以直接将此区域替换为更长的细节图、包装展开图、或者是虚幻引擎高清特写图。当前容器已完全适配超高纵横比的长图无缝拼接滚动。
                </p>
                
                <div className="border border-dashed border-cyan-400/20 px-6 py-4 inline-block mt-4">
                  <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                    已预留无限高度全屏长图插槽 / SCROLL INTERFACE READY
                  </span>
                </div>
              </div>
            </div>

            {/* Long Image 2: Secondary Bleed detail display block */}
            <div className="w-full relative">
              <img
                src={project.image}
                alt={`${project.title} Long Scroll Detail Zoom`}
                className="w-full h-auto block object-cover filter brightness-95 contrast-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md px-3.5 py-1.5 border border-cyan-400/30 text-cyan-400 font-mono text-[9px] uppercase tracking-widest pointer-events-none">
                [ 琢光 · 精细局部 / PART 02: SPECS ZOOMS ]
              </div>
            </div>
          </div>
        </section>

        {/* 5. Futuristic Call to Action / Footer of details page */}
        <footer className="py-24 bg-[#060714] border-t border-white/5 text-center space-y-8 relative">
          <div className="max-w-md mx-auto space-y-4 px-6">
            <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.2em] font-bold">
              阅读完毕 / END OF DISCOURSE
            </h4>
            <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed">
              感谢阅览本项目，若您对以上工艺或技术实现有任何疑问或合作意向，欢迎与我联络。
            </p>
            
            <button
              onClick={onClose}
              className="mt-4 px-8 py-4 bg-cyan-400 text-black border border-cyan-400 font-mono font-bold tracking-widest uppercase text-[10px] transition-all hover:bg-transparent hover:text-cyan-400 rounded-none cursor-pointer inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              返回主页 / BACK TO HOME
            </button>
          </div>
        </footer>

      </div>
    </motion.div>
  );
}
