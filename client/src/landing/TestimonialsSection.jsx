import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      changeTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const changeTestimonial = (getNewIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(getNewIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const nextTestimonial = () => {
    changeTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    changeTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], displayIndex: i });
    }
    return visible;
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen py-20 bg-white flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Voices of <span className="text-blue-600">Alumni</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from those who have walked the path before you
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 z-10 p-3 rounded-full bg-white hover:bg-blue-600 
                       text-black hover:text-white transition-all duration-300 transform hover:scale-110
                       border border-blue-600 shadow-md"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Container */}
          <div
            className={`flex items-center justify-center gap-6 md:gap-8 px-16
              transition-all duration-300 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            {getVisibleTestimonials().map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className={`
                  transition-all duration-300 ease-out
                  ${idx === 1 ? 'z-10' : 'z-0 hidden md:block opacity-60 scale-90'}
                `}
              >
                {/* Card */}
                <div 
                  className={`
                    w-[320px] bg-white rounded-2xl p-6 shadow-lg
                    border-2 transition-all duration-300
                    ${idx === 1 
                      ? 'border-blue-600 shadow-blue-200' 
                      : 'border-gray-200'}
                  `}
                >
                  {/* Image */}
                  <div className="flex justify-center mb-4">
                    <div className={`
                      w-28 h-30 rounded-full overflow-hidden border-4
                      ${idx === 1 ? 'border-blue-100' : 'border-gray-300'}
                    `}>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400';
                        }}
                      />
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-black">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-blue-600">
                      {testimonial.role}
                    </p>
                  </div>

                  {/* Text */}
                  <p className="text-gray-600 text-sm leading-relaxed text-center line-clamp-5">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            className="absolute right-0 z-10 p-3 rounded-full bg-white hover:bg-blue-600 
                       text-black hover:text-white transition-all duration-300 transform hover:scale-110
                       border border-blue-600 shadow-md"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => changeTestimonial(() => index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === (currentIndex + 1) % testimonials.length
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
