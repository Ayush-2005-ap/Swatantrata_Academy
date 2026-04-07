import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { BellRing, X } from "lucide-react";

const TopBanner = () => {
  const [notification, setNotification] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchSync = async () => {
      try {
        const [settingsRes, eventsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/settings`),
          axios.get(`${API_BASE_URL}/events`)
        ]);

        const hasActiveEvents = eventsRes.data.some(e => e.isPast === false);
        const globalVisible = settingsRes.data.UPCOMING_EVENTS_VISIBLE !== false;

        if (globalVisible && hasActiveEvents && settingsRes.data.SITE_NOTIFICATION) {
          setNotification(settingsRes.data.SITE_NOTIFICATION);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (err) {
        console.error("Banner fetch failed:", err);
      }
    };
    fetchSync();
  }, []);

  if (!notification || !isVisible) return null;

  return (
    <div className="bg-indigo-600 text-white py-3 px-4 relative z-[60] flex items-center justify-center animate-in slide-in-from-top duration-500 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center space-x-3 text-center">
        <BellRing size={18} className="animate-bounce" />
        <p className="text-sm md:text-base font-bold tracking-tight">
          {notification}
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 hover:bg-white/20 p-1 rounded-full transition-colors cursor-pointer"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default TopBanner;
