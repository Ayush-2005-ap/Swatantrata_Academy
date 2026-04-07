import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../config";

const FloatingAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    const fetchSyncData = async () => {
      try {
        const [settingsRes, eventsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/settings`),
          axios.get(`${API_BASE_URL}/events`)
        ]);

        const hasActiveEvents = eventsRes.data.some(e => e.isPast === false);
        const globalVisible = settingsRes.data.UPCOMING_EVENTS_VISIBLE !== false;

        // Condition: Show only if Admin allows AND there's something to announce
        if (globalVisible && hasActiveEvents) {
          const firstUpcoming = eventsRes.data.find(e => e.isPast === false);
          setAnnouncement({
            title: "New Program Launched!",
            message: firstUpcoming ? `Upcoming: ${firstUpcoming.title} on ${firstUpcoming.date}` : "Enrollments for the next batch are now open.",
            link: "/programs"
          });
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (err) {
        console.error("❌ [Announcement Sync]: Shielding offline.", err);
      }
    };
    
    fetchSyncData();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && announcement && (
        <motion.div
           initial={{ opacity: 0, x: 100, scale: 0.9 }}
           animate={{ opacity: 1, x: 0, scale: 1 }}
           exit={{ opacity: 0, x: 100, scale: 0.9 }}
           transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
           className="fixed bottom-6 right-6 z-50 w-80 
                      bg-white/80 backdrop-blur-xl border border-white/20 
                      shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-5"
        >
          {/* Close button cross */}
          <button 
             onClick={() => setIsVisible(false)}
             className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors bg-white/50 rounded-full p-1"
             aria-label="Close"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
             </svg>
          </button>

          <div className="flex items-start gap-3 mt-1">
             <div className="bg-primary/10 p-2 rounded-xl text-primary mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
             </div>
             <div>
                <h4 className="font-bold text-gray-900 tracking-tight">{announcement.title}</h4>
                <p className="text-sm text-gray-600 mt-1 leading-snug">
                  {announcement.message}
                </p>
                <a 
                   href={announcement.link} 
                   className="inline-block mt-3 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                   Learn more &rarr;
                </a>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingAnnouncement;
