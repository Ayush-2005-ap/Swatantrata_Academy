import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { 
  Settings, 
  Video, 
  ToggleLeft, 
  ToggleRight, 
  Save, 
  Bell, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from "lucide-react";

const AdminDashboard = () => {
  const [settings, setSettings] = useState({
    HERO_VIDEO_URL: "",
    UPCOMING_EVENTS_VISIBLE: true,
    SITE_NOTIFICATION: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings`);
      setSettings(prev => ({ ...prev, ...response.data }));
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSetting = async (key, value) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${API_BASE_URL}/settings`, 
        { key, value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: "success", text: `${key} updated successfully!` });
      setTimeout(() => setMessage(null), 3000);
      fetchSettings();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update setting." });
      console.error(err);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("media", file);
    setUploading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${API_BASE_URL}/settings/upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      handleUpdateSetting("HERO_VIDEO_URL", response.data.mediaUrl);
      setMessage({ type: "success", text: "Hero Video updated!" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Video upload failed." });
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading Settings...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-blue-950 tracking-tighter">Site-wide Controls</h1>
          <p className="text-gray-500 mt-2">Manage your homepage and global site features instantly.</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center space-x-3 fixed top-24 right-8 z-50 shadow-2xl animate-in slide-in-from-right ${
          message.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}>
          {message.type === "success" ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold">{message.text}</span>
        </div>
      )}

      {/* Hero Video Management */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Video size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
        </div>
        
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-550 uppercase tracking-widest">Background Video URL</label>
          <div className="flex space-x-4">
            <input 
              type="text" 
              className="flex-1 bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={settings.HERO_VIDEO_URL}
              onChange={(e) => setSettings({...settings, HERO_VIDEO_URL: e.target.value})}
              placeholder="/SA_web3.mp4 or external URL"
            />
            <label className={`bg-blue-50 text-blue-600 px-8 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all cursor-pointer hover:bg-blue-100 ${uploading ? 'opacity-50' : ''}`}>
               {uploading ? (
                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
               ) : (
                 <>
                   <Plus size={18} />
                   <span>Upload Video</span>
                 </>
               )}
               <input type="file" className="hidden" accept="video/*" onChange={handleVideoUpload} disabled={uploading} />
            </label>
            <button 
              onClick={() => handleUpdateSetting('HERO_VIDEO_URL', settings.HERO_VIDEO_URL)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all cursor-pointer hover:shadow-lg shadow-blue-200 active:scale-95"
            >
              <Save size={18} />
              <span>Update URL</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Recommended: .mp4 format, optimized for web (under 5MB).</p>
        </div>
      </section>

      {/* Global Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Toggle Sections */}
        <section className="bg-slate-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
              <button 
                onClick={() => handleUpdateSetting('UPCOMING_EVENTS_VISIBLE', !settings.UPCOMING_EVENTS_VISIBLE)}
                className={`transition-colors duration-300 p-0 transform cursor-pointer ${
                  settings.UPCOMING_EVENTS_VISIBLE ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {settings.UPCOMING_EVENTS_VISIBLE ? <ToggleRight size={48} /> : <ToggleLeft size={48} />}
              </button>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enable or disable the "Upcoming Events" section site-wide. When DISABLED, the section will be hidden from the homepage completely.
            </p>
          </div>
          
          <div className="mt-8 flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${settings.UPCOMING_EVENTS_VISIBLE ? "bg-green-500" : "bg-gray-300"}`}></div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              {settings.UPCOMING_EVENTS_VISIBLE ? "Currently Visible" : "Currently Hidden"}
            </span>
          </div>
        </section>

        {/* Notification Banner */}
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Bell size={24} className="text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Top Notification Bar</h3>
          </div>
          <div className="space-y-4">
            <textarea 
              className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[80px]"
              value={settings.SITE_NOTIFICATION}
              onChange={(e) => setSettings({...settings, SITE_NOTIFICATION: e.target.value})}
              placeholder="e.g. Early Bird Registrations Open for iPolicy 2025!"
            />
            <button 
               onClick={() => handleUpdateSetting('SITE_NOTIFICATION', settings.SITE_NOTIFICATION)}
               className="w-full bg-slate-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold transition-all cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
            >
              <Save size={18} />
              <span>Update Banner Message</span>
            </button>
          </div>
        </section>
      </div>

    </div>
  );
};

export default AdminDashboard;
