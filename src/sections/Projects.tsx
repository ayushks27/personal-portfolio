import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Data Engineering' | 'Backend' | 'AI/ML' | 'Data Analytics' | 'Frontend' | 'Full Stack';
  tags: string[];
  github: string;
  live: string;
  aestheticColor: string; // Dynamic glow color for card
}

export const Projects: React.FC = () => {
  const { favorites, toggleFavorite } = useAuthStore();
  const [filter, setFilter] = useState<'All' | 'Data Engineering' | 'Backend' | 'AI/ML' | 'Data Analytics' | 'Full Stack'>('All');

  const projects: Project[] = [
    {
      id: 'p1',
      title: 'Orqix',
      description: 'AI-native distributed ML experiment orchestration platform featuring experiment tracking, workflow scheduling, lineage management, model registry, intelligent resource allocation, and AI-powered failure diagnostics.',
      category: 'AI/ML',
      tags: ['Python', 'Nextjs', 'FastAPI', 'Kafka', 'Docker', 'Redis'],
      github: 'https://github.com/ayushks27/orqix',
      live: 'https://orqix.vercel.app/',
      aestheticColor: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'p2',
      title: 'Chroniq',
      description: 'Chroniq transforms historical energy consumption data into actionable grid intelligence through machine learning-powered forecasting, uncertainty quantification, peak stress event detection, and interactive analytics for modern power systems.',
      category: 'Data Engineering',
      tags: ['Python', 'ARIMA', 'LSTM', 'HTML', 'XGBoost'],
      github: 'https://github.com/ayushks27/chroniq',
      live: 'https://ayushks27.github.io/chroniq/',
      aestheticColor: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'p3',
      title: 'Reverie',
      description: 'Reverie is a private, offline-first digital memory platform that transforms memories, letters, milestones, and future goals into a cinematic experience through interactive timelines, vision boards, future-dated content, and personalized storytelling, powered entirely by browser-based storage and authentication.',
      category: 'Full Stack',
      tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Framer Motion'],
      github: 'https://github.com/ayushks27/reverie',
      live: 'https://reverie227.netlify.app/',
      aestheticColor: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'p4',
      title: 'Ingestra',
      description: 'Designed and implemented an end-to-end data ingestion and analytics pipeline, handling raw CSV ingestion, schema normalization, relational storage, and downstream analytical querying using SQLite.',
      category: 'Data Engineering',
      tags: ['Python', 'SQLite', 'Streamlit', 'Data Pipeline'],
      github: 'https://github.com/ayushks27/Ingestra',
      live: 'https://ingestra-r2kg3ympsfqguhundbbyod.streamlit.app/',
      aestheticColor: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'p5',
      title: 'AutoStream',
      description: 'Developed a stateful GenAI-powered conversational agent that classifies user intent, retrieves product knowledge via RAG, and manages multi-turn lead qualification with safe backend tool execution.',
      category: 'AI/ML',
      tags: ['Python', 'GenAI', 'RAG', 'Agentic Workflow'],
      github: 'https://github.com/ayushks27/social-to-lead-agentic-workflow',
      live: 'https://github.com/ayushks27/social-to-lead-agentic-workflow',
      aestheticColor: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'p6',
      title: 'Uber Ride Cancellation Analysis',
      description: 'Built predictive models using Logistic Regression, Random Forest, and XGBoost on highly imbalanced operational data, achieving an ROC-AUC of 0.864 and 93.7% recall for cancellation prediction.',
      category: 'Data Analytics',
      tags: ['Python', 'XGBoost', 'Predictive Modeling', 'Random Forest'],
      github: 'https://github.com/ayushks27/uber-ride-cancellation-prediction',
      live: 'https://github.com/ayushks27/uber-ride-cancellation-prediction',
      aestheticColor: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'p7',
      title: 'DRRAS',
      description: 'Developed a disaster rescue management system using C++ and advanced data structures, enabling efficient route optimization, resource management, and real-time emergency response in dynamically changing environments.',
      category: 'Backend',
      tags: ['C++', 'Graphs', 'Priority Queue', 'Dynamic Programming'],
      github: 'https://github.com/ayushks27/drras',
      live: 'https://github.com/ayushks27/drras',
      aestheticColor: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'p8',
      title: 'Minor Project: Topic Modeling',
      description: 'Built an end-to-end topic modeling pipeline comparing LDA and BERTopic using coherence and diversity metrics for temporal research analysis.',
      category: 'AI/ML',
      tags: ['Python', 'LDA', 'BERTopic', 'Topic Modeling'],
      github: 'https://github.com/ayushks27',
      live: 'https://github.com/ayushks27',
      aestheticColor: 'rgba(255, 255, 255, 0.2)'
    }
  ];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  const categories: ('All' | 'Data Engineering' | 'Backend' | 'AI/ML' | 'Data Analytics')[] = [
    'All', 'Data Engineering', 'Backend', 'AI/ML', 'Data Analytics'
  ];

  return (
    <section id="projects" className="py-24 bg-black text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.015)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-8 text-black dark:text-white uppercase leading-none">
            PROJECT <span className="text-zinc-500 dark:text-zinc-400">GALLERY</span>
          </h2>
        </div>

        {/* Categories Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-12 border-b border-zinc-900">
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${isActive
                  ? 'bg-white text-black scale-105 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Apple-style Projects Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => {
              const isFav = favorites.includes(proj.id);
              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-2xl overflow-hidden flex flex-col border border-zinc-800 group select-text hover:border-zinc-600 transition-colors"
                  style={{ boxShadow: `0 8px 30px rgba(0,0,0,0.5)` }}
                >
                  {/* Body Info */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      {/* Title & Bookmark trigger */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-bold text-base text-zinc-100 group-hover:text-white transition-colors">
                          {proj.title}
                        </h3>
                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(proj.id);
                          }}
                          className={`p-1.5 rounded-lg border transition-colors ${isFav
                            ? 'bg-zinc-900 border-zinc-700 text-yellow-500'
                            : 'bg-transparent border-zinc-850 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800'
                            }`}
                          title={isFav ? 'Remove Favorite' : 'Save/Bookmark Project'}
                        >
                          {isFav ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Tech Category badge */}
                      <span className="inline-block text-[9px] font-mono font-bold tracking-widest text-zinc-500 uppercase mb-3">
                        {proj.category}
                      </span>

                      {/* Summary text */}
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tags and CTA Links */}
                    <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center justify-between gap-4">
                      {/* Stacks tags list */}
                      <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                        {proj.tags.map(t => (
                          <span key={t} className="text-[9px] font-mono bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded text-zinc-400">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Quick external links */}
                      <div className="flex items-center gap-3">
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors flex items-center justify-center"
                          title="View source code on GitHub"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                          </svg>
                        </a>
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                          title="Launch live interactive site demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
