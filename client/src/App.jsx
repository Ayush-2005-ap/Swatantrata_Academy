import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar';
import TopBanner from './components/TopBanner';
import Home from './pages/Home';
import Programs from './pages/Programs';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import ChatBot from './chatbot/ChatBot';
import Faculty from './pages/Faculty';
import ProgramDetail from "./programs/pages/ProgramDetail";
import EventDetail from "./programs/pages/EventDetail";

// 🏆 Admin Imports
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminEvents from './admin/pages/AdminEvents';
import AdminInquiries from './admin/pages/AdminInquiries';
import AdminLandingPage from './admin/pages/AdminLandingPage';
import AdminPrograms from './admin/pages/AdminPrograms';
import AdminFaculty from './admin/pages/AdminFaculty';
import LoginPage from './admin/LoginPage';
import ProtectedRoute from './admin/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen relative">
      {!isAdminPath && <TopBanner />}
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:programId" element={<ProgramDetail />} />
        <Route
          path="/programs/:programId/events/:eventId"
          element={<EventDetail />}
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faculty" element={<Faculty />} />

        {/* 🔐 Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
             <Route index element={<AdminDashboard />} />
             <Route path="landing" element={<AdminLandingPage />} /> 
             <Route path="events" element={<AdminEvents />} />
             <Route path="programs" element={<AdminPrograms />} /> 
             <Route path="faculty" element={<AdminFaculty />} />
             <Route path="inquiries" element={<AdminInquiries />} />
          </Route>
        </Route>
      </Routes>
      {!isAdminPath && <ChatBot />}
      {!isAdminPath && <Footer />}
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
