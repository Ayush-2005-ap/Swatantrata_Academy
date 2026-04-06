import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
} from 'lucide-react';

/* 🔹 Dummy Event Data */
/* 
   To change or add a summary:
   1. Find the event in the 'programEvents' array below.
   2. Edit the 'about' property with your new summary text.
   3. Note: The 'id' must match the one used in ProgramDetail.jsx.
*/
const programEvents = [
  {
    id: 'yls-2024',
    programId: 'ipolicy-young-leaders',
    title: 'iPolicy Youth Leadership 2024',
    date: 'August 2024',
    isPast: true,
    about:
      'The Youth Leadership Summit 2024 brought together young leaders from across the country to discuss governance, ethics, and leadership. The event featured panel discussions, workshops, and interactive sessions led by experienced policymakers and scholars.',
  },
  {
    id: 'policy-dialogue',
    programId: 'ipolicy-young-leaders',
    title: 'Policy Dialogue Series',
    date: 'January 2024',
    isPast: true,
    about:
      'The Policy Dialogue Series explored the intersection of technology and governance in the 21st century. Scholars and practitioners engaged in vibrant debates about the future of digital democracy and the role of institutions in fostering innovation.',
  },
  {
    id: 'startup-policy',
    programId: 'colloquium',
    title: 'Startup & Policy Roundtable',
    date: 'February 2024',
    isPast: true,
    about:
      'Our Startup & Policy Roundtable brought together entrepreneurs and regulators to discuss the challenges of the startup ecosystem. The session focused on harmonizing innovation with regulatory frameworks to ensure sustainable growth.',
  },
];

const EventDetail = () => {
  const { programId, eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const event = programEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-white">
          <button
            onClick={() => navigate(`/programs/${programId}`)}
            className="flex items-center space-x-2 mb-6 text-blue-200 hover:outline-none hover:text-white"
          >
            <ArrowLeft size={18} />
            <span>Back to Program</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {event.title}
          </h1>

          <div className="flex items-center space-x-2 text-blue-200">
            <Calendar size={16} />
            <span>{event.date}</span>
          </div>
        </div>
      </div>

      {/* Content: Summary View only */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Event Summary
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {event.about.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetail;
