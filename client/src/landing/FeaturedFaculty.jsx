import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { facultyData } from "../data/faculty";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

const FeaturedFaculty = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useRevealOnScroll(0.2);

  const featuredFaculty = facultyData.slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      changeFaculty((prev) => (prev + 1) % featuredFaculty.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredFaculty.length]);

  const changeFaculty = (getNewIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(getNewIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const nextFaculty = () => {
    changeFaculty((prev) => (prev + 1) % featuredFaculty.length);
  };

  const prevFaculty = () => {
    changeFaculty((prev) => (prev - 1 + featuredFaculty.length) % featuredFaculty.length);
  };

  const getVisibleFaculty = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + featuredFaculty.length) % featuredFaculty.length;
      visible.push({ ...featuredFaculty[index], displayIndex: i });
    }
    return visible;
  };

  const openLinkedIn = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: 'Georgia, serif' }}>
            Meet Our <span className="text-blue-600">Faculty</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Distinguished scholars and policy experts driving impactful research
          </p>
        </div>

        {/* Faculty Carousel */}
        <div className="relative flex items-center justify-center min-h-[450px]">
          
          {/* Cards Container */}
          <div
            className={`flex items-center justify-center gap-4 px-8
              transition-all duration-300 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            {getVisibleFaculty().map((faculty, idx) => {
              const position = faculty.displayIndex; // -2, -1, 0, 1, 2
              const isCenter = position === 0;
              const isFirstTier = Math.abs(position) === 1; // Adjacent cards
              const isSecondTier = Math.abs(position) === 2; // Outer cards

              return (
                <div
                  key={`${faculty.id}-${currentIndex}`}
                  className={`
                    transition-all duration-500 ease-out cursor-pointer
                    ${isCenter ? 'z-20' : isFirstTier ? 'z-10' : 'z-0'}
                    ${isCenter ? '' : isFirstTier ? 'opacity-60 scale-90' : 'hidden lg:block opacity-30 scale-75'}
                  `}
                  onClick={() => !isCenter && changeFaculty(() => (currentIndex + position + featuredFaculty.length) % featuredFaculty.length)}
                >
                  {/* Card */}
                  <div 
                    className={`
                      w-[240px] bg-white rounded-2xl overflow-hidden
                      transition-all duration-500 
                      ${isCenter 
                        ? 'shadow-[0_20px_60px_rgba(37,99,235,0.3)] scale-110' 
                        : 'shadow-md hover:shadow-lg hover:opacity-80'}
                    `}
                  >
                    {/* Image Container */}
                    <div className="relative group">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={faculty.image}
                          alt={faculty.name}
                          className={`w-full h-full object-cover transition-all duration-700
                            ${isCenter ? '' : 'grayscale'}
                            ${isCenter ? 'group-hover:scale-110' : ''}
                          `}
                        />
                      </div>

                      {/* Hover Overlay with LinkedIn - Only on center card */}
                      {isCenter && (
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/60 to-transparent 
                                     opacity-0 group-hover:opacity-100 transition-all duration-300
                                     flex flex-col items-center justify-end pb-6"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openLinkedIn(faculty.linkedIn);
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white
                                       rounded-full text-blue-600 font-semibold text-sm
                                       hover:scale-105 transition-all duration-200
                                       shadow-xl"
                          >
                            <Linkedin size={16} />
                            View Profile
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-bold text-gray-900 leading-tight flex-1"
                            style={{ fontFamily: 'Georgia, serif' }}>
                          {faculty.name}
                        </h3>
                        {isCenter && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openLinkedIn(faculty.linkedIn);
                            }}
                            className="text-blue-600 hover:text-blue-800 hover:scale-110 
                                       transition-all duration-200 flex-shrink-0"
                            aria-label="LinkedIn Profile"
                          >
                            <Linkedin size={16} />
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-wider">
                        {faculty.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {featuredFaculty.map((_, index) => (
            <button
              key={index}
              onClick={() => changeFaculty(() => index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-10 bg-blue-600'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to faculty ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-300
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <button
            onClick={() => navigate("/faculty")}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full
                       bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 transition-all duration-300
                       shadow-lg hover:shadow-xl hover:scale-105"
          >
            View All Faculty
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedFaculty;