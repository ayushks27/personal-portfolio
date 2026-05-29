import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Wait, small typo 'mramer-motion' instead of 'framer-motion'. Let's write framer-motion!
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hello! I am Purnendu's virtual assistant. Ask me anything about his technical skills, project portfolio, career experience, or contact information!", timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    // Add user message
    const newMsg: ChatMessage = { sender: 'user', text: query, timestamp: new Date() };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      let botResponse = '';
      const lowercaseQuery = query.toLowerCase().trim();

      // Check for visual page-navigation command keywords
      let targetSection = '';
      let sectionName = '';

      if (
        lowercaseQuery.includes('take me') ||
        lowercaseQuery.includes('go to') ||
        lowercaseQuery.includes('scroll to') ||
        lowercaseQuery.includes('navigate to') ||
        lowercaseQuery.includes('show me') ||
        lowercaseQuery.includes('open')
      ) {
        if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('touch') || lowercaseQuery.includes('message') || lowercaseQuery.includes('form')) {
          targetSection = 'contact';
          sectionName = 'Contact';
        } else if (lowercaseQuery.includes('about') || lowercaseQuery.includes('chronology') || lowercaseQuery.includes('bio') || lowercaseQuery.includes('profile')) {
          targetSection = 'about';
          sectionName = 'About & Chronology';
        } else if (lowercaseQuery.includes('skill') || lowercaseQuery.includes('tech') || lowercaseQuery.includes('stack')) {
          targetSection = 'skills';
          sectionName = 'Skills';
        } else if (lowercaseQuery.includes('project') || lowercaseQuery.includes('portfolio') || lowercaseQuery.includes('gallery')) {
          targetSection = 'projects';
          sectionName = 'Project Gallery';
        } else if (lowercaseQuery.includes('experience') || lowercaseQuery.includes('timeline') || lowercaseQuery.includes('career') || lowercaseQuery.includes('job')) {
          targetSection = 'experience';
          sectionName = 'Experience Timeline';
        } else if (lowercaseQuery.includes('blog') || lowercaseQuery.includes('article') || lowercaseQuery.includes('post')) {
          targetSection = 'blog';
          sectionName = 'Blog';
        } else if (lowercaseQuery.includes('home') || lowercaseQuery.includes('hero') || lowercaseQuery.includes('top') || lowercaseQuery.includes('start')) {
          targetSection = 'hero';
          sectionName = 'Home';
        }
      }

      if (targetSection) {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          botResponse = `Sure! Shifting your view directly to the **${sectionName}** section now. Let me know if there's anything else you'd like to see!`;
        } else {
          botResponse = `I tried to navigate you to the **${sectionName}** section, but couldn't locate it. Feel free to scroll down!`;
        }
        setMessages(prev => [...prev, { sender: 'bot', text: botResponse, timestamp: new Date() }]);
        setIsTyping(false);
        return; // Complete action and exit early!
      }

      // Clean up punctuation and tokenize
      const cleanQuery = lowercaseQuery.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
      const tokens = cleanQuery.split(/\s+/);

      // Define topic keywords and their weights
      const topics = [
        {
          id: 'skills',
          keywords: ['skill', 'skills', 'stack', 'languages', 'language', 'technologies', 'tech', 'framework', 'frameworks', 'python', 'sql', 'cpp', 'database', 'databases', 'frontend', 'backend', 'analytics'],
          response: "Purnendu's core technical skills are divided into:\n• Data Engineering: Python, SQL, database normalization, ETL, SQLite, Streamlit, data pipelines.\n• Backend & AI: C++, FastAPI, GenAI, Retrieval-Augmented Generation (RAG), multi-turn agentic workflows.\n• Data Analytics: Predictive modeling, machine learning, XGBoost, Random Forest, Logistic Regression, GA4 configuration."
        },
        {
          id: 'projects',
          keywords: ['project', 'projects', 'work', 'portfolio', 'code', 'github', 'apps', 'applications', 'built', 'developed', 'ingestra', 'autostream', 'uber', 'drras', 'verse'],
          response: "You can discover Purnendu's work in detail in the Project Gallery section on this page! Key highlights include:\n1. Ingestra: An end-to-end data ingestion & normalization SQLite pipeline built with Python & Streamlit.\n2. AutoStream: A stateful GenAI-powered conversational RAG agent for multi-turn lead qualification.\n3. Uber Ride Cancellation Analysis: High-recall predictive machine learning models built with XGBoost & Random Forest.\n4. DRRAS: A disaster rescue route optimization routing system built with advanced C++ data structures.\n5. VERSE: A framework-free multimedia platform built with vanilla JavaScript, HTML, and CSS."
        },
        {
          id: 'experience',
          keywords: ['experience', 'job', 'career', 'resume', 'intern', 'internship', 'stmicroelectronics', 'st', 'corizo', 'creative head', 'parola', 'joust'],
          response: "Purnendu has rich academic and internship experiences:\n• Software Engineering Intern at STMicroelectronics (Technology & R&D Department - July 2026), working on advanced engineering solutions.\n• Data Science Intern at Corizo (Feb 2024 - Apr 2024), where he developed KNN-based stock prediction pipelines and analyzed high-volume movie datasets.\n• Creative Head at Parola – The Literary Hub (Jul 2025 - Jul 2026), leading visual and asset design for major flagship events like Model United Nations."
        },
        {
          id: 'contact',
          keywords: ['contact', 'hire', 'email', 'reach', 'message', 'address', 'mail', 'phone', 'location', 'noida', 'india'],
          response: "You can easily contact Purnendu directly by scrolling to the 'Get In Touch' Contact Form at the bottom of this page! Alternatively, feel free to send an email directly to purnenduraghavsrivastava@gmail.com. He is located in Noida, India, and is always excited to discuss new opportunities!"
        },
        {
          id: 'education',
          keywords: ['education', 'college', 'university', 'btech', 'degree', 'study', 'jiit', 'noida', 'jaypee', 'gpa', 'cgpa', 'student', 'school'],
          response: "Purnendu is pursuing his Bachelor of Technology (B.Tech.) in Computer Science & Engineering at Jaypee Institute of Information Technology (JIIT), Noida, with a current CGPA of 7.56 / 10 (expected graduation in 2027). His coursework includes database systems, computer networks, data structures, and algorithms."
        },
        {
          id: 'about',
          keywords: ['about', 'purnendu', 'who', 'raghav', 'srivastava', 'himself', 'profile', 'biography', 'background', 'introduce', 'introduction'],
          response: "Purnendu Raghav Srivastava is an aspiring Data Engineer and Software Developer. He specializes in designing robust data pipelines, scalable analytics systems, and stateful GenAI backend agents. With solid foundations in Python, SQL, and database normalization, he is focused on enabling data-driven business decisions. You can read his detailed biography in the 'About & Chronology' section!"
        },
        {
          id: 'greetings',
          keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'evening', 'sup', 'yo'],
          response: "Hi there! Welcome to the workspace. How can I help you explore Purnendu's engineering profile, technical skills, or projects today?"
        }
      ];

      // Score each topic based on keyword matching
      let bestTopic: any = null;
      let maxScore = 0;

      topics.forEach(topic => {
        let score = 0;
        tokens.forEach(token => {
          if (topic.keywords.includes(token)) {
            // Assign higher priority weight to solid info-matching keywords over greetings
            score += topic.id === 'greetings' ? 1 : 3;
          }
        });
        if (score > maxScore) {
          maxScore = score;
          bestTopic = topic;
        }
      });

      if (bestTopic && maxScore > 0) {
        botResponse = bestTopic.response;
      } else {
        botResponse = "I didn't quite capture that. Try asking about Purnendu's 'skills', 'experience', 'projects', 'education', or 'how to contact him'!";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Typos in import at line 2. Let's make sure it is correct in the generated file: we write 'framer-motion' in CodeContent. Let's fix that. */}
      {/* Floating Chat Button in bottom right */}
      <div className="fixed bottom-6 right-6 z-[95] pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-white text-black shadow-premium hover:scale-105 active:scale-95 transition-all relative group flex items-center justify-center hover:bg-zinc-200"
          title="Ask portfolio AI assistant"
        >
          {isOpen ? <X className="w-5.5 h-5.5" /> : <MessageSquare className="w-5.5 h-5.5" />}

          {/* Subtle glowing ring */}
          <span className="absolute -inset-0.5 rounded-full bg-white/30 animate-pulse pointer-events-none -z-10 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Floating Chatbot Assistant Box Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-6 w-full max-w-sm z-[95] pointer-events-auto px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="glass rounded-2xl shadow-2xl flex flex-col h-[420px] overflow-hidden bg-black/90 font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-zinc-950 rounded-lg">
                    <Bot className="w-4 h-4 text-white-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                      AI Assistant <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    </h4>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      Purnendu's chatbot
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-white p-0.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Thread Messages */}
              <div
                className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-hidden select-text"
                data-lenis-prevent
              >
                {messages.map((msg, index) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div
                      key={index}
                      className={`flex gap-2.5 items-start ${isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      {isBot && (
                        <div className="p-1 bg-zinc-900 rounded-lg mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-zinc-400" />
                        </div>
                      )}

                      <div className={`p-3 rounded-2xl text-xs max-w-[78%] leading-relaxed ${isBot
                        ? 'bg-zinc-900/60 text-zinc-300 rounded-tl-none'
                        : 'bg-white text-black font-medium rounded-tr-none shadow-md'
                        }`}>
                        {msg.text}
                      </div>

                      {!isBot && (
                        <div className="p-1 bg-zinc-900 rounded-lg mt-0.5">
                          <User className="w-3.5 h-3.5 text-zinc-400" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2.5 items-start justify-start">
                    <div className="p-1 bg-zinc-900 rounded-lg mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="p-3 bg-zinc-900/60 text-zinc-500 rounded-2xl rounded-tl-none text-xs flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSend}
                className="p-3 bg-zinc-950/60 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects, contact..."
                  className="flex-1 bg-zinc-900 rounded-lg px-3 py-2 text-xs outline-none text-zinc-100 placeholder-zinc-600 font-sans"
                />
                <button
                  type="submit"
                  className="p-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
