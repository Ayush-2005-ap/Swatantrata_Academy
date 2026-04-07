import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL, BASE_URL } from '../config';
import {
  BookOpen,
  ArrowRight,
  Clock,
  MapPin,
  Loader2
} from 'lucide-react';

const Programs = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/programs`);
        setPrograms(response.data);
      } catch (err) {
        console.error("Error fetching programs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="pt-40 min-h-screen bg-slate-50 flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-bold uppercase tracking-widest animate-pulse">Syncing Academic Catalogs...</p>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-800 via-blue-1100 to-blue-900 py-16 overflow-hidden">
        {/* Subtle background wave for premium feel */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
             <path fill="#ffffff" d="M0,100 L1440,100 L1440,50 Q1080,100 720,50 T0,50 Z"></path>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Our Programs
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
              Choose from our diverse range of rapid-immersion programs designed to nurture critical thinking, leadership, and policy expertise.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Programs Grid - Now Compact & Dense */}
      <div className="max-w-7xl mx-auto px-4 py-16 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.1, type: "spring", stiffness: 60 }}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden"
            >
              {/* Premium Top Gradient Line */}
              <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${program.color} opacity-80 group-hover:h-[4px] group-hover:opacity-100 transition-all duration-300`} />

              <div className="p-6 flex-1 flex flex-col">
                {/* Logo Area - Compacted */}
                <div className="mb-4">
                  <div className="w-full h-16 rounded-xl flex items-center justify-start">
                    <img
                      src={`${program.logo.startsWith('http') || program.logo.startsWith('/') ? '' : BASE_URL}${program.logo}`}
                      alt={`${program.title} logo`}
                      className="max-h-12 object-contain transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  {program.title}
                </h3>

                {/* Meta Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center space-x-1 bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-semibold">
                    <Clock size={12} className="text-blue-500" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-semibold">
                    <MapPin size={12} className="text-blue-500" />
                    <span>{program.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {program.description}
                </p>

                {/* Highlights Filtered for Compactness */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {program.features.map((feature, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[0.65rem] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => navigate(`/programs/${program.id}`)}
                  className="group/btn w-full bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white hover:border-transparent hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
