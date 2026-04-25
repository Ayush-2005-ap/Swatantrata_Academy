import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  BookOpen,
  Globe,
  ToggleLeft,
  ToggleRight,
  Star
} from "lucide-react";

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    duration: "",
    location: "",
    features: "",
    logo: "",
    isMainProgram: false,
    bannerImage: ""
  });
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/programs`);
      setPrograms(res.data);
    } catch (err) {
      console.error("Error fetching programs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program template? All events associated with it might be orphaned.")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_BASE_URL}/programs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrograms(programs.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete program");
    }
  };

  const handleOpenModal = (program = null) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        id: program.id,
        title: program.title,
        description: program.description,
        duration: program.duration || "",
        location: program.location || "",
        features: program.features ? program.features.join(", ") : "",
        logo: program.logo || "",
        isMainProgram: program.isMainProgram || false,
        bannerImage: program.bannerImage || ""
      });
    } else {
      setEditingProgram(null);
      setFormData({
        id: "",
        title: "",
        description: "",
        duration: "",
        location: "",
        features: "",
        logo: "",
        isMainProgram: false,
        bannerImage: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const payload = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      };
      
      if (editingProgram) {
        await axios.put(`${API_BASE_URL}/programs/${editingProgram._id}`, payload, config);
      } else {
        await axios.post(`${API_BASE_URL}/programs`, payload, config);
      }
      
      setIsModalOpen(false);
      fetchData(); // Refresh list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save program.");
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("media", file);

    setUploadingLogo(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(`${API_BASE_URL}/settings/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      setFormData(prev => ({ ...prev, logo: res.data.mediaUrl }));
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload logo.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("media", file);

    setUploadingBanner(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(`${API_BASE_URL}/settings/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      setFormData(prev => ({ ...prev, bannerImage: res.data.mediaUrl }));
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload banner.");
    } finally {
      setUploadingBanner(false);
    }
  };

  const filteredPrograms = programs.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-20 text-center font-bold">Loading Master Programs...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-blue-950 tracking-tighter uppercase italic">Master Programs</h1>
          <p className="text-gray-500 mt-2">Manage the core underlying templates and categories (e.g. iPolicy, Srijan) that dictate your events.</p>
        </div>
        
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95 cursor-pointer uppercase tracking-widest text-sm"
        >
          <Plus size={20} />
          <span>Add New Program</span>
        </button>
      </div>

      {/* Quick Stats & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
           <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl"><Globe size={24} /></div>
           <div>
             <span className="text-2xl font-black text-gray-900 leading-none">{programs.length}</span>
             <p className="text-xs text-gray-400 font-bold uppercase mt-1">Master Templates</p>
           </div>
        </div>
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-6 top-5 text-gray-400" size={20} />
            <input 
               type="text" 
               className="w-full bg-white border border-gray-200 pl-14 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:outline-none shadow-sm"
               placeholder="Search by program title or code..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map(program => (
           <div key={program._id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
               <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${program.color || 'from-gray-300 to-gray-400'}`}></div>
               <div className="flex justify-between items-start mb-4 mt-2">
                 {program.bannerImage ? (
                   <img src={program.bannerImage} className="w-12 h-12 object-cover rounded-xl" alt="" />
                 ) : (
                   <div className={`w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center`}>
                      <BookOpen size={24} className="text-gray-700" />
                   </div>
                 )}
                 <div className="flex space-x-2">
                    <button onClick={() => handleOpenModal(program)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 rounded-full"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(program._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-full"><Trash2 size={16} /></button>
                 </div>
               </div>
               
               <h3 className="text-xl font-black text-gray-900 mb-1">{program.title}</h3>
               <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4 py-1 px-2 bg-gray-100 w-fit rounded-md">{program.id}</p>
               
               <p className="text-sm text-gray-600 line-clamp-3">{program.description}</p>
           </div>
        ))}
      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-2xl font-black text-blue-950 uppercase tracking-widest italic">{editingProgram ? "Edit Program Template" : "Create Master Program"}</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Program Logo</label>
                    <div className="flex items-center space-x-4">
                      {formData.logo && (
                        <img src={formData.logo} alt="Logo" className="w-12 h-12 rounded-lg object-contain bg-gray-50 border border-gray-200" />
                      )}
                      <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploadingLogo} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                      {uploadingLogo && <span className="text-xs text-blue-500 font-bold animate-pulse">Uploading...</span>}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Program Code (ID)</label>
                    <input type="text" required placeholder="e.g. ipolicy" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none uppercase"
                      value={formData.id} onChange={e => setFormData({...formData, id: e.target.value.toLowerCase()})} />
                    <p className="text-[10px] text-gray-400 mt-1">This connects events to you.</p>
                  </div>
                </div>

                <div className="w-full">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Display Title</label>
                  <input type="text" required placeholder="e.g. iPolicy for Young Leaders" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>

                <div className="w-full">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Program Banner Image</label>
                  <div className="flex flex-col space-y-4">
                    {formData.bannerImage && (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <img src={formData.bannerImage} alt="Banner" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, bannerImage: "" }))}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleBannerUpload} 
                        disabled={uploadingBanner} 
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                      />
                      {uploadingBanner && <span className="text-xs text-blue-500 font-bold animate-pulse">Uploading Banner...</span>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Duration</label>
                    <input type="text" required placeholder="e.g. 2-3 Days" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Location</label>
                    <input type="text" required placeholder="e.g. New Delhi / Online" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Features (Comma Separated)</label>
                  <input type="text" required placeholder="e.g. Stipend, Mentorship, Certificate" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">About / Description</label>
                  <textarea required placeholder="This program teaches the basics of public policy..." rows="4" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>

                <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 flex items-center justify-between group">
                   <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-2xl ${formData.isMainProgram ? 'bg-amber-100 text-amber-600' : 'bg-white text-gray-400'} transition-colors`}>
                         <Star size={24} className={formData.isMainProgram ? 'fill-current' : ''} />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Main Showcase</h4>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pin this program to the homepage "Explore" section</p>
                      </div>
                   </div>
                   <button 
                      type="button" 
                      onClick={() => setFormData({...formData, isMainProgram: !formData.isMainProgram})}
                      className={`transition-all duration-300 transform cursor-pointer ${formData.isMainProgram ? 'text-indigo-600' : 'text-gray-300'}`}
                   >
                      {formData.isMainProgram ? <ToggleRight size={48} /> : <ToggleLeft size={48} />}
                   </button>
                </div>


                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border-2 border-gray-200 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors uppercase tracking-widest cursor-pointer">Cancel</button>
                  <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-indigo-100 cursor-pointer uppercase tracking-widest">{editingProgram ? "Save Changes" : "Create Program"}</button>
                </div>

              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrograms;
