import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get current path

  // Function to handle navigation to a specific section or page
  const handleNavigation = (section) => {
    const currentPath = location.pathname;

    // If on the homepage, scroll to the section
    if (currentPath === "/" && section !== "home") {
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (currentPath === "/") {
      // If on the homepage and clicking "home", scroll to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // On other pages like the login page, navigate to the homepage and scroll to the section
      navigate("/"); // Navigate to the homepage
      setTimeout(() => {
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100); // Delay to allow the page to load before scrolling
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950 text-white py-4 px-8 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <button
            onClick={() => handleNavigation("home")}
            className="hover:text-blue-400 transition"
          >
            isPay
          </button>
        </h1>
        <ul className="hidden md:flex space-x-6">
          <li>
            <button
              onClick={() => handleNavigation("home")}
              className="hover:text-blue-400 transition"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("features")}
              className="hover:text-blue-400 transition"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("faq")}
              className="hover:text-blue-400 transition"
            >
              FAQ
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("contact")}
              className="hover:text-blue-400 transition"
            >
              Contact
            </button>
          </li>
        </ul>
        <div>
          <button
            onClick={() => navigate("/login-register")}
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-medium transition"
          >
            Login / Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
