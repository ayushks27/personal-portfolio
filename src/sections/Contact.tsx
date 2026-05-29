import React, { useState, useEffect, useRef } from 'react';
import { Mail, User, BookOpen, Send, CheckCircle2, Clock, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Live updating local clock
  const [localTime, setLocalTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata', // India standard time coordinate
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (publicKey) {
      emailjs.init(publicKey);
      console.log('EmailJS initialized');
    } else {
      console.error('Missing VITE_EMAILJS_PUBLIC_KEY');
    }
  }, []);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !msg) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log('EmailJS Config:', {
      serviceId,
      templateId,
      publicKey,
    });

    if (!serviceId || !templateId || !publicKey) {
      setErrorMsg(
        'Email service is not configured correctly. Check your .env.local file.'
      );
      setLoading(false);
      return;
    }

    if (!formRef.current) {
      setErrorMsg('Form reference not found.');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending email...');
      console.log('Form ref:', formRef.current);

      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      console.log('EmailJS Success:', result);

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setName('');
        setEmail('');
        setSubject('');
        setMsg('');
      }, 5000);
    } catch (err: any) {
      console.error('EmailJS Error:', err);

      const errorMessage =
        err?.text ||
        err?.message ||
        'Failed to send message. Please check EmailJS configuration.';

      setErrorMsg(errorMessage);
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-white dark:bg-black text-black dark:text-white relative select-text transition-colors duration-500 overflow-hidden">
      {/* Blueprint grid layout backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Sidebar Details */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-8 text-black dark:text-white uppercase leading-none">
                Get In <br />
                <span className="text-zinc-500 dark:text-zinc-400">Touch</span>
              </h2>
              <div className="w-16 h-1 bg-black dark:bg-white mt-6" />
            </div>

            <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed font-sans max-w-md">
              Have an exciting project, a job opportunity, or just want to connect? Feel free to send a message using the form, and I will get back to you as soon as possible.
            </p>

            {/* Monochromatic Info Blocks */}
            <div className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 select-none">

              {/* Local Clock */}
              <div className="flex items-center space-x-4">
                <div className="w-9 h-9 rounded-lg border border-black dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 font-mono shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]">
                  <Clock className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-bold">Local Time</p>
                  <p className="text-sm font-mono font-bold text-black dark:text-white">{localTime || '00:00:00'} IST</p>
                </div>
              </div>

              {/* Developer Mail */}
              <div className="flex items-center space-x-4">
                <div className="w-9 h-9 rounded-lg border border-black dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 font-mono shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]">
                  <Mail className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-bold">Email</p>
                  <a href="mailto:purnenduraghavsrivastava@gmail.com[EMAIL_ADDRESS]" className="text-sm font-mono font-bold hover:underline text-black dark:text-white">
                    purnenduraghavsrivastava@gmail.com
                  </a>
                </div>
              </div>

              {/* Geolocation */}
              <div className="flex items-center space-x-4">
                <div className="w-9 h-9 rounded-lg border border-black dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 font-mono shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]">
                  <Globe className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-wider font-bold">Location</p>
                  <p className="text-sm font-mono font-bold text-black dark:text-white">Noida, IN (UTC +5:30)</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Premium Monochromatic Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-black border-2 border-black dark:border-zinc-800 rounded-2xl p-8 md:p-12 transition-all duration-300 shadow-md dark:shadow-[0_4px_20px_rgba(255,255,255,0.02)] hover:shadow-[8px_8px_0px_0px_#000000] dark:hover:shadow-[8px_8px_0px_0px_#ffffff] relative overflow-hidden">

              {/* Corner tech ticks */}
              <div className="absolute top-0 right-0 w-3 h-3 border-b-2 border-l-2 border-black dark:border-zinc-700 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-t-2 border-r-2 border-black dark:border-zinc-700 pointer-events-none" />

              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    ref={formRef}
                    key="contact-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSendEmail}
                    className="space-y-8"
                  >
                    {/* Header bar inside form */}
                    <div className="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 select-none">
                      <div className="font-mono text-xs uppercase tracking-wider text-black dark:text-white font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-ping" />
                        Send a message
                      </div>
                    </div>

                    {/* Name & Email Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-black text-black dark:text-zinc-400 uppercase tracking-widest block">
                          Name *
                        </label>
                        <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3.5 focus-within:border-black dark:focus-within:border-white focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white transition-all shadow-inner">
                          <User className="w-4 h-4 text-zinc-450 dark:text-zinc-400 mr-3 shrink-0" />
                          <input
                            type="text"
                            name="user_name"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-transparent border-none outline-none text-xs w-full text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 font-mono"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-black text-black dark:text-zinc-400 uppercase tracking-widest block">
                          Email *
                        </label>
                        <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3.5 focus-within:border-black dark:focus-within:border-white focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white transition-all shadow-inner">
                          <Mail className="w-4 h-4 text-zinc-455 dark:text-zinc-400 mr-3 shrink-0" />
                          <input
                            type="email"
                            name="user_email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-transparent border-none outline-none text-xs w-full text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 font-mono"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-black dark:text-zinc-400 uppercase tracking-widest block">
                        Subject
                      </label>
                      <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3.5 focus-within:border-black dark:focus-within:border-white focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white transition-all shadow-inner">
                        <BookOpen className="w-4 h-4 text-zinc-450 dark:text-zinc-400 mr-3 shrink-0" />
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="bg-transparent border-none outline-none text-xs w-full text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 font-mono"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-black text-black dark:text-zinc-400 uppercase tracking-widest block">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        placeholder="Write your message here..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        required
                        rows={5}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-4 text-xs text-black dark:text-white outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all resize-none shadow-inner font-mono placeholder-zinc-400 dark:placeholder-zinc-500"
                      />
                    </div>

                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-black dark:text-white rounded-lg text-center"
                      >
                        {errorMsg}
                      </motion.div>
                    )}

                    {/* Monochromatic Button - Inverse Hover Transition */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border-2 border-black dark:border-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer shadow-[4px_4px_0px_0px_#71717a]"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                  </motion.form>
                ) : (
                  /* Success Feedback Screen */
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-16 flex flex-col items-center justify-center text-center space-y-6 font-mono select-none"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-black dark:border-white flex items-center justify-center bg-black dark:bg-white text-white dark:text-black animate-bounce shadow-[4px_4px_0px_0px_#71717a]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-black text-black dark:text-white uppercase tracking-wider">Message Sent</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out! Your message has been received successfully. Purnendu will get back to you shortly.
                      </p>
                    </div>

                    <div className="pt-6 w-full max-w-xs border-t border-zinc-200 dark:border-zinc-800">
                      <p className="text-[9px] text-zinc-450 dark:text-zinc-500 uppercase tracking-[0.25em]">Message Status: Delivered</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
