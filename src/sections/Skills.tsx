import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Brain } from 'lucide-react';

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export const Skills: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: <Layout className="w-5 h-5 text-black dark:text-white" />,
      skills: [
        { name: 'Python' },
        { name: 'C++' },
        { name: 'SQL' },
        { name: 'JavaScript' }
      ]
    },
    {
      title: 'Data Engineering',
      icon: <Server className="w-5 h-5 text-black dark:text-white" />,
      skills: [
        { name: 'Data Ingestion Pipelines' },
        { name: 'ETL/ELT' },
        { name: 'Kafka' },
        { name: 'Apache Spark' },
        { name: 'Big Data Processing' }
      ]
    },
    {
      title: 'AI/ML',
      icon: <Database className="w-5 h-5 text-black dark:text-white" />,
      skills: [
        { name: 'LLMs' },
        { name: 'RAG' },
        { name: 'Hugging Face Transformers' },
        { name: 'PyTorch' },
        { name: 'TensorFlow' },
        { name: 'Scikit-learn' },
        { name: 'Generative AI' },
        { name: 'Agentic AI' },
        { name: 'Deep Learning' }
      ]
    },
    {
      title: 'Backend & APIs',
      icon: <Database className="w-5 h-5 text-black dark:text-white" />,
      skills: [
        { name: 'FastAPI' },
        { name: 'Flask' },
        { name: 'REST APIs' },
        { name: 'API Integration' }
      ]
    },
    {
      title: 'Databases',
      icon: <Database className="w-5 h-5 text-black dark:text-white" />,
      skills: [
        { name: 'MySQL' },
        { name: 'MongoDB' },
        { name: 'PostgreSQL' },
        { name: 'Redis' },
        { name: 'SQLite' }
      ]
    },
    {
      title: 'Cloud / Tools',
      icon: <Brain className="w-5 h-5 text-black dark:text-white" />,
      skills: [
        { name: 'AWS' },
        { name: 'Databricks' },
        { name: 'Git' },
        { name: 'Linux' },
        { name: 'Power BI' },
        { name: 'Streamlit' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-28 bg-white dark:bg-black text-black dark:text-white relative transition-colors duration-500 overflow-hidden">
      {/* Blueprint grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="mb-20 text-center md:text-left select-none">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-8 text-black dark:text-white uppercase leading-none">
            Skills & <span className="text-zinc-500 dark:text-zinc-400">Expertise</span>
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white mt-6" />
        </div>

        {/* 4 Column Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl hover:border-black dark:hover:border-white transition-all shadow-md group select-text hover:shadow-[4px_4px_0px_0px_#000000] dark:hover:shadow-[4px_4px_0px_0px_#ffffff]"
            >
              {/* Category Title & Icon */}
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-900">
                <div className="p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-lg group-hover:scale-110 transition-all shadow-sm">
                  {cat.icon}
                </div>
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-black dark:text-zinc-200">
                  {cat.title}
                </h3>
              </div>

              {/* Minimal Tag List - No Percentages or Horizontal Bars */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[11px] font-mono font-medium tracking-wide hover:border-black dark:hover:border-white transition-all shadow-sm cursor-default select-text"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
