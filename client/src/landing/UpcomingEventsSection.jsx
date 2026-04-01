import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UpcomingEventsSection = () => {
  // Mock State: Later this will be fetched from the backend (e.g. GET /api/events/active)
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ---- PLACEHOLDER FOR BACKEND INTEGRATION ----
    // async function fetchUpcomingEvents() {
    //   try {
    //     const response = await fetch('/api/events?active=true');
    //     const data = await response.json();
    //     setEvents(data);
    //   } catch (error) {
    //     console.error("Failed to fetch events:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchUpcomingEvents();
    // ---------------------------------------------

    // Mocking a response from backend where the Admin has published 2 upcoming events
    const mockDbEvents = [
      {
        _id: "1",
        title: "Swatantrata Symposium 2026",
        date: "April 15, 2026",
        description: "Join us for our annual symposium focusing on global tech trends and ethical AI.",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        isActive: true,
      },
      {
        _id: "2",
        title: "Tech Innovation Workshop",
        date: "May 02, 2026",
        description: "A hands-on workshop led by industry experts covering advanced full-stack development.",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
        isActive: true,
      }
    ];

    setTimeout(() => {
      setEvents(mockDbEvents);
      setLoading(false);
    }, 500);
  }, []);

  // Strict rule: if there are no active events, return nothing (hidden from client)
  if (!loading && events.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
             Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our upcoming workshops, seminars, and special events. These are exclusively published by our administration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 bg-white border border-gray-100 flex flex-col sm:flex-row h-full"
            >
               {/* Event Image */}
               <div className="w-full sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                 <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent sm:hidden"></div>
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary font-bold px-3 py-1 rounded-full text-xs sm:hidden shadow-md">
                    {event.date}
                 </div>
               </div>

               {/* Event Details */}
               <div className="w-full sm:w-3/5 p-6 md:p-8 flex flex-col justify-center bg-linear-to-br from-white to-slate-50">
                  <div className="hidden sm:inline-block mb-3">
                     <span className="bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full text-sm">
                        {event.date}
                     </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                     {event.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                     {event.description}
                  </p>
                  
                  <div className="mt-auto">
                      <button className="flex items-center text-primary font-semibold hover:text-primary-dark transition-colors gap-2 group-hover:gap-3 ease-out duration-300">
                         Register Now 
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                         </svg>
                      </button>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
