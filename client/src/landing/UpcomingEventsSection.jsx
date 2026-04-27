import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Calendar as CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpcomingEventsSection = () => {
  const [events, setEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(true); // From Admin Settings
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;

    const fetchData = async () => {
      try {
        const [eventsRes, settingsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/events`),
          axios.get(`${API_BASE_URL}/settings`)
        ]);
        
        if (settingsRes.data.UPCOMING_EVENTS_VISIBLE !== undefined) {
          setIsVisible(settingsRes.data.UPCOMING_EVENTS_VISIBLE);
        }

        // STRICT LOGIC: Only show events explicitly marked as NOT past (isPast: false)
        const upcoming = eventsRes.data.filter(e => e.isPast === false);
        setEvents(upcoming);

        // ✅ Only start live-sync polling AFTER a successful first fetch
        if (!interval) {
          interval = setInterval(async () => {
            try {
              const [eRes, sRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/events`),
                axios.get(`${API_BASE_URL}/settings`)
              ]);
              if (sRes.data.UPCOMING_EVENTS_VISIBLE !== undefined) {
                setIsVisible(sRes.data.UPCOMING_EVENTS_VISIBLE);
              }
              setEvents(eRes.data.filter(e => e.isPast === false));
            } catch {
              // Silently skip — backend temporarily unreachable, no console spam
            }
          }, 60000); // 60s interval — much gentler on the server
        }

      } catch (err) {
        // Only log on the initial fetch failure, not on every poll retry
        if (import.meta.env.DEV) {
          console.warn("⚠️ [Events]: Backend offline or slow, will retry next load.", err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    return () => { if (interval) clearInterval(interval); };
  }, []);

  if (loading) return null;
  if (!isVisible) return null;

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative glassmorphic bubble */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-20 -translate-y-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 border border-blue-100">
             <CalendarIcon size={14} />
             <span>Calendar 2024-25</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">
             Upcoming <span className="text-blue-600">Events</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Step into the arena of ideas. Join our upcoming workshops and symposia designed for policy thinkers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col md:flex-row h-full"
            >
               {/* Event Content */}
               <div className="flex-1 p-8 md:p-10 flex flex-col">
                  <div className="flex items-center space-x-3 mb-6">
                     <span className="bg-indigo-600 text-white font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest">
                        {event.programId}
                     </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                     {event.title}
                  </h3>
                  
                  <p className="text-gray-500 mb-8 font-medium leading-relaxed line-clamp-3">
                     {event.about}
                  </p>
                  
                  <div className="mt-auto space-y-6">
                      <div className="flex items-center space-x-6 text-sm">
                         <div className="flex items-center space-x-2 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                            <CalendarIcon size={16} className="text-blue-600" />
                            <span>{event.date}</span>
                         </div>
                         <div className="flex items-center space-x-2 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                            <Clock size={16} className="text-blue-600" />
                            <span>Full Day</span>
                         </div>
                      </div>

                      <button 
                         onClick={() => navigate(`/programs/${event.programId}/events/${event.id}`)}
                         className="flex items-center text-blue-600 font-black gap-2 group/btn cursor-pointer"
                      >
                         <span className="uppercase tracking-widest text-xs">Learn More & Register</span> 
                         <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </button>
                  </div>
               </div>

               {/* Right Decoration Bar */}
               <div className="w-2 bg-indigo-600 group-hover:w-4 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;

