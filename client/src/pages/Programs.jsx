import { useState, useEffect } from 'react';
import {
  BookOpen,
  Users,
  Award,
  Briefcase,
  Calendar,
  TrendingUp,
  Clock,
  MapPin,
  ArrowRight,
} from 'lucide-react';

const Programs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const programs = [
    {
      icon: BookOpen,
      title: 'iPolicy for Young Leaders',
      duration: '2-3 Days',
      location: 'TBD',
      description:
        'Engage in cutting-edge research on liberal economic policies and governance. Work alongside renowned scholars and contribute to policy papers.',
      features: ['Research Stipend', 'Mentorship', 'Publication Support', 'Networking Events'],
      color: 'from-blue-500 to-cyan-500',
      logo: '/Logos/Logos1.png', // ✅ ADD YOUR LOGO HERE
    },
    {
      icon: Users,
      title: 'Colloquium',
      duration: '3 Days',
      location: 'Multiple Cities',
      description:
        'Develop leadership skills through intensive workshops and mentorship. Learn from successful policy leaders and change-makers.',
      features: ['Workshop Series', 'One-on-One Mentoring', 'Case Studies', 'Leadership Projects'],
      color: 'from-purple-500 to-pink-500',
      logo: '/Logos/Logos2.png',
    },
    {
      icon: Award,
      title: 'AES',
      duration: '1-2 Days',
      location: 'Online',
      description:
        'Competitive program for outstanding individuals committed to change. Full scholarship with comprehensive training.',
      features: ['Full Scholarship', 'Research Training', 'International Exposure', 'Career Guidance'],
      color: 'from-orange-500 to-red-500',
      logo: '/Logos/Logos3.png',
    },
    {
      icon: Briefcase,
      title: 'ePolicy for Young Leaders',
      duration: '2-3 months',
      location: 'New Delhi',
      description:
        'Hands-on experience in policy analysis and advocacy. Perfect for students looking to explore policy careers.',
      features: ['Project Work', 'Skill Development', 'Certificate', 'Stipend'],
      color: 'from-green-500 to-teal-500',
      logo: '/Logos/Logos5.png',
    },
    {
      icon: Calendar,
      title: 'Policy Camp',
      duration: '2 weeks',
      location: 'Various',
      description:
        'Intensive training program covering policy fundamentals, research methods, and advocacy strategies.',
      features: ['Intensive Training', 'Expert Sessions', 'Group Projects', 'Certification'],
      color: 'from-indigo-500 to-purple-500',
      logo: '/Logos/Logos4.png',
    },
    {
      icon: TrendingUp,
      title: 'MOOC',
      duration: '1 month',
      location: 'New Delhi',
      description:
        'Advanced program for mid-career professionals seeking to deepen their policy expertise and leadership capabilities.',
      features: ['Executive Coaching', 'Peer Learning', 'Network Building', 'Strategic Thinking'],
      color: 'from-pink-500 to-rose-500',
      logo: '/Logos/Logos6.png',
    },
    {
      icon: Users,
      title: 'Master Class',
      duration: 'Ongoing',
      location: 'Various Locations',
      description:
        'Engage with local communities to understand grassroots issues and develop inclusive policy solutions.',
      features: ['Field Visits', 'Workshops', 'Community Projects', 'Impact Assessment'],
      color: 'from-yellow-500 to-amber-500',
      logo: '/Logos/Logos7.png',
    },
    {
      icon: BookOpen,
      title: 'Credit Courses',
      duration: 'Self-paced',
      location: 'Online',
      description:
        'Flexible online courses covering various aspects of public policy, economics, and governance.',
      features: ['Flexible Learning', 'Expert Instructors', 'Certification', 'Community Access'],
      color: 'from-cyan-500 to-blue-500',
      logo: '/Logos/Logos8.png',
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-900 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Programs
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Choose from our diverse range of programs designed to nurture critical thinking,
              leadership, and policy expertise
            </p>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500
                transform hover:-translate-y-2 overflow-hidden
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Top Color Strip */}
              <div className={`h-2 bg-gradient-to-r ${program.color}`} />

              <div className="p-8">
                {/* ✅ PROGRAM LOGO SECTION (NEW) */}
                <div className="mb-6">
                  <div className="w-full h-24 rounded-xl 
                                  flex items-center justify-center
                                  shadow-inner">
                    <img
                      src={program.logo}
                      alt={`${program.title} logo`}
                      className="max-h-24 object-contain"
                    />
                  </div>
                </div>

                {/* Icon */}
                {/* <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${program.color}
                      rounded-xl flex items-center justify-center
                      transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <program.icon className="text-white" size={32} />
                  </div>
                </div> */}

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {program.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{program.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {program.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Program Highlights:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {program.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  className="group/btn w-full bg-gradient-to-r from-blue-600 to-blue-700
                             text-white px-6 py-3 rounded-lg font-semibold
                             hover:from-blue-700 hover:to-blue-800
                             transition-all duration-300
                             flex items-center justify-center space-x-2"
                >
                  <span>View More</span>
                  <ArrowRight
                    className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    size={18}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
