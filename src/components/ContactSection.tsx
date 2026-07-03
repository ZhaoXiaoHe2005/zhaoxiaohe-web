import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Send, Check, AlertCircle, RefreshCw, FileText, Globe } from 'lucide-react';
import { PROFILE } from '../data';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role: 'packaging', // 'packaging' | 'level' | 'both'
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentMessagesCount, setSentMessagesCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus('error');
      setErrorMessage('请填写所有必填字段哦！');
      return;
    }

    setStatus('sending');

    // Simulate sending message
    setTimeout(() => {
      setStatus('success');
      setSentMessagesCount((prev) => prev + 1);
      // Reset form
      setFormState({
        name: '',
        email: '',
        role: 'packaging',
        message: '',
      });
    }, 1500);
  };

  return (
    <div id="contact-section" className="min-h-[90vh] flex flex-col justify-between py-12 lg:py-20 bg-[#060714] text-white rounded-none -mx-4 sm:-mx-6 lg:-mx-16 px-6 sm:px-12 lg:px-16 relative overflow-hidden border-t border-white/5">
      {/* Dynamic dark meshes in background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,63,229,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-cyan-950/20 rounded-none blur-3xl opacity-20 pointer-events-none" />

      {/* Main Grid content */}
      <div className="container-xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center my-auto relative z-10 w-full">
        {/* Left column: giant typography & contacts */}
        <div className="lg:col-span-6 space-y-8 lg:space-y-12">
          <div className="space-y-4">
            <span className="px-3.5 py-1 text-[10px] rounded-none bg-white/5 text-cyan-400 font-mono uppercase tracking-[0.2em] font-bold border border-cyan-400/30">
              NEXT CHAPTER
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-mono font-bold leading-[1.1] tracking-tight uppercase text-white">
              期待与您
              <br />
              <span className="text-cyan-400">共同缔造</span>
              <br />
              非凡视觉空间.
            </h2>
          </div>

          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-lg font-sans">
            不论您是寻求极具材质质感与商业洞察的包装全案，还是需要规划虚幻引擎下的中大型次世代游戏关卡地编，我都能提供全流程的创意支持。
          </p>

          {/* Socials & Download */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-none bg-black/40 border border-white/10 backdrop-blur-md">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500">发送邮件</span>
                  <a href={`mailto:${PROFILE.email}`} className="text-xs font-mono font-medium hover:text-cyan-400 transition-colors">
                    {PROFILE.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-none bg-black/40 border border-white/10 backdrop-blur-md">
                <Phone className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500">直接通话</span>
                  <span className="text-xs font-mono font-medium text-zinc-300">{PROFILE.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3.5 py-1.5 rounded-none bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono">
                微信: {PROFILE.wechat}
              </span>
              <span className="px-3.5 py-1.5 rounded-none bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono">
                地址: {PROFILE.location}
              </span>
              <a
                href={`https://${PROFILE.behance}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-none bg-white/5 border border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-400/10 text-cyan-400 text-[11px] font-mono transition-colors"
              >
                Behance 作品集 ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Interactive form */}
        <div className="lg:col-span-6 bg-black/40 p-8 sm:p-10 rounded-none border border-white/10 backdrop-blur-xl relative">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-cyan-400 text-black rounded-none flex items-center justify-center mx-auto shadow-lg border border-cyan-400">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-mono font-bold text-white uppercase tracking-tight">
                    消息发送成功！
                  </h3>
                  <p className="text-zinc-300 text-xs max-w-sm mx-auto leading-relaxed">
                    非常感谢您的联系！我已经收到了您的需求，将在 24 小时内（或工作日内）通过邮件给您答复。
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    id="btn-form-reset"
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-cyan-400 text-black font-mono font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer border border-cyan-400"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                    再次发送留言
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="active-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-mono font-bold text-white uppercase tracking-tight">
                    留言预约 / Creative Inquiry
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1">
                    留下您的创意想法，我们即刻开启讨论！
                  </p>
                </div>

                {status === 'error' && (
                  <div className="p-4 rounded-none bg-red-950/40 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider">
                      您的姓名 / Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="如何称呼您"
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-none text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-600 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider">
                      您的邮箱 / Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="example@domain.com"
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-none text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-600 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-mono font-bold block uppercase tracking-wider">
                    意向合作板块 / Desired Service
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'packaging', label: '包装与平面' },
                      { key: 'level', label: '关卡地编美术' },
                      { key: 'both', label: '全案跨界合作' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setFormState({ ...formState, role: item.key })}
                        className={`py-2 px-1 text-center rounded-none text-xs font-medium transition-all cursor-pointer ${
                          formState.role === item.key
                            ? 'bg-cyan-400 text-black font-bold border-cyan-400'
                            : 'bg-black/30 hover:bg-black/50 text-zinc-400 border border-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form-message" className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider">
                    项目构想或详情 / Project Description <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="请描述您的设计构想、预算规划或合作周期..."
                    className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-none text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-600 resize-none text-white font-mono"
                  />
                </div>

                <button
                  id="btn-form-submit"
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-none bg-cyan-400 hover:bg-cyan-300 disabled:bg-zinc-800 text-black font-bold uppercase text-[10px] tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-cyan-400"
                >
                  {status === 'sending' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      消息打包发送中...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      投递创意简报
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Meta Credits */}
      <div className="container-xl border-t border-white/10 mt-16 lg:mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-zinc-500 w-full tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-zinc-600" />
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
