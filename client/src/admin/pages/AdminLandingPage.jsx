import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../../config";
import { 
  Video, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Play,
  Bell,
  ToggleLeft,
  ToggleRight,
  Monitor,
  Zap,
  Globe
} from "lucide-react";

const AdminLandingPage = () => {
  const [settings, setSettings] = useState({
    HERO_VIDEO_URL: "",
    UPCOMING_EVENTS_VISIBLE: true,
    SITE_NOTIFICATION: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

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
      setMessage({ type: "success", text: `${key.replace(/_/g, ' ')} saved!` });
      setTimeout(() => setMessage(null), 3000);
      fetchSettings(); // Sync state
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage({ type: "error", text: "Session expired. Redirecting to login..." });
        setTimeout(() => navigate("/admin/login"), 2000);
      } else {
        setMessage({ type: "error", text: "Failed to update." });
      }
      console.error(err);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (Cloudinary free tier limit is usually around 100MB, but let's be safe)
    if (file.size > 100 * 1024 * 1024) {
      setMessage({ type: "error", text: "Video over 100MB. Please use extreme compression." });
      return;
    }

    const formData = new FormData();
    formData.append("media", file);
    setUploading(true);
    setMessage({ type: "success", text: "Uploading cinematic asset... please wait." });

    try {
      const token = localStorage.getItem("adminToken");
      // Note: We use the dedicated upload endpoint which handles Cloudinary
      const response = await axios.post(`${API_BASE_URL}/settings/upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      
      const uploadedUrl = response.data.mediaUrl;
      // After upload, update the specific HERO_VIDEO_URL setting
      await handleUpdateSetting("HERO_VIDEO_URL", uploadedUrl);
      setMessage({ type: "success", text: "Video uploaded and applied!" });
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage({ type: "error", text: "Session expired. Redirecting to login..." });
        setTimeout(() => navigate("/admin/login"), 2000);
      } else {
        console.error("Upload error details:", err.response?.data || err.message);
        setMessage({ type: "error", text: "Upload failed. Check file size or format." });
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Initalizing Landing Management...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-blue-950 tracking-tighter uppercase italic">Landing <span className="text-blue-600">Architect</span></h1>
          <p className="text-gray-500 mt-2 font-bold uppercase tracking-widest text-[10px]">Command center for your website's front-line experience</p>
        </div>
        <div className="flex items-center space-x-3 bg-white border border-gray-100 px-6 py-3 rounded-2xl shadow-sm">
            <Monitor size={18} className="text-blue-600" />
            <span className="text-xs font-black text-blue-900 tracking-widest uppercase italic">Live Site Editor</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visual Management */}
        <div className="lg:col-span-8 space-y-8">
            {/* Hero Cinematic Section */}
            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 group">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center space-x-4">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl">
                            <Video size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Hero Experience</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Homepage Background Asset</p>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-8">
                    <div className="relative group/vid rounded-[2rem] overflow-hidden aspect-video bg-blue-950 shadow-2xl">
                        {settings.HERO_VIDEO_URL ? (
                            <video 
                                key={settings.HERO_VIDEO_URL}
                                src={settings.HERO_VIDEO_URL.startsWith('http') || settings.HERO_VIDEO_URL.startsWith('/') ? settings.HERO_VIDEO_URL : `${BASE_URL}${settings.HERO_VIDEO_URL}`} 
                                autoPlay muted loop playsInline 
                                className="w-full h-full object-cover opacity-60"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-blue-300/30 font-black uppercase text-xs">No Video Active</div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 to-transparent"></div>
                        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                                    <Play size={20} className="fill-current" />
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Sync View</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-green-400 uppercase">Status: Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Asset URL / Path</label>
                            <div className="flex space-x-2">
                                <input 
                                    type="text" 
                                    className="flex-1 bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={settings.HERO_VIDEO_URL}
                                    onChange={(e) => setSettings({...settings, HERO_VIDEO_URL: e.target.value})}
                                    placeholder="/cinematic.mp4"
                                />
                                <button 
                                    onClick={() => handleUpdateSetting('HERO_VIDEO_URL', settings.HERO_VIDEO_URL)}
                                    className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all cursor-pointer active:scale-95"
                                >
                                    <Save size={20} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Direct Upload</label>
                            <label className={`w-full group bg-slate-50 border-2 border-dashed border-gray-200 py-3.5 rounded-2xl flex items-center justify-center transition-all cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                {uploading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                ) : (
                                    <>
                                        <Plus size={16} className="text-blue-600 mr-2" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Upload New (.mp4)</span>
                                    </>
                                )}
                                <input type="file" className="hidden" accept="video/*" onChange={handleVideoUpload} />
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Announcement Bar */}
            <section className="bg-blue-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="p-4 bg-white/10 text-white rounded-3xl">
                            <Bell size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Official Announcement</h2>
                            <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">Global Site Notification Banner</p>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <textarea 
                            className="w-full bg-blue-800/40 border border-blue-700/50 p-8 rounded-3xl text-sm font-semibold text-white focus:ring-2 focus:ring-blue-400 focus:outline-none min-h-[140px] placeholder-blue-300/30 shadow-inner"
                            value={settings.SITE_NOTIFICATION}
                            onChange={(e) => setSettings({...settings, SITE_NOTIFICATION: e.target.value})}
                            placeholder="e.g. Admission portal now open for Summer 2026 Batch..."
                        />
                        <button 
                            onClick={() => handleUpdateSetting('SITE_NOTIFICATION', settings.SITE_NOTIFICATION)}
                            className="w-full bg-white text-blue-950 px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-blue-50 transition-all cursor-pointer active:scale-95 flex items-center justify-center space-x-3"
                        >
                            <Zap size={18} className="fill-current" />
                            <span>Publish to Site</span>
                        </button>
                    </div>
                </div>
                {/* Visual Decal */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
                    <Bell size={200} />
                </div>
            </section>
        </div>

        {/* Right Column: Interaction Controls */}
        <div className="lg:col-span-4 space-y-8">
            
            {/* Global Visibility Toggles */}
            <section className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-10">Interface Controls</h3>
                
                <div className="space-y-12">
                    {/* Toggle Template */}
                    <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                            <h4 className="text-sm font-black text-gray-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">Upcoming Events</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed pr-8">
                                Shows/hides the event registry on the homepage
                            </p>
                        </div>
                        <button 
                            onClick={() => handleUpdateSetting('UPCOMING_EVENTS_VISIBLE', !settings.UPCOMING_EVENTS_VISIBLE)}
                            className={`transition-all duration-500 transform cursor-pointer ${
                                settings.UPCOMING_EVENTS_VISIBLE ? "text-blue-600 rotate-0" : "text-gray-300"
                            }`}
                        >
                            {settings.UPCOMING_EVENTS_VISIBLE ? <ToggleRight size={52} /> : <ToggleLeft size={52} />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                            <h4 className="text-sm font-black text-gray-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">Global Notification</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed pr-8">
                                Site-wide announcement bar visibility
                            </p>
                        </div>
                        <div className="text-blue-600/30">
                             <ToggleRight size={52} className="opacity-20 cursor-not-allowed" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Audit Card */}
            <section className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-black text-white uppercase tracking-[0.2em] text-[10px] mb-8">System Audit</h3>
                    <div className="space-y-5">
                       <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Vercel Status</span>
                            <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Optimized</span>
                       </div>
                       <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Asset Sync</span>
                            <span className="bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Live</span>
                       </div>
                       <div className="flex items-center justify-between pt-5 border-t border-white/5">
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Active Server</span>
                            <span className="text-[10px] font-black text-blue-500 uppercase italic">OnRender-Primary</span>
                       </div>
                    </div>
                </div>
                <Globe size={180} className="absolute -bottom-20 -right-20 text-white/5" />
            </section>

        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
