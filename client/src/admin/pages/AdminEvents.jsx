import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { 
  Calendar, 
  Trash2, 
  Plus, 
  Edit3, 
  Search, 
  ChevronRight, 
  Clock, 
  Tag 
} from "lucide-react";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [programsList, setProgramsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    programId: "",
    title: "",
    date: "",
    about: "",
    isPast: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, programsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/events`),
        axios.get(`${API_BASE_URL}/programs`)
      ]);
      setEvents(eventsRes.data);
      setProgramsList(programsRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(events.filter(e => e._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        id: event.id,
        programId: event.programId,
        title: event.title,
        date: event.date,
        about: event.about,
        isPast: event.isPast
      });
    } else {
      setEditingEvent(null);
      setFormData({ id: "", programId: "", title: "", date: "", about: "", isPast: false });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingEvent) {
        await axios.put(`${API_BASE_URL}/events/${editingEvent._id}`, formData, config);
      } else {
        await axios.post(`${API_BASE_URL}/events`, formData, config);
      }
      
      setIsModalOpen(false);
      fetchData(); // Refresh list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save event.");
    }
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.programId.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-20 text-center font-bold">Loading Events...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-blue-950 tracking-tighter uppercase italic">Event Management</h1>
          <p className="text-gray-500 mt-2">Create and edit summaries for all your past and upcoming academy events.</p>
        </div>
        
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95 cursor-pointer uppercase tracking-widest text-sm"
        >
          <Plus size={20} />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Quick Stats & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
           <div className="bg-blue-50 text-blue-600 p-3 rounded-xl"><Calendar size={24} /></div>
           <div>
             <span className="text-2xl font-black text-gray-900 leading-none">{events.length}</span>
             <p className="text-xs text-gray-400 font-bold uppercase mt-1">Total Events</p>
           </div>
        </div>
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-6 top-5 text-gray-400" size={20} />
            <input 
               type="text" 
               className="w-full bg-white border border-gray-200 pl-14 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm"
               placeholder="Search by event title, program code, or year..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Events Table/List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-100 p-6 text-xs font-black uppercase tracking-widest text-gray-400">
           <div className="col-span-5">Event Title & Date</div>
           <div className="col-span-3">Associated Program</div>
           <div className="col-span-2 text-center">Status</div>
           <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-50">
          {filteredEvents.map((event) => (
            <div key={event._id} className="grid grid-cols-12 p-6 hover:bg-slate-50 transition-colors items-center group">
               <div className="col-span-5 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">
                     {event.date.slice(-4)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
                       <Clock size={14} />
                       <span>{event.date}</span>
                    </div>
                  </div>
               </div>

               <div className="col-span-3">
                  <div className="flex items-center space-x-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg w-fit text-xs font-bold uppercase">
                     <Tag size={12} />
                     <span>{event.programId}</span>
                  </div>
               </div>

               <div className="col-span-2 text-center">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    event.isPast ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                  }`}>
                    {event.isPast ? "Past Event" : "Upcoming"}
                  </span>
               </div>

               <div className="col-span-2 flex justify-end space-x-4">
                  <button onClick={() => handleOpenModal(event)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"><Edit3 size={18} /></button>
                  <button onClick={() => handleDelete(event._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"><Trash2 size={18} /></button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-2xl font-black text-blue-950 uppercase tracking-widest italic">{editingEvent ? "Edit Event" : "Create New Event"}</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Event Semantic ID</label>
                    <input type="text" required placeholder="e.g. ipolicy-hyderabad-2024" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Select Master Program</label>
                    <select 
                      required 
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none uppercase font-bold"
                      value={formData.programId} 
                      onChange={e => setFormData({...formData, programId: e.target.value})}
                    >
                      <option value="" disabled>--- Select a Program ---</option>
                      {programsList.map(prog => (
                         <option key={prog.id} value={prog.id}>
                           {prog.title} ({prog.id})
                         </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Event Title</label>
                  <input type="text" required placeholder="Workshop on Tech Policy..." className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Display Date / Time</label>
                    <input type="text" required placeholder="June 2024" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Event Status</label>
                    <select className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-bold"
                      value={formData.isPast} onChange={e => setFormData({...formData, isPast: e.target.value === "true"})}>
                      <option value="false">Upcoming (Active)</option>
                      <option value="true">Past Archive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">About (Summary)</label>
                  <textarea required placeholder="Discussing the impact of..." rows="4" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    value={formData.about} onChange={e => setFormData({...formData, about: e.target.value})} />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border-2 border-gray-200 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors uppercase tracking-widest cursor-pointer">Cancel</button>
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-100 cursor-pointer uppercase tracking-widest">{editingEvent ? "Save Changes" : "Post Event"}</button>
                </div>

              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
