import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  ChevronDown,
  Compass,
  ArrowDown,
  Layers,
  CircleDot
} from 'lucide-react';

import { PROJECTS, PROFILE } from './data';
import HeroCanvas from './components/HeroCanvas';
import ProjectCard from './components/ProjectCard';
import ExperienceSection from './components/ExperienceSection';
import StrengthsSection from './components/StrengthsSection';
import OtherWorks from './components/OtherWorks';
import ContactSection from './components/ContactSection';
import ProjectDetailPage from './components/ProjectDetailPage';
import MouseTrail from './components/MouseTrail';

export default function App() {
  const [filter, setFilter] = useState<'all' | 'graphic' | 'level'>('all');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // 1. Interactive Intro States
  const [introCompleted, setIntroCompleted] = useState(false);
  const [introProgress, setIntroProgress] = useState(0); // 0 to 100
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [totalDistance, setTotalDistance] = useState(0);
  const [hoveringAvatar, setHoveringAvatar] = useState(false);

  // Monitor page scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Interactive Intro: Mouse Movement & Scroll Tracking
  useEffect(() => {
    if (introCompleted) return;

    // Track mouse distance to progress the intro
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (lastPos.x !== 0 && lastPos.y !== 0) {
        const deltaX = e.clientX - lastPos.x;
        const deltaY = e.clientY - lastPos.y;
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Accumulate distance
        setTotalDistance((prev) => {
          const nextDist = prev + dist;
          // Progress: we want stage 1 (15% to 55%) and stage 2 (>= 55%). Let's map 1000px total distance to 100%
          const progress = Math.min(100, Math.floor(nextDist / 10));
          setIntroProgress(progress);
          return nextDist;
        });
      }
      setLastPos({ x: e.clientX, y: e.clientY });
    };

    // Track scroll wheel too to make it seamless on trackpads/scrollwheels
    const handleWheel = (e: WheelEvent) => {
      setTotalDistance((prev) => {
        const nextDist = prev + Math.abs(e.deltaY) * 1.5;
        const progress = Math.min(100, Math.floor(nextDist / 10));
        setIntroProgress(progress);
        return nextDist;
      });
    };

    // Touch support for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePos({ x: touch.clientX, y: touch.clientY });

        if (lastPos.x !== 0 && lastPos.y !== 0) {
          const deltaX = touch.clientX - lastPos.x;
          const deltaY = touch.clientY - lastPos.y;
          const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          
          setTotalDistance((prev) => {
            const nextDist = prev + dist * 2; // scale touch distance slightly
            const progress = Math.min(100, Math.floor(nextDist / 10));
            setIntroProgress(progress);
            return nextDist;
          });
        }
        setLastPos({ x: touch.clientX, y: touch.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [lastPos, introCompleted]);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060714] font-sans text-zinc-100 selection:bg-cyan-400 selection:text-black relative overflow-x-hidden">
      
      {/* 3. Interactive Intro Overlay (Satisfying "只需要鼠标滑动一下，字体在画面最中间出现一行，鼠标再滑动一下，这行字消失，在画面中间出现div的文字，以及一张图片我的头像") */}
      <AnimatePresence>
        {!introCompleted && (
          <motion.div
            key="interactive-intro"
            initial={{ opacity: 1 }}
            exit={{ y: '-100vh', opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#03040a] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 select-none overflow-hidden"
          >
            {/* Background Particle Canvas in Intro Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
              <HeroCanvas />
            </div>

            {/* Spotlight radial gradient tracking cursor */}
            <div 
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
              style={{
                backgroundImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(31, 63, 229, 0.15) 0%, rgba(204, 255, 0, 0.08) 45%, rgba(255,255,255,0.005) 75%, transparent 100%)`
              }}
            />

            {/* Top Bar info */}
            <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase relative z-20">
              <div className="flex items-center gap-2">
                <CircleDot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>ZHAO XIAOHE • SYSTEM CALIBRATING</span>
              </div>
              <button
                onClick={() => setIntroCompleted(true)}
                className="hover:text-cyan-400 transition-colors cursor-pointer border border-white/10 px-4 py-1.5 bg-white/5 uppercase text-[9px] tracking-widest font-bold"
              >
                跳过开场 / SKIP INTRO ↗
              </button>
            </div>

            {/* Centered Main Body Content - Interactive Stages */}
            <div className="my-auto w-full flex flex-col items-center justify-center relative z-20">
              <AnimatePresence mode="wait">
                {/* Stage 0: System Idle (No mouse move yet) */}
                {introProgress < 15 && (
                  <motion.div
                    key="stage-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 max-w-lg"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto animate-spin-slow">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                    </div>
                    <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase animate-pulse">
                      [ MOVE MOUSE TO ACTIVATE CORE / 请滑动鼠标激活 ]
                    </p>
                  </motion.div>
                )}

                {/* Stage 1: Single line of text appears at the exact center */}
                {introProgress >= 15 && introProgress < 55 && (
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6 }}
                    className="text-center px-4 max-w-4xl"
                  >
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase leading-relaxed text-white">
                      “ 融 汇 平 面 材 质 的 纯 粹 秩 序 ， 重 塑 次 世 代 虚 拟 空 间 的 情 绪 叙 事 。”
                    </h2>
                    <p className="text-[9px] font-mono tracking-[0.4em] text-zinc-500 uppercase mt-4">
                      Fusing Swiss Grid Aesthetics with Immersive Virtual Level Art
                    </p>
                  </motion.div>
                )}

                {/* Stage 2: Detailed Div with completed info + Portrait image */}
                {introProgress >= 55 && (
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, scale: 0.97, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="max-w-xl w-full mx-auto bg-black/60 border border-white/10 p-8 sm:p-10 backdrop-blur-xl relative text-center space-y-8 shadow-2xl"
                  >
                    {/* Corner high-tech grid cross decorations */}
                    <div className="absolute top-2 left-2 font-mono text-[8px] text-zinc-600 font-bold select-none">[+ 0.55]</div>
                    <div className="absolute top-2 right-2 font-mono text-[8px] text-zinc-600 font-bold select-none">[SEC: ART]</div>
                    
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-semibold">
                        [ PROFILE INITIATED / 个人主页就绪 ]
                      </span>
                      <h3 className="text-3xl font-black tracking-tight text-white uppercase font-sans">
                        赵 笑 禾 • ZHAO XIAOHE
                      </h3>
                      <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                        高级平面包装设计师 & 3D游戏场景地编师
                      </p>
                    </div>

                    {/* INTERACTIVE AVATAR (Hover reveals entering overlay text, clicking transitions to main page) */}
                    <div className="relative mx-auto w-36 h-36">
                      {/* Outer pulse circle when hovered */}
                      <motion.div 
                        className="absolute inset-[-10px] rounded-full border border-cyan-400/30 -z-10"
                        animate={{ 
                          scale: hoveringAvatar ? 1.08 : 0.96,
                          opacity: hoveringAvatar ? 1 : 0,
                          rotate: hoveringAvatar ? 180 : 0
                        }}
                        transition={{ duration: 0.5 }}
                        style={{ borderStyle: 'dashed' }}
                      />

                      <button
                        onMouseEnter={() => setHoveringAvatar(true)}
                        onMouseLeave={() => setHoveringAvatar(false)}
                        onClick={() => setIntroCompleted(true)}
                        className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 hover:border-cyan-400 cursor-pointer transition-all duration-300 relative group block shadow-xl"
                      >
                        <img
                          src={PROFILE.avatar}
                          alt="赵笑禾 Avatar"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-102 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                      </button>

                      {/* Tooltip Hover tag: "进入赵笑禾的空间" */}
                      <AnimatePresence>
                        {hoveringAvatar && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-cyan-400 text-black px-4 py-1.5 font-mono text-[10px] font-bold tracking-[0.2em] whitespace-nowrap uppercase shadow-lg pointer-events-none"
                          >
                            进入赵笑禾的空间 ↗
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <p className="text-zinc-300 text-xs leading-relaxed max-w-sm mx-auto pt-2">
                      “融汇平面秩序与三维空间的修行者。以极简秩序雕琢质感平面，用次世代光景构筑沉浸式地编环境。”
                    </p>

                    <div className="text-[9px] font-mono text-zinc-500 tracking-wider">
                      [ CLICK PORTRAIT TO ENTER STUDIO / 点击头像进入主页 ]
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Status / Entry Trigger */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-white/5 relative z-20">
              {/* Interactive Loading Meter */}
              <div className="flex items-center gap-4">
                <div className="h-1 w-28 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400"
                    animate={{ width: `${introProgress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  PROGRESS TRACK: {introProgress}%
                </span>
              </div>

              {/* Guide prompt */}
              <div className="flex items-center justify-end relative">
                <AnimatePresence mode="wait">
                  {introProgress < 55 ? (
                    <motion.p
                      key="prompt-slide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-mono tracking-widest text-cyan-400/80 animate-pulse text-center md:text-right uppercase"
                    >
                      [ 鼠标滑动 / 触控板滑动 发现更多空间 • PROGRESS ON MOVE... ]
                    </motion.p>
                  ) : (
                    <motion.p
                      key="prompt-completed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] font-mono tracking-widest text-zinc-400 text-center md:text-right uppercase animate-pulse"
                    >
                      [ 核心就绪，请触碰上方头像 ]
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Mesh Background (Dark Tech Theme) */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#060714]">
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-[#1f3fe5]/12 blur-[150px] opacity-70"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-[#ccff00]/6 blur-[150px] opacity-50"></div>
        <div className="absolute top-[30%] right-[5%] w-[45vw] h-[50vw] rounded-full bg-[#f2af8e]/5 blur-[130px] opacity-50"></div>
      </div>

      {/* Dynamic Floating Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-[#060714]/85 backdrop-blur-xl border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container-xl px-6 sm:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => scrollToSection('hero-section')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-white text-black font-mono font-bold text-xs tracking-tighter rounded-xs flex items-center justify-center group-hover:bg-cyan-400 transition-colors">
              ZH
            </div>
            <span className="text-xs font-display font-medium tracking-[0.25em] text-white uppercase group-hover:text-cyan-400 transition-colors">
              ZHAO XIAOHE STUDIO
            </span>
          </button>

          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
            <button
              onClick={() => scrollToSection('experience-anchor')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              个人履历
            </button>
            <button
              onClick={() => scrollToSection('projects-anchor')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              精选作品
            </button>
            <button
              onClick={() => scrollToSection('strengths-anchor')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              核心能力
            </button>
            <button
              onClick={() => scrollToSection('other-works-anchor')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              在校作业
            </button>
          </div>

          {/* Quick Contact Action Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('contact-section')}
              className="px-6 py-2.5 bg-transparent hover:bg-white hover:text-black border border-white/20 text-white text-[9px] uppercase font-bold tracking-[0.25em] transition-all duration-300 cursor-pointer"
            >
              预约合作 / HIRE ME
            </button>
          </div>

          {/* Mobile Menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[68px] left-0 w-full bg-[#060714]/95 backdrop-blur-xl z-30 border-b border-white/5 px-6 py-8 space-y-6 lg:hidden"
          >
            <div className="flex flex-col gap-4 text-xs font-bold tracking-widest uppercase text-zinc-400">
              <button
                onClick={() => scrollToSection('experience-anchor')}
                className="text-left py-2 hover:text-cyan-400 border-b border-white/5"
              >
                个人履历
              </button>
              <button
                onClick={() => scrollToSection('projects-anchor')}
                className="text-left py-2 hover:text-cyan-400 border-b border-white/5"
              >
                精选作品
              </button>
              <button
                onClick={() => scrollToSection('strengths-anchor')}
                className="text-left py-2 hover:text-cyan-400 border-b border-white/5"
              >
                核心能力
              </button>
              <button
                onClick={() => scrollToSection('other-works-anchor')}
                className="text-left py-2 hover:text-cyan-400 border-b border-white/5"
              >
                在校作业
              </button>
            </div>

            <button
              onClick={() => scrollToSection('contact-section')}
              className="w-full py-3 bg-white text-black text-[10px] font-bold tracking-widest text-center rounded-none uppercase transition-colors"
            >
              预约合作 / HIRE ME
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: Full-screen Hero Banner */}
      <section
        id="hero-section"
        className="relative h-screen flex flex-col justify-between pt-28 pb-14 overflow-hidden"
      >
        {/* Dynamic Interactive Flowing Vector/Level Grid Canvas */}
        <HeroCanvas />

        {/* Floating gradient orb for aesthetic lighting */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Centered content bounds */}
        <div className="container-xl px-6 sm:px-12 lg:px-16 my-auto relative z-10 w-full">
          <div className="max-w-5xl space-y-10">
            
            {/* Minimalist Tech Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#0d0d11]/80 backdrop-blur-md border border-white/10 text-cyan-400 font-mono text-[9px] tracking-[0.2em] uppercase"
            >
              <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
              [ CORE SYSTEM: PACKAGING & UNREAL ENVIRONMENT ]
            </motion.div>

            {/* Giant Title Layout with Loose spaced alignment */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-7xl lg:text-[105px] font-black text-white tracking-tight leading-[0.95] uppercase font-mono"
              >
                CRAFTING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 lowercase font-serif italic font-light tracking-wide">sensory</span> space.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-zinc-400 text-xs sm:text-sm lg:text-base font-sans font-light max-w-2xl leading-relaxed mt-6 tracking-wide"
              >
                赵笑禾 (Zhao Xiaohe) — 致力于为品牌打磨高触感纸张包装，为次世代游戏构建 high-fidelity 叙事关卡。以严谨的平面秩序重塑三维世界的地景逻辑。
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-6"
            >
              <button
                id="hero-btn-portfolio"
                onClick={() => scrollToSection('projects-anchor')}
                className="px-8 py-4 bg-white hover:bg-cyan-400 text-black font-bold tracking-widest uppercase text-[10px] flex items-center gap-2.5 group transition-all duration-300 rounded-none cursor-pointer"
              >
                探索精选作品 / EXPLORE PROJECTS
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                id="hero-btn-contact"
                onClick={() => scrollToSection('contact-section')}
                className="px-8 py-4 bg-[#0d0d11]/80 backdrop-blur-md hover:bg-white hover:text-black text-white border border-white/10 font-bold tracking-widest uppercase text-[10px] transition-all duration-300 rounded-none cursor-pointer"
              >
                联系预约 / CONTACT ME
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator footer with loose metadata */}
        <div className="container-xl px-6 sm:px-12 lg:px-16 w-full flex items-center justify-between text-[9px] font-mono tracking-[0.25em] text-zinc-500 relative z-10 select-none">
          <div className="flex items-center gap-3">
            <span>UNREAL ENGINE 5 & ENVIRONMENT DESIGN</span>
            <span>•</span>
            <span>2026 EDITION</span>
          </div>

          <button
            onClick={() => scrollToSection('experience-anchor')}
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors group cursor-pointer"
          >
            <span>向下滚动发现更多</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* SECTION 2: Experience Module */}
      <section
        id="experience-anchor"
        className="py-24 lg:py-40 border-t border-white/5 relative"
        style={{ backgroundColor: '#060814' }}
      >
        <div className="container-xl px-6 sm:px-12 lg:px-16">
          {/* Section title (loosely spaced, elegant uppercase) */}
          <div className="border-b border-white/5 pb-12 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-[0.3em] uppercase">
                01 / PROFILE & STORY
              </span>
              <h2
                className="text-3xl lg:text-5xl font-mono font-bold text-white tracking-tight uppercase"
                style={{ backgroundColor: '#000000' }}
              >
                个人履历与数据
              </h2>
            </div>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
              [ 跨媒介创意资产体系构建者 ]
            </p>
          </div>

          <ExperienceSection />
        </div>
      </section>

      {/* SECTION 3: Featured Projects (Satisfying "文字根据我的履历调整。当鼠标在精选项目上停留出现相关项目图片，点击展开") */}
      <section
        id="projects-anchor"
        className="py-24 lg:py-40 bg-[#060714]/80 border-y border-white/5 relative"
      >
        <div className="container-xl px-6 sm:px-12 lg:px-16">
          
          {/* Section title & Category filters */}
          <div className="border-b border-white/5 pb-12 mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-4">
              <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-[0.3em] uppercase">
                02 / PORTFOLIO HIGHLIGHTS
              </span>
              <h2 className="text-3xl lg:text-5xl font-mono font-bold text-white tracking-tight uppercase">
                精选核心作品
              </h2>
            </div>

            {/* Filter buttons with loose layout and sharp technical frame */}
            <div className="flex flex-wrap items-center gap-1 bg-black/60 p-1 border border-white/10">
              {[
                { key: 'all', label: '全部 / All' },
                { key: 'graphic', label: '平面包装 / Packaging' },
                { key: 'level', label: '虚幻地编 / Unreal Scene' },
              ].map((btn) => (
                <button
                  key={btn.key}
                  id={`btn-filter-${btn.key}`}
                  onClick={() => setFilter(btn.key as any)}
                  className={`px-5 py-2.5 text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                    filter === btn.key
                      ? 'bg-cyan-400 text-black'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic filtered project cards - render rows with interactive hover-reveals */}
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onProjectClick={(id) => setSelectedProjectId(id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 4: Core Strengths */}
      <section
        id="strengths-anchor"
        className="py-24 lg:py-40 relative"
      >
        <div className="container-xl px-6 sm:px-12 lg:px-16">
          {/* Section title */}
          <div className="border-b border-white/5 pb-12 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-[0.3em] uppercase">
                03 / CAPABILITY PILLARS
              </span>
              <h2 className="text-3xl lg:text-5xl font-mono font-bold text-white tracking-tight uppercase">
                个人专业优势
              </h2>
            </div>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
              [ 学科跨度重叠形成的复合壁垒 ]
            </p>
          </div>

          <StrengthsSection />
        </div>
      </section>

      {/* SECTION 5: University works (在校作业) */}
      <section
        id="other-works-anchor"
        className="py-24 lg:py-40 bg-[#060714]/80 border-t border-white/5"
      >
        <div className="container-xl px-6 sm:px-12 lg:px-16">
          {/* Section title */}
          <div className="border-b border-white/5 pb-12 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-[0.3em] uppercase">
                04 / ACADEMIC ARCHIVES
              </span>
              <h2 className="text-3xl lg:text-5xl font-mono font-bold text-white tracking-tight uppercase">
                其他设计与在校作业
              </h2>
            </div>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
              [ 探索性实验、概念研究及获奖作品 ]
            </p>
          </div>

          <OtherWorks />
        </div>
      </section>

      {/* SECTION 6: Contact form & full-screen ending section */}
      <section className="pt-24 border-t border-white/5">
        <ContactSection />
      </section>

      {/* Full-Screen Project Detail Takeover */}
      <AnimatePresence>
        {selectedProjectId && (
          <ProjectDetailPage
            projectId={selectedProjectId}
            onClose={() => setSelectedProjectId(null)}
          />
        )}
      </AnimatePresence>

      {/* Dynamic interactive cursor & particle mouse trail */}
      <MouseTrail />
      
    </div>
  );
}
