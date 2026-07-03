import { motion } from 'motion/react';
import { UNIVERSITY_PROJECTS } from '../data';
import { Calendar, Tag } from 'lucide-react';

export default function OtherWorks() {
  return (
    <div id="other-works-section" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {UNIVERSITY_PROJECTS.map((proj, index) => (
        <motion.div
          key={proj.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group bg-black/40 border border-white/10 rounded-none overflow-hidden hover:border-cyan-400/40 transition-all duration-500 relative flex flex-col justify-between"
        >
          {/* Work Image */}
          <div>
            <div className="relative aspect-4/3 overflow-hidden bg-zinc-900">
              <img
                src={proj.image}
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
              />
              {/* Year label top right */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-2.5 py-1 text-[9px] font-mono rounded-none bg-cyan-400 text-black font-bold shadow-sm border border-white/10 tracking-widest">
                  {proj.year}
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-6">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px] mb-2 uppercase tracking-widest">
                <Tag className="w-3 h-3 text-cyan-400" />
                <span>{proj.category}</span>
              </div>

              <h4 className="text-base font-bold text-white font-mono transition-colors duration-200 leading-snug group-hover:text-cyan-400">
                {proj.title}
              </h4>

              <p className="text-zinc-300 text-xs mt-3 leading-relaxed">
                {proj.description}
              </p>
            </div>
          </div>

          {/* Academic badge foot */}
          <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <span>院系优秀成果评选</span>
            <span>ACADEMIC WORK</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
