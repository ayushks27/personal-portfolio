import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowUpRight, X, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown supported
  date: string;
  category: 'Software Engineering' | 'Design Systems' | 'AI & ML';
  tags: string[];
}

export const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Software Engineering' | 'Design Systems' | 'AI & ML'>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: 'b1',
      title: 'Building Procedural Ambient Synths in Browser',
      excerpt: 'How we used the Web Audio API to create zero-bandwidth space ambient soundscapes that load instantly and work completely offline.',
      date: '2026-05-18',
      category: 'Software Engineering',
      tags: ['Web Audio API', 'Oscillators', 'Creative Coding'],
      content: `
# Building Procedural Ambient Synths in Browser

In high-end digital portfolio designs inspired by Linear and Apple, every element should feel **responsive** and **alive**. Sound is an extremely powerful medium for establishing a cohesive user experience, but embedding massive MP3 assets degrades performance.

## The Web Audio API Paradigm

The Web Audio API allows developers to synthesize waveforms programmatically directly inside client-side browsers. 

\`\`\`javascript
const ctx = new AudioContext();
const osc = ctx.createOscillator();
const osc = ctx.createOscillator();
osc.type = 'triangle';
osc.frequency.setValueAtTime(55, ctx.currentTime); // A1 base tone
osc.connect(ctx.destination);
osc.start();
\`\`\`

## Achieving Space Ambient Harmony

By combining three distinct elements, we can create a calm, zero-bandwidth space drone:
1. **Low Frequency Triangle Wave (A1):** Establishes a heavy, warm grounding tone.
2. **Resonant Lowpass Filters:** Filters out harsh harmonics using custom sweeps.
3. **Slow Swelling LFO (Low-Frequency Oscillator):** Sweeps the cutoff frequency back and forth over a 10-second period, generating organic movement.

Implementing Web Audio synthesizer models ensures **instantaneous loads**, **zero asset requests**, and a completely **offline-compatible** interactive audio workspace!
`
    },
    {
      id: 'b2',
      title: 'Architecting Glassmorphism materials in Three.js',
      excerpt: 'A comprehensive study into mesh physical material roughness, refraction coefficients, and Zwei HTML projections.',
      date: '2026-04-29',
      category: 'Design Systems',
      tags: ['Three.js', 'React Three Fiber', 'Shaders'],
      content: `
# Architecting Glassmorphism in Three.js

Aesthetic premium interfaces frequently leverage glassmorphic cards to blur background details and draw focuses. Replicating this texture in 3D Three.js spheres or code cubes requires advanced physical materials.

## The MeshPhysicalMaterial Schema

The standard \`MeshPhysicalMaterial\` allows realistic refraction, thickness, and roughness coordinates.

\`\`\`javascript
<meshPhysicalMaterial
  roughness={0.08}
  transmission={0.88}
  thickness={0.8}
  transparent={true}
  opacity={0.35}
  clearcoat={1}
/>
\`\`\`

## Dynamic HTML labels

Using Drei's \`<Html>\` node projections, we can anchor regular high-definition React elements directly onto the coordinate centers of physical rotating cubes!

This provides a premium, highly tactile dashboard experience that responds seamlessly to mouse movements and hover frames!
`
    },
    {
      id: 'b3',
      title: 'Attention Beyond Scale: Insights from Modern Transformer Research',
      excerpt: 'A research-oriented exploration of sparse attention, long-context architectures, and emerging transformer optimization techniques.',
      date: '2026-05-12',
      category: 'AI & ML',
      tags: ['Transformers', 'Deep Learning', 'Research Papers'],
      content: `
  # Attention Beyond Scale: Modern Transformer Research

  Transformer architectures continue to dominate natural language processing, computer vision, and multimodal intelligence. Recent research focuses on improving efficiency, context length, and reasoning capabilities.

  ## Sparse and Efficient Attention

  Traditional self-attention scales quadratically with sequence length. Contemporary research introduces sparse attention mechanisms that significantly reduce computational overhead.

  \`\`\`python
  class SparseAttention(nn.Module):
      def forward(self, query, key, value):
          scores = torch.matmul(query, key.transpose(-2, -1))
          topk_scores, indices = torch.topk(scores, k=64)
          return torch.softmax(topk_scores, dim=-1)
  \`\`\`

  ## Long Context Windows

  Research papers such as Longformer, FlashAttention, and Ring Attention demonstrate techniques for processing contexts exceeding hundreds of thousands of tokens.

  ## Multimodal Transformers

  Modern transformer systems increasingly integrate text, image, audio, and video embeddings into unified architectures, enabling richer reasoning and cross-modal understanding.

  These innovations continue pushing transformer models toward more efficient, scalable, and general-purpose intelligence systems.
  `
    },

    {
      id: 'b4',
      title: 'Orchestrating ML at Scale with Seven Microservices',
      excerpt: 'A systems research perspective on designing production-grade machine learning orchestration using distributed microservices.',
      date: '2026-05-18',
      category: 'AI & ML',
      tags: ['MLOps', 'Microservices', 'Distributed Systems'],
      content: `
  # ML Orchestration with Seven Microservices

  Research in MLOps emphasizes modular architectures for scalable and reproducible machine learning pipelines. A common production pattern divides responsibilities across dedicated microservices.

  ## The Seven-Service Architecture

  1. Data Ingestion Service
  2. Feature Engineering Service
  3. Training Service
  4. Experiment Tracking Service
  5. Model Registry Service
  6. Deployment Service
  7. Monitoring Service

  ## Microservice Topology

  \`\`\`yaml
  services:
    ingestion-service:
      image: ml/ingestion

    feature-service:
      image: ml/features

    training-service:
      image: ml/training

    experiment-service:
      image: ml/experiments

    registry-service:
      image: ml/registry

    deployment-service:
      image: ml/deployment

    monitoring-service:
      image: ml/monitoring
  \`\`\`

  ## Workflow Orchestration

  Modern orchestration frameworks coordinate dependencies, retries, and scheduling across distributed environments.

  \`\`\`python
  pipeline = [
    "ingestion",
    "feature_engineering",
    "training",
    "experiment_tracking",
    "model_registry",
    "deployment",
    "monitoring"
  ]
  \`\`\`

  Separating ML responsibilities into independent services improves scalability, observability, fault isolation, and continuous delivery across enterprise AI platforms.
  `
    },
    {
      id: 'b5',
      title: 'Real-Time Data Pipelines with Python and Apache Kafka',
      excerpt: 'A practical walkthrough of designing fault-tolerant, high-throughput streaming pipelines using Kafka producers, consumers, and Python connectors.',
      date: '2026-05-08',
      category: 'AI & ML',
      tags: ['Kafka', 'Python', 'Data Pipelines', 'Streaming'],
      content: `
# Real-Time Data Pipelines with Python and Apache Kafka

Modern data engineering demands systems that process events **as they happen** — not in overnight batch jobs. Apache Kafka is the industry standard for distributed event streaming, and Python makes it approachable.

## Why Kafka?

Kafka excels at three things:
1. **Durability:** Messages are persisted to disk and replicated across brokers.
2. **Throughput:** A single cluster can handle millions of events per second.
3. **Decoupling:** Producers and consumers operate independently, enabling microservice architectures.

## Producer-Consumer Pattern in Python

\\\`\\\`\\\`python
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

producer.send('sensor-data', {'temp': 22.5, 'humidity': 61})
\\\`\\\`\\\`

## Schema Evolution & Avro

As data models evolve, schema registries ensure backward compatibility. Using **Confluent Schema Registry** with Avro serialization prevents breaking downstream consumers when fields are added or deprecated.

## Monitoring & Alerting

Pairing Kafka with **Prometheus** and **Grafana** dashboards provides real-time visibility into consumer lag, partition health, and throughput metrics — critical for production SLA compliance.

Building streaming infrastructure with Python + Kafka gives data engineers the power to deliver **sub-second insights** from raw event streams!
`
    },
    {
      id: 'b6',
      title: 'Designing Monochromatic UI Systems That Scale',
      excerpt: 'Why constraint-driven black and white design systems produce more consistent, accessible, and visually striking interfaces than color-heavy alternatives.',
      date: '2026-04-15',
      category: 'Design Systems',
      tags: ['UI/UX', 'Design Tokens', 'Accessibility', 'CSS'],
      content: `
# Designing Monochromatic UI Systems That Scale

Color is one of the hardest things to maintain consistently across a growing product. Monochromatic systems solve this by embracing **constraint as a creative advantage**.

## The Constraint Advantage

When you strip color away, every other design element must work harder:
1. **Typography** becomes the primary hierarchy tool — weight, size, and tracking carry meaning.
2. **Spacing** defines relationships more precisely than color groupings ever could.
3. **Borders and shadows** create depth without relying on hue differentiation.

## Building the Token System

\\\`\\\`\\\`css
:root {
  --surface-primary: #000000;
  --surface-secondary: #0a0a0a;
  --text-primary: #ffffff;
  --text-muted: #71717a;
  --border-subtle: #27272a;
  --border-active: #ffffff;
}
\\\`\\\`\\\`

## Accessibility Benefits

Monochromatic palettes naturally achieve **WCAG AAA contrast ratios** when using pure black and white as the base. Adding zinc-scale intermediates (zinc-400 through zinc-600) for secondary text maintains readability across all displays, including e-ink and high-contrast accessibility modes.

## Interactive States Without Color

Hover states rely on **border shifts**, **shadow elevation**, and **micro-scale transforms** rather than color changes. This creates tactile, physical-feeling interactions that feel premium across every component.

The result: a design system that scales to hundreds of components without a single "which shade of blue" debate!
`
    }
  ];

  const renderMarkdown = (md: string) => {
    const lines = md.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl md:text-3xl font-black text-black dark:text-white mt-6 mb-3 tracking-tight">{trimmed.replace('# ', '')}</h1>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className="text-lg md:text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-5 mb-2.5 tracking-tight">{trimmed.replace('## ', '')}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className="text-base font-semibold text-zinc-700 dark:text-zinc-300 mt-4 mb-2">{trimmed.replace('### ', '')}</h3>;
      }
      if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
        return <li key={idx} className="text-xs md:text-sm text-zinc-650 dark:text-zinc-400 pl-4 list-decimal ml-4 mt-1">{trimmed.substring(3)}</li>;
      }
      if (trimmed.startsWith('- ')) {
        return <li key={idx} className="text-xs md:text-sm text-zinc-655 dark:text-zinc-400 pl-4 list-disc ml-4 mt-1">{trimmed.substring(2)}</li>;
      }
      if (trimmed.startsWith('\`\`\`')) {
        return null;
      }
      if (trimmed.includes('const') || trimmed.includes('<mesh')) {
        return (
          <pre key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 text-green-700 dark:text-green-400 rounded-lg text-xs font-mono my-3 overflow-x-auto">
            {trimmed}
          </pre>
        );
      }
      if (trimmed === '') {
        return <div key={idx} className="h-2" />;
      }

      let parsedLine: React.ReactNode = trimmed;
      if (trimmed.includes('**')) {
        const parts = trimmed.split('**');
        parsedLine = parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-black dark:text-white font-bold">{part}</strong> : part);
      }

      return <p key={idx} className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3 select-text">{parsedLine}</p>;
    });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getReadingTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / 150);
  };

  return (
    <section id="blog" className="py-28 bg-white dark:bg-black text-black dark:text-white relative transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="text-center md:text-left select-none">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-8 text-black dark:text-white uppercase leading-none">
              Insights & <span className="text-zinc-500 dark:text-zinc-400">Articles</span>
            </h2>
            <div className="w-16 h-1 bg-black dark:bg-white mt-6 mx-auto md:mx-0" />
          </div>

          {/* Search Inputs - Monochromatic Dynamic Border Fix */}
          <div className="flex items-center px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg max-w-sm w-full self-center transition-all focus-within:border-black dark:focus-within:border-white focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white shadow-inner">
            <Search className="w-4 h-4 text-zinc-400 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 font-mono"
            />
          </div>
        </div>

        {/* Category toggler */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-none mb-12 border-b border-zinc-200 dark:border-zinc-900 select-none">
          {(['All', 'Software Engineering', 'Design Systems', 'AI & ML'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${activeCategory === cat
                ? 'bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#71717a]'
                : 'text-zinc-550 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white dark:bg-black p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all flex flex-col justify-between cursor-pointer group shadow-md hover:shadow-[4px_4px_0px_0px_#000000] dark:hover:shadow-[4px_4px_0px_0px_#ffffff]"
            >
              <div>
                {/* Meta data */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mb-4 uppercase font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {getReadingTime(post.content)} MIN READ
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-black dark:text-zinc-200 group-hover:text-zinc-650 dark:group-hover:text-white transition-colors mb-3 flex items-start justify-between">
                  <span>{post.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>

                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-sans">
                  {post.excerpt}
                </p>
              </div>

              {/* Stacks tags indicators */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-150 dark:border-zinc-900">
                {post.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-0.5 rounded-lg text-zinc-600 dark:text-zinc-300 font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Premium Markdown overlay modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col max-h-[85vh] overflow-hidden shadow-2xl"
            >
              {/* Header bar controls */}
              <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase font-bold">
                  <BookOpen className="w-4 h-4 text-black dark:text-white animate-pulse" />
                  <span>{selectedPost.category}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-550 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Article Content */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto select-text">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mb-6 uppercase border-b border-zinc-200 dark:border-zinc-900 pb-4 font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {getReadingTime(selectedPost.content)} MIN READ
                  </span>
                </div>

                {/* Rendered Markdown output */}
                <div className="space-y-1">
                  {renderMarkdown(selectedPost.content)}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
