import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Mail, MailOpen, Trash2, CheckCircle2, AlertCircle, Phone, Calendar, Clock, User } from "lucide-react";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_BASE_URL}/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(response.data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const markAsRead = async (id, currentStatus) => {
    if (currentStatus) return; // Already read
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`${API_BASE_URL}/inquiries/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(inquiries.map(inq => inq._id === id ? { ...inq, isRead: true } : inq));
    } catch (err) {
      console.error("Failed to mark as read:", err);
      showMessage("error", "Failed to update status.");
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this message?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_BASE_URL}/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(inquiries.filter(inq => inq._id !== id));
      showMessage("success", "Message deleted successfully.");
    } catch (err) {
      console.error("Failed to delete:", err);
      showMessage("error", "Failed to delete message.");
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-gray-500">Loading Inbox...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-blue-950 tracking-tighter flex items-center space-x-3">
            <Mail className="text-indigo-600" size={40} />
            <span>Inbox</span>
          </h1>
          <p className="text-gray-500 mt-2">Manage all public inquiries and messages.</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-6 py-3 rounded-full font-bold text-sm">
          {inquiries.filter(i => !i.isRead).length} Unread Messages
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

      {inquiries.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
          <MailOpen className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-xl font-bold text-gray-500">Your inbox is completely empty!</p>
          <p className="text-gray-400">When someone submits the Contact Us form, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inquiry) => (
            <div 
              key={inquiry._id} 
              onMouseEnter={() => markAsRead(inquiry._id, inquiry.isRead)}
              className={`group bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
                inquiry.isRead 
                  ? 'border-gray-100 opacity-75 hover:opacity-100' 
                  : 'border-l-4 border-l-indigo-500 border-t-indigo-50 border-r-indigo-50 border-b-indigo-50 shadow-md'
              }`}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  {/* Sender Info */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center space-x-3">
                      {!inquiry.isRead && (
                        <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">New</span>
                      )}
                      <h3 className="text-xl font-bold text-gray-900">{inquiry.subject}</h3>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <User size={16} className="text-gray-400" />
                        <span className="font-bold text-gray-700">{inquiry.name}</span>
                      </div>
                      <a href={`mailto:${inquiry.email}`} className="flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                        <Mail size={16} />
                        <span className="font-bold">{inquiry.email}</span>
                      </a>
                      <a href={`tel:${inquiry.phone}`} className="flex items-center space-x-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                        <Phone size={16} />
                        <span className="font-bold">{inquiry.phone}</span>
                      </a>
                    </div>
                  </div>

                  {/* Date & Actions */}
                  <div className="flex flex-col items-end space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                       <Calendar size={14} />
                       <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                       <Clock size={14} className="ml-2" />
                       <span>{new Date(inquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    
                    <button 
                      onClick={() => deleteInquiry(inquiry._id)}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                    {inquiry.message}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
