import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../../config";
import { 
  Users, 
  Trash2, 
  Plus, 
  UserPlus, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const AdminFaculty = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", role: "", image: "", type: "board", featured: false });
  const [filter, setFilter] = useState("board");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/members`);
      setMembers(response.data);
    } catch (err) {
      console.error("Error fetching admin faculty:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${API_BASE_URL}/members/upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setNewMember({ ...newMember, image: response.data.imageUrl });
      setMessage({ type: "success", text: "Image uploaded!" });
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Upload failed." });
    } finally {
      setUploading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    try {
      await axios.post(`${API_BASE_URL}/members`, newMember, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: "success", text: `${newMember.type} member added!` });
      setNewMember({ name: "", role: "", image: "", type: "board", featured: false });
      fetchMembers();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error adding member." });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this board member?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`${API_BASE_URL}/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: "success", text: "Member removed." });
      fetchMembers();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error deleting member." });
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading Board...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-blue-950 tracking-tighter uppercase italic">Board Management</h1>
          <p className="text-gray-500 mt-2">Manage the Board of Directors and Faculty profiles shown on the About Us page.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form: Add Member */}
        <div className="lg:col-span-1">
          <form onSubmit={handleAddMember} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
            <div className="flex items-center space-x-3 mb-6">
              <UserPlus className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold">Add New Member</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  placeholder="e.g. Dr. Amit Chandra"
                />
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Role/Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  placeholder="e.g. Director"
                />
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Member Photo</label>
                <div className="flex items-center space-x-4">
                  {newMember.image ? (
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-lg group">
                       <img src={`${newMember.image.startsWith('http') || newMember.image.startsWith('/') ? '' : 'http://localhost:5050'}${newMember.image}`} className="w-full h-full object-cover" alt="Preview" />
                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer text-white text-[10px] uppercase font-black">Change</label>
                          <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                       </div>
                    </div>
                  ) : (
                    <label className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl py-8 transition-colors hover:border-blue-300 hover:bg-blue-50 cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                       {uploading ? (
                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                       ) : (
                         <>
                           <Plus className="text-gray-400 mb-1" size={24} />
                           <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Photo</span>
                         </>
                       )}
                       <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Member Category</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-bold"
                  value={newMember.type}
                  onChange={(e) => setNewMember({...newMember, type: e.target.value})}
                >
                  <option value="board">Board of Directors</option>
                  <option value="faculty">Academic Faculty</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 py-2">
                <input 
                  type="checkbox" 
                  id="featured"
                  className="w-5 h-5 rounded-md text-blue-600 focus:ring-blue-500"
                  checked={newMember.featured}
                  onChange={(e) => setNewMember({...newMember, featured: e.target.checked})}
                />
                <label htmlFor="featured" className="text-sm font-bold text-gray-700">Feature on top?</label>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-100 cursor-pointer active:scale-95"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>

        {/* List: Current Members */}
        <div className="lg:col-span-2">
            <div className="flex space-x-4 mb-8 bg-white p-2 rounded-2xl border border-gray-100 inline-flex shadow-sm">
               <button 
                 onClick={() => setFilter("board")}
                 className={`px-6 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${filter === "board" ? "bg-blue-900 text-white shadow-lg" : "text-gray-400 hover:text-blue-900 hover:bg-blue-50 cursor-pointer"}`}
               > Board </button>
               <button 
                 onClick={() => setFilter("faculty")}
                 className={`px-6 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${filter === "faculty" ? "bg-blue-900 text-white shadow-lg" : "text-gray-400 hover:text-blue-900 hover:bg-blue-50 cursor-pointer"}`}
               > Faculty </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {members.filter(m => m.type === filter).map((member) => (
                <div key={member._id} className="bg-white rounded-3xl border border-gray-100 p-6 flex items-center space-x-6 relative group shadow-sm hover:shadow-md transition-all">
                    <img 
                       src={`${member.image.startsWith('http') || member.image.startsWith('/') ? '' : BASE_URL}${member.image}`} 
                       alt={member.name} 
                       className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-50"
                    />
                   <div className="flex-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{member.name}</h4>
                      <p className="text-sm text-gray-500 font-medium">{member.role}</p>
                   </div>
                   <button 
                      onClick={() => handleDelete(member._id)}
                      className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                   >
                     <Trash2 size={20} />
                   </button>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFaculty;
