import { Users, Award, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Alumni Network' },
  { icon: Award, value: '300+', label: 'Fellows Trained' },
  { icon: Globe, value: '50+', label: 'Partner Organizations' },
];

const AboutStats = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="inline-flex w-16 h-16 items-center justify-center bg-white/20 rounded-2xl mb-4">
                <stat.icon className="text-white" size={32} />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutStats;
