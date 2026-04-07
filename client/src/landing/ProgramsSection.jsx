import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import ProgramCard from './ProgramCard';


const ProgramsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/programs`);
        setPrograms(res.data.slice(0, 3)); // Only show top 3 on home
      } catch (err) {
        console.error("Programs fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (loading) return null;
  if (programs.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-28 relative bg-transparent">


      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Programs</span>
          </h2>
          <button className="flex items-center mx-auto space-x-2 text-blue-600 font-bold group/btn">
            <span>Explore Program</span>
            <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
          </button>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Flagship initiatives designed to shape ideas, leadership, and policy thinking
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              program={program}
              isVisible={isVisible}
              delay={index * 180}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/programs')}
            className="
            inline-flex items-center gap-2
            px-8 py-4 rounded-xl
            bg-blue-600 text-white font-semibold
            hover:bg-blue-700
            transition-all duration-300
            shadow-lg hover:shadow-xl
              hover:scale-105
              hover:cursor-pointer
            "
          >
            View All Programs
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProgramsSection;
