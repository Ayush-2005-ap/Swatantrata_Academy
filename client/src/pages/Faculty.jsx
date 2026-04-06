import { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Faculty = ({ showFeaturedOnly = false, limit = null }) => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/members`);
        const allFaculty = response.data.filter(m => m.type === 'faculty');
        setFacultyData(allFaculty);
      } catch (err) {
        console.error("Error fetching faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const openLinkedIn = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const displayedFaculty = showFeaturedOnly
    ? facultyData.filter(f => f.featured).slice(0, limit || 6)
    : facultyData;

  if (loading) return <div className="text-center py-40 animate-pulse font-bold text-blue-900">Identifying Scholars...</div>;
  if (facultyData.length === 0) return null;

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

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6"
              style={{ fontFamily: 'Georgia, serif' }}>
              Policy Scholars
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Distinguished policy experts, researchers, and thought leaders shaping ideas that matter
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Faculty Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedFaculty.map((faculty, index) => {
            // Alternate sliding in from left/right sides
            const slideDirection = index % 2 === 0 ? -60 : 60;

            return (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, x: slideDirection, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (index % 5) * 0.1, ease: "easeOut" }}
              >
                <div className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-xl bg-blue-900">

                  {/* Background Image: Starts grayscale, fades to color on hover */}
                  <img
                    src={`${faculty.image.startsWith('http') || faculty.image.startsWith('/') ? '' : 'http://localhost:5050'}${faculty.image}`}
                    alt={faculty.name}
                    className="absolute inset-0 w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
                  />

                  {/* The Custom "Blue Grayscale" Tint Overlay */}
                  <div className="absolute inset-0 bg-blue-900 mix-blend-multiply opacity-30 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />

                  {/* Pop-out Text Overlay Container */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 p-5 bg-gradient-to-t from-gray-900/95 via-blue-900/60 to-transparent flex flex-col justify-end translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">

                    <div className="flex items-start justify-between gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {/* Name */}
                      <h3 className="text-lg font-bold text-white tracking-wide"
                        style={{ fontFamily: 'Georgia, serif' }}>
                        {faculty.name}
                      </h3>

                      {/* LinkedIn Button */}
                      {faculty.linkedIn && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openLinkedIn(faculty.linkedIn);
                          }}
                          className="text-white hover:text-sky-400 transition-colors flex-shrink-0 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin size={18} />
                        </button>
                      )}
                    </div>

                    {/* Title */}
                    <p className="text-sky-200 uppercase font-semibold mt-2 tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150"
                      style={{ fontSize: '0.65rem' }}>
                      {faculty.title}
                    </p>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Faculty;