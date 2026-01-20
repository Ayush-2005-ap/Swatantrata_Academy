import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { facultyData } from "../data/faculty";

const FeaturedFaculty = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Pick top 6 faculty (pinned)
  const featuredFaculty = facultyData.slice(0, 6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our <span className="text-blue-600">Faculty</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Learn from globally respected scholars, researchers, and policy leaders
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 place-items-center">
          {featuredFaculty.map((faculty, index) => (
            <div
              key={faculty.id}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="group flex flex-col items-center cursor-pointer">
                
                {/* Image */}
                <div className="relative w-40 h-50  overflow-hidden">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="
                      w-full h-full object-cover
                      grayscale
                      group-hover:grayscale-0
                      group-hover:scale-110
                      transition-all duration-500 ease-out
                    "
                  />
                </div>

                {/* Name */}
                <h3 className="mt-5 text-base font-semibold text-gray-900 text-center">
                  {faculty.name}
                </h3>

                {/* Title */}
               
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
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
                hover:cursor-pointer
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
