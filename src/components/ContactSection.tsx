import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';
import { PROFILE } from '../data';

export default function ContactSection() {
  return (
    <div id="contact-section" className="py-24 lg:py-36 bg-[#060714] text-white rounded-none -mx-4 sm:-mx-6 lg:-mx-16 px-6 sm:px-12 lg:px-16 relative overflow-hidden border-t border-white/5 flex flex-col justify-between">
      {/* Dynamic ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(163,230,53,0.03),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,63,229,0.03),transparent_50%)] pointer-events-none" />

      {/* Main Centered Content */}
      <div className="max-w-4xl mx-auto text-center space-y-16 py-12 relative z-10 w-full flex flex-col items-center justify-center">
        
        {/* Monospace Tech Badge */}
        <span className="px-3.5 py-1 text-[10px] rounded-none bg-white/5 text-lime-400 font-mono uppercase tracking-[0.2em] font-bold border border-lime-400/20">
          GET IN TOUCH / 建立连接
        </span>

        {/* The Hero "CONTACT ME" with Hand-drawn Oval and Arrow */}
        <div className="relative inline-block py-4 px-8 select-none group">
          {/* Hand-drawn loop overlay using the organic SVG curve */}
          <svg 
            className="absolute -inset-x-8 -inset-y-4 w-[115%] h-[125%] pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 stroke-lime-400 fill-none opacity-85 group-hover:opacity-100 transition-opacity duration-300"
            viewBox="0 0 100 40" 
            preserveAspectRatio="none"
          >
            <path 
              d="M 10 20 C 10 8, 90 4, 90 20 C 90 36, 10 32, 10 20 C 8 16, 40 38, 85 34" 
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Large text link */}
          <a 
            href={`mailto:${PROFILE.email}`}
            className="relative z-10 flex items-center justify-center gap-4 text-white text-4xl sm:text-6xl md:text-7xl font-sans font-light tracking-widest uppercase transition-all duration-300 hover:text-lime-300"
          >
            CONTACT ME
            <span className="text-3xl sm:text-5xl md:text-6xl font-light font-mono translate-y-[-0.05em] inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
              ↗
            </span>
          </a>
        </div>

        {/* Dynamic primary email link styled beautifully to resemble the image's subtitle line */}
        <div className="space-y-2">
          <a 
            href={`mailto:${PROFILE.email}`}
            className="text-zinc-400 hover:text-white font-mono text-sm sm:text-base tracking-[0.2em] transition-all duration-300 hover:tracking-[0.25em]"
          >
            {PROFILE.email}
          </a>
          <p className="text-zinc-600 text-[10px] sm:text-xs font-mono uppercase tracking-widest pt-2">
            [ 跨媒介交互与视觉设计作品集 • 2026 ]
          </p>
        </div>

        {/* Responsive, Minimalist Contacts Matrix */}
        <div className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/5 text-center">
          <div className="space-y-1">
            <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-widest">微信 / WECHAT</span>
            <span className="text-xs font-mono text-zinc-300 hover:text-lime-300 transition-colors">{PROFILE.wechat}</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-widest">电话 / PHONE</span>
            <span className="text-xs font-mono text-zinc-300">{PROFILE.phone}</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-widest">城市 / CITY</span>
            <span className="text-xs font-mono text-zinc-300">{PROFILE.location}</span>
          </div>
          <div className="space-y-1">
            <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-widest">作品站 / PORTFOLIO</span>
            <a 
              href={`https://${PROFILE.behance}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-mono text-cyan-400 hover:text-lime-300 transition-colors underline decoration-cyan-400/30 hover:decoration-lime-300/30 underline-offset-4"
            >
              Behance ↗
            </a>
          </div>
        </div>

      </div>

      {/* Footer Meta Credits */}
      <div className="container-xl border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono text-zinc-600 w-full tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-zinc-700" />
          <span>© {new Date().getFullYear()} ZHAO XIAOHE. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex gap-4">
          <span>BUILT WITH REACT + TAILWIND V4</span>
          <span>•</span>
          <span>PC OPTIMIZED (1700PX)</span>
        </div>
      </div>
    </div>
  );
}
