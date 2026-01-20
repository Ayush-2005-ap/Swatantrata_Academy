import { useState, useEffect } from 'react';
import { Linkedin, ExternalLink } from 'lucide-react';
import { facultyData } from '../data/faculty.js';

/**
 * Props:
 * - showFeaturedOnly (boolean) → true = show only pinned faculty
 * - limit (number) → max number of faculty to show
 */
const Faculty = ({ showFeaturedOnly = false, limit = null }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const openLinkedIn = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ✅ NEW LOGIC (ONLY ADDITION)
  const displayedFaculty = showFeaturedOnly
    ? facultyData.filter(f => f.featured).slice(0, limit || 6)
    : facultyData;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Faculty
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Distinguished policy experts, researchers, and thought leaders shaping ideas that matter
          </p>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedFaculty.map((faculty, index) => (
            <div
              key={faculty.id}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                onClick={() => openLinkedIn(faculty.linkedIn)}
                className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer
                           shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                           hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)]
                           transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative  h-90 overflow-hidden">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* LinkedIn Hover */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Linkedin size={18} />
                    <span className="text-sm font-semibold">View LinkedIn</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    Faculty Member
                  </span>

                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {faculty.name}
                  </h3>

                  <p className="text-sm font-semibold text-blue-600 mb-4">
                    {faculty.title}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLinkedIn(faculty.linkedIn);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white
                               py-3 rounded-xl font-semibold flex items-center justify-center gap-2
                               hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    <Linkedin size={18} />
                    Connect
                    <ExternalLink size={16} />
                  </button>
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
