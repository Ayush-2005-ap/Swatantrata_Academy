import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { facultyData } from "../data/faculty";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

const CARD_WIDTH = 200; // width + gap (important)

const FeaturedFaculty = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useRevealOnScroll(0.2);

  const featuredFaculty = facultyData.slice(0, 6);

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll (slow & classy)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredFaculty.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [featuredFaculty.length]);

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our <span className="text-blue-600">Faculty</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Learn from globally respected scholars, researchers, and policy leaders
          </p>
        </div>

        {/* Viewport */}
        <div className="relative w-full overflow-hidden flex justify-center">
          
          {/* Sliding Track */}
          <div
            className="flex gap-12 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(50% - ${(activeIndex + 0.5) * CARD_WIDTH}px))`,
            }}
          >
            {featuredFaculty.map((faculty, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={faculty.id}
                  className={`transition-all duration-700 ease-out
                    ${isActive ? "z-20" : "z-0 opacity-60 scale-90"}
                  `}
                >
                  {/* Card */}
                  <div
                    className={`group flex flex-col items-center
                      transition-all duration-500 cursor-pointer
                      ${
                        isActive
                          ? "-translate-y-4 scale-105 shadow-2xl shadow-blue-200/40 ring-1 ring-blue-200"
                          : "hover:-translate-y-2 shadow-md"
                      }
                    `}
                  >
                    {/* Image */}
                    <div className="relative w-40 h-52 overflow-hidden rounded-xl">
                      <img
                        src={faculty.image}
                        alt={faculty.name}
                        className="
                          w-full h-full object-cover
                          grayscale
                          group-hover:grayscale-0
                          group-hover:scale-110
                          transition-all duration-700 ease-out
                        "
                      />

                      {/* Designation reveal */}
                      <div
                        className="
                          absolute inset-0 flex items-end justify-center
                          bg-gradient-to-t from-black/70 via-black/30 to-transparent
                          opacity-0 group-hover:opacity-100
                          transition-all duration-500
                        "
                      >
                        <p className="text-white text-sm font-medium mb-4 px-3 text-center">
                          {faculty.designation}
                        </p>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="mt-5 text-base font-semibold text-gray-900 text-center">
                      {faculty.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View More */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-300
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <button
            onClick={() => navigate("/faculty")}
            className="
              inline-flex items-center gap-2
              px-8 py-4 rounded-xl
              bg-blue-600 text-white font-semibold
              hover:bg-blue-700
              transition-all duration-300
              shadow-lg hover:shadow-xl
              hover:scale-105
            "
          >
            View All Faculty
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedFaculty;
