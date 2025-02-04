import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import Hero from "./components/hero";
import Features from "./components/Features";
import LoginRegister from "./components/LoginRegister";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotAuthorized from "./components/NotAuthorized";
import NotFound from "./components/NotFound";
import FAQ from "./components/Faq";
import Support from "./components/Support";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="bg-white text-gray-900">
      {/* Render Navbar unless on the dashboard */}
      {location.pathname !== "/dashboard" && <Navbar />}
      
      {/* Main Content - Will have padding unless on dashboard */}
      {location.pathname !== "/dashboard" && (
        <div className="pt-16"> {/* Added padding-top to account for navbar */}
          <Routes>
            {/* Define Routes for main sections */}
            <Route
              path="/"
              element={
                <>
                  {/* Hero Section */}
                  <section className="bg-white py-24 px-6 sm:px-12 lg:px-24 text-center">
                    <Hero />
                  </section>

                  {/* Features Section */}
                  <section is="features" className="bg-gray-50 py-24 px-6 sm:px-12 lg:px-24">
                    <Features />
                  </section>

                  {/* FAQ Section */}
                  <section className="bg-gray-50 py-24 px-6 sm:px-12 lg:px-24">
                    <FAQ />
                  </section>

                  {/* Support Section */}
                  <section className="bg-white py-24 px-6 sm:px-12 lg:px-24">
                    <Support />
                  </section>
                </>
              }
            />
            
            <Route path="/not-authorized" element={<NotAuthorized />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login-register" element={<LoginRegister />} />
          </Routes>
        </div>
      )}

      {/* Dashboard Route */}
      {location.pathname === "/dashboard" && (
        <div className="flex">
          <Sidebar />
          <div className="flex-1 bg-[#E5E7EB] lg:ml-64">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      )}

      {/* Render Footer unless on the dashboard */}
      {location.pathname !== "/dashboard" && <Footer />}
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
