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

  const activeEvents = events.filter(e => !e.isPast);
  const pastEvents = events.filter(e => e.isPast);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
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

      {/* Active Programs / Registration */}
      {activeEvents.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Active Programs
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {activeEvents.map(event => (
              <div 
                key={event.id}
                className="bg-white border-2 border-blue-100 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row"
              >
                {event.bannerImage && (
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={event.bannerImage} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-6">
                    <Calendar size={18} className="mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate(`/programs/${programId}/events/${event.id}`)}
                      className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </button>
                    {event.registrationLink && (
                      <a 
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center"
                      >
                        Register Now
                        <ArrowRight size={18} className="ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Past Events
        </h2>

        {pastEvents.length === 0 ? (
          <p className="text-gray-600">
            No past events to display.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {pastEvents.map(event => (
              <div
                key={event.id}
                onClick={() => navigate(`/programs/${programId}/events/${event.id}`)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden flex items-center cursor-pointer group"
              >
                {/* Poster Image Box */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100 overflow-hidden m-4 rounded-lg border border-gray-100">
                  {event.bannerImage ? (
                    <img 
                      src={event.bannerImage} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Calendar size={32} />
                    </div>
                  )}
                </div>

                {/* Event Info */}
                <div className="flex-1 py-4 pr-6 flex flex-col justify-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <Calendar size={14} />
                    <span>{event.date}</span>
                  </div>
                </div>

                <div className="hidden sm:flex pr-8 text-gray-300 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all">
                  <ArrowRight size={24} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramDetail;
