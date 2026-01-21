const team = [
  {
    name: 'Dr. Amit Chandra',
    role: 'Director',
    image: '/Board/Board1.png',
  },
  {
    name: 'Kumar Anand',
    role: 'Academic Head',
    image: '/Board/Board2.png',
  },
  {
    name: 'Sujatha Muthayya',
    role: 'Program Manager',
    image: '/Board/Board3.png',
  },
  {
    name: 'Ms. Ananya Singh',
    role: 'Research Coordinator',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
  },
  {
    name: 'Renu Pokharna',
    role: 'Policy Advisor',
    image: '/Board/Board4.png',
  },
];

const AboutTeam = () => {
  return (
    <section
      aria-label="Board Members"
      className="max-w-7xl mx-auto px-4 "
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
        Our <span className="text-blue-600">Board</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {team.map((member) => (
          <article
            key={member.name}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl 
                       hover:-translate-y-2 transition-all duration-300 
                       overflow-hidden focus-within:ring-2 ring-blue-500"
          >
            <img
              src={member.image}
              alt={`${member.name} – ${member.role}`}
              loading="lazy"
              sizes="(max-width: 1024px) 50vw, 20vw"
              className="w-full aspect-square object-cover 
                         transition-transform duration-300 
                         hover:scale-105"
            />

            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-blue-600 text-sm font-medium mt-1">
                {member.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutTeam;
