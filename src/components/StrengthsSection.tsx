import { motion } from 'motion/react';
import { STRENGTHS } from '../data';
import { Box, Sparkles, Layout, CheckCircle } from 'lucide-react';

const iconMap: Record<string, any> = {
  Box: Box,
  Sparkles: Sparkles,
  Layout: Layout,
};

export default function StrengthsSection() {
  return (
    <div id="strengths-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {STRENGTHS.map((strength, index) => {
        const IconComponent = iconMap[strength.iconName] || Sparkles;
        
        return (
          <motion.div
            key={strength.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            className="p-8 lg:p-10 bg-black/40 border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:bg-black/60 hover:border-cyan-400/40 transition-all duration-500 rounded-none"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400/20 to-transparent group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-500" />

            <div>
              {/* Dynamic Icon */}
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 rounded-none">
                <IconComponent className="w-5 h-5" />
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-mono font-bold text-white mb-4 tracking-tight uppercase">
                {strength.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-8">
                {strength.desc}
              </p>
            </div>

            {/* Capability sub-items */}
            <div className="space-y-2.5 pt-6 border-t border-white/5">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold mb-1">
                专业子项 / Specialized Skills
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {strength.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-xs text-zinc-300 font-sans"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
