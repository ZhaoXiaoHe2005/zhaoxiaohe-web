import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE } from '../data';
import { Mail, Phone, MapPin, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

const HONORS_TIMELINE = [
  {
    id: 'rokid',
    year: '2025',
    title: 'Rokid 全球 XR 开发者大赛',
    award: '校园最佳应用奖',
    enAward: 'Best Student Application Award',
    desc: '在沉浸式交互、虚拟空间搭建中积累的丰富经验，全方位辅助了其在游戏地编与场景关卡设计中的空间叙事与光影氛围把控。',
    projectId: 'neon-shrine',
    emoji: '🏆',
    tag: 'XR / 交互空间'
  },
  {
    id: 'cross-strait',
    year: '2026',
    title: '海峡两岸设计工作坊',
    award: '包装设计银奖',
    enAward: 'Packaging Design Silver Award',
    desc: '极佳的视觉造型与高触感纸张、色彩方案训练成果，锤炼了极高规格的审美判断力，辅助精确控制次世代写实游戏场景画面质感。',
    projectId: 'sake-luna',
    emoji: '🥈',
    tag: '平面 / 包装设计'
  }
];

export default function ExperienceSection() {
  const [activeTimelineId, setActiveTimelineId] = useState<string | null>('rokid');
  const [hoveredTimelineId, setHoveredTimelineId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleJumpToProject = (id: string) => {
    const element = document.getElementById(`project-row-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Neon flash highlight
      element.classList.add('ring-2', 'ring-cyan-400', 'ring-offset-4', 'ring-offset-black', 'transition-all', 'duration-500');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-cyan-400', 'ring-offset-4', 'ring-offset-black');
      }, 2500);
      
      // Auto-expand details
      const trigger = element.querySelector('.cursor-pointer') as HTMLElement;
      if (trigger) {
        const textContent = trigger.textContent || trigger.innerText || "";
        if (textContent.includes('Expand') || textContent.includes('展开')) {
          trigger.click();
        }
      }
    }
  };

  return (
    <div id="experience-section" className="space-y-12 lg:space-y-16">
      {/* 1. Asymmetric Bio & Interactive Timeline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* Left Column: Bio & Avatar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* Styled Avatar */}
          <div className="relative overflow-hidden border border-white/5 aspect-square bg-[#060714]/80 backdrop-blur-md group w-full max-w-[240px] mx-auto lg:mx-0">
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060714] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/80 backdrop-blur-md text-[9px] font-mono tracking-wider text-cyan-400 border border-white/5">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                Interdisciplinary Design
              </span>
            </div>
          </div>

          {/* Minimal Contact Box */}
          <div className="bg-black/20 border border-white/5 p-4 space-y-3 max-w-[240px] mx-auto lg:mx-0 text-xs">
            <h4 className="text-[9px] font-mono uppercase tracking-[0.15em] text-zinc-500 font-bold">
              联络方式 / CONTACT
            </h4>
            
            <div className="space-y-2">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-2.5 text-zinc-400 hover:text-cyan-400 transition-colors duration-200 group"
              >
                <div className="w-5.5 h-5.5 bg-white/5 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all duration-200">
                  <Mail className="w-3 h-3" />
                </div>
                <span className="font-mono text-[10.5px] truncate">{PROFILE.email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-zinc-400">
                <div className="w-5.5 h-5.5 bg-white/5 flex items-center justify-center">
                  <Phone className="w-3 h-3" />
                </div>
                <span className="font-mono text-[10.5px]">{PROFILE.phone}</span>
              </div>

              <div className="flex items-center gap-2.5 text-zinc-400">
                <div className="w-5.5 h-5.5 bg-white/5 flex items-center justify-center">
                  <MapPin className="w-3 h-3" />
                </div>
                <span className="text-[10.5px] font-sans truncate">{PROFILE.location}</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-white/5 flex flex-wrap gap-1.5">
              <span className="px-1.5 py-0.5 bg-white/5 text-zinc-400 text-[9.5px] font-mono border border-white/5">
                微信: {PROFILE.wechat}
              </span>
              <a
                href={`https://${PROFILE.behance}`}
                target="_blank"
                rel="noreferrer"
                className="px-1.5 py-0.5 bg-white/5 text-zinc-400 hover:text-black text-[9.5px] font-mono border border-white/5 hover:bg-cyan-400 transition-all"
              >
                Behance
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Narrative & High-Tech Timeline Tree */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 space-y-8"
        >
          {/* About Me Brief */}
          <div className="space-y-2.5">
            <h3 className="text-lg lg:text-xl font-mono font-bold text-white tracking-tight uppercase border-l-2 border-cyan-400 pl-3">
              关于我 / ABOUT ME
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-light">
              我是 <span className="font-medium text-white">{PROFILE.name}</span>。
              {PROFILE.bio}
            </p>
          </div>

          {/* Timeline Block */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold">
                履历成就 / TIMELINE & DISTINCTIONS
              </h4>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider hidden sm:inline">
                [ Hover Timeline to Explore ]
              </span>
            </div>

            {/* Hover-Sensitive Timeline container */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className="relative pl-8 sm:pl-10 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10 before:content-['']"
            >
              {/* Floating Tooltip following cursor when hovering active timeline elements */}
              <AnimatePresence>
                {hoveredTimelineId && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: mousePos.x,
                      top: mousePos.y,
                      transform: 'translate(-50%, -130%)',
                    }}
                    className="pointer-events-none z-50 bg-cyan-400 text-black text-[10px] font-mono font-bold px-3 py-1 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-1 rounded-sm uppercase tracking-wider"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                  >
                    <span>查看作品 / VIEW PROJECT</span>
                    <ArrowRight className="w-3 h-3 text-black" />
                  </motion.div>
                )}
              </AnimatePresence>

              {HONORS_TIMELINE.map((honor, index) => {
                const isActive = activeTimelineId === honor.id;
                
                return (
                  <div
                    key={honor.id}
                    className="relative group/item"
                    onMouseEnter={() => {
                      setActiveTimelineId(honor.id);
                      setHoveredTimelineId(honor.id);
                    }}
                    onMouseLeave={() => setHoveredTimelineId(null)}
                    onClick={() => handleJumpToProject(honor.projectId)}
                  >
                    {/* Time Node Indicator Anchor */}
                    <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 flex items-center justify-center z-10">
                      {/* Outer Ring */}
                      <div className={`w-[9px] h-[9px] rounded-full border transition-all duration-300 flex items-center justify-center ${
                        isActive 
                          ? 'border-cyan-400 bg-black scale-125 shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
                          : 'border-white/20 bg-zinc-900 group-hover/item:border-cyan-400/40'
                      }`}>
                        {/* Core Point */}
                        <div className={`w-[3px] h-[3px] rounded-full transition-all duration-300 ${
                          isActive ? 'bg-cyan-400' : 'bg-transparent'
                        }`} />
                      </div>
                    </div>

                    {/* Timeline Node Card & Interactive Details */}
                    <div 
                      className={`p-5 border transition-all duration-500 cursor-pointer relative ${
                        isActive 
                          ? 'border-cyan-400/20 bg-cyan-400/[0.01]' 
                          : 'border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.01]'
                      }`}
                    >
                      {/* Header row with Year & Tag */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 border transition-colors duration-300 ${
                          isActive ? 'bg-cyan-400/5 text-cyan-400 border-cyan-400/15' : 'bg-white/5 text-zinc-500 border-white/5'
                        }`}>
                          {honor.year}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.15em]">
                          {honor.tag}
                        </span>
                      </div>

                      {/* Title Info */}
                      <div className="space-y-1">
                        <h5 className={`text-sm sm:text-base font-sans font-normal tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-zinc-400'
                        }`}>
                          {honor.title}
                        </h5>
                        <p className={`text-[11px] font-sans transition-colors duration-300 ${
                          isActive ? 'text-cyan-400/80' : 'text-zinc-500'
                        }`}>
                          {honor.award} <span className="text-zinc-600 font-mono text-[9px] ml-1 uppercase">/ {honor.enAward}</span>
                        </p>
                      </div>

                      {/* Expandable Body */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-3 border-t border-white/5">
                              <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
                                {honor.desc}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. Secondary Level: Combined Professional Strengths & Skills (次要层级 - 个人专业优势与技能图示) */}
      <div className="pt-24 mt-24 border-t border-white/5 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Condensed Professional Advantages (7/12) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-3 pb-4 border-b border-white/5">
              <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase block">
                CROSS-DISCIPLINARY FUSION / 跨学科融合
              </span>
              <h4 className="text-2xl lg:text-3xl font-sans font-normal text-white tracking-tight">
                个人专业优势
              </h4>
              <p className="text-xs text-zinc-500 font-light max-w-lg leading-relaxed">
                跨越技术理性与艺术感性的双重维度，将严谨的平面设计秩序输入到次世代三维引擎空间搭建中，构建独特的跨学科创意壁垒。
              </p>
            </div>

            {/* Asymmetrical loosely-spaced layout of advantages */}
            <div className="space-y-4">
              
              {/* Box 1: 引擎地编工具 (Highest weight, top position) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 border border-cyan-400/20 bg-cyan-400/[0.01] hover:bg-cyan-400/[0.03] hover:border-cyan-400/40 transition-all duration-500 relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400" />
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-bold uppercase tracking-wider">
                      PRIMARY / 核心深耕
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">// 引擎地编工具</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-sans font-normal text-white tracking-tight">
                    UE / Unity 全流程搭建 与 光影叙事
                  </h3>

                  {/* Elegant monospace tags with subtle border */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['场景搭建', '地编光影', '空间叙事', 'AI辅助场景'].map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2.5 py-0.5 bg-cyan-400/5 text-cyan-400/90 border border-cyan-400/10 hover:border-cyan-400/30 transition-colors">
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Box 2: XR 空间交互 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-6 border border-white/5 bg-[#070810]/40 hover:bg-[#070810]/80 hover:border-cyan-400/30 transition-all duration-500 relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-700 group-hover:bg-cyan-400 transition-colors" />
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                      INTERACTIVE / 交互实践
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">// XR 交互设计</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-sans font-normal text-white tracking-tight">
                    VR 应用开发 与 沉浸式空间交互调试
                  </h3>

                  {/* Elegant monospace tags with subtle border */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['VR应用开发', '人因工效', '新型交互介质调试'].map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2.5 py-0.5 bg-zinc-400/5 text-zinc-400 border border-zinc-400/10 hover:border-zinc-400/30 transition-colors">
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Box 3: 平面视觉 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 border border-white/5 bg-[#070810]/40 hover:bg-[#070810]/80 hover:border-cyan-400/30 transition-all duration-500 relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-700 group-hover:bg-cyan-400 transition-colors" />
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                      AESTHETICS / 视觉基础
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">// 视觉传达</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-sans font-normal text-white tracking-tight">
                    包装设计、平面版式 与 视觉氛围把控
                  </h3>

                  {/* Elegant monospace tags with subtle border */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['国际网格系统', '物理材质审美', '视觉层级提炼'].map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2.5 py-0.5 bg-zinc-400/5 text-zinc-400 border border-zinc-400/10 hover:border-zinc-400/30 transition-colors">
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
          
          {/* Right Column: Technical Skills & Interests (5/12) - Shifted down for an exquisite asymmetrical whitespace layout */}
          <div className="lg:col-span-5 space-y-16 lg:pt-[40vh]">
            
            {/* Technical Skills Squircle Rows */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h4 className="text-[15px] font-mono font-bold tracking-[0.2em] text-[#8a94e6] uppercase select-none flex items-center gap-2">
                  TECHNICAL SKILLS 
                </h4>
                <span className="text-[12px] text-[#8a94e6] animate-pulse">✦</span>
              </div>

              {/* Squircles row wrapping seamlessly - perfectly cohesive dark styles */}
              <div className="flex flex-wrap gap-3.5">
                {[
                  { id: 'figma', label: 'Figma', content: (
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 24a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v8H8zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v8H8zm8 8a4 4 0 0 1-4-4V8h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4zm0-8a4 4 0 0 1-4-4V0h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4z"/>
                    </svg>
                  )},
                  { id: 'ps', label: 'Photoshop', content: <span className="font-mono font-bold text-[13px] tracking-tight text-zinc-400 group-hover:text-white transition-colors">Ps</span> },
                  { id: 'ai', label: 'Illustrator', content: <span className="font-mono font-bold text-[13px] tracking-tight text-zinc-400 group-hover:text-white transition-colors">Ai</span> },
                  { id: 'id', label: 'InDesign', content: <span className="font-mono font-bold text-[13px] tracking-tight text-zinc-400 group-hover:text-white transition-colors">Id</span> },
                  { id: 'ue', label: 'Unreal Engine', content: <span className="font-mono font-bold text-[13px] tracking-tight text-zinc-400 group-hover:text-white transition-colors">UE</span> },
                  { id: 'ut', label: 'Unity 3D', content: <span className="font-mono font-bold text-[13px] tracking-tight text-zinc-400 group-hover:text-white transition-colors">Ut</span> },
                  { id: 'bl', label: 'Blender', content: <span className="font-mono font-bold text-[13px] tracking-tight text-zinc-400 group-hover:text-white transition-colors">Bl</span> },
                  { id: 'pt', label: 'Painter', content: <span className="font-mono font-bold text-[13px] tracking-tight text-zinc-400 group-hover:text-white transition-colors">Pt</span> },
                ].map((item, idx) => (
                  <div
                    key={item.id}
                    title={item.label}
                    style={{ transform: `translateY(${(idx % 3) * 2}px)` }} // scattered offset
                    className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] bg-[#0c0d15]/60 border border-white/5 hover:border-cyan-400/40 hover:scale-105 transition-all duration-300 rounded-[14px] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer group relative"
                  >
                    {/* Placeholder comment interface for later image swap */}
                    {/* To replace with your image file, simply uncomment below and insert path: */}
                    {/* <img src={`/images/${item.id}.png`} className="w-full h-full object-contain p-2" alt={item.label} /> */}
                    
                    <div className="group-hover:opacity-90 transition-opacity">
                      {item.content}
                    </div>

                    {/* Miniature identity helper for visual delight */}
                    <span className="absolute bottom-1 right-1.5 text-[6.5px] font-mono text-zinc-600 scale-75 uppercase pointer-events-none group-hover:text-cyan-400/70">
                      // {item.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests styled beautifully with pill shapes */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h4 className="text-[15px] font-mono font-bold tracking-[0.2em] text-[#8a94e6] uppercase select-none flex items-center gap-2">
                  INTERESTS
                </h4>
                <span className="text-[12px] text-[#8a94e6] animate-pulse">✦</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  '空间叙事 / Space Storytelling',
                  '沉浸式交互 / VR Interactive',
                  '平面版式 / Grid Typography',
                  'AIGC工作流 / AI Generative'
                ].map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-[#0c0d15]/40 border border-white/5 hover:border-cyan-400/30 text-zinc-400 hover:text-white transition-all duration-300 text-xs font-sans font-light tracking-wide rounded-full cursor-default select-none inline-block"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
