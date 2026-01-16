import Hero from '../landing/Hero';
import ProgramsSection from '../landing/ProgramsSection';
import StatsSection from '../landing/StatsSection';
import TestimonialsSection from '../landing/TestimonialsSection';
import CTASection from '../landing/CTASection';
import FeaturedFaculty from '../landing/FeaturedFaculty';
// import Faculty from './Faculty';

const Home = () => {
  return (
    <div className="pt-20">
      <Hero />
      <ProgramsSection />
      <StatsSection />
      <TestimonialsSection />
      <FeaturedFaculty />
      {/* <CTASection /> */}
    </div>
  );
};

export default Home;
