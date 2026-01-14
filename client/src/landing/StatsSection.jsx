import { useState, useEffect, useRef } from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ alumni: 0, programs: 0, fellows: 0, partners: 0 });
  const sectionRef = useRef(null);

  const stats = [
    { icon: Users, label: 'Alumni Network', value: 12000, suffix: '+', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Programs Conducted', value: 150, suffix: '+', color: 'text-green-600' },
    { icon: Globe, label: 'Cities', value: 40, suffix: '+', color: 'text-purple-600' },
    { icon: Award, label: 'Partnership', value: 25, suffix: '+', color: 'text-orange-600' },
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
        setCounts({
          alumni: Math.floor((stats[0].value / steps) * currentStep),
          programs: Math.floor((stats[1].value / steps) * currentStep),
          fellows: Math.floor((stats[2].value / steps) * currentStep),
          partners: Math.floor((stats[3].value / steps) * currentStep),
        });

        if (currentStep === steps) {
          clearInterval(timer);
          setCounts({
            alumni: stats[0].value,
            programs: stats[1].value,
            fellows: stats[2].value,
            partners: stats[3].value,
          });
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
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {index === 0 && counts.alumni}
                {index === 1 && counts.programs}
                {index === 2 && counts.fellows}
                {index === 3 && counts.partners}
                <span className={stat.color}>{stat.suffix}</span>
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
