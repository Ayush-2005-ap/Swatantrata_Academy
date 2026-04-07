import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Bell, 
  CheckCircle2, 
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Save,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPrograms: 0,
    totalEvents: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalFaculty: 0
  });

  const [settings, setSettings] = useState({
    UPCOMING_EVENTS_VISIBLE: true,
    SITE_NOTIFICATION: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Mock data for charts - in real scenario, these would come from backend
  const [engagementData, setEngagementData] = useState([]);
  const [compositionData, setCompositionData] = useState([]);
  const [inquiryStatusData, setInquiryStatusData] = useState([]);

  const COLORS = ['#2563eb', '#4f46e5', '#f59e0b', '#10b981'];

  const generateWeeklyData = (inquiries) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = {};
    days.forEach(d => counts[d] = 0);
    inquiries.forEach(inq => {
      const date = new Date(inq.createdAt);
      const dayName = days[date.getDay()];
      counts[dayName]++;
    });
    return days.map(d => ({ name: d, visits: counts[d] }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const [programsRes, eventsRes, inquiriesRes, membersRes, settingsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/programs`),
        axios.get(`${API_BASE_URL}/events`),
        axios.get(`${API_BASE_URL}/inquiries`, config),
        axios.get(`${API_BASE_URL}/members`),
        axios.get(`${API_BASE_URL}/settings`)
      ]);

      setStats({
        totalPrograms: Array.isArray(programsRes.data) ? programsRes.data.length : 0,
        totalEvents: Array.isArray(eventsRes.data) ? eventsRes.data.filter(e => !e.isPast).length : 0,
        totalInquiries: Array.isArray(inquiriesRes.data) ? inquiriesRes.data.length : 0,
        newInquiries: Array.isArray(inquiriesRes.data) ? inquiriesRes.data.filter(i => !i.isRead).length : 0,
        totalFaculty: Array.isArray(membersRes.data) ? membersRes.data.filter(m => m.type === 'faculty').length : 0
      });

      if (Array.isArray(inquiriesRes.data)) {
         setEngagementData(generateWeeklyData(inquiriesRes.data));
         setInquiryStatusData([
           { name: 'New (Unread)', value: inquiriesRes.data.filter(i => !i.isRead).length },
           { name: 'Processed', value: inquiriesRes.data.filter(i => i.isRead).length }
         ]);
      }

      setCompositionData([
        { name: 'Programs', value: programsRes.data.length },
        { name: 'Events', value: eventsRes.data.length },
        { name: 'Faculty', value: membersRes.data.filter(m => m.type === 'faculty').length }
      ]);

      if (settingsRes.data) {
        setSettings({
          UPCOMING_EVENTS_VISIBLE: settingsRes.data.UPCOMING_EVENTS_VISIBLE ?? true,
          SITE_NOTIFICATION: settingsRes.data.SITE_NOTIFICATION ?? ""
        });
      }

    } catch (err) {
      console.error("❌ [Analytics Sync]: Dashboard engine failure:", err);
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
      setMessage({ type: "success", text: `${key.replace(/_/g, ' ')} updated successfully!` });
      setTimeout(() => setMessage(null), 3000);
      fetchData(); // Refresh
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update setting." });
      console.error(err);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Initializing Academy Insights...</div>;

  return (
    <div className="p-8 space-y-10">
      {message && (
        <div className={`p-4 rounded-xl flex items-center space-x-3 fixed top-24 right-8 z-50 shadow-2xl animate-in slide-in-from-right ${
          message.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}>
          {message.type === "success" ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold">{message.text}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-black text-blue-950 tracking-tighter uppercase italic">Academy <span className="text-blue-600">Insights</span></h1>
          <p className="text-gray-500 mt-2 font-bold uppercase tracking-widest text-[10px]">Real-time metrics and system operations dashboard</p>
        </div>
        
        <div className="flex items-center space-x-4">
            <div className="bg-white border border-gray-100 flex items-center space-x-3 px-6 py-3 rounded-2xl shadow-sm">
                <Globe size={18} className="text-blue-600" />
                <span className="text-xs font-black text-blue-900 tracking-widest uppercase">Asia/Calcutta GMT +5:30</span>
            </div>
            <button onClick={fetchData} className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 cursor-pointer active:scale-95">
                <Zap size={20} />
            </button>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard 
          title="Total Inquiries" 
          value={stats.totalInquiries} 
          icon={MessageSquare} 
          color="bg-blue-600" 
          trend="up" 
          trendValue={stats.newInquiries > 0 ? (stats.newInquiries/stats.totalInquiries)*100 : 0} 
        />
        <MetricCard 
           title="Master Programs" 
           value={stats.totalPrograms} 
           icon={BookOpen} 
           color="bg-indigo-600" 
        />
        <MetricCard 
           title="Active Events" 
           value={stats.totalEvents} 
           icon={Calendar} 
           color="bg-amber-600" 
        />
        <MetricCard 
           title="Policy Faculty" 
           value={stats.totalFaculty} 
           icon={Users} 
           color="bg-emerald-600" 
        />
      </div>

      {/* Charts & Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visitors Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-10 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><TrendingUp size={20} /></div>
                    <h3 className="text-xl font-bold text-gray-900">Weekly Engagement</h3>
                </div>
                <div className="flex space-x-2">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Visitors</span>
                </div>
            </div>

            <div className="h-72 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementData}>
                        <defs>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}}
                        />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', fontWeight: 900 }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="visits" 
                            stroke="#2563eb" 
                            strokeWidth={4} 
                            fillOpacity={1} 
                            fill="url(#colorVisits)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            {/* Decal */}
            <div className="absolute bottom-0 right-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <TrendingUp size={300} />
            </div>
        </div>

        {/* Status Bar Chart */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-8 uppercase tracking-widest text-[10px]">Inquiry Pipeline</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inquiryStatusData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900}} />
                        <YAxis hide />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', shadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                            {inquiryStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#10b981'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Global Distribution Pie Chart */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest text-[10px]">Resource Allocation</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={compositionData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {compositionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: '10px', fontWeight: 900, textTransform: 'uppercase'}} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Announcement Card (Unified) */}
        <div className="lg:col-span-1">
            <section className="bg-blue-900 text-white rounded-3xl p-8 shadow-2xl h-full relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Bell size={80} />
                </div>
                <div>
                   <div className="flex items-center space-x-3 mb-6 relative z-10">
                      <Bell size={20} className="text-blue-300" />
                      <h3 className="text-lg font-bold uppercase tracking-tight italic">Live Alert</h3>
                   </div>
                   <textarea 
                     className="w-full bg-blue-800/50 border border-blue-700/50 p-6 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[140px] relative z-10"
                     value={settings.SITE_NOTIFICATION}
                     onChange={(e) => setSettings({...settings, SITE_NOTIFICATION: e.target.value})}
                  />
                </div>
                <button 
                   onClick={() => handleUpdateSetting('SITE_NOTIFICATION', settings.SITE_NOTIFICATION)}
                   className="mt-6 w-full bg-white text-blue-900 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] relative z-10 shadow-xl"
                >
                   Update Announcement
                </button>
            </section>
        </div>

        {/* Global Toggle Section */}
        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col justify-center">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Activity Switch</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase mt-1">Global Visibility</p>
                </div>
                <button 
                    onClick={() => handleUpdateSetting('UPCOMING_EVENTS_VISIBLE', !settings.UPCOMING_EVENTS_VISIBLE)}
                    className={`transition-colors duration-300 transform cursor-pointer ${
                    settings.UPCOMING_EVENTS_VISIBLE ? "text-blue-600" : "text-gray-300"
                    }`}
                >
                    {settings.UPCOMING_EVENTS_VISIBLE ? <ToggleRight size={48} /> : <ToggleLeft size={48} />}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const MetricCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group overflow-hidden relative">
    <div className={`p-4 rounded-2xl ${color} bg-opacity-10 absolute -right-4 -top-4 w-24 h-24 flex items-center justify-center rotate-12 transition-transform group-hover:rotate-0`}>
       <Icon size={40} className={color.replace('bg-', 'text-')} />
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center space-x-2 mb-4">
           <div className={`p-2 rounded-lg ${color}`}>
              <Icon size={16} className="text-white" />
           </div>
           <span className="text-xs font-black uppercase tracking-widest text-gray-400">{title}</span>
      </div>
      <div className="flex items-end justify-between">
         <div>
            <h3 className="text-4xl font-black text-blue-950 tracking-tighter">{value}</h3>
            {trend && (
              <div className={`flex items-center space-x-1 text-xs font-black uppercase tracking-widest mt-2 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  <ArrowUpRight size={14} />
                  <span>{trendValue}% Overall Gain</span>
              </div>
            )}
         </div>
      </div>
    </div>
  </div>
);

