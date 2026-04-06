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
