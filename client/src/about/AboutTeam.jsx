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
      name: 'SUJATHA MUTHAYYA',
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
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
           Our <span className="text-blue-600">Board </span>
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AboutTeam;
  