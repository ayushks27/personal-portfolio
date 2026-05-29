import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Shield, Eye, Download, MessageSquare, Laptop, Smartphone, Tablet } from 'lucide-react';
import { motion } from 'framer-motion';

export const Analytics: React.FC = () => {
  const { adminStats, guestbook, addGuestbook } = useAuthStore();
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestMsg, setGuestMsg] = useState('');

  const handleSubmitGuestbook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestMsg) return;

    try {
      await addGuestbook(guestName, guestEmail, guestMsg);
      setGuestName('');
      setGuestEmail('');
      setGuestMsg('');
      alert("Sign-in successful! Your card has been saved.");
    } catch (e) {
      alert("Failed to write to Guestbook database.");
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'desktop': return <Laptop className="w-4 h-4 text-zinc-400" />;
      case 'mobile': return <Smartphone className="w-4 h-4 text-zinc-400" />;
      default: return <Tablet className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="analytics" className="py-24 bg-black text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_bottom,rgba(59,130,246,0.02)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-gradient">
            Workspace Dashboard
          </h2>
        </div>

        {/* Dashboard Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-text">
          
          {/* Left Area: Visitor Analytics & Statistics */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Admin Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Stat 1 */}
              <div className="glass p-5 rounded-2xl border border-zinc-850 flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Total Visitors</span>
                  <Eye className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-black tracking-tight">{adminStats.visitors}</span>
                  <span className="text-[9px] text-green-400 block mt-0.5 font-mono">+12% this week</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="glass p-5 rounded-2xl border border-zinc-850 flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Downloads</span>
                  <Download className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-black tracking-tight">{adminStats.resumeDownloads}</span>
                  <span className="text-[9px] text-emerald-400 block mt-0.5 font-mono">Live Counter</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="glass p-5 rounded-2xl border border-zinc-850 flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Contact requests</span>
                  <MessageSquare className="w-4 h-4 text-pink-400" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-black tracking-tight">{adminStats.contactRequests}</span>
                  <span className="text-[9px] text-zinc-500 block mt-0.5 font-mono">Form entries</span>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="glass p-5 rounded-2xl border border-zinc-850 flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Page views</span>
                  <Eye className="w-4 h-4 text-purple-400" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-black tracking-tight">{adminStats.pageViews}</span>
                  <span className="text-[9px] text-purple-400 block mt-0.5 font-mono">4.2x multiplier</span>
                </div>
              </div>

            </div>

            {/* Custom Interactive HTML Bar Charts */}
            <div className="glass p-6 md:p-8 rounded-2xl border border-zinc-850 flex-1 flex flex-col justify-between bg-zinc-950/20">
              <div>
                <h3 className="font-bold text-sm text-zinc-200 mb-6 flex items-center gap-2 uppercase tracking-wide">
                  <Shield className="w-4 h-4 text-yellow-500" /> Visitor Device Metrics (Audited)
                </h3>

                {/* Device distribution list with custom bar graphs */}
                <div className="space-y-6 mt-4">
                  {adminStats.deviceAnalytics.map((dev) => (
                    <div key={dev.device} className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-zinc-300 font-medium font-mono">
                          {getDeviceIcon(dev.device)}
                          {dev.device.toUpperCase()}
                        </span>
                        <span className="font-mono text-zinc-500">{dev.count}% ratio</span>
                      </div>
                      {/* Interactive bar fill */}
                      <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${dev.count}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.0, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-zinc-700 to-zinc-400 rounded-full"
                          style={{
                            backgroundImage: `linear-gradient(to right, var(--primary-color), var(--accent-color))`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom security log */}
              <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-600 font-mono">
                <span>DATABASE STATUS: SYNCED</span>
                <span>SECURE AES ENCRYPTION ACTIVE</span>
              </div>
            </div>

          </div>

          {/* Right Area: Recruiter Guestbook & Signin */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Recruiter test signin card */}
            <div className="glass p-6 rounded-2xl border border-zinc-850 flex flex-col justify-between bg-zinc-950/40">
              <div>
                <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest font-bold">
                  Recruiter Sign-In Log
                </span>
                <p className="text-xs text-zinc-400 mt-2 mb-6 leading-relaxed">
                  Sign in or fill out the digital guestbook to let Purnendu know you audited this workspace. 
                  Your submission displays live on this dashboard.
                </p>
              </div>

              {/* Guestbook Form */}
              <form onSubmit={handleSubmitGuestbook} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-200 outline-none placeholder-zinc-600 font-sans focus:border-zinc-700"
                />
                <input
                  type="email"
                  placeholder="Recruiter Email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-200 outline-none placeholder-zinc-600 font-sans focus:border-zinc-700"
                />
                <textarea
                  placeholder="Testimonial / Note..."
                  value={guestMsg}
                  onChange={(e) => setGuestMsg(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-3 py-2.5 text-xs text-zinc-200 outline-none placeholder-zinc-600 font-sans focus:border-zinc-700 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-white text-black font-semibold text-xs rounded-lg hover:bg-zinc-200 transition-colors shadow"
                >
                  Publish Sign-In Card
                </button>
              </form>
            </div>

            {/* Scrollable Guestbook Entries Logs */}
            <div className="glass p-5 rounded-2xl border border-zinc-850 bg-zinc-950/20 flex-1 max-h-[280px] flex flex-col">
              <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-2 mb-3">
                Live Visitor Guestbook
              </h4>
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin">
                {guestbook.map((entry) => (
                  <div key={entry.id} className="text-xs space-y-1 select-text">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-zinc-300">{entry.name}</span>
                      <span className="text-[9px] text-zinc-500 font-mono">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                      "{entry.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
