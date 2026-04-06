import { Outlet, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Globe } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-100 py-4 px-8 flex justify-between items-center shadow-sm sticky top-0 z-20">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center space-x-2">
            <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></span>
            <span>Admin Live</span>
          </div>
          <div className="flex items-center space-x-6">
             <Link 
               to="/"
               className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors"
               title="Return to Public Website"
             >
                <Globe size={16} />
                <span>View Website</span>
             </Link>
             
             <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
               <div className="bg-gradient-to-tr from-blue-700 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs ring-4 ring-blue-50 shadow-lg">
                  SA
               </div>
               <div className="hidden md:block">
                 <p className="text-sm font-black text-gray-900 leading-none">Swatantra Admin</p>
                 <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Administrator</p>
               </div>
             </div>
          </div>
        </header>
        <div className="animate-in fade-in duration-700">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
