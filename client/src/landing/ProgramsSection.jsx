import { useEffect, useRef, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgramsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const programs = [
    {
      title: 'Policy Research Fellowship',
      description:
        'An intensive research program focused on public policy, governance, and economic reforms.',
      duration: '6 Months',
      location: 'New Delhi',
      image: '/banners/banner1.jpg', // placeholder
    },
    {
      title: 'Colloquium ',
      description:
        'A hands-on leadership journey with mentorship, workshops, and real-world exposure.',
      duration: '3 Months',
      location: 'Mumbai',
      image: '/banners/banner2.jpg',
    },
    {
      title: 'Public Policy Internship',
      description:
        'Work closely with policy experts and think tanks on real policy challenges.',
      duration: '8 Weeks',
      location: 'Hybrid',
      image: '/banners/banner3.jpg',
    },
    {
      title: 'Annual Policy Conference',
      description:
        'Connect with policymakers, scholars, and industry leaders from across the country.',
      duration: '2 Days',
      location: 'Bengaluru',
      image: '/assets/programs/conference.jpg',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-400/50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Programs & Events</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carefully curated programs to shape future leaders and thinkers
          </p>
        </div>

        {/* Program Cards */}
        <div className="space-y-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500
                          flex flex-col md:flex-row overflow-hidden transform hover:-translate-y-1
                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Image */}
              <div className="md:w-1/3 h-56 md:h-auto bg-gray-200">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {program.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{program.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/programs')}
            className="px-10 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold
                       hover:bg-blue-700 transition-all duration-300 shadow-lg hover:scale-105"
          >
            View All Programs
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProgramsSection;
