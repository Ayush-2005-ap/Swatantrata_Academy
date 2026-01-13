import { useEffect, useState } from "react";

const banners = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    banners.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === banners.length) {
          setLoaded(true);
        }
      };
    });
  }, []);

  // Auto scroll
  useEffect(() => {
    if (!loaded) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <section className="w-full py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
          
          {loaded && (
            <img
              src={banners[current]}
              alt={`Banner ${current + 1}`}
              className="w-full h-full object-cover"
            />
          )}

        </div>
      </div>
    </section>
  );
};

export default Hero;
