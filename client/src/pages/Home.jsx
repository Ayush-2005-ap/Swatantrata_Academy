import Hero from '../landing/Hero';
import ProgramsSection from '../landing/ProgramsSection';
import StatsSection from '../landing/StatsSection';
import UpcomingEventsSection from '../landing/UpcomingEventsSection';
import TestimonialsSection from '../landing/TestimonialsSection';
import CTASection from '../landing/CTASection';
import FeaturedFaculty from '../landing/FeaturedFaculty';
import FloatingAnnouncement from '../components/FloatingAnnouncement';
import { motion } from 'framer-motion';

// --- BREAKPOINT 1 & 5: The Energy Ribbon (Kept as requested) ---
const InnovativePageBreak = ({ flip = false, variant = 1 }) => {
  return (
    <div className={`relative w-full h-32 sm:h-40 flex items-center justify-center overflow-hidden bg-transparent z-10 py-6 ${flip ? "transform rotate-180" : ""}`}>
      <motion.svg viewBox="0 0 1440 200" className="absolute w-full h-full drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad1-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ffedd5" />
            <stop offset="100%" stopColor="#2655F3" />
          </linearGradient>
          <linearGradient id={`grad2-${variant}`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#2655F3" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        <motion.path
          d={variant === 1 ? "M0,100 C300,200 600,0 1440,100" : "M0,50 C400,-50 800,250 1440,50"}
          fill="none" stroke={`url(#grad2-${variant})`} strokeWidth="4" className="opacity-40 blur-[2px]"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: false, margin: "-50px" }} transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d={variant === 1 ? "M0,100 C400,0 800,200 1440,100" : "M0,150 C300,0 1000,200 1440,50"}
          fill="none" stroke={`url(#grad1-${variant})`} strokeWidth="6" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-50px" }} transition={{ duration: 1.5, ease: "circInOut" }}
        />
        <motion.path
          d={variant === 1 ? "M0,100 C400,0 800,200 1440,100" : "M0,150 C300,0 1000,200 1440,50"}
          fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 24"
          initial={{ strokeDashoffset: 1000, opacity: 0 }} whileInView={{ strokeDashoffset: 0, opacity: 0.9 }}
          viewport={{ once: false, margin: "-50px" }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
           cx={variant === 1 ? "530" : "800"} cy={variant === 1 ? "85" : "130"} r="10"
           fill="#ffffff" stroke="#f97316" strokeWidth="3" className="drop-shadow-[0_0_20px_#f97316]"
           initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
           viewport={{ once: false, margin: "-50px" }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
};

// --- BREAKPOINT 2: The Core Laser Expansion ---
const LaserExpansionBreak = () => (
  <div className="relative w-full h-16 flex items-center justify-center overflow-hidden z-10 py-8">
    <motion.div 
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 1.2, ease: "circOut" }}
      className="absolute w-full h-[2px] bg-linear-to-r from-transparent via-primary to-transparent"
    >
       <motion.div 
         initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.8, delay: 0.5 }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[6px] bg-sky-300 rounded-full blur-[4px]" 
       />
       <motion.div 
         initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.8 }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[2px] bg-white rounded-full drop-shadow-[0_0_10px_#fff]" 
       />
    </motion.div>
  </div>
);

// --- BREAKPOINT 3: The Intersecting DNA Helix ---
const DNAHelixBreak = () => {
   const path1 = "M0,50 Q 90,100 180,50 T 360,50 T 540,50 T 720,50 T 900,50 T 1080,50 T 1260,50 T 1440,50";
   const path2 = "M0,50 Q 90,0 180,50 T 360,50 T 540,50 T 720,50 T 900,50 T 1080,50 T 1260,50 T 1440,50";

   return (
    <div className="relative w-full h-24 flex items-center justify-center overflow-hidden z-10 py-6 opacity-90">
      <motion.svg viewBox="0 0 1440 100" className="absolute w-full h-full drop-shadow-[0_4px_10px_rgba(236,72,153,0.3)]" preserveAspectRatio="none">
         {/* Bottom/Back Strand */}
         <motion.path d={path1} fill="none" stroke="#ec4899" strokeWidth="4" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: false, margin: "-50px" }} transition={{ duration: 1.5, ease: "easeInOut" }}
         />
         {/* Top/Front Strand */}
         <motion.path d={path2} fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, margin: "-50px" }} transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
         />
      </motion.svg>
    </div>
  );
}

// --- BREAKPOINT 4: The Fiber Optic Data Stream ---
const FiberOpticBreak = () => (
  <div className="relative w-full h-20 flex flex-col items-center justify-center overflow-hidden z-10 py-4 gap-3">
      {[1, 2, 3].map((line, i) => (
         <motion.div 
            key={i}
            initial={{ x: i % 2 === 0 ? "100%" : "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: [0, 0.8, 0.4] }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1 + i*0.4, ease: "easeOut", opacity: { repeat: Infinity, duration: 3, delay: 1 } }}
            className={`w-[120%] h-[2px] bg-linear-to-r from-transparent ${i === 1 ? 'via-orange-500' : 'via-primary'} to-transparent blur-[1px]`}
         />
      ))}
  </div>
);

// Standard Automated Reveal
const AnimatedSection = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <div className="pt-20 bg-white overflow-hidden relative">
      <Hero />
      
      {/* 1st Dynamic Break: Kept as Energy Ribbon */}
      <InnovativePageBreak variant={1} />

      <AnimatedSection className="bg-mesh-light py-10 relative rounded-[40px] shadow-2xl mx-4 sm:mx-8">
        <ProgramsSection />
      </AnimatedSection>

      {/* 2nd Dynamic Break: Replaced with Core Laser Expansion */}
      <LaserExpansionBreak />

      <AnimatedSection className="bg-white py-10 rounded-[40px] border border-gray-100 shadow-xl mx-4 sm:mx-8">
        <StatsSection />
      </AnimatedSection>

      {/* 3rd Dynamic Break: Replaced with Intersecting DNA Helix */}
      <DNAHelixBreak />
      
      <AnimatedSection className="bg-slate-50 py-10 rounded-[40px] shadow-2xl mx-4 sm:mx-8">
        <UpcomingEventsSection />
      </AnimatedSection>

      {/* 4th Dynamic Break: Replaced with Fiber Optic Data Stream */}
      <FiberOpticBreak />

      <AnimatedSection className="bg-white rounded-[40px] mx-4 sm:mx-8">
         <div className="bg-soft-blue pb-10 pt-10 rounded-[40px] shadow-2xl overflow-hidden">
           <TestimonialsSection />
         </div>
      </AnimatedSection>

      {/* 5th Dynamic Break: Kept as Energy Ribbon (to mirror the top) */}
      <InnovativePageBreak variant={1} flip={true} />

      <AnimatedSection className="bg-white py-10 rounded-[40px] border border-gray-100 shadow-xl mx-4 sm:mx-8">
        <FeaturedFaculty />
      </AnimatedSection>

      {/* Connecting footer buffer */}
      <motion.div 
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative h-24 bg-white mt-8"
      >
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#153bb6ff" d="M0,120L48,110C96,100,192,80,288,70C384,60,480,60,576,65C672,70,768,80,864,85C960,90,1056,90,1152,85C1248,80,1344,70,1392,65L1440,60L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </motion.div>

      {/* Floating Announcement (Right Hand Side Glassmorphic Card) */}
      <FloatingAnnouncement />
      
    </div>
  );
};

export default Home;
