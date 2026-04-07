import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, Calendar, Users, LogOut, Globe, Mail, Monitor } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/");
  };

  const links = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Landing Architect", path: "/admin/landing", icon: Monitor },
    { name: "Programs", path: "/admin/programs", icon: Globe },
    { name: "Events", path: "/admin/events", icon: Calendar },
    { name: "Faculty", path: "/admin/faculty", icon: Users },
    { name: "Inbox", path: "/admin/inquiries", icon: Mail },
  ];

  return (
    <div className="w-64 bg-slate-100 border-r border-gray-200 h-screen flex flex-col pt-8">
      <div className="px-6 mb-10">
        <h1 className="text-xl font-extrabold text-blue-900 tracking-tighter">
          SA ADMIN <span className="text-primary font-normal">PANEL</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
              location.pathname === link.path
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
            }`}
          >
            <link.icon size={20} />
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-500 font-bold hover:bg-red-50 hover:text-red-700 w-full px-4 py-3 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut size={20} />
          <span>Secure Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
