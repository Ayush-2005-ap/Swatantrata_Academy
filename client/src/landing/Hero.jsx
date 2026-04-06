import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
        src="/SA_web3.mp4" // Place your audioless video inside client/public/ folder as hero-video.mp4
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight"
          >
            SWATANTRA <span className="text-primary">ACADEMY</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl sm:text-5xl text-white font-bold"
          >
            Exploring the Power of Ideas
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <button onClick={() => navigate('/programs')} className="px-8 py-4 cursor-pointer bg-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/50">
              Explore Programs
            </button>
            <button onClick={() => navigate('/about')} className="px-8 py-4 cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient overlay to blend with next section */}
      <div className="absolute bottom-0 w-full h-60 bg-linear-to-b from-transparent to-blue-500"></div>
    </section>
  );
};

export default Hero;
