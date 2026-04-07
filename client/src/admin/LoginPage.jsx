import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminUser", JSON.stringify(response.data.user));
      navigate("/admin"); // Redirect directly to Admin Panel after successful login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-500">
        <div className="bg-blue-900 p-10 text-center relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
             <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <ShieldCheck className="mx-auto text-blue-200 mb-4" size={56} />
            <h1 className="text-3xl font-black text-white tracking-widest uppercase italic">SA ADMIN</h1>
            <p className="text-blue-200 mt-2 font-medium">Secured Administrative Portal</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="p-10 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center space-x-2">
               <div className="w-2 h-2 bg-red-500 rounded-full"></div>
               <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="admin@swatantra.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Master Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black tracking-widest uppercase flex items-center justify-center space-x-3 transition-all active:scale-95 shadow-xl shadow-blue-100 disabled:opacity-50 cursor-pointer"
          >
            <span>{loading ? "Authenticating..." : "Authorize"}</span>
            {!loading && <ArrowRight size={20} />}
          </button>

          <p className="text-center text-xs text-gray-400 mt-8 font-medium">
             Authorized personnel only. All access attempts are logged.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
