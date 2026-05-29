import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatarSeed: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Connor',
      role: 'Principal Recruiter at NetTech',
      text: 'The absolute smoothest portfolio experience I have encountered. The Web Audio synth and console terminal integrations are a masterpiece.',
      avatarSeed: 'sarah'
    },
    {
      name: 'John Miller',
      role: 'Lead Architect at CloudCore',
      text: 'Purnendu demonstrated mastery over 3D R3F environments and system-wide keyboard synchronization. Recruiting him was an immediate yes!',
      avatarSeed: 'john'
    },
    {
      name: 'Elena Rostova',
      role: 'Talent Acquisition at Vercel',
      text: 'Outstanding minimalist visual branding. Responsive, production-ready coding, and the interactive analytics dashboard is brilliant.',
      avatarSeed: 'elena'
    }
  ];

  // Duplicate testimonials array to create a seamless infinite loop scrolling effect
  const doubleList = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 bg-black text-white relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_center,rgba(255,0,127,0.01)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-gradient">
            Testimonials
          </h2>
        </div>

        {/* Infinite Scrolling Horizontal Track */}
        <div className="flex w-full overflow-hidden relative py-4 mask-gradient">
          
          {/* Fading side visual overlays */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Autoplay Slide motion div */}
          <motion.div
            animate={{ x: [0, -1140] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: 'linear'
            }}
            className="flex gap-6 w-max"
          >
            {doubleList.map((test, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[380px] glass p-6 rounded-2xl flex flex-col justify-between border border-zinc-850 hover:border-zinc-800 transition-colors bg-zinc-950/40 select-text"
              >
                <div>
                  <Quote className="w-6 h-6 text-zinc-700 mb-4" />
                  <p className="text-zinc-300 text-sm italic leading-relaxed">
                    "{test.text}"
                  </p>
                </div>

                {/* User Info details */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-zinc-900">
                  <img
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${test.avatarSeed}`}
                    alt={test.name}
                    className="w-8 h-8 rounded-full border border-zinc-800"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200">{test.name}</h4>
                    <span className="text-[10px] font-mono text-zinc-500">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
