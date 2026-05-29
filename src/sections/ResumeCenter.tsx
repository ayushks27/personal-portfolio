import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { FileText, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const ResumeCenter: React.FC = () => {
  const { recordResumeDownload } = useAuthStore();
  const [styleView, setStyleView] = useState<'designer' | 'ats'>('designer');

  const handleDownload = () => {
    recordResumeDownload();
    const link = document.createElement('a');
    link.href = '/Purnendu_Raghav_Srivastava_Resume.pdf';
    link.download = 'Purnendu_Raghav_Srivastava_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resumecenter" className="py-28 bg-white dark:bg-black text-black dark:text-white relative transition-colors duration-500 overflow-hidden">
      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left select-none">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-8 text-black dark:text-white uppercase leading-none">
            Resume <span className="text-zinc-500 dark:text-zinc-400">Center</span>
          </h2>
          <div className="w-16 h-1 bg-black dark:bg-white mt-6" />
        </div>

        {/* Dynamic Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Visual Mockup Document Box */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/20 overflow-hidden shadow-xl min-h-[460px]">
            {/* Window control bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 select-none">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-300 font-bold">
                  Purnendu_Raghav_Srivastava_Resume_{styleView.toUpperCase()}.pdf
                </span>
              </div>

              {/* Designer vs ATS style toggle tab - Monochromatic Fix */}
              <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 rounded-lg shadow-inner">
                <button
                  onClick={() => setStyleView('designer')}
                  className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold transition-all uppercase cursor-pointer ${
                    styleView === 'designer' 
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' 
                      : 'text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Designer View
                </button>
                <button
                  onClick={() => setStyleView('ats')}
                  className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold transition-all uppercase cursor-pointer ${
                    styleView === 'ats' 
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' 
                      : 'text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  ATS Friendly
                </button>
              </div>
            </div>

            {/* Simulated Document Preview Area */}
            <div className="flex-1 p-8 overflow-y-auto select-text bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-center font-mono">
              {styleView === 'designer' ? (
                /* Designer Style View */
                <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-2xl relative select-none text-left">
                  {/* Decorative Header */}
                  <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
                    <h3 className="text-base font-black text-black dark:text-white uppercase tracking-wider">Purnendu Raghav Srivastava</h3>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mt-1">Aspiring Data Engineer</p>
                  </div>

                  {/* Skills Grid preview */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-[9px] text-zinc-650 dark:text-zinc-400">
                    <div>
                      <h4 className="font-bold text-black dark:text-white uppercase mb-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-0.5">Languages & DBs</h4>
                      <p>Python, C++, SQL, MySQL, MongoDB, SQLite</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white uppercase mb-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-0.5">Data & Cloud</h4>
                      <p>Pipelines, Big Data, AWS, Git, Power BI</p>
                    </div>
                  </div>

                  {/* Career Highlights */}
                  <div className="space-y-3 text-[9px] text-zinc-650 dark:text-zinc-400">
                    <h4 className="font-bold text-black dark:text-white uppercase mb-1 border-b border-zinc-200 dark:border-zinc-800 pb-0.5">Professional Experience</h4>
                    <div>
                      <p className="font-bold text-zinc-700 dark:text-zinc-300">Corizo (Feb 2024 - Apr 2024)</p>
                      <p className="italic">Data Science Intern</p>
                      <p>• Engineered stock forecasting & Cinelytics movie analytics platforms.</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* ATS Friendly plain wireframe */
                <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded p-6 shadow-md text-zinc-650 dark:text-zinc-450 text-[9px] leading-relaxed select-none text-left">
                  <p className="text-center font-bold text-black dark:text-white text-xs">PURNENDU RAGHAV SRIVASTAVA</p>
                  <p className="text-center mb-4">purnenduraghavsrivastava@gmail.com | +91-7905709958 | github.com/ayushks27</p>
                  
                  <p className="font-bold text-black dark:text-white uppercase border-b border-zinc-200 dark:border-zinc-800 mt-4 mb-1">Education</p>
                  <p className="font-bold text-zinc-700 dark:text-zinc-300">B.Tech CSE | Jaypee Institute of Information Technology | July 2023 - July 2027</p>
                  <p>• CGPA: 7.56 / 10 | Noida, India</p>

                  <p className="font-bold text-black dark:text-white uppercase border-b border-zinc-200 dark:border-zinc-800 mt-4 mb-1">Professional Experience</p>
                  <p className="font-bold text-zinc-700 dark:text-zinc-300">Data Science Intern | Corizo | Feb 2024 - Apr 2024</p>
                  <p>• Developed KNN-based stock prediction and Cinelytics movie data-driven business insight systems.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Download Card & QR Codes */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Download CTA Panel */}
            <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-md hover:border-black dark:hover:border-white transition-all hover:shadow-[4px_4px_0px_0px_#000000] dark:hover:shadow-[4px_4px_0px_0px_#ffffff] flex-1">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">
                  Unlocked Asset
                </span>
                <h3 className="text-xl font-bold tracking-tight text-black dark:text-white mt-2 mb-3">
                  Download resume credentials.
                </h3>
                <p className="text-xs text-zinc-650 dark:text-zinc-405 leading-relaxed mb-6 select-text">
                  Choose between the highly optimized visual Designer template (best for human screening) 
                  or the clean typographic ATS-friendly version (designed to pass applicant tracking bots perfectly).
                </p>
              </div>

              <button
                onClick={handleDownload}
                className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all shadow-[4px_4px_0px_0px_#71717a] active:scale-98 cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download PDF Resume</span>
              </button>
            </div>

            {/* Stylized QR Code card */}
            <div className="bg-white dark:bg-black p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md">
              <div className="flex items-center gap-8">
                <div className="bg-white p-3 rounded-xl shrink-0">
                  <QRCodeSVG
                    value="https://drive.google.com/file/d/1gO0r7x-6olz0B4r5tWpK0cQLAB_epXsv/view?usp=sharing"
                    size={110}
                    includeMargin
                  />
                </div>

                <div>
                  <h4 className="font-mono font-bold text-lg text-black dark:text-white">
                    Mobile Scan
                  </h4>

                  <p className="text-zinc-500 mt-2 text-xs">
                    Scan this QR code to instantly download the resume PDF.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
