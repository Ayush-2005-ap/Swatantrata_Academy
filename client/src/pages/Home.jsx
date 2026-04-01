import Hero from '../landing/Hero';
import ProgramsSection from '../landing/ProgramsSection';
import StatsSection from '../landing/StatsSection';
import UpcomingEventsSection from '../landing/UpcomingEventsSection';
import TestimonialsSection from '../landing/TestimonialsSection';
import CTASection from '../landing/CTASection';
import FeaturedFaculty from '../landing/FeaturedFaculty';
import Snowfall from 'react-snowfall';
import FloatingAnnouncement from '../components/FloatingAnnouncement';

const Home = () => {
  return (
    <div className="pt-20 bg-white overflow-hidden relative">
      <Hero />
      
      {/* Angled Transition */}
      <div className="relative h-24 -mt-[95px] z-10 bg-linear-to-b from-transparent to-slate-50">
        <div className="absolute bottom-0 w-full h-full bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}></div>
      </div>

      <div className="bg-mesh-light relative">
        <ProgramsSection />
      </div>

      {/* Gradient Transition */}
      <div className="h-32 bg-linear-to-b from-slate-50 via-white to-white relative z-10">
         <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="bg-white">
        <StatsSection />
      </div>

      {/* UPCOMING EVENTS SECTION (Dynamically Hidden if No Events) */}
      {/* We add a subtle divider before Upcoming Events to maintain flow */}
      <div className="relative z-10 w-full border-t border-gray-100"></div>
      <div className="bg-slate-50">
        <UpcomingEventsSection />
      </div>

      {/* Subtle Reverse Curve */}
      <div className="relative h-24 z-10 bg-slate-50">
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="bg-white">
         <div className="bg-soft-blue pb-10">
           <TestimonialsSection />
         </div>
      </div>

      {/* Concave Divider */}
      <div className="relative h-24 bg-slate-50">
         <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#5385fcff" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
         </svg>
      </div>

      <div className="bg-white">
        <FeaturedFaculty />
      </div>
      
      {/* Final Wave to Footer */}
      <div className="relative h-24 bg-white">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#153bb6ff" fillOpacity="1.5" d="M0,120L48,110C96,100,192,80,288,70C384,60,480,60,576,65C672,70,768,80,864,85C960,90,1056,90,1152,85C1248,80,1344,70,1392,65L1440,60L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>

      {/* Floating Announcement (Right Hand Side Glassmorphic Card) */}
      {/* Renders logic for active announcement */}
      <FloatingAnnouncement />
      
    </div>
  );
};

export default Home;
