'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Paperclip } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
const EVENT_ID = '14feb'; 

export default function Home() {
  const [formData, setFormData] = useState({ 
    name: '', 
    regNum: '', 
    email: '',
    gender: '',
    age: '',
    interest: '',
    oneLine: '',
    oneThingToLookFor: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.regNum || !formData.email || !formData.gender || !formData.age || !formData.interest || !formData.oneLine || !formData.oneThingToLookFor) {
      alert("Please fill in all fields!");
      return;
    }

    // Validate email domain
    if (!formData.email.endsWith('@vitapstudent.ac.in')) {
      alert('Please use your VIT-AP student email (@vitapstudent.ac.in)');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(`${API_URL}/${EVENT_ID}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          reg_number: formData.regNum,
          gender: formData.gender,
          age: parseInt(formData.age),
          interest: formData.interest,
          one_line: formData.oneLine,
          one_thing_to_look_for: formData.oneThingToLookFor,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to register');
      }

      setStatus('success');
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Registration failed:', error);
      alert(error.message || "Something went wrong. Check the console.");
      setStatus('idle');
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Courier+Prime:wght@400;700&family=Gloria+Hallelujah&display=swap');
        
        .font-marker { font-family: 'Permanent Marker', cursive; }
        .font-typewriter { font-family: 'Courier Prime', monospace; }
        .font-hand { font-family: 'Gloria Hallelujah', cursive; }

        .bg-grid-pattern {
          background-color: #ffdeeb;
          background-image: 
            linear-gradient(#ffb3d1 1px, transparent 1px), 
            linear-gradient(90deg, #ffb3d1 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .paper-tear {
           clip-path: polygon(
             0% 0%, 100% 0%, 100% 100%, 
             95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 
             65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 
             35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 
             5% 98%, 0% 100%
           );
        }

        .tape {
          background-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          backdrop-filter: blur(2px);
          border-left: 1px dashed rgba(0,0,0,0.1);
          border-right: 1px dashed rgba(0,0,0,0.1);
        }
      `}</style>

      <div className="min-h-screen w-full bg-grid-pattern flex items-center justify-center p-4 overflow-hidden relative">
        
        <motion.div 
           animate={{ rotate: [0, 10, 0] }} 
           transition={{ duration: 5, repeat: Infinity }}
           className="absolute top-10 left-10 w-24 h-24 bg-[#5cdbd3] rounded-full opacity-80 mix-blend-multiply filter blur-sm"
        />
        <motion.div 
           animate={{ rotate: [0, -10, 0] }} 
           transition={{ duration: 7, repeat: Infinity }}
           className="absolute bottom-10 right-10 w-32 h-32 bg-[#ff85c0] rounded-full opacity-80 mix-blend-multiply filter blur-sm"
        />

        <motion.div 
          initial={{ y: 50, opacity: 0, rotate: -2 }}
          animate={{ y: 0, opacity: 1, rotate: -1 }}
          className="relative w-full max-w-lg"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 tape rotate-2 z-20"></div>

          <div className="bg-[#fdfdfd] paper-tear pb-12 pt-8 px-8 shadow-xl relative z-10">
            
            <div className="mb-8 relative">
              <div className="bg-[#2f2f2f] text-white inline-block px-3 py-1 transform -rotate-2 mb-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                <span className="font-typewriter font-bold tracking-widest text-xs">ENTREPRENEURSHIP CLUB</span>
              </div>
              
              <h1 className="text-5xl font-marker leading-[0.9] mt-2 text-[#222]">
                Find Your <br/>
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-[#ff4d4f]">CO-FOUNDER</span>
                  <span className="absolute bottom-1 left-0 w-full h-4 bg-[#fffb8f] -z-0 -rotate-1 opacity-70"></span>
                </span>
              </h1>

              <div className="absolute right-0 top-10 hidden sm:block">
                 <svg width="60" height="40" viewBox="0 0 100 60">
                   <path d="M10,10 Q50,5 80,40" fill="none" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                   <path d="M80,40 L70,35 M80,40 L75,25" fill="none" stroke="black" strokeWidth="2" />
                 </svg>
                 <span className="font-hand text-xs rotate-12 block ml-12">register here!</span>
              </div>
            </div>

            <div className="space-y-6 relative">
               
               <Paperclip className="absolute -right-4 -top-4 w-12 h-12 text-gray-400 rotate-45 opacity-50" />

               {status === 'success' ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-[#d9f7be] p-6 border-2 border-dashed border-[#52c41a] rotate-1 shadow-md text-center"
                 >
                   <div className="font-marker text-2xl mb-2 text-[#389e0d]">YOU&apos;RE IN!</div>
                   <p className="font-typewriter text-sm text-[#222]">We will be waiting for you.</p>
                 </motion.div>
               ) : (
                 <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                   
                    <div className="relative group">
                       <label className="font-hand text-sm font-bold ml-2 text-[#555]">Your Name</label>
                       <div className="bg-[#e6f7ff] p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transform rotate-1 transition-transform group-focus-within:rotate-0 group-focus-within:scale-105">
                          <input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="NAME"
                            className="w-full bg-transparent border-b-2 border-[#91d5ff] font-typewriter p-2 focus:outline-none focus:border-[#1890ff] placeholder:text-[#1890ff]/40"
                          />
                       </div>
                    </div>

                    <div className="relative group">
                       <label className="font-hand text-sm font-bold ml-2 text-[#555]">Your ID</label>
                       <div className="bg-[#fff0f6] p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transform -rotate-1 transition-transform group-focus-within:rotate-0 group-focus-within:scale-105">
                          <input 
                            name="regNum"
                            value={formData.regNum}
                            onChange={handleChange}
                            placeholder="REG NUMBER"
                            className="w-full bg-transparent border-b-2 border-[#ffadd2] font-typewriter p-2 focus:outline-none focus:border-[#eb2f96] placeholder:text-[#eb2f96]/40"
                          />
                       </div>
                    </div>

                    <div className="relative group">
                       <label className="font-hand text-sm font-bold ml-2 text-[#555]">Email</label>
                       <div className="bg-[#fff7e6] p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transform rotate-1 transition-transform group-focus-within:rotate-0 group-focus-within:scale-105">
                          <input 
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="CAMPUS MAIL"
                            pattern=".*@vitapstudent\.ac\.in$"
                            title="Please use your VIT-AP student email (@vitapstudent.ac.in)"
                            className="w-full bg-transparent border-b-2 border-[#ffd591] font-typewriter p-2 focus:outline-none focus:border-[#fa8c16] placeholder:text-[#fa8c16]/40"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative group">
                        <label className="font-hand text-sm font-bold ml-2 text-[#555]">Gender?</label>
                        <div className="bg-[#f9f0ff] p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transform -rotate-1 transition-transform group-focus-within:rotate-0 group-focus-within:scale-105">
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b-2 border-[#d3adf7] font-typewriter p-2 focus:outline-none focus:border-[#722ed1] text-[#722ed1]"
                          >
                            <option value="">SELECT</option>
                            <option value="male">MALE</option>
                            <option value="female">FEMALE</option>
                          </select>
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="font-hand text-sm font-bold ml-2 text-[#555]">Age?</label>
                        <div className="bg-[#e6fffb] p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transform rotate-1 transition-transform group-focus-within:rotate-0 group-focus-within:scale-105">
                          <input
                            name="age"
                            type="number"
                            min="1"
                            max="150"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="AGE"
                            className="w-full bg-transparent border-b-2 border-[#87e8de] font-typewriter p-2 focus:outline-none focus:border-[#13c2c2] placeholder:text-[#13c2c2]/40"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                       <label className="font-hand text-sm font-bold ml-2 text-[#555]">Your Interest?</label>
                       <div className="bg-[#fff1f0] p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transform -rotate-1 transition-transform group-focus-within:rotate-0 group-focus-within:scale-105">
                          <input 
                            name="interest"
                            value={formData.interest}
                            onChange={handleChange}
                            placeholder="INTEREST"
                            className="w-full bg-transparent border-b-2 border-[#ffccc7] font-typewriter p-2 focus:outline-none focus:border-[#f5222d] placeholder:text-[#f5222d]/40"
                          />
                       </div>
                    </div>

                    <div className="relative group">
                       <label className="font-hand text-sm font-bold ml-2 text-[#555]">Describe yourself in one line</label>
                       <div className="bg-[#fcffe6] p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transform rotate-1 transition-transform group-focus-within:rotate-0 group-focus-within:scale-105">
                          <textarea
                            name="oneLine"
                            value={formData.oneLine}
                            onChange={handleChange}
                            placeholder="ONE LINE ABOUT YOU"
                            rows={2}
                            className="w-full bg-transparent border-b-2 border-[#eaff8f] font-typewriter p-2 focus:outline-none focus:border-[#a0d911] placeholder:text-[#a0d911]/40 resize-none"
                          />
                       </div>
                    </div>

                    <div className="relative group">
                       <label className="font-hand text-sm font-bold ml-2 text-[#555]">One thing you look for in a co-founder</label>
                       <div className="bg-[#f0f5ff] p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transform -rotate-1 transition-transform group-focus-within:rotate-0 group-focus-within:scale-105">
                          <textarea
                            name="oneThingToLookFor"
                            value={formData.oneThingToLookFor}
                            onChange={handleChange}
                            placeholder="WHAT YOU SEEK"
                            rows={2}
                            className="w-full bg-transparent border-b-2 border-[#adc6ff] font-typewriter p-2 focus:outline-none focus:border-[#2f54eb] placeholder:text-[#2f54eb]/40 resize-none"
                          />
                       </div>
                    </div>

                    <button 
                      disabled={status === 'loading'}
                      className="mt-4 self-center group relative disabled:opacity-70"
                    >
                      <div className="absolute inset-0 bg-black rounded-full translate-y-1 translate-x-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                      <div className="relative bg-[#ff4d4f] text-white border-2 border-black px-8 py-3 rounded-full font-marker text-xl tracking-widest flex items-center gap-2 hover:-translate-y-1 transition-transform">
                        {status === 'loading' ? 'SAVING...' : 'SEND IT'} 
                        <Send className="w-4 h-4" />
                      </div>
                    </button>

                 </form>
               )}
            </div>

            <div className="absolute -bottom-4 right-12 w-24 h-8 tape -rotate-3 z-20"></div>
          </div>
        </motion.div>

        <div className="absolute bottom-4 left-4 font-typewriter text-[10px] text-gray-400">
           SCRAPBOOK_VER_1.0
        </div>
      </div>
    </>
  );
}