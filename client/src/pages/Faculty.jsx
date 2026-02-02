import { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import { facultyData } from '../data/faculty.js';

const Faculty = ({ showFeaturedOnly = false, limit = null }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const openLinkedIn = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const displayedFaculty = showFeaturedOnly
    ? facultyData.filter(f => f.featured).slice(0, limit || 6)
    : facultyData;

  return (
    <div className="pt-20 min-h-screen bg-white">

      {/* Hero Section */}
      <div className="bg-linear-to-br from-blue-800 via-blue-1100 to-blue-900 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'Georgia, serif' }}>
              POLICY SCHOLARS
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Distinguished policy experts, researchers, and thought leaders shaping ideas that matter
            </p>
          </div>

        </div>
      </div>

      {/* Faculty Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-12">
          {displayedFaculty.map((faculty, index) => (
            <div
              key={faculty.id}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group cursor-pointer">

                {/* Image Container - Square */}
                <div className="relative mb-5 overflow-hidden bg-gray-100 aspect-square 
                                transition-all duration-300
                                group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                                group-hover:-translate-y-1">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 
                               transition-all duration-500"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-gray-900 tracking-tight flex-1"
                      style={{ fontFamily: 'Georgia, serif' }}>
                      {faculty.name}
                    </h3>
                    <button
                      onClick={() => openLinkedIn(faculty.linkedIn)}
                      className="text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0 mt-0.5"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={16} />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-wide"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                    {faculty.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Faculty;