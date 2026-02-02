import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Programs from './pages/Programs';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import ChatBot from './chatbot/ChatBot';
import Faculty from './pages/Faculty';
import ProgramDetail from "./programs/pages/ProgramDetail";
import EventDetail from "./programs/pages/EventDetail";
import Snowfall from 'react-snowfall';
function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        {/* <Snowfall color='#2657F5' style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          pointerEvents: "none"
        }} /> */}
        <Navbar />
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
        </Routes>
        <ChatBot />
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
