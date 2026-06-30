import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  category: 'experience' | 'education' | 'achievement';
}

export const About: React.FC = () => {
  const images = [
    '/stmli.png',
    '/cori.png',
    '/parolai.png',
    '/stmli.png' // Clone of the first image at the end for seamless infinite forward slide
  ];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitionEnabled(true);
      setCurrentImgIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle seamless silent jump back to index 0 after sliding to the clone (index 3)
  useEffect(() => {
    if (currentImgIndex === 3) {
      const timeout = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentImgIndex(0);
      }, 700); // Wait exactly 700ms for slide animation to complete
      return () => clearTimeout(timeout);
    }
  }, [currentImgIndex]);

  const timeline: TimelineItem[] = [
    {
      year: '2023 - 2027',
      title: 'B.Tech. Computer Science & Engineering',
      company: 'Jaypee Institute of Information Technology, Noida',
      description: 'Acquiring deep foundations in database systems, design patterns, algorithms, and computing systems. Current CGPA: 7.56 / 10.',
      category: 'education'
    },
    {
      year: 'Jul 2026 - Jun 2027',
      title: 'SDE Intern',
      company: 'STMicroelectronics (T&RD Department)',
      description: 'Internship in the Technology & Research and Development department at STMicroelectronics, contributing to cutting-edge engineering solutions.',
      category: 'experience'
    },
    {
      year: 'Jul 2025 - Jun 2026',
      title: 'Creative Head',
      company: 'Parola – The Literary Hub',
      description: 'Led and mentored the creative design team, executing major flagship campus events including Model United Nations (MUN) at The JOUST.',
      category: 'achievement'
    },
    {
      year: 'Mar 2025 - Apr 2025',
      title: 'Software Intern',
      company: 'CodeAlpha',
      description: 'Built a console-based banking system with secure authentication and transaction management using OOP and Agile practices, reducing errors by 20% and achieving 95% login success.',
      category: 'experience'
    },
    {
      year: 'Feb 2024 - Apr 2024',
      title: 'Data Science Intern',
      company: 'Corizo',
      description: 'Developed stock prediction models using KNN and completed Cinelytics analysis of high-volume movie datasets to extract revenue and popularity insights.',
      category: 'experience'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  } as const;

  const getTimelineIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <GraduationCap className="w-4 h-4 text-white" />;
      case 'achievement':
        return <Trophy className="w-4 h-4 text-white" />;
      default:
        return <Briefcase className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background visual grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.03)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-8 text-black dark:text-white uppercase leading-none">
            About & <span className="text-zinc-500 dark:text-zinc-400">Chronology</span>
          </h2>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Interactive Timeline List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Architecting reliable pipelines & scalable analytics.
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl select-text">
                I am Purnendu Raghav Srivastava, a Software and Data Engineer passionate about building scalable applications, robust data pipelines, and data-driven solutions. I enjoy developing reliable backend systems and transforming data into actionable insights.
              </p>
            </div>

            {/* Timeline Vertical Stack */}
            <div className="border-l border-zinc-800 ml-4 space-y-6 mt-8">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative pl-8 select-text group"
                >
                  {/* Pin Dot */}
                  <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center group-hover:border-zinc-500 transition-colors">
                    {getTimelineIcon(item.category)}
                  </div>

                  {/* Year Tag */}
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-0.5">
                    {item.year}
                  </span>

                  {/* Job/School Title */}
                  <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
                    {item.title} <span className="text-zinc-600 font-normal">|</span> <span className="text-zinc-400 font-medium">{item.company}</span>
                  </h4>

                  {/* Summary */}
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Premium Image Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full rounded-2xl border border-zinc-800 glass relative overflow-hidden shadow-2xl h-[450px] md:h-[480px] flex items-center justify-center group"
          >
            {/* Horizontal Flex Wrapper for sliding transition effect */}
            <div
              className={`absolute inset-0 w-full h-full flex z-10 ${isTransitionEnabled
                ? 'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
                : ''
                }`}
              style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}
            >
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Purnendu Raghav Srivastava Slide ${idx + 1}`}
                  className="w-full h-full object-cover object-top block flex-shrink-0"
                />
              ))}
            </div>

            {/* Premium Progress Indicators (dots) at the bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {[0, 1, 2].map((idx) => {
                const isDotActive = currentImgIndex === idx || (currentImgIndex === 3 && idx === 0);
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsTransitionEnabled(true);
                      setCurrentImgIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${isDotActive
                      ? 'bg-white w-6'
                      : 'bg-white/40 hover:bg-white/70'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Subtle dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
