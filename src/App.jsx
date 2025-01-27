import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";  // Import Sidebar
import Hero from "./components/hero";
import Features from "./components/Features";
import LoginRegister from "./components/LoginRegister";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute"; 
import NotAuthorized from "./components/NotAuthorized";
import NotFound from "./components/NotFound";

const AppContent = () => {
  const location = useLocation();  // Using useLocation inside Router context

  return (
    <div className="bg-gray-900 text-white">
      {/* Render Navbar unless we're on the dashboard */}
      {location.pathname !== '/dashboard' && <Navbar />}
      
      {/* Main Content */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <LoginRegister />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />  {/* Custom 404 Page */}
      </Routes>

      {/* Render Sidebar only for dashboard */}
      {location.pathname === '/dashboard' && <Sidebar />}

      {location.pathname !== '/dashboard' &&  <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
