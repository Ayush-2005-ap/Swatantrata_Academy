import { ThumbsUp, DollarSign, Scale, Landmark } from 'lucide-react';

const values = [
  {
    title: 'INDIVIDUAL RIGHTS',
    description: 'My right to swing my arm ends where your nose begins.',
    icon: ThumbsUp,
  },
  {
    title: 'FREEDOM OF EXCHANGE',
    description: 'Whenever two parties trade voluntarily, both parties benefit.',
    icon: DollarSign,
  },
  {
    title: 'RULE OF LAW',
    description: 'Where there is no rule of laws, we are ruled by the whims of men.',
    icon: Scale,
  },
  {
    title: 'LIMITED GOVERNMENT',
    description:
      "A government big enough to give you everything you want is big enough to take away everything you've got.",
    icon: Landmark,
  },
];

const AboutValues = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-light text-center text-blue-900 mb-20">
          Our Liberal Approach
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((item, index) => (
            <div
              key={index}
              className="group bg-[#062f5c] text-white p-10 rounded-md
                         shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                         transition-all duration-500 ease-out
                         hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(11,111,191,0.45)]
                         opacity-0 animate-fadeUp hover:cursor-pointer"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Icon */}
              <div className="relative mx-auto w-28 h-28 rounded-full bg-[#0b6fbf]
                              flex items-center justify-center mb-8
                              transition-all duration-500
                              group-hover:scale-110 group-hover:rotate-6">

                {/* Glow Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-300
                                opacity-0 group-hover:opacity-100
                                scale-125 group-hover:scale-150
                                transition-all duration-500"></div>

                <item.icon size={46} className="text-white relative z-10" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold tracking-wide mb-4
                             transition-colors duration-300
                             group-hover:text-blue-200">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-blue-100 leading-relaxed
                            transition-all duration-300
                            group-hover:text-white">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.9s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default AboutValues;
