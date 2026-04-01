import { useState, useEffect, useRef } from 'react';
import { Users, BookOpen, Award, Building2 } from 'lucide-react';


const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);

  const stats = [
    { icon: Award, value: 150, label: 'Awards Won', color: 'text-primary' },
    { icon: Users, value: 5000, label: 'Active Students', color: 'text-secondary' },
    { icon: BookOpen, value: 120, label: 'Premium Courses', color: 'text-primary' },
    { icon: Building2, value: 25, label: 'Global Centers', color: 'text-secondary' },

  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setCounts(stats.map(stat => Math.floor((stat.value / steps) * currentStep)));

        if (currentStep === steps) {
          clearInterval(timer);
          setCounts(stats.map(stat => stat.value));
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl mb-6 transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                <stat.icon className={stat.color} size={40} />
              </div>
              <h3 className="text-4xl font-extrabold text-gray-800 mb-2 font-display">
                {counts[index]}+
              </h3>
              <p className="text-gray-900 font-medium tracking-wide uppercase text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
