import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgramCard from './ProgramCard';

const ProgramsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const programs = [
    {
      title: 'iPolicy for Young Leaders',
      tag: 'Certificate Course',
      logo: '/Logos/Logos1.png',
    },
    {
      title: 'Colloquium',
      tag: 'Main Program',
      logo: '/Logos/Logos2.png',
    },
    {
      title: 'Austrian Ecomoics Seminar',
      tag: 'Main Program',
      logo: '/Logos/Logos3.png',
    },
  ];

  return (
    <section ref={sectionRef} className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Programs</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
