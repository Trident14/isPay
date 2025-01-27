import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';  // Import useCookies
import { useNavigate } from "react-router-dom"; // For redirection after logout

const Sidebar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const[cookies,setCookies]=useCookies(["access_token"])

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Logout function to clear the JWT cookie and redirect
  const logout = () => {
    setCookies("access_token","");
    window.localStorage.removeItem("username");
    Navigate("/");
  };

  // Handle active link on hash change
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    const setActiveLink = () => {
      const hash = window.location.hash || '#dashboard';
      links.forEach(link => {
        link.classList.remove('active', 'bg-blue-50', 'text-blue-600');
        if (link.getAttribute('href') === hash) {
          link.classList.add('active', 'bg-blue-50', 'text-blue-600');
        }
      });
    };

    links.forEach(link => {
      link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active', 'bg-blue-50', 'text-blue-600'));
        link.classList.add('active', 'bg-blue-50', 'text-blue-600');
      });
    });

    window.addEventListener('hashchange', setActiveLink);
    setActiveLink();

    return () => {
      window.removeEventListener('hashchange', setActiveLink);
    };
  }, []);

  return (
    <div className="bg-[#E5E7EB] min-h-screen">
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="fixed h-screen w-64 bg-white border-r border-neutral-200/20 hidden lg:block">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6">
              <div className="text-2xl font-bold text-blue-600">isPay</div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-4">
              <a href="#dashboard" className="flex items-center px-4 py-3 text-gray-700 rounded-lg mb-2 hover:bg-blue-50 transition-all active">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Dashboard
              </a>
              <a href="#transactions" className="flex items-center px-4 py-3 text-gray-700 rounded-lg mb-2 hover:bg-blue-50 transition-all">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Transactions
              </a>
              <a href="#savings" className="flex items-center px-4 py-3 text-gray-700 rounded-lg mb-2 hover:bg-blue-50 transition-all">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                </svg>
                Savings
              </a>
            </div>

            {/* Bottom Profile Section */}
            <div className="p-4 border-t border-neutral-200/20">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">JD</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                  <button 
                    onClick={logout} 
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                    Logout
                </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-neutral-200/20 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="text-xl font-bold text-blue-600">isPay</div>
            <button type="button" className="text-gray-500 hover:text-gray-600" onClick={toggleMobileMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white z-40 ${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
          <div className="p-4">
            <button type="button" className="absolute top-4 right-4 text-gray-500 hover:text-gray-600" onClick={toggleMobileMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="mt-8">
              <a href="#dashboard" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg mb-2">Dashboard</a>
              <a href="#transactions" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg mb-2">Transactions</a>
              <a href="#savings" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg mb-2">Savings</a>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Sidebar;
