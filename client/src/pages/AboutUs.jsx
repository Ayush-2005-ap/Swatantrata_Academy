import { useEffect } from 'react';
import AboutHero from '../about/AboutHero';
import AboutIntro from '../about/AboutIntro';
import AboutValues from '../about/AboutValues';
import AboutStats from '../about/AboutStats';
import AboutTeam from '../about/AboutTeam';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <AboutHero />
      <AboutIntro />
      <AboutValues />
      {/* <AboutStats /> */}
      <AboutTeam />
    </div>
  );
};

export default About;
