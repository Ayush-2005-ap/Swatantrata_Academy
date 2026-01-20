import { useEffect, useState } from 'react';

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-800 via-blue-1100 to-blue-900 py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Us
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Championing liberal values and shaping the future of public policy in India
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
