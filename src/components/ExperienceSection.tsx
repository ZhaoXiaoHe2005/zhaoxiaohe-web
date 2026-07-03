import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE, EXPERIENCES } from '../data';
import { Mail, Phone, MapPin, Sparkles, Send, GraduationCap, Briefcase, Plus, Minus } from 'lucide-react';

export default function ExperienceSection() {
  const [activeExpId, setActiveExpId] = useState<string | null>('exp-1');

  return (
    <div id="experience-section" className="space-y-16 lg:space-y-24">
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {PROFILE.stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 lg:p-8 bg-black/40 border border-white/10 text-center relative overflow-hidden group hover:border-cyan-400/40 transition-all duration-300"
          >
            {/* Top highlight indicator */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-cyan-400 transition-all duration-300" />
            
            <div className="text-3xl lg:text-5xl font-mono font-bold tracking-tight text-white mb-2">
              {stat.value}
            </div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Bio & Avatar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Avatar Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 relative"
        >
          {/* Decorative Backdrops */}
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -right-4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

          {/* Styled Avatar Wrapper with sharp corners & high-tech edge */}
          <div className="relative overflow-hidden border border-white/10 aspect-square bg-[#060714]/80 backdrop-blur-md group">
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Fine Gradient Shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060714] via-transparent to-transparent opacity-90" />
            
            {/* Overlaid Title Tag */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black/80 backdrop-blur-md text-[11px] font-mono font-semibold tracking-wider text-cyan-400 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                Duality of Craft: 2D Vector & 3D Space
              </span>
            </div>
          </div>

          {/* Quick Contacts Panel */}
          <div className="mt-8 bg-black/40 border border-white/10 p-6 space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-2">
              快速联络 / Connect Directly
            </h4>
            
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-3 text-zinc-300 hover:text-cyan-400 transition-colors duration-200 group"
              >
                <div className="w-8 h-8 bg-white/5 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all duration-200">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs">{PROFILE.email}</span>
              </a>

              <div className="flex items-center gap-3 text-zinc-300">
                <div className="w-8 h-8 bg-white/5 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs">{PROFILE.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-zinc-300">
                <div className="w-8 h-8 bg-white/5 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs">{PROFILE.location}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-white/5 text-zinc-300 text-[11px] font-mono flex items-center gap-1.5 border border-white/10">
                微信: {PROFILE.wechat}
              </span>
              <a
                href={`https://${PROFILE.behance}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-white/5 text-zinc-300 hover:text-black text-[11px] font-mono flex items-center gap-1.5 hover:bg-cyan-400 transition-all border border-white/10"
              >
                Behance
              </a>
            </div>
          </div>
        </motion.div>

        {/* Biography & Interactive Resume Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-10"
        >
          {/* Bio Intro */}
          <div className="space-y-4">
            <h3 className="text-3xl lg:text-4xl font-mono font-bold text-white tracking-tight leading-tight uppercase">
              打通“平面张力”与“次世代空间”的跨界创作者
            </h3>
            
            <p className="text-base text-zinc-300 leading-relaxed font-sans">
              我是 <span className="font-semibold text-white">{PROFILE.name}</span>。
              {PROFILE.bio}
            </p>

            <div className="text-xs text-zinc-400 italic bg-black/60 border-l-2 border-cyan-400 p-4 backdrop-blur-sm border-y border-r border-white/10">
              “对我而言，平面包装设计是寻找在二维空间里克制与材质的碰撞，而游戏地编则是在无限的三维容器中赋予光影、叙事、玩家引导温度的修行。”
            </div>
          </div>

          {/* Resume timeline container */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                履历探索 / Professional Journey
              </h4>
              <span className="text-xs text-zinc-500 font-mono">
                [ Click to Toggle Details ]
              </span>
            </div>

            <div className="space-y-4">
              {EXPERIENCES.map((exp) => {
                const isOpen = activeExpId === exp.id;
                const isEducation = exp.id === 'exp-3';
                
                return (
                  <div
                    key={exp.id}
                    className={`border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-cyan-400/30 bg-[#060714] shadow-xl backdrop-blur-lg'
                        : 'border-white/10 bg-black/20 hover:bg-black/40 hover:border-white/20'
                    }`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => setActiveExpId(isOpen ? null : exp.id)}
                      className="w-full text-left p-6 flex items-start gap-4 cursor-pointer justify-between"
                    >
                      <div className="flex gap-4">
                        {/* Bullet Icon */}
                        <div className={`mt-1 w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen ? 'bg-cyan-400 text-black' : 'bg-white/5 text-zinc-400'
                        }`}>
                          {isEducation ? (
                            <GraduationCap className="w-5 h-5" />
                          ) : (
                            <Briefcase className="w-5 h-5" />
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            <span className="text-xs font-mono font-semibold text-cyan-400/80">
                              {exp.period}
                            </span>
                            <span className="text-xs text-zinc-600 hidden sm:inline">|</span>
                            <span className="text-xs text-zinc-400 font-medium font-sans">
                              {exp.company}
                            </span>
                          </div>
                          
                          <h5 className="text-base lg:text-lg font-bold text-white mt-1 font-mono">
                            {exp.role}
                          </h5>
                        </div>
                      </div>

                      <div className="text-zinc-500 hover:text-cyan-400 transition-colors">
                        {isOpen ? <Minus className="w-4.5 h-4.5" /> : <Plus className="w-4.5 h-4.5" />}
                      </div>
                    </button>

                    {/* Expandable Body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-white/5"
                        >
                          <div className="p-6 bg-black/40 space-y-4 text-sm">
                            <p className="text-zinc-300 leading-relaxed font-sans">
                              {exp.description}
                            </p>

                            <div className="space-y-2.5">
                              <h6 className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider">
                                核心成果与职责 / Key Metrics & Accomplishments
                              </h6>
                              <ul className="space-y-2">
                                {exp.achievements.map((ach, idx) => (
                                  <li key={idx} className="flex gap-2 text-zinc-300 leading-relaxed text-xs">
                                    <span className="text-cyan-400 shrink-0 select-none">✦</span>
                                    <span>{ach}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
