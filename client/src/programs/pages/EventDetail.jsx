import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Quote,
  Image as ImageIcon,
} from 'lucide-react';

/* 🔹 Dummy Event Data (Supabase-ready structure) */
const programEvents = [
  {
    id: 'yls-2024',
    programId: 'ipolicy-young-leaders',
    title: 'Youth Leadership Summit 2024',
    date: 'March 2024',
    about:
      'The Youth Leadership Summit 2024 brought together young leaders from across the country to discuss governance, ethics, and leadership. The event featured panel discussions, workshops, and interactive sessions led by experienced policymakers and scholars.',

    quotes: [
      {
        name: 'Dr. Amit Chandra',
        text: 'Leadership is not about authority, but about responsibility and service.',
      },
      {
        name: 'Policy Expert',
        text: 'Young leaders must think beyond politics and focus on institutions.',
      },
    ],

    testimonials: [
      {
        name: 'Participant – Delhi',
        feedback:
          'This summit completely changed how I view leadership and public service.',
      },
      {
        name: 'Student – Mumbai',
        feedback:
          'The discussions were insightful and deeply engaging. A must-attend event.',
      },
    ],

    gallery: [
      '/events/yls-2024/1.jpg',
      '/events/yls-2024/2.jpg',
      '/events/yls-2024/3.jpg',
    ],
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
            className="flex items-center space-x-2 mb-6 text-blue-200 hover:text-white"
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-20">

        {/* What Happened */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Happened
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-4xl">
            {event.about}
          </p>
        </section>

        {/* Expert Quotes */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Expert Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {event.quotes.map((quote, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <Quote className="text-blue-600 mb-4" />
                <p className="italic text-gray-700 mb-4">
                  “{quote.text}”
                </p>
                <p className="font-semibold text-gray-900">
                  — {quote.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Testimonials
          </h2>

          <div className="space-y-6 max-w-4xl">
            {event.testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <p className="text-gray-700 mb-2">
                  “{t.feedback}”
                </p>
                <p className="font-semibold text-gray-900">
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-2">
            <ImageIcon />
            <span>Event Gallery</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {event.gallery.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={img}
                  alt="Event"
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default EventDetail;
