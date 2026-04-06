import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Youtube, Instagram, Facebook, Twitter, Shield } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = !!localStorage.getItem("adminToken");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "PROGRAMS", path: "/programs" },
    { name: "FACULTY", path: '/faculty' },
    { name: "ABOUT US", path: "/about" },
    { name: "CONTACT US", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Youtube, url: "#", label: "LinkedIn" },
    { icon: Instagram, url: "#", label: "Instagram" },
    { icon: Facebook, url: "#", label: "Facebook" },
    { icon: Twitter, url: "#", label: "Twitter" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/swatantra_academy_logo.png"
              alt="Swatantra Academy Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold tracking-wide relative group ${location.pathname === link.path
                    ? "text-primary"
                    : "text-gray-900 hover:text-primary"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Socials */}
          <div className="hidden lg:flex items-center bg-white-100 px-4 py-2 rounded-lg">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray p-2 hover:scale-110 transition hover:text-primary"
              >
                <social.icon size={18} />
              </a>
            ))}
            
            {isAdmin && (
              <Link 
                to="/admin" 
                className="ml-4 flex items-center space-x-2 bg-blue-900 border border-blue-950 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors"
                title="Admin Dashboard"
              >
                <Shield size={16} />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-semibold ${location.pathname === link.path
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex gap-4 pt-4 border-t items-center justify-between">
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-100 hover:text-blue-100"
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
              
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest"
                >
                  <Shield size={16} />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
