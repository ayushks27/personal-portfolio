import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface Position {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  skills: string[];
  metrics: { label: string; value: string }[];
}

export const Experience: React.FC = () => {
  const positions: Position[] = [
    {
      role: 'Software Intern',
      company: 'CodeAlpha',
      period: 'March 2025 - April 2025',
      bullets: [
        'Developed a console-based banking system with account creation, deposits, withdrawals, and balance management using object-oriented programming (OOP) and modular design, reducing transaction errors by 20%.',
        'Collaborated with senior advisors in an Agile environment to develop a user authentication system with account provisioning, secure login, email verification, cutting errors by 15% and raising success rate to 95%.'
      ],
      skills: ['C++', 'Software Development', 'Agile Methodology'],
      metrics: []
    },
    {
      role: 'Data Science Intern',
      company: 'Corizo',
      period: 'February 2024 - April 2024',
      bullets: [
        'Developed a KNN-based stock prediction pipeline with feature engineering and model tuning to generate buy-sell signals and assess trading accuracy using historical price data.',
        'Built Cinelytics, focusing on processing and analyzing high-volume movie data to generate data-driven business insights on profitability, popularity drivers, genre trends, and revenue behavior.'
      ],
      skills: ['Python', 'C++', 'KNN', 'Stock Prediction', 'Data Analysis', 'Feature Engineering'],
      metrics: []
    },
    {
      role: 'Creative Head & Team Volunteer',
      company: 'Parola – The Literary Hub',
      period: 'July 2024 - June 2026',
      bullets: [
        'Led and mentored the creative design team, executing large-scale flagship events including Model United Nations (MUN) at The JOUST.',
        'Collaborated with cross-functional hub teams to deliver impactful art assets and cohesive event designs for major literary gatherings.'
      ],
      skills: ['Team Leadership', 'Art Direction', 'Event Branding', 'Cross-functional Collaboration'],
      metrics: []
    }
  ];

  return (
    <section id="experience" className="py-28 bg-white dark:bg-black text-black dark:text-white relative transition-colors duration-500 overflow-hidden">
      {/* Blueprint grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="mb-20 text-center md:text-left select-none">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-8 text-black dark:text-white uppercase leading-none">
            Experience <span className="text-zinc-500 dark:text-zinc-400">Timeline</span>
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white mt-6" />
        </div>

        {/* Vertical timeline track */}
        <div className="space-y-12 max-w-7xl select-text">
          {positions.map((pos, idx) => (
            <motion.div
              key={pos.role + pos.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.12 }}
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-start hover:border-black dark:hover:border-white transition-all shadow-md hover:shadow-[4px_4px_0px_0px_#000000] dark:hover:shadow-[4px_4px_0px_0px_#ffffff] group"
            >
              {/* Left Column: Job Roles metadata */}
              <div className={`space-y-4 ${pos.metrics.length > 0 ? 'md:max-w-[65%]' : 'w-full'}`}>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                    {pos.period}
                  </span>
                  <h3 className="font-black text-lg text-black dark:text-zinc-100 mt-1.5 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-black dark:text-white shrink-0 animate-pulse" />
                    {pos.role}
                  </h3>
                  <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                    {pos.company}
                  </h4>
                </div>

                {/* Bullets descriptions */}
                <ul className="space-y-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 pl-4 list-disc marker:text-zinc-350 dark:marker:text-zinc-650 leading-relaxed">
                  {pos.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {pos.skills.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-full text-[10px] font-mono text-zinc-700 dark:text-zinc-300 font-bold shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Dynamic performance counters */}
              {pos.metrics.length > 0 && (
                <div className="flex flex-row md:flex-col gap-6 w-full md:w-auto border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 pt-6 md:pt-0 md:pl-8 self-stretch justify-around md:justify-center">
                  {pos.metrics.map(met => (
                    <div key={met.label} className="text-center md:text-left select-none">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                        {met.label}
                      </span>
                      <span className="text-2xl font-black text-black dark:text-white tracking-tight uppercase">
                        {met.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
