import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';

// 🔹 SAME programs data (temporary duplication – later moved to data folder)
const programs = [
  {
    id: 'ipolicy-young-leaders',
    title: 'iPolicy for Young Leaders',
    description:
      'The iPolicy for Young Leaders program focuses on developing ethical, research-driven policy thinkers who can contribute meaningfully to governance and public policy.',
  },
  {
    id: 'colloquium',
    title: 'Colloquium',
    description:
      'Colloquium brings together students and experts for deep discussions on leadership, governance, and public policy challenges.',
  },
  {
    id: 'aes',
    title: 'AES',
    description:
      'AES is a competitive scholarship-based program aimed at identifying and nurturing high-potential individuals.',
  },
  {
    id: 'epolicy-young-leaders',
    title: 'ePolicy for Young Leaders',
    description:
      'A long-term immersive program offering hands-on experience in policy analysis and advocacy.',
  },
  {
    id: 'policy-camp',
    title: 'Policy Camp',
    description:
      'Policy Camp is an intensive short-term training covering policy fundamentals and real-world applications.',
  },
  {
    id: 'mooc',
    title: 'MOOC',
    description:
      'A structured online learning program designed for professionals and students alike.',
  },
  {
    id: 'master-class',
    title: 'Master Class',
    description:
      'Master Classes are expert-led sessions focused on niche policy and leadership topics.',
  },
  {
    id: 'credit-courses',
    title: 'Credit Courses',
    description:
      'Self-paced academic credit courses covering economics, governance, and public policy.',
  },
];

// 🔹 Dummy events
const programEvents = [
  {
    id: 'yls-2024',
    programId: 'ipolicy-young-leaders',
    title: 'iPolicy Youth Leadership 2025',
    date: 'March 2024',
  },
  {
    id: 'policy-dialogue',
    programId: 'ipolicy-young-leaders',
    title: 'Policy Dialogue Series',
    date: 'January 2024',
  },
  {
    id: 'startup-policy',
    programId: 'colloquium',
    title: 'Startup & Policy Roundtable',
    date: 'February 2024',
  },
];

const ProgramDetail = () => {
  const { programId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const program = programs.find(p => p.id === programId);
  const events = programEvents.filter(e => e.programId === programId);

  if (!program) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold">Program not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-white">
          <button
            onClick={() => navigate('/programs')}
            className="flex items-center space-x-2 mb-6 hover:cursor-pointer text-blue-200 hover:text-white"
          >
            <ArrowLeft size={18} />
            <span>Back to Programs</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {program.title}
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl">
            {program.description}
          </p>
        </div>
      </div>

      {/* Past Events */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Past Events
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-600">
            No events have been conducted yet under this program.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>

                <button
                  onClick={() =>
                    navigate(`/programs/${programId}/events/${event.id}`)
                  }
                  className="inline-flex hover:cursor-pointer items-center space-x-2 text-blue-600 font-semibold hover:text-blue-800"
                >
                  <span>View Event Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramDetail;
