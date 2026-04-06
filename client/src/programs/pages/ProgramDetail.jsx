import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../../config';

const ProgramDetail = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        // Fetch specific program info (We can use the all-programs list and filter)
        const programsRes = await axios.get(`${API_BASE_URL}/programs`);
        const foundProgram = programsRes.data.find(p => p.id === programId);
        setProgram(foundProgram);

        // Fetch events for this program
        const eventsRes = await axios.get(`${API_BASE_URL}/events/program/${programId}`);
        setEvents(eventsRes.data);
      } catch (err) {
        console.error("Error fetching program details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [programId]);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold animate-pulse text-gray-400">Loading Program Details...</h1>
      </div>
    );
  }

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
