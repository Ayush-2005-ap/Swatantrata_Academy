import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { API_BASE_URL } from '../../config';

const EventDetail = () => {
  const { programId, eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold animate-pulse text-gray-400">Loading Summary...</h1>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(`/programs/${programId}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Program</span>
        </button>
      </div>

      {/* Banner & Title Section */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        {event.bannerImage ? (
          <div className="w-full rounded-2xl overflow-hidden shadow-xl mb-8 border border-gray-200">
            <img 
              src={event.bannerImage} 
              alt={event.title} 
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg">
            <Calendar size={64} className="opacity-20" />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {event.title}
        </h1>
        <div className="flex items-center space-x-2 text-gray-600 text-lg">
          <Calendar size={20} />
          <span>{event.date}</span>
        </div>
      </div>

      {/* Content: Summary */}
      <div className="max-w-6xl mx-auto px-4">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">
              Event Summary
            </h2>
            {event.registrationLink && !event.isPast && (
              <a 
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md"
              >
                Register Now
              </a>
            )}
          </div>
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
