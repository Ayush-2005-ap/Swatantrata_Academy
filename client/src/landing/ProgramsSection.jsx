import { useState, useEffect, useRef } from 'react';
import { BookOpen, Users, Award, Briefcase, Calendar, TrendingUp } from 'lucide-react';

const ProgramsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  const programs = [
    {
      icon: BookOpen,
      title: 'Policy Research',
      description: 'Engage in cutting-edge research on liberal economic policies and governance.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Leadership Programs',
      description: 'Develop leadership skills through intensive workshops and mentorship.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'Fellowships',
      description: 'Competitive fellowships for outstanding individuals committed to change.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Briefcase,
      title: 'Internships',
      description: 'Hands-on experience in policy analysis and advocacy.',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: Calendar,
      title: 'Events & Conferences',
      description: 'Connect with thought leaders and policymakers at our events.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: TrendingUp,
      title: 'Career Development',
      description: 'Build your career in public policy with expert guidance.',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            SWANTATRA ACADEMY'S
            <br />
            <span className="text-blue-600">PROGRAMS AND EVENTS</span>
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Explore our diverse range of programs designed to nurture critical thinking and leadership
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <program.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {program.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {program.description}
              </p>
              <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Learn More</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
