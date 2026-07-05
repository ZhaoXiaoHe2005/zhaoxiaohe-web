import React, { useState, useEffect, useRef } from 'react';
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

import { PROJECTS, PROFILE, UNIVERSITY_PROJECTS } from './data';
import HeroCanvas from './components/HeroCanvas';
import ProjectCard from './components/ProjectCard';
import ExperienceSection from './components/ExperienceSection';
import OtherWorks from './components/OtherWorks';
import ContactSection from './components/ContactSection';
import ProjectDetailPage from './components/ProjectDetailPage';
import MouseTrail from './components/MouseTrail';
import ParticleExplosion from './components/ParticleExplosion';

// Animation variants for the layered splash screen entries
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const nameVariants = {
  hidden: { opacity: 0, y: '100%', rotateX: 20, skewY: 2 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    skewY: 0,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const slogan1Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const slogan2Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 0.8,
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const portfolioVariants = {
  hidden: { opacity: 0, y: '70%', scaleY: 1.6, scaleX: 0.9, skewY: 5 },
  visible: {
    opacity: 0.22, // background Portfolio text made distinct and obvious
    y: 0,
    scaleY: 1,
    scaleX: 1,
    skewY: 0,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const avatarVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.85, rotate: -3 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Section Header Scroll Entrance Variants
const headerParentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.05,
    },
  },
};

const headerEnglishBigTitleVariants = {
  hidden: { y: '160%', scaleY: 1.8, rotateX: 35, skewX: -15, opacity: 0 },
  visible: {
    y: 0,
    scaleY: 1,
    rotateX: 0,
    skewX: 0,
    opacity: 1,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const headerChineseTitleVariants = {
  hidden: { y: '130%', scaleY: 1.5, rotateX: 20, opacity: 0 },
  visible: {
    y: 0,
    scaleY: 1,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 1.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
  },
};

const headerDescTextVariants = {
  hidden: { x: 80, rotateY: 15, opacity: 0 },
  visible: {
    x: 0,
    rotateY: 0,
    opacity: 1,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

export default function App() {
  const [filter, setFilter] = useState<'all' | 'graphic' | 'level'>('all');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // 0. Cinematic Preloader States
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [preloaderProgress, setPreloaderProgress] = useState(0);

  // 1. Works View & Interactive Exploding Warp States
  const [viewMode, setViewMode] = useState<'main' | 'works'>('main');
  const [isExploding, setIsExploding] = useState(false);
  const [explosionOrigin, setExplosionOrigin] = useState<{ x: number; y: number } | null>(null);

  // 2. Interactive Intro States
  const [introCompleted, setIntroCompleted] = useState(false);
  const [introProgress, setIntroProgress] = useState(0); // 0 to 100
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [totalDistance, setTotalDistance] = useState(0);
  const [hoveringAvatar, setHoveringAvatar] = useState(false);

  // Monitor page scroll to change header style
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!preloaderComplete) {
      interval = setInterval(() => {
        setPreloaderProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setPreloaderComplete(true);
            }, 800);
            return 100;
          }
          const step = Math.floor(Math.random() * 8) + 4;
          return Math.min(100, prev + step);
        });
      }, 70);
    }
    return () => clearInterval(interval);
  }, [preloaderComplete]);

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

  const handleLaunchWorks = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setExplosionOrigin({ x, y });
    setIsExploding(true);
  };

  const handleHeaderNavToWorks = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExplosionOrigin({ x: e.clientX, y: e.clientY });
    setIsExploding(true);
    setMobileMenuOpen(false);
  };

  const handleExplosionComplete = () => {
    setViewMode('works');
    setIsExploding(false);
    window.scrollTo({ top: 0 });
  };

  const handleReturnToMain = () => {
    setViewMode('main');
    setTimeout(() => {
      const el = document.getElementById('launcher-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <div className="min-h-screen bg-[#060714] font-sans text-zinc-100 selection:bg-cyan-400 selection:text-black relative overflow-x-hidden">
      
      {/* 0. BRAND NEW CINEMATIC PRELOADER */}
      <AnimatePresence>
        {!preloaderComplete && (
          <motion.div
            key="cinematic-preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
              transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[100] bg-[#03040a] text-[#eeeadf] flex flex-col justify-between p-8 sm:p-12 lg:p-16 select-none"
          >
            {/* Minimal line frames */}
            <div className="absolute top-12 left-12 right-12 h-[1px] bg-white/5" />
            <div className="absolute bottom-12 left-12 right-12 h-[1px] bg-white/5" />
            
            {/* Top Bar Info */}
            <div className="flex justify-between items-center text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>SYSTEM CORE INITIALIZATION</span>
              </div>
              <span>ASSETS LOAD STATUS: [OK]</span>
            </div>

            {/* Central massive counter with masking/compression */}
            <div className="my-auto flex flex-col items-center justify-center space-y-6 relative z-10">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '120%', scaleY: 1.8, skewY: 5 }}
                  animate={{ y: 0, scaleY: 1, skewY: 0 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-7xl sm:text-9xl md:text-[140px] font-black tracking-tighter leading-none flex items-baseline text-white"
                >
                  {String(preloaderProgress).padStart(3, '0')}
                  <span className="text-cyan-400 text-3xl sm:text-5xl font-mono ml-2">%</span>
                </motion.div>
              </div>

              {/* Minimal 1px loading track across the screen */}
              <div className="w-full max-w-lg h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="h-full bg-cyan-400"
                  style={{ width: `${preloaderProgress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              {/* Dynamic system bootup log */}
              <div className="h-6 overflow-hidden flex flex-col justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={Math.floor(preloaderProgress / 20)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-medium"
                  >
                    {preloaderProgress < 25 && "INITIALIZING SYSTEM REGISTRIES..."}
                    {preloaderProgress >= 25 && preloaderProgress < 50 && "INITIALIZING UNREAL 3D ART DECK..."}
                    {preloaderProgress >= 50 && preloaderProgress < 75 && "ALIGNING SWISS GRID VECTOR CHASSIS..."}
                    {preloaderProgress >= 75 && preloaderProgress < 100 && "COMPILING HIGH-FIDELITY SHADERS..."}
                    {preloaderProgress === 100 && "SYSTEM LOADED. READY TO ENTER."}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom metadata panel */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[8px] font-mono tracking-[0.25em] text-zinc-600 uppercase relative z-10 w-full">
              <span>ZHAO XIAOHE CREATIVE DIGITAL ENGINE v2026</span>
              <span>EST. LATENCY: ~0.02MS // 60FPS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className="text-[9px] font-mono tracking-[0.25em] text-zinc-600 select-none border border-white/5 px-3.5 py-1 bg-white/[0.01] rounded-sm">
                PORTAL ENTRANCE // BYPASS_PERMITTED
              </div>
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
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className="w-[85vw] max-w-5xl mx-auto bg-transparent relative text-center flex flex-col justify-center items-center space-y-2 sm:space-y-3 pt-8 sm:pt-10 pb-2 translate-y-1 sm:translate-y-2 lg:translate-y-2"
                  >
                    {/* 1. Name & Slogan area at the very top */}
                    <div className="space-y-2 relative z-20 text-center max-w-2xl px-4">
                      <div className="overflow-hidden">
                        <motion.h3 
                          variants={nameVariants}
                          className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-[0.25em] text-[#eeeadf] uppercase font-sans"
                        >
                          赵 笑 禾 • ZHAO XIAOHE
                        </motion.h3>
                      </div>
                      <div className="space-y-1">
                        <div className="overflow-hidden">
                          <motion.p 
                            variants={slogan1Variants}
                            className="text-xs sm:text-sm text-zinc-300 font-sans tracking-wide leading-relaxed"
                          >
                            以美术为基底，以技术为载体，探索虚拟视觉与交互的无限可能
                          </motion.p>
                        </div>
                        <div className="overflow-hidden">
                          <motion.p 
                            variants={slogan2Variants}
                            className="text-[9px] sm:text-[10px] font-mono tracking-wider text-cyan-400/80"
                          >
                            Art Centric, Tech Driven | Explore the Boundless Possibilities of Virtual Vision & Interaction
                          </motion.p>
                        </div>
                      </div>
                    </div>

                    {/* 2. Middle area: Parent relative container for giant PORTFOLIO text with Avatar overlapping in the center-lower area */}
                    <div className="relative w-full flex flex-col items-center justify-center pt-2 pb-6 sm:pt-3 sm:pb-8">
                      
                      {/* Layer 1: Massive Background Title "PORTFOLIO" mimicking the reference image */}
                      <div className="pointer-events-none select-none z-10 overflow-hidden">
                        <motion.h1 
                          variants={portfolioVariants}
                          className="text-[12vw] sm:text-[13vw] font-black tracking-tighter text-[#eeeadf] leading-none uppercase font-sans text-center select-none"
                        >
                          PORTFOLIO
                        </motion.h1>
                      </div>

                      {/* Layer 3: Avatar placed to cover 3/4 (approx 75%) of PORTFOLIO, shifted down so 1/5 (20%) is visible at the top */}
                      <motion.div 
                        variants={avatarVariants}
                        className="absolute z-30 flex flex-col items-center top-[64%] sm:top-[68%] lg:top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="relative flex items-center justify-center">
                          <motion.div 
                            className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden border-2 border-[#eeeadf]/20 hover:border-cyan-400 bg-[#7c7be0] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer group flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            onMouseEnter={() => setHoveringAvatar(true)}
                            onMouseLeave={() => setHoveringAvatar(false)}
                            onClick={() => setIntroCompleted(true)}
                          >
                            {/* Grayscale by default, transitions to colored on hover */}
                            <img
                              src={PROFILE.avatar}
                              alt="赵笑禾 Avatar"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-108"
                            />
                            <div className="absolute inset-0 bg-cyan-400/5 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                          </motion.div>
                        </div>
                      </motion.div>

                    </div>

                    {/* Coordinates tag styled nicely */}
                    <motion.div 
                      variants={nameVariants}
                      className="text-[8px] font-mono tracking-[0.25em] text-zinc-600 uppercase select-none pt-20 sm:pt-28 lg:pt-32"
                    >
                      COORDINATES: SHANGHAI // EAST_ASIA
                    </motion.div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dynamic floating tooltip that follows the mouse perfectly */}
            <AnimatePresence>
              {hoveringAvatar && (
                <motion.div
                  style={{
                    position: 'fixed',
                    left: mousePos.x + 20,
                    top: mousePos.y + 20,
                    pointerEvents: 'none',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="bg-cyan-400 text-black px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase shadow-[0_10px_35px_rgba(34,211,238,0.55)] flex items-center gap-1.5 rounded-full z-50 whitespace-nowrap border border-cyan-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  Enter the space ↗
                </motion.div>
              )}
            </AnimatePresence>

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

              {/* Symmetric Alignment: Click Portrait To Enter Studio on the right, matches the progress track */}
              <div className="flex items-center justify-end">
                <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase font-semibold">
                  [ PORTAL STATUS: CALIBRATED ]
                </span>
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
            ? viewMode === 'works'
              ? 'py-4 bg-[#faf9f5]/90 backdrop-blur-xl border-b border-zinc-900/10 text-zinc-900 shadow-sm'
              : 'py-4 bg-[#060714]/85 backdrop-blur-xl border-b border-white/5 text-zinc-100'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container-xl px-6 sm:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo Brand / Return Button */}
          {viewMode === 'works' ? (
            <button
              onClick={handleReturnToMain}
              className="flex items-center gap-2.5 text-zinc-900 hover:text-cyan-700 font-mono text-[10px] font-black tracking-[0.2em] uppercase transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-zinc-900" />
              <span>返回个人履历 / RETURN TO RESUME</span>
            </button>
          ) : (
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
          )}
 
          {/* Nav Links - Desktop */}
          <div className={`hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.25em] ${viewMode === 'works' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {viewMode === 'works' ? (
              <>
                <button
                  onClick={() => scrollToSection('projects-anchor')}
                  className="hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  精选作品
                </button>
                <button
                  onClick={() => scrollToSection('other-works-anchor')}
                  className="hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  在校作业
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => scrollToSection('experience-anchor')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  个人履历
                </button>
                <button
                  onClick={handleHeaderNavToWorks}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-cyan-400/90 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  <span>精选作品</span>
                </button>
                <button
                  onClick={handleHeaderNavToWorks}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-cyan-400/90"
                >
                  在校作业
                </button>
              </>
            )}
          </div>
 
          {/* Quick Contact Action Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('contact-section')}
              className={`px-6 py-2.5 bg-transparent text-[9px] uppercase font-bold tracking-[0.25em] transition-all duration-300 cursor-pointer ${
                viewMode === 'works'
                  ? 'hover:bg-zinc-900 hover:text-white border border-zinc-900/20 text-zinc-800'
                  : 'hover:bg-white hover:text-black border border-white/20 text-white'
              }`}
            >
              预约合作 / HIRE ME
            </button>
          </div>
 
          {/* Mobile Menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${viewMode === 'works' ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white'}`}
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
              {viewMode === 'works' ? (
                <>
                  <button
                    onClick={handleReturnToMain}
                    className="text-left py-2 text-cyan-400 border-b border-white/5 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>返回个人履历</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('projects-anchor')}
                    className="text-left py-2 hover:text-cyan-400 border-b border-white/5"
                  >
                    精选作品
                  </button>
                  <button
                    onClick={() => scrollToSection('other-works-anchor')}
                    className="text-left py-2 hover:text-cyan-400 border-b border-white/5"
                  >
                    在校作业
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => scrollToSection('experience-anchor')}
                    className="text-left py-2 hover:text-cyan-400 border-b border-white/5"
                  >
                    个人履历
                  </button>
                  <button
                    onClick={handleHeaderNavToWorks}
                    className="text-left py-2 text-cyan-400 border-b border-white/5 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>精选作品 (开启粒子)</span>
                  </button>
                  <button
                    onClick={handleHeaderNavToWorks}
                    className="text-left py-2 text-cyan-400 border-b border-white/5"
                  >
                    在校作业 (开启粒子)
                  </button>
                </>
              )}
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

      {viewMode === 'main' ? (
        <>
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
                  [ PORTFOLIO SYSTEM: INTERACTIVE & VISUAL DESIGN ]
                </motion.div>

                {/* Giant Title Layout with Loose spaced alignment */}
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-7xl lg:text-[105px] font-black text-white tracking-tight leading-[0.95] uppercase font-mono">
                    <div className="overflow-hidden block py-1.5 sm:py-2">
                      <motion.span
                        initial={{ y: '160%', scaleY: 2.2, rotate: 4, skewX: -15, opacity: 0 }}
                        animate={{ y: 0, scaleY: 1, rotate: 0, skewX: 0, opacity: 1 }}
                        transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                        className="block origin-left select-none"
                      >
                        CRAFTING
                      </motion.span>
                    </div>
                    <div className="overflow-hidden block py-1.5 sm:py-2">
                      <motion.span
                        initial={{ y: '160%', scaleY: 2.2, rotate: -4, skewX: 15, opacity: 0 }}
                        animate={{ y: 0, scaleY: 1, rotate: 0, skewX: 0, opacity: 1 }}
                        transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 lowercase font-serif italic font-light tracking-wide origin-left select-none"
                      >
                        visual <span className="uppercase font-mono font-black text-white not-italic">& space.</span>
                      </motion.span>
                    </div>
                  </h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-zinc-400 text-xs sm:text-sm lg:text-base font-sans font-light max-w-2xl leading-relaxed mt-6 tracking-wide"
                  >
                    赵笑禾 (Zhao Xiaohe) — 跨媒介交互与视觉设计作品集。致力于在平面秩序、次世代游戏关卡地编与沉浸式三维体验中寻找创意的边界，用严谨的手艺雕琢每一次感官引导与材质碰撞。
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
                    onClick={handleHeaderNavToWorks}
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
            className="py-16 lg:py-28 border-t border-white/5 relative overflow-hidden"
            style={{ backgroundColor: '#060814' }}
          >
            {/* Tech Grid & Coordinates Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-40" />

            {/* Tactical Screen Corner Notches */}
            <div className="absolute top-12 left-12 w-6 h-6 border-t-2 border-l-2 border-white/10" />
            <div className="absolute top-12 right-12 w-6 h-6 border-t-2 border-r-2 border-white/10" />
            <div className="absolute bottom-12 left-12 w-6 h-6 border-b-2 border-l-2 border-white/10" />
            <div className="absolute bottom-12 right-12 w-6 h-6 border-b-2 border-r-2 border-white/10" />

            <div className="container-xl px-6 sm:px-12 lg:px-16 relative z-10">
              {/* Section title (loosely spaced, elegant uppercase) with premium scroll animation */}
              <motion.div
                variants={headerParentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
                className="border-b border-white/5 pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="overflow-hidden py-1">
                    <motion.span
                      variants={headerEnglishBigTitleVariants}
                      className="block text-sm sm:text-lg font-mono font-bold text-cyan-400 tracking-[0.4em] uppercase"
                    >
                      01 / PROFILE & DISTINCTIONS
                    </motion.span>
                  </div>
                  <div className="overflow-hidden py-1">
                    <motion.h2
                      variants={headerChineseTitleVariants}
                      className="text-3xl lg:text-5xl font-mono font-bold text-white tracking-tight uppercase"
                    >
                      关于我与荣誉
                    </motion.h2>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <motion.p
                    variants={headerDescTextVariants}
                    className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]"
                  >
                    [ 跨媒介创意资产体系构建者 ]
                  </motion.p>
                </div>
              </motion.div>

              <ExperienceSection />

              {/* Merged Interactive Gateway / Works Launcher with generous spacer */}
              <div className="mt-28 lg:mt-40 pt-16 border-t border-white/5 flex flex-col items-center justify-center relative">
                <div className="relative group my-8">
                  {/* Outer rotating technical rings */}
                  <div className="absolute -inset-10 border border-dashed border-cyan-400/25 rounded-full animate-[spin_50s_linear_infinite] group-hover:border-cyan-400/60 transition-colors pointer-events-none" />
                  <div className="absolute -inset-6 border border-zinc-800 rounded-full group-hover:border-cyan-400/30 transition-colors pointer-events-none" />
                  <div className="absolute -inset-2 border border-cyan-500/10 rounded-full animate-ping group-hover:border-cyan-400/40 transition-colors pointer-events-none" />
                  
                  {/* Main Launcher Button */}
                  <button
                    onClick={handleLaunchWorks}
                    className="relative px-12 py-6 bg-cyan-400 text-black text-[10px] font-mono font-black tracking-[0.3em] uppercase transition-all duration-500 hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(34,211,238,0.25)] hover:shadow-[0_0_80px_rgba(255,255,255,0.45)] cursor-pointer"
                  >
                    LAUNCH CORE PORTFOLIO / 开启作品航线
                  </button>
                </div>

                <div className="text-[9px] font-mono text-zinc-500 tracking-[0.2em] pointer-events-none uppercase mt-6">
                  [ COGNITIVE SYSTEMS • QUANTUM BRIDGE ]
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="pt-28 pb-24 bg-[#faf9f5] text-zinc-950 min-h-screen relative overflow-hidden transition-colors duration-1000 select-none">
          {/* Subtle swiss drafting lines & ticker markings in the background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>

          {/* Decorative Swiss Tickers & Absolute Margins */}
          <div className="absolute top-10 left-10 text-[9px] font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase">
            ZHAO_XIAOHE // STUDIO_SYSTEM
          </div>
          <div className="absolute top-10 right-10 text-[9px] font-mono font-medium tracking-[0.25em] text-zinc-400 uppercase hidden md:block">
            REUNIMOS_SPACE // DECK_V2
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold tracking-[0.25em] text-zinc-300 uppercase hidden lg:block">
            COORD_SET: 0573 * 0770 V
          </div>

          {/* Core works layout */}
          <div className="container-xl px-6 sm:px-12 lg:px-20 relative z-10">
            {/* Header section with ultra-clean typographic pairing */}
            <div className="border-b border-zinc-900/15 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-700 tracking-[0.3em] uppercase block">
                  03 / SELECTED CHRONOLOGY
                </span>
                <h2 className="text-4xl lg:text-5xl font-mono font-black text-zinc-900 tracking-tight uppercase leading-none">
                  精选核心作品
                </h2>
              </div>

              {/* Minimal filter with fine styling */}
              <div className="flex flex-wrap items-center gap-1 bg-zinc-100 p-1 border border-zinc-200">
                {[
                  { key: 'all', label: '全部 / ALL' },
                  { key: 'graphic', label: '平面包装 / GRAPHIC' },
                  { key: 'level', label: '虚幻地编 / LEVEL ART' },
                ].map((btn) => (
                  <button
                    key={btn.key}
                    onClick={() => setFilter(btn.key as any)}
                    className={`px-4 py-1.5 text-[9px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                      filter === btn.key
                        ? 'bg-zinc-950 text-[#ccff00]'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ASYMMETRIC STAGGERED MASONRY-LIKE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-28">
              {filteredProjects.map((project, index) => {
                const isEven = index % 2 === 0;
                // Add vertical stagger offset to alternate cards
                const staggerClass = isEven ? 'lg:pt-24' : 'lg:pt-0';

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`${staggerClass} flex flex-col space-y-5 group/item`}
                  >
                    {/* 1. IMAGE CONTAINER WITH EMBEDDED TAGS */}
                    <div 
                      onClick={() => setSelectedProjectId(project.id)}
                      className="relative w-full aspect-16/10 bg-zinc-200 border border-zinc-900/10 overflow-hidden cursor-pointer group/img shadow-sm"
                    >
                      <motion.img
                        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', scale: 1.12 }}
                        whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Ambient overlay */}
                      <div className="absolute inset-0 bg-black/[0.03] group-hover/img:bg-transparent transition-all duration-500" />

                      {/* Technical bright neon yellow tag at the top right, exactly like the image */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1.5 text-[8px] font-mono rounded-none bg-[#ccff00] text-black font-black uppercase tracking-[0.25em] shadow-sm border border-black/5">
                          {project.category === 'graphic' ? '2D GRAPHIC / PACKAGING' : '3D SCENE LEVEL ART'}
                        </span>
                      </div>

                      {/* Hover action banner overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 border border-black/5 flex items-center justify-between opacity-0 group-hover/img:opacity-100 transition-all duration-300">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-900">
                          CLICK TO VIEW PROJECT SPECS / 开启详情视窗
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-900" />
                      </div>
                    </div>

                    {/* 2. ASYMMETRIC SPEC & METADATA SECTION (旁边的字) */}
                    <div className="space-y-4 pt-1">
                      {/* Flex heading containing Title & Year */}
                      <div className="flex justify-between items-start gap-4">
                        <h3 
                          onClick={() => setSelectedProjectId(project.id)}
                          className="text-base sm:text-lg font-bold font-mono text-zinc-900 tracking-tight leading-snug cursor-pointer hover:text-cyan-700 transition-colors"
                        >
                          {project.title}
                        </h3>
                        <span className="font-mono text-[10px] font-bold text-zinc-600 bg-zinc-100 border border-zinc-200/60 px-2.5 py-1 select-none whitespace-nowrap">
                          {project.year}
                        </span>
                      </div>

                      {/* Flight board airport-style technical lines */}
                      <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-900/10 py-3 text-[9px] font-mono text-zinc-500 tracking-[0.15em] uppercase">
                        <div className="space-y-1">
                          <p className="font-bold text-zinc-700">CLIENT: {project.client || 'N/A'}</p>
                          <p>TOOLS: {project.software ? project.software.join(' / ') : 'N/A'}</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-zinc-800 font-bold">ROUTE: SH_SHA // TOKYO_NRT</p>
                          <p className="text-zinc-400">LATENCY: ~0.02MS // STATUS: [OK]</p>
                        </div>
                      </div>

                      {/* Concise brief paragraph description */}
                      <p className="text-xs leading-relaxed text-zinc-600 font-sans font-light">
                        {project.description}
                      </p>

                      {/* View Button */}
                      <button 
                        onClick={() => setSelectedProjectId(project.id)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black text-zinc-900 hover:text-cyan-700 uppercase tracking-widest border-b-2 border-zinc-900 pb-0.5 hover:border-cyan-700 transition-colors"
                      >
                        <span>EXPLORE FULL ART DECK / 深入剖析 ↗</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* University Works section styled as a secondary technical archive drawer */}
            <div className="mt-36 pt-24 border-t border-zinc-900/10">
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-zinc-400 tracking-[0.3em] uppercase block">
                    04 / ACADEMIC ARCHIVES
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-mono font-black text-zinc-900 tracking-tight uppercase leading-none">
                    在校作业与探索实验
                  </h2>
                </div>
                <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em] hidden sm:block">
                  [ GRADUATE THESIS & EXPERIMENTAL STUDIES ]
                </p>
              </div>

              {/* Staggered University Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {UNIVERSITY_PROJECTS.map((proj, index) => (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group flex flex-col justify-between bg-zinc-50 border border-zinc-900/10 p-6 relative hover:border-zinc-900/30 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="aspect-4/3 overflow-hidden border border-zinc-900/5 bg-zinc-100 mb-6">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-4 flex-grow">
                      <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
                        <span>{proj.category}</span>
                        <span>{proj.year}</span>
                      </div>

                      <h4 className="text-sm font-bold font-mono text-zinc-900 group-hover:text-cyan-700 transition-colors leading-snug">
                        {proj.title}
                      </h4>

                      <p className="text-xs leading-relaxed text-zinc-500 font-light">
                        {proj.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-900/5 flex items-center justify-between text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
                      <span>ACADEMIC ARCHIVE</span>
                      <span className="text-[#ccff00] bg-black px-1.5 py-0.5 font-bold">APPROVED</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical footer decor for works page, matching the reference image */}
          <div className="container-xl px-6 sm:px-12 lg:px-20 mt-32 pt-8 border-t border-zinc-900/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono text-zinc-400 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-3">
              <span>GMT+8 SHANGHAI CN</span>
              <span>•</span>
              <span>0573 * 0770 V</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-ping" />
              <span>ZHAO XIAOHE CREATIVE STUDIO v2026</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: Contact form & full-screen ending section */}
      <section id="contact-section" className="pt-24 border-t border-white/5">
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

      {/* Cinematic Transition Particle Explosion */}
      <ParticleExplosion
        active={isExploding}
        origin={explosionOrigin}
        onComplete={handleExplosionComplete}
      />

      {/* Dynamic interactive cursor & particle mouse trail */}
      <MouseTrail />
      
    </div>
  );
}
