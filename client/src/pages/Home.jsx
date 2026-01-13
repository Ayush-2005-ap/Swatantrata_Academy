import Hero from '../landing/Hero';
import ProgramsSection from '../landing/ProgramsSection';
import StatsSection from '../landing/StatsSection';
import TestimonialsSection from '../landing/TestimonialsSection';
import CTASection from '../landing/CTASection';

const Home = () => {
  return (
    <div className="pt-20">
      <Hero />
      <ProgramsSection />
      <StatsSection />
      <TestimonialsSection />
      {/* <CTASection /> */}
    </div>
  );
};

export default Home;
